"use client";

import Link from "next/link";
import { CheckCircle2, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";
import { LIFETIME_DEAL } from "@/lib/pricing";

export function PricingSection() {
  const spotsUsed = LIFETIME_DEAL.spotsTotal - LIFETIME_DEAL.spotsRemaining;
  const spotsPercent = (spotsUsed / LIFETIME_DEAL.spotsTotal) * 100;

  return (
    <section id="pricing" className="scroll-mt-20 relative overflow-hidden bg-surface-2 py-24 lg:py-32">
      {/* Warm blobs */}
      <div
        className="blob-peach pointer-events-none absolute -left-32 -top-32 h-[600px] w-[600px]"
        style={{ animation: "orb-float 25s ease-in-out infinite" }}
        aria-hidden="true"
      />
      <div
        className="blob-orange pointer-events-none absolute -bottom-24 -right-24 h-[500px] w-[500px] opacity-60"
        style={{ animation: "orb-float-reverse 20s ease-in-out infinite" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <AnimateOnScroll direction="blur">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-sans text-3xl font-bold text-gray-900 sm:text-4xl">
              Lock In{" "}
              <span className="text-gradient-hero">Lifetime Access</span> —
              Before It&apos;s Gone
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              One payment. No monthly fees. Ever. Join the pharmacies already
              signed up.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.9,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          }}
          whileHover={{ y: -8, scale: 1.01 }}
          className="mx-auto mt-16 max-w-lg"
        >
          <div className="clean-card rounded-2xl p-8 sm:p-10">
            {/* Badge */}
            <div className="text-center">
              <Badge className="border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
                <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-brand-500" />
                {LIFETIME_DEAL.badge}
              </Badge>
            </div>

            {/* Name */}
            <h3 className="mt-6 text-center font-sans text-2xl font-bold text-gray-900">
              {LIFETIME_DEAL.name}
            </h3>

            {/* Price */}
            <div className="mt-4 text-center">
              <span className="text-gradient-hero text-5xl font-bold sm:text-6xl">
                ${LIFETIME_DEAL.price}
              </span>
              <span className="ml-2 text-lg text-gray-500">one-time</span>
            </div>

            {/* Original price */}
            <div className="mt-2 text-center text-sm text-gray-500">
              <span className="line-through">
                ${LIFETIME_DEAL.originalMonthly}/mo ($
                {LIFETIME_DEAL.originalYearly.toLocaleString()}/yr)
              </span>
              <span className="ml-2 font-semibold text-brand-600">
                Save {LIFETIME_DEAL.savingsPercent}%
              </span>
            </div>

            {/* Spots remaining */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">
                  {LIFETIME_DEAL.spotsRemaining} of {LIFETIME_DEAL.spotsTotal}{" "}
                  spots left
                </span>
                <span className="text-gray-500">{Math.round(spotsPercent)}% claimed</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
                  style={{ width: `${spotsPercent}%` }}
                />
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  size="lg"
                  className="h-14 w-full rounded-xl bg-brand-600 text-lg font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  <Link href="/checkout">{LIFETIME_DEAL.ctaText}</Link>
                </Button>
              </motion.div>
            </div>

            {/* Features */}
            <ul className="mt-8 space-y-3">
              {LIFETIME_DEAL.features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.03, duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-500" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Guarantee + Timer */}
        <AnimateOnScroll direction="blur" delay={0.2}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-gray-500">
              <Shield className="size-5 text-brand-500" />
              <span className="text-sm font-medium">
                {LIFETIME_DEAL.guarantee}
              </span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
