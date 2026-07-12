import Image from "next/image";
import { NUTRITIONIST } from "@/lib/site-config";

export function NutritionistCredential() {
  return (
    <section className="border-t border-border-subtle bg-bg-light py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm lg:col-span-5 lg:mx-0 lg:max-w-none">
            <Image
              src={NUTRITIONIST.image}
              alt={`${NUTRITIONIST.name}, ${NUTRITIONIST.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="lg:col-span-7">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              Clinical rigour behind every plate
            </p>
            <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Your nutrition, signed off by a doctor of the craft
            </h2>
            <p className="mt-2 text-lg font-semibold text-primary">
              {NUTRITIONIST.name} · {NUTRITIONIST.title}
            </p>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-secondary-text sm:text-base">
              {NUTRITIONIST.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
