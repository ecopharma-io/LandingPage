"use client";

// PLACEHOLDER: Replace ALL testimonials with real ones when available

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";
import { TESTIMONIALS } from "@/lib/testimonials";

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-24 lg:py-32">
      {/* Warm blob */}
      <div
        className="blob-peach pointer-events-none absolute -right-24 top-0 h-[600px] w-[600px] opacity-30"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <AnimateOnScroll direction="blur">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-brand-600">
              Social Proof
            </span>
            <h2 className="font-sans text-3xl font-bold text-gray-900 sm:text-4xl">
              What Pharmacy Owners Are Saying
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Testimonial Cards */}
        {/* PLACEHOLDER: Replace with real testimonials */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              whileHover={{ y: -4 }}
              className="clean-card relative overflow-hidden rounded-2xl p-8"
            >
              {/* Gradient top accent line */}
              <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-brand-400 via-brand-600 to-brand-400" />

              {/* Decorative gradient quote watermark */}
              <div className="pointer-events-none absolute right-4 top-4" aria-hidden="true">
                <Quote className="size-16 text-brand-200/40" />
              </div>

              <div className="relative">
                <blockquote className="font-serif text-lg italic leading-relaxed text-gray-600">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6">
                  <p className="flex items-center gap-2 font-sans font-semibold text-gray-900">
                    <span className="inline-block size-2 rounded-full bg-brand-500" />
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {testimonial.title} · {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
