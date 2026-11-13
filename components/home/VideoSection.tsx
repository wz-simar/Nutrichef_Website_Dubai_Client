import React from "react";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { BRAND_YOUTUBE } from "@/lib/site-config";

export function VideoSection() {
  return (
    <section
      id="video"
      className="border-b border-border-subtle bg-bg-light py-16 sm:py-20 lg:py-24"
      aria-labelledby="home-video-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            Watch
          </p>
          <h2
            id="home-video-heading"
            className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            See how NutriChef delivers healthy food in Dubai
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary-text sm:text-lg">
            A quick look at private-chef nutrition, fresh daily delivery, and
            how meal plans work day to day.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <YouTubeEmbed
            videoId={BRAND_YOUTUBE.id}
            query={BRAND_YOUTUBE.query}
            title={BRAND_YOUTUBE.iframeTitle}
          />
        </div>
      </div>
    </section>
  );
}
