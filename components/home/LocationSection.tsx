import { GoogleMapsEmbed } from "@/components/GoogleMapsEmbed";
import { CONTACT } from "@/lib/site-config";

export function LocationSection() {
  return (
    <section className="border-t border-border-subtle bg-surface py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            Find us
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            Serving Dubai &amp; the UAE
          </h2>
          <p className="mt-3 text-lg text-secondary-text">{CONTACT.address}</p>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-border-subtle shadow-sm">
          <GoogleMapsEmbed />
        </div>
      </div>
    </section>
  );
}
