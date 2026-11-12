import React from "react";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { video } from "@/content/healthy-food-delivery-dubai";

export function VideoSection() {
  return (
    <section
      id="video"
      className="border-b border-border-subtle bg-bg-light py-16 sm:py-20 lg:py-24"
      aria-labelledby="healthy-food-delivery-video-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-secondary-text">
            {video.eyebrow}
          </p>
          <h2
            id="healthy-food-delivery-video-heading"
            className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            {video.heading}
          </h2>
          {video.subheading ? (
            <p className="mt-4 text-base leading-relaxed text-secondary-text sm:text-lg">
              {video.subheading}
            </p>
          ) : null}
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <YouTubeEmbed
            videoId={video.youtubeId}
            query={video.youtubeQuery}
            title={video.iframeTitle}
          />
        </div>
      </div>
    </section>
  );
}
