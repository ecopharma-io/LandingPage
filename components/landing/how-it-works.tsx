"use client";

import { Palette, Package, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
  time: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: Palette,
    title: "Sign Up & Brand Your Store",
    description:
      "Create your account, upload your logo, pick your colors, and choose a template.",
    time: "10 minutes",
  },
  {
    number: 2,
    icon: Package,
    title: "Add Your Products",
    description:
      "Import from our OTC catalog or add your own. Set up prescription refill workflows.",
    time: "15 minutes",
  },
  {
    number: 3,
    icon: Rocket,
    title: "Go Live & Start Selling",
    description:
      "Preview your store, hit publish, and start accepting orders. Share your link with customers. Done.",
    time: "5 minutes",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-24 lg:py-32">
      {/* Warm blob */}
      <div
        className="blob-peach pointer-events-none absolute -left-24 top-1/2 h-[600px] w-[600px] -translate-y-1/2 opacity-30"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <AnimateOnScroll direction="blur">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-brand-600">
              Quick Start
            </span>
            <h2 className="font-sans text-3xl font-bold text-gray-900 sm:text-4xl">
              Go Live in 3 Simple Steps
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Animated connecting line (desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute left-[15%] right-[15%] top-7 hidden h-[2px] origin-left bg-gradient-to-r from-transparent via-brand-300 to-transparent md:block"
            aria-hidden="true"
          />

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number badge */}
                <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white shadow-lg ring-4 ring-white">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mt-5 flex size-12 items-center justify-center rounded-full border border-brand-200 bg-brand-50">
                  <step.icon className="size-6 text-brand-600" />
                </div>

                {/* Content */}
                <h3 className="mt-4 font-sans text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-gray-500">
                  {step.description}
                </p>
                <span className="mt-3 inline-block rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
                  {step.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom callout */}
        <AnimateOnScroll direction="scale" delay={0.4}>
          <div className="mt-14 text-center">
            <div className="clean-card inline-flex items-center gap-2 rounded-full px-6 py-3 text-lg font-semibold text-brand-700">
              <Rocket className="size-5" />
              Average total setup time: 30 minutes
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
