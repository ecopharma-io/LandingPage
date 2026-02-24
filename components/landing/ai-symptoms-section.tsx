"use client";

import { Brain, TrendingUp, Heart, RefreshCw, Bot, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: Brain,
    title: "Instant Patient Guidance",
    description:
      "Patients describe symptoms and get instant, AI-powered suggestions for OTC products from your catalog.",
  },
  {
    icon: TrendingUp,
    title: "Increase Average Order Value",
    description:
      "Smart cross-sell recommendations based on symptoms turn every visit into a bigger basket.",
  },
  {
    icon: Heart,
    title: "Build Patient Trust",
    description:
      "24/7 availability shows patients you care beyond store hours — strengthening loyalty.",
  },
  {
    icon: RefreshCw,
    title: "Drive Repeat Visits",
    description:
      "Personalized follow-ups and care reminders keep patients coming back to your pharmacy.",
  },
];

const chatMessages = [
  {
    role: "user" as const,
    text: "I've had a headache and runny nose for 2 days. What do you recommend?",
  },
  {
    role: "ai" as const,
    text: "Based on your symptoms, I'd recommend:",
    products: [
      { name: "Tylenol Extra Strength", price: "$8.99", tag: "Pain Relief" },
      { name: "Sudafed PE Congestion", price: "$7.49", tag: "Decongestant" },
    ],
    note: "If symptoms persist beyond 5 days, please consult your pharmacist.",
  },
];

export function AISymptomsSection() {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-24 lg:py-32">
      {/* Decorative blob */}
      <div
        className="blob-peach pointer-events-none absolute -right-32 top-1/2 h-[700px] w-[700px] -translate-y-1/2 opacity-30"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Text content */}
          <div>
            <AnimateOnScroll direction="blur">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
                <Brain className="size-3.5" />
                AI-Powered
              </span>
              <h2 className="mt-4 font-sans text-3xl font-bold text-gray-900 sm:text-4xl">
                Smart Symptom Checker That{" "}
                <span className="text-gradient-brand">Drives Sales</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-500">
                Give your patients instant, AI-powered health guidance — right
                from your online store. Every symptom check becomes a product
                recommendation, building trust and revenue simultaneously.
              </p>
            </AnimateOnScroll>

            {/* Benefits */}
            <div className="mt-10 space-y-6">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94] as const,
                  }}
                  className="flex gap-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-brand-200 bg-brand-50">
                    <benefit.icon className="size-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-gray-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Chat mockup */}
          <AnimateOnScroll direction="right" delay={0.2}>
            <div className="clean-card overflow-hidden rounded-2xl">
              {/* Chat header */}
              <div className="flex items-center gap-3 border-b border-gray-100 bg-brand-50 px-6 py-4">
                <div className="flex size-9 items-center justify-center rounded-full bg-brand-600">
                  <Bot className="size-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    AI Symptom Checker
                  </p>
                  <p className="text-xs text-gray-500">
                    Powered by EcoPharma AI
                  </p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-[11px] font-medium text-green-700">
                  <span className="size-1.5 rounded-full bg-green-500" />
                  Online
                </span>
              </div>

              {/* Chat body */}
              <div className="space-y-4 p-6">
                {/* User message */}
                <div className="flex items-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                    <User className="size-4 text-gray-500" />
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-gray-100 px-4 py-3">
                    <p className="text-sm text-gray-700">
                      {chatMessages[0].text}
                    </p>
                  </div>
                </div>

                {/* AI response */}
                <div className="flex items-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-100">
                    <Bot className="size-4 text-brand-600" />
                  </div>
                  <div className="max-w-[85%] space-y-3">
                    <div className="rounded-2xl rounded-tl-md bg-brand-50 px-4 py-3">
                      <p className="text-sm text-gray-700">
                        {chatMessages[1].text}
                      </p>
                    </div>

                    {/* Product cards */}
                    {chatMessages[1].products?.map((product) => (
                      <div
                        key={product.name}
                        className="flex items-center justify-between rounded-xl border border-brand-100 bg-white px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {product.name}
                          </p>
                          <span className="mt-0.5 inline-block rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-700">
                            {product.tag}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">
                            {product.price}
                          </p>
                          <button className="mt-0.5 text-[11px] font-semibold text-brand-600 hover:text-brand-700">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Note */}
                    <div className="rounded-xl bg-amber-50 px-4 py-2.5">
                      <p className="text-xs text-amber-700">
                        {chatMessages[1].note}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
