"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLeadCapture } from "@/components/shared/lead-capture-provider";
import { LIFETIME_DEAL } from "@/lib/pricing";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const heroReveal = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function Hero() {
  const { openLeadModal } = useLeadCapture();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Perspective tilt: starts tilted, flattens to 0 as user scrolls
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [12, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);

  return (
    <section className="relative overflow-hidden bg-surface-2 py-24 lg:py-32">
      {/* Subtle background blobs */}
      <div
        className="blob-peach absolute -right-48 -top-48 h-[700px] w-[700px]"
        style={{ animation: "orb-float 20s ease-in-out infinite" }}
        aria-hidden="true"
      />
      <div
        className="blob-orange absolute -bottom-32 -left-32 h-[500px] w-[500px] opacity-60"
        style={{ animation: "orb-float-reverse 25s ease-in-out infinite" }}
        aria-hidden="true"
      />
      <div
        className="blob-peach absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 opacity-40"
        style={{ animation: "orb-float 30s ease-in-out infinite" }}
        aria-hidden="true"
      />

      {/* Text Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        {/* Badge */}
        <motion.div variants={heroReveal}>
          <Badge className="mb-6 border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-gray-900 shadow-sm">
            <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-brand-500" />
            {LIFETIME_DEAL.badge}
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={heroReveal}
          className="font-sans text-5xl font-bold leading-[1.05] tracking-tighter text-gray-900 sm:text-6xl md:text-8xl"
        >
          Your Pharmacy,{" "}
          <span className="text-gradient-hero">Online in 24 Hours</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={heroReveal}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500 md:text-xl"
        >
          The all-in-one e-commerce platform built for independent pharmacies.
          Prescription management, HIPAA compliance, and telehealth — ready to go.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={heroReveal}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-brand-600 px-10 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
            >
              <Link href="/checkout">Claim Lifetime Access</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-xl border-gray-200 bg-white px-10 text-base font-semibold text-gray-700 shadow-sm hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
              onClick={openLeadModal}
            >
              Join the Waitlist
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Dashboard Preview — 3D scroll container */}
      <div
        ref={containerRef}
        className="relative z-10 mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          style={{ rotateX, scale, opacity }}
          className="origin-bottom overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-[0_0_30px_rgba(59,130,246,0.15),0_0_70px_rgba(59,130,246,0.12),0_20px_80px_rgba(59,130,246,0.18)] ring-1 ring-blue-200/60"
        >
          <Image
            src="/dashboard-preview.png"
            alt="EcoPharma pharmacy dashboard showing revenue, orders, prescriptions, and inventory management"
            width={1920}
            height={900}
            sizes="(max-width: 768px) 100vw, 1200px"
            className="block w-full"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
