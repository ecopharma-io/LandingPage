"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";
import { COMPARISON_DATA, COMPARISON_COLUMNS } from "@/lib/comparison";
import type { ComparisonCell } from "@/lib/comparison";

function CellValue({ cell }: { cell: ComparisonCell }) {
  if (cell.value === "Built-in" || cell.value === "Purpose-built" || cell.value === "Yes") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
        <CheckCircle2 className="size-4 text-brand-500" />
        {cell.value}
      </span>
    );
  }

  if (cell.value === "Not available" || cell.value === "No") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
        <XCircle className="size-4 text-gray-300" />
        {cell.value}
      </span>
    );
  }

  return (
    <span
      className={`text-sm ${cell.isPositive ? "font-medium text-brand-700" : "text-text-muted"}`}
    >
      {cell.value}
    </span>
  );
}

export function ComparisonTable() {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-24 lg:py-32">
      {/* Warm blob */}
      <div
        className="blob-peach pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-20"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <AnimateOnScroll direction="blur">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-brand-600">
              Why EcoPharma
            </span>
            <h2 className="font-sans text-3xl font-bold text-gray-900 sm:text-4xl">
              How EcoPharma Stacks Up
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          }}
          className="mt-14"
        >
          <div className="clean-card overflow-hidden rounded-2xl shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr>
                    <th className="bg-brand-700 px-6 py-4 text-left text-sm font-semibold text-white">
                      Feature
                    </th>
                    {COMPARISON_COLUMNS.map((col, i) => (
                      <th
                        key={col}
                        className={`px-6 py-4 text-left text-sm font-semibold ${
                          i === 0
                            ? "bg-brand-600 text-white"
                            : "bg-brand-800 text-white"
                        }`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_DATA.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`transition-colors duration-200 hover:bg-brand-50/50 ${
                        i < COMPARISON_DATA.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {row.feature}
                      </td>
                      <td className="border-x border-brand-100 bg-brand-50 px-6 py-4">
                        <CellValue cell={row.ecopharma} />
                      </td>
                      <td className="px-6 py-4">
                        <CellValue cell={row.customBuild} />
                      </td>
                      <td className="px-6 py-4">
                        <CellValue cell={row.shopify} />
                      </td>
                      <td className="px-6 py-4">
                        <CellValue cell={row.competitors} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
