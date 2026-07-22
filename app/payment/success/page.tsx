"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatMinorUnits } from "@/lib/formatCurrency";
import { AuthPageShell } from "@/components/AuthPageShell";

const SUBSCRIPTION_REGISTERED_PREFIX = "nutrichef_subscription_registered_";

interface SessionData {
  id: string;
  payment_status: string;
  amount_total: number | null;
  currency: string | null;
  status: string;
  customer?: string | { id: string } | null;
  metadata?: Record<string, string>;
}

function resolveStripeCustomerId(session: SessionData): string | null {
  const c = session.customer;
  if (typeof c === "string" && c.length > 0) return c;
  if (c && typeof c === "object" && "id" in c && typeof c.id === "string") return c.id;
  return null;
}

function parseAmountMinor(session: SessionData): number | null {
  const raw = session.metadata?.amount;
  if (raw != null && raw !== "") {
    const parsed = parseInt(raw, 10);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  if (session.amount_total != null && session.amount_total > 0) {
    return session.amount_total;
  }
  return null;
}

/** Stripe Checkout Session currency (ISO), lowercased for the API (e.g. "aed"). */
function resolveCheckoutCurrency(session: SessionData): string | null {
  const c = session.currency?.trim().toLowerCase();
  return c && c.length > 0 ? c : null;
}

function isCheckoutPaidAndComplete(session: SessionData): boolean {
  const paid =
    session.payment_status === "paid" ||
    session.payment_status === "no_payment_required";
  return paid && session.status === "complete";
}

function LoadingSpinner() {
  return (
    <div
      className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"
      aria-hidden
    />
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background pt-24">
          <LoadingSpinner />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const isAppSource = searchParams.get("source") === "app";
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState<"verify" | "activate">("verify");
  const [error, setError] = useState("");
  const [appRedirected, setAppRedirected] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("Invalid return link. Please open this page from checkout or contact support.");
      return;
    }

    const storageKey = `${SUBSCRIPTION_REGISTERED_PREFIX}${sessionId}`;

    const run = async () => {
      let verified: SessionData;
      try {
        const res = await api.get<SessionData>(`/checkout/session/${sessionId}`, {
          noAuth: true,
        });
        verified = res.data;
      } catch {
        setError("Could not verify payment. Please contact support.");
        return;
      }

      if (!isCheckoutPaidAndComplete(verified)) {
        setError(
          "Payment was not completed. If you were charged, please contact support with your receipt.",
        );
        return;
      }

      const stripeCustomerId = resolveStripeCustomerId(verified);
      const orderIdFromSession = verified.metadata?.orderId?.trim();

      const templateId = verified.metadata?.templateId?.trim();
      if (!templateId) {
        setError(
          "Could not link this payment to your plan. Please contact support with your order details.",
        );
        return;
      }

      const amount = parseAmountMinor(verified);
      if (amount == null) {
        setError("Could not confirm the payment amount. Please contact support.");
        return;
      }

      const currency = resolveCheckoutCurrency(verified);
      if (!currency) {
        setError("Could not confirm the payment currency. Please contact support.");
        return;
      }

      if (!stripeCustomerId && !orderIdFromSession) {
        setError(
          "We could not link this payment to a Stripe customer or your order. Please contact support.",
        );
        return;
      }

      // Mobile app flow: skip web subscription activation, redirect back to app
      if (isAppSource) {
        const deepLink = `nutrichef://payment/success?session_id=${encodeURIComponent(sessionId!)}`;
        setAppRedirected(true);
        setSession(verified);
        window.location.href = deepLink;
        return;
      }

      if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(storageKey) === "1") {
        setSession(verified);
        return;
      }

      setLoadingStep("activate");
      try {
        const isTrial = verified.metadata?.planType === "trial";
        const subscriptionType = isTrial ? "one-time" : "recurring";
        if (stripeCustomerId) {
          await api.post("/payment/subscription", {
            templateId,
            amount,
            currency,
            type: subscriptionType,
            stripeCustomerId,
          });
        } else {
          await api.post("/payment/subscription", {
            templateId,
            amount,
            currency,
            type: subscriptionType,
            checkoutSessionId: verified.id,
            orderId: orderIdFromSession,
          });
        }
        if (typeof sessionStorage !== "undefined") {
          sessionStorage.setItem(storageKey, "1");
        }
        setSession(verified);
      } catch (err: unknown) {
        const status =
          err && typeof err === "object" && "status" in err
            ? (err as { status: number }).status
            : undefined;
        if (status === 401) {
          setError(
            "Your payment went through, but we could not activate your plan because your session expired. Please sign in again and contact support if your plan does not appear.",
          );
        } else {
          setError(
            "Your payment may have succeeded, but we could not activate your meal plan. Please contact support and we will fix this for you.",
          );
        }
      }
    };

    void run().finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <AuthPageShell maxWidthClass="max-w-[480px]">
      <div className="text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <LoadingSpinner />
            <p className="text-sm font-medium text-secondary-text">
              {loadingStep === "verify" ? "Verifying your payment..." : "Activating your meal plan..."}
            </p>
          </div>
        ) : error ? (
          <>
            <div className="mx-auto mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-red-50">
              <svg
                className="h-8 w-8 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h1 className="font-heading mb-3 text-2xl font-semibold text-foreground">
              Something went wrong
            </h1>
            <p className="mb-8 text-sm font-medium text-secondary-text">{error}</p>
            <Link
              href="/plans"
              className="inline-block rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              Back to plans
            </Link>
          </>
        ) : appRedirected ? (
          <>
            <div className="mx-auto mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-primary/15">
              <svg
                className="h-8 w-8 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h1 className="font-heading mb-3 text-2xl font-semibold text-foreground">
              Payment successful
            </h1>
            <p className="mb-2 text-sm font-medium text-secondary-text">
              Redirecting you back to the NutriChef app...
            </p>
            <p className="mb-8 text-xs text-secondary-text">
              If the app doesn&apos;t open automatically, tap the button below.
            </p>
            <a
              href={`nutrichef://payment/success?session_id=${encodeURIComponent(sessionId ?? "")}`}
              className="inline-block rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
            >
              Open NutriChef
            </a>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-primary/15">
              <svg
                className="h-8 w-8 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h1 className="font-heading mb-3 text-2xl font-semibold text-foreground">
              Payment successful
            </h1>
            <p className="mb-2 text-sm font-medium text-secondary-text">
              Your meal plan has been activated.
            </p>
            {session && session.amount_total != null ? (
              <p className="mb-8 font-heading text-lg font-semibold text-foreground">
                {formatMinorUnits(session.amount_total, session.currency || "inr")} paid
              </p>
            ) : (
              <div className="mb-8" />
            )}
            <div className="mt-2 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="rounded-xl bg-primary px-8 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
              >
                Go to home
              </Link>
              <Link
                href="/menu"
                className="rounded-xl border border-border-subtle bg-background px-8 py-3.5 text-center text-sm font-semibold text-foreground transition hover:bg-bg-light"
              >
                View menu
              </Link>
            </div>
          </>
        )}
      </div>
    </AuthPageShell>
  );
}
