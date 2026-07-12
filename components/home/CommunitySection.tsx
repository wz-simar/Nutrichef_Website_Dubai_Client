import React from "react";
import Image from "next/image";

const communityPosts = [
  {
    id: 1,
    handle: "@sultanfalasi",
    img: "https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2FRectangle-6495.webp&w=1200&q=100",
  },
  {
    id: 2,
    handle: "@khadija.chahmoud",
    img: "https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2FRectangle-6496.webp&w=1200&q=100",
  },
  {
    id: 3,
    handle: "@laurazaraa",
    img: "https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2Fimaghe-37.webp&w=1200&q=100",
  },
  {
    id: 4,
    handle: "@s_mozakzak",
    img: "https://calo.app/_next/image?url=https%3A%2F%2Fapi-blog.calo.app%2Fwp-content%2Fuploads%2F2025%2F10%2Fimaghe-7.webp&w=1200&q=100",
  },
];

export const CommunitySection = () => {
  const [featured, ...rest] = communityPosts;

  return (
    <section id="community" className="bg-surface py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            In good company
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            The people at our table
          </h2>
          <p className="mt-3 text-lg text-secondary-text">
            Founders, executives, athletes, and families across the Emirates —
            real members, real results.
          </p>
        </div>

        <div className="mt-14 grid min-h-0 grid-cols-1 gap-4 lg:min-h-[28rem] lg:grid-cols-12 lg:grid-rows-6 lg:gap-5">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-border-subtle bg-bg-light lg:col-span-7 lg:row-span-6 lg:min-h-0">
            <Image
              src={featured.img}
              alt={`Community post by ${featured.handle}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="font-heading text-xl font-semibold text-background sm:text-2xl">
                {featured.handle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-5 lg:row-span-6 lg:grid-cols-1 lg:grid-rows-3">
            {rest.map((post) => (
              <div
                key={post.id}
                className="group relative min-h-[160px] overflow-hidden rounded-2xl border border-border-subtle bg-bg-light lg:min-h-0"
              >
                <Image
                  src={post.img}
                  alt={`Community post by ${post.handle}`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 1024px) 33vw, 22vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 font-heading text-sm font-semibold text-background opacity-0 transition duration-300 group-hover:opacity-100 sm:text-base">
                  {post.handle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
