export const MEAL_SLOT_OPTIONS = [
  { id: "breakfast", label: "Breakfast" },
  { id: "am_meal", label: "Morning snack" },
  { id: "lunch", label: "Lunch" },
  { id: "pm_meal", label: "Evening snack" },
  { id: "dinner", label: "Dinner" },
] as const;

export type MealSlotId = (typeof MEAL_SLOT_OPTIONS)[number]["id"];

export const UAE_EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
] as const;

export type Emirate = (typeof UAE_EMIRATES)[number];

export const WEEKDAYS = [
  { id: 0, short: "Sun" },
  { id: 1, short: "Mon" },
  { id: 2, short: "Tue" },
  { id: 3, short: "Wed" },
  { id: 4, short: "Thu" },
  { id: 5, short: "Fri" },
  { id: 6, short: "Sat" },
] as const;

export type BagType = "paper" | "cooler";

export interface DeliveryAddressDraft {
  emirate: Emirate;
  area: string;
  building: string;
  line1: string;
  postalCode: string;
  landmark: string;
  mapsUrl: string;
}

export const EMPTY_ADDRESS: DeliveryAddressDraft = {
  emirate: "Dubai",
  area: "",
  building: "",
  line1: "",
  postalCode: "",
  landmark: "",
  mapsUrl: "",
};

function fieldText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Landmark and a maps link stay optional. The postal address itself does not. */
export function incompleteAddressMessage(address: DeliveryAddressDraft): string | null {
  if (fieldText(address.line1).trim().length < 3) return "Add your street, villa or flat number.";
  if (fieldText(address.area).trim().length < 2) return "Add your area or community.";
  if (fieldText(address.building).trim().length < 2) return "Add the building or villa name.";
  if (fieldText(address.postalCode).trim().length < 3) return "Add the PIN or postal code.";
  return null;
}

export interface QuoteLine {
  code: string;
  label: string;
  amountMinor: number;
}

export interface QuoteResponse {
  lines: QuoteLine[];
  totalMinor: number;
  discountMinor: number;
  couponCode: string | null;
  couponError: string | null;
  currency: string;
}

/** Shown before the server quote arrives; the server total is what Stripe charges. */
export const OUTSIDE_DUBAI_FEE_AED = 499;
export const COOLER_BAG_FEE_AED = 149;

const ADDRESS_STORAGE_KEY = "nutrichef_delivery_address";

export function loadSavedAddress(): DeliveryAddressDraft {
  if (typeof localStorage === "undefined") return EMPTY_ADDRESS;
  try {
    const raw = localStorage.getItem(ADDRESS_STORAGE_KEY);
    if (!raw) return EMPTY_ADDRESS;
    const parsed = JSON.parse(raw) as Partial<Record<keyof DeliveryAddressDraft, unknown>>;
    const emirate = UAE_EMIRATES.includes(parsed.emirate as Emirate) ? (parsed.emirate as Emirate) : "Dubai";
    return {
      emirate,
      area: fieldText(parsed.area),
      building: fieldText(parsed.building),
      line1: fieldText(parsed.line1),
      postalCode: fieldText(parsed.postalCode),
      landmark: fieldText(parsed.landmark),
      mapsUrl: fieldText(parsed.mapsUrl),
    };
  } catch {
    return EMPTY_ADDRESS;
  }
}

export function saveAddress(address: DeliveryAddressDraft) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(address));
  } catch {
    /* storage full or blocked */
  }
}

/** YYYY-MM-DD in the visitor's local calendar. */
export function toDateInput(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function tomorrowInput(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toDateInput(d);
}

function parseDateInput(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
}

export function weekdayOf(value: string): number | null {
  const d = parseDateInput(value);
  return d ? d.getUTCDay() : null;
}

/** Last delivery day for `deliveries` days from `start`, skipping weekly off days. Mirrors the server. */
export function lastDeliveryDate(start: string, deliveries: number, offDays: number[]): Date | null {
  const d = parseDateInput(start);
  if (!d || offDays.length >= 7 || deliveries < 1) return null;
  const off = new Set(offDays);
  let count = 0;
  let last = d;
  const cursor = new Date(d.getTime());
  while (count < deliveries) {
    if (!off.has(cursor.getUTCDay())) {
      count += 1;
      last = new Date(cursor.getTime());
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return last;
}

export function formatLongDate(d: Date | null): string {
  if (!d) return "";
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

/** First validation message from an API error, else its message. */
export function apiErrorMessage(err: unknown, fallback: string): string {
  const e = err as { message?: string; response?: { errors?: Array<{ message?: string }> } };
  const first = e?.response?.errors?.find((x) => x?.message)?.message;
  return first || e?.message || fallback;
}
