"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, TENANT_ID } from "@/lib/api";
import { CountryCodeSelect } from "@/components/CountryCodeSelect";
import { AuthPageShell } from "@/components/AuthPageShell";
import {
  DEFAULT_COUNTRY_CODE_SELECTION,
  DEFAULT_DIAL_CODE,
  dialCodeForApi,
  findRowBySelection,
  nationalPhoneForApi,
} from "@/lib/countryCodes";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background pt-28">
          <div className="mx-auto h-10 max-w-[440px] animate-pulse rounded-2xl bg-bg-light" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [phone, setPhone] = useState("");
  const [countrySelection, setCountrySelection] = useState(
    DEFAULT_COUNTRY_CODE_SELECTION,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError("Please enter your phone number");
      return;
    }

    setLoading(true);
    setError("");

    const row = findRowBySelection(countrySelection);
    const countryCodeDigits = dialCodeForApi(row?.dialCode ?? DEFAULT_DIAL_CODE);
    const phoneDigits = nationalPhoneForApi(phone, countryCodeDigits);

    if (phoneDigits.length < 6) {
      setError("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    try {
      await api.post(
        "/auth/otp",
        {
          phone: phoneDigits,
          countryCode: countryCodeDigits,
          tenantId: TENANT_ID,
        },
        { noAuth: true },
      );

      const params = new URLSearchParams({
        phone: phoneDigits,
        countryCode: countryCodeDigits,
        redirect,
      });
      router.push(`/auth/verify?${params.toString()}`);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to send OTP. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageShell
      title="Welcome back"
      subtitle="Enter your phone number to get started"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">
            Phone number
          </label>
          <div className="flex gap-3">
            <CountryCodeSelect
              value={countrySelection}
              onChange={setCountrySelection}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter phone number"
              className="flex-1 rounded-xl border border-border-subtle bg-background px-4 py-3.5 text-sm font-medium text-foreground placeholder:text-secondary-text/70 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
              autoFocus
            />
          </div>
        </div>

        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-50"
        >
          {loading ? "Sending OTP..." : "Continue"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm font-medium text-secondary-text">
        We&apos;ll send a verification code on WhatsApp from WellnessZ. If it
        doesn&apos;t appear, check Message requests.
      </p>
    </AuthPageShell>
  );
}
