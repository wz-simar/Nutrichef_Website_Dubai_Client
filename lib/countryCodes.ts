import rawCountryCodes from "@/public/data/country_code.json";

export type CountryCodeRow = {
  name: string;
  isoCode: string;
  dialCode: string;
};

/** UAE — default for Dubai / UAE users */
export const DEFAULT_COUNTRY_ISO = "AE" as const;

const SEP = "|";

function mapRaw(): CountryCodeRow[] {
  return rawCountryCodes.map((row) => ({
    name: row.name,
    isoCode: row.code,
    dialCode: row.dial_code,
  }));
}

export const countryCodeRows: CountryCodeRow[] = mapRaw();

export const countryCodesForPhone = countryCodeRows.filter((c) => c.dialCode.length > 0);

const defaultRow =
  countryCodesForPhone.find((c) => c.isoCode === DEFAULT_COUNTRY_ISO) ?? countryCodesForPhone[0];

/** Default dial including "+", e.g. +971 (UAE) */
export const DEFAULT_DIAL_CODE = defaultRow.dialCode;

/** Encodes iso + dial for controlled picker state (disambiguates duplicate dial codes). */
export function encodeCountryCodeSelection(isoCode: string, dialCode: string): string {
  return `${isoCode}${SEP}${dialCode}`;
}

export function decodeCountryCodeSelection(encoded: string): { isoCode: string; dialCode: string } | null {
  const i = encoded.indexOf(SEP);
  if (i <= 0) return null;
  return { isoCode: encoded.slice(0, i), dialCode: encoded.slice(i + 1) };
}

export const DEFAULT_COUNTRY_CODE_SELECTION = encodeCountryCodeSelection(
  defaultRow.isoCode,
  defaultRow.dialCode
);

/** Digits only, for API (matches prior login: countryCode without "+"). */
export function dialCodeForApi(dialCode: string): string {
  return dialCode.replace(/^\+/, "");
}

/**
 * National mobile digits for OTP APIs.
 * Strips spaces/symbols, drops a local trunk "0", and removes a pasted country code prefix.
 */
export function nationalPhoneForApi(phone: string, countryCodeDigits: string): string {
  let national = String(phone ?? "").replace(/\D/g, "");
  const cc = String(countryCodeDigits ?? "").replace(/\D/g, "");
  if (cc && national.startsWith(cc) && national.length > 10 && national.length - cc.length >= 6) {
    national = national.slice(cc.length);
  }
  return national.replace(/^0+/, "");
}

export function getCountryByIso(iso: string): CountryCodeRow | undefined {
  return countryCodesForPhone.find((c) => c.isoCode === iso);
}

export function dialDigitsForIso(iso: string): string {
  const c = getCountryByIso(iso);
  return c ? dialCodeForApi(c.dialCode) : "";
}

export function findRowBySelection(encoded: string): CountryCodeRow | undefined {
  const parsed = decodeCountryCodeSelection(encoded);
  if (!parsed) return undefined;
  return countryCodesForPhone.find(
    (c) => c.isoCode === parsed.isoCode && c.dialCode === parsed.dialCode
  );
}

export function filterCountryCodeRows(query: string, rows: CountryCodeRow[] = countryCodesForPhone): CountryCodeRow[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((row) => {
    const name = row.name.toLowerCase();
    const iso = row.isoCode.toLowerCase();
    const dial = row.dialCode.replace(/^\+/, "");
    const dialWithPlus = row.dialCode.toLowerCase();
    return (
      name.includes(q) ||
      iso.includes(q) ||
      dial.includes(q.replace(/^\+/, "")) ||
      dialWithPlus.includes(q)
    );
  });
}
