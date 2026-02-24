"use client";

import Image from "next/image";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

export function PlatformPreview() {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-24 lg:py-32">
      {/* Warm blob */}
      <div
        className="blob-peach pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-30"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <AnimateOnScroll direction="blur">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-sans text-3xl font-bold text-gray-900 sm:text-4xl">
              See What You&apos;re Getting
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              A powerful dashboard designed for pharmacy workflows — not generic
              e-commerce.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Browser Mockup */}
        <AnimateOnScroll direction="up" delay={0.2}>
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
              {/* Sheen overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
                }}
                aria-hidden="true"
              />

              {/* Browser top bar */}
              <div className="flex items-center gap-2 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-red-400" />
                  <div className="size-3 rounded-full bg-yellow-400" />
                  <div className="size-3 rounded-full bg-green-400" />
                </div>
                <div className="ml-4 flex-1 rounded-md bg-gray-200 px-3 py-1 text-xs text-gray-500">
                  app.ecopharma.com/dashboard
                </div>
              </div>

              {/* Dashboard screenshot */}
              <Image
                src="/dashboard-preview.png"
                alt="EcoPharma pharmacy dashboard showing revenue, orders, prescriptions, and inventory management"
                width={1920}
                height={900}
                sizes="(max-width: 768px) 100vw, 1200px"
                className="block w-full"
                priority={false}
              />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
