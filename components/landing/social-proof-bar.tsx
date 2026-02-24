"use client";

import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

const logos = [
  { name: "MedFlow", text: "MedFlow" },
  { name: "PharmaCare", text: "PharmaCare" },
  { name: "RxConnect", text: "RxConnect" },
  { name: "HealthBridge", text: "HealthBridge" },
  { name: "CurePoint", text: "CurePoint" },
  { name: "PillTrack", text: "PillTrack" },
  { name: "VitalRx", text: "VitalRx" },
  { name: "NovaMed", text: "NovaMed" },
];

function LogoItem({ name }: { name: string }) {
  return (
    <div className="flex shrink-0 items-center justify-center px-10 lg:px-14">
      <span className="whitespace-nowrap text-2xl font-bold tracking-tight text-gray-400 lg:text-3xl">
        {name}
      </span>
    </div>
  );
}

export function SocialProofBar() {
  return (
    <section className="relative z-20 bg-surface-2 py-14 lg:py-16">
      <AnimateOnScroll direction="blur">
        <p className="mb-10 text-center text-sm font-bold uppercase tracking-widest text-gray-900">
          Trusted by pharmacies everywhere
        </p>
      </AnimateOnScroll>

      {/* Marquee container */}
      <div className="relative mx-auto max-w-6xl overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface-2 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface-2 to-transparent" />

        {/* Scrolling track */}
        <div
          className="flex w-max"
          style={{ animation: "marquee 25s linear infinite" }}
        >
          {/* Render logos twice for seamless loop */}
          {[...logos, ...logos].map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} name={logo.text} />
          ))}
        </div>
      </div>
    </section>
  );
}
