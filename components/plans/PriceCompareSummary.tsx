"use client";

import { formatMajorUnits } from "@/lib/formatCurrency";
import type { PriceComparePair } from "@/lib/nutrichefPackages";

function GiftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 8v13" />
      <path d="M3 12h18" />
      <path d="M12 8c-1.5-2.5-4-3.5-5.5-2.5S5 9 7 10c1 .5 3 0 5-2z" />
      <path d="M12 8c1.5-2.5 4-3.5 5.5-2.5S19 9 17 10c-1 .5-3 0-5-2z" />
    </svg>
  );
}

function CompareLine({
  label,
  listAed,
  saleAed,
  currency,
}: {
  label: string;
  listAed: number;
  saleAed: number;
  currency: string;
}) {
  return (
    <p className="text-[13px] font-semibold leading-snug text-foreground sm:text-[14px]">
      <span className="text-secondary-text">{label}: </span>
      <span className="text-secondary-text line-through decoration-secondary-text/80">
        {formatMajorUnits(listAed, currency, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </span>{" "}
      <span className="text-primary">
        {formatMajorUnits(saleAed, currency, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </span>
    </p>
  );
}

/** Gift + Weekly/Total with strikethrough list and green sale prices. */
export function PriceCompareSummary({
  compare,
  currency,
  className = "",
  compact = false,
}: {
  compare: PriceComparePair;
  currency: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      role="group"
      aria-label={`Weekly was ${compare.weeklyListAed}, now ${compare.weeklySaleAed}. Total was ${compare.listAed}, now ${compare.saleAed}.`}
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ${
          compact ? "h-11 w-11" : "h-12 w-12"
        }`}
      >
        <GiftIcon className={compact ? "h-5 w-5" : "h-6 w-6"} />
      </div>
      <div className="min-w-0 flex-1 space-y-0.5">
        <CompareLine
          label="Weekly"
          listAed={compare.weeklyListAed}
          saleAed={compare.weeklySaleAed}
          currency={currency}
        />
        <CompareLine
          label="Total"
          listAed={compare.listAed}
          saleAed={compare.saleAed}
          currency={currency}
        />
      </div>
    </div>
  );
}
