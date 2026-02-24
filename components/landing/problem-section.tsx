"use client";

import { ShoppingCart, DollarSign, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

const problems = [
  {
    icon: ShoppingCart,
    title: "Losing Customers to Amazon & Chains",
    description:
      "Your loyal customers are ordering from CVS.com and Amazon Pharmacy because they can't order from you online. Every day without a digital presence is lost revenue.",
  },
  {
    icon: DollarSign,
    title: "$50K+ Custom Builds Are Out of Reach",
    description:
      "Custom e-commerce solutions cost $20,000–$50,000 and take months to build. Most independent pharmacies can't justify that investment.",
  },
  {
    icon: ShieldAlert,
    title: "Compliance Is a Minefield",
    description:
      "HIPAA, DEA regulations, state pharmacy board rules — building a compliant online pharmacy platform from scratch is complex and risky.",
  },
];

export function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-24 lg:py-32">
      {/* Warm blob */}
      <div
        className="blob-peach pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] opacity-40"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll direction="blur">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-brand-600">
              The Challenge
            </span>
            <h2 className="font-sans text-3xl font-bold text-gray-900 sm:text-4xl">
              The Problem Independent Pharmacies Face
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              While chains and Amazon go digital, 19,000+ independent pharmacies
              are being left behind.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              whileHover={{ y: -4 }}
              className="clean-card relative rounded-2xl p-8 transition-shadow hover:shadow-md"
            >
              <div className="absolute left-0 right-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-brand-400 via-brand-600 to-brand-400" />

              <div className="flex size-12 items-center justify-center rounded-full border border-brand-200 bg-brand-50">
                <problem.icon className="size-6 text-brand-600" />
              </div>
              <h3 className="mt-5 font-sans text-xl font-semibold text-gray-900">
                {problem.title}
              </h3>
              <p className="mt-3 leading-relaxed text-gray-500">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
