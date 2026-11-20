"use client";
import { useState } from "react";

/**
 * Silent garden walk-through. Nothing downloads until the visitor presses play,
 * and it never autoplays.
 */
export type VideoData = { title: string; src: string; poster?: string; portrait: boolean };

export default function GardenVideo({ video, className = "" }: { video: VideoData; className?: string }) {
  const gardenVideo = { ...video, label: video.title };
  const [playing, setPlaying] = useState(false);
  return (
    <figure className={`relative overflow-hidden rounded-[2rem] bg-aubergine ${className}`}>
      <div className={`relative ${video.portrait ? "aspect-[9/16]" : "aspect-video"}`}>
        {playing ? (
          <video
            src={gardenVideo.src}
            poster={gardenVideo.poster}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls
            aria-label={gardenVideo.label}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play video: ${gardenVideo.label}`}
          >
            {gardenVideo.poster ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={gardenVideo.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            ) : (
              <video src={`${gardenVideo.src}#t=0.5`} preload="metadata" muted playsInline aria-hidden className="absolute inset-0 h-full w-full object-cover" />
            )}
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-aubergine/70 via-transparent to-transparent" />
            <span aria-hidden className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory/90 text-plum shadow-lg transition-transform duration-500 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm text-ivory/90 pointer-events-none">
        {playing ? null : gardenVideo.label}
      </figcaption>
    </figure>
  );
}
