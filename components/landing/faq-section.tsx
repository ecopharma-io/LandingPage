"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";
import { FAQ_ITEMS } from "@/lib/faq";

export function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-20 relative overflow-hidden bg-surface-2 py-24 lg:py-32">
      {/* Vertical gradient accent strip on left */}
      <div
        className="pointer-events-none absolute bottom-0 left-8 top-0 hidden w-px lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent 10%, rgba(59, 130, 246, 0.3) 50%, transparent 90%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <AnimateOnScroll direction="blur">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-brand-600">
              Common Questions
            </span>
            <h2 className="font-sans text-3xl font-bold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Accordion */}
        <div className="mx-auto mt-14 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="rounded-lg border border-gray-200 bg-white px-6 shadow-sm transition-all duration-200 data-[state=open]:ring-1 data-[state=open]:ring-brand-300/40"
                >
                  <AccordionTrigger className="text-left font-sans text-base font-medium text-gray-900 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-gray-500">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
