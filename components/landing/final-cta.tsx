"use client";

import Link from "next/link";
import { Shield, Clock, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";
import { useLeadCapture } from "@/components/shared/lead-capture-provider";

const trustItems = [
  { icon: Shield, text: "60-day money-back guarantee" },
  { icon: CreditCard, text: "No monthly fees" },
  { icon: Clock, text: "Cancel anytime" },
];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function FinalCTA() {
  const { openLeadModal } = useLeadCapture();

  return (
    <section className="relative overflow-hidden bg-surface-2 py-24 lg:py-32">
      {/* Warm blobs */}
      <div
        className="blob-peach pointer-events-none absolute -left-32 -top-32 h-[600px] w-[600px]"
        style={{ animation: "orb-float 20s ease-in-out infinite" }}
        aria-hidden="true"
      />
      <div
        className="blob-orange pointer-events-none absolute -bottom-24 -right-24 h-[500px] w-[500px] opacity-60"
        style={{ animation: "orb-float-reverse 25s ease-in-out infinite" }}
        aria-hidden="true"
      />
      <div
        className="blob-peach pointer-events-none absolute -right-16 top-1/2 h-[400px] w-[400px] opacity-40"
        style={{ animation: "orb-float 18s ease-in-out infinite 5s" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Stagger reveal */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Overline */}
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-brand-600"
          >
            Limited Spots
          </motion.span>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="font-sans text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl"
          >
            Don&apos;t Let Your Pharmacy{" "}
            <span className="text-gradient-hero">Fall Behind</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-500"
          >
            Join the pharmacies already building their online future. Lock in
            lifetime access before spots run out.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-brand-600 px-8 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
              >
                <Link href="/checkout">Claim Lifetime Access</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-xl border-gray-200 bg-white px-8 text-base font-semibold text-gray-700 shadow-sm hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                onClick={openLeadModal}
              >
                Join the Waitlist
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust line with icons */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-6"
          >
            {trustItems.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <item.icon className="size-4 text-brand-500" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
