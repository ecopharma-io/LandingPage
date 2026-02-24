"use client";

import {
  Store,
  Pill,
  ShieldCheck,
  Video,
  Truck,
  BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";
import { FEATURES } from "@/lib/features";

const iconMap: Record<string, LucideIcon> = {
  Store,
  Pill,
  ShieldCheck,
  Video,
  Truck,
  BarChart3,
};

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 relative overflow-hidden bg-surface-2 py-24 lg:py-32">
      {/* Warm blob */}
      <div
        className="blob-peach pointer-events-none absolute -top-24 left-1/2 h-[600px] w-[600px] -translate-x-1/2 opacity-30"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll direction="blur">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
              Platform Modules
            </span>
            <h2 className="font-sans text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything Your Pharmacy Needs to{" "}
              <span className="text-gradient-brand">Compete Online</span>
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Six powerful modules. One platform. Ready in 24 hours.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
              >
                <div className="clean-card group relative h-full overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative z-10">
                    <div className="flex size-12 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 transition-all duration-300 group-hover:border-brand-300 group-hover:bg-brand-100">
                      {Icon && <Icon className="size-6 text-brand-600" />}
                    </div>
                    <h3 className="mt-5 font-sans text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
