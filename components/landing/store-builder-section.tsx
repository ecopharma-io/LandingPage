"use client";

import { useState, useCallback, type DragEvent } from "react";
import {
  MousePointerClick,
  Layers,
  Palette,
  Zap,
  GripVertical,
  Image as ImageIcon,
  Type,
  ShoppingBag,
  Star,
  Move,
  X,
  MessageSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: MousePointerClick,
    title: "Zero Code Required",
    description:
      "Simply drag, drop, and customize. Build your entire pharmacy storefront without writing a single line of code.",
  },
  {
    icon: Layers,
    title: "Pre-Built Pharmacy Blocks",
    description:
      "Product grids, prescription uploads, refill widgets, and more — ready-made blocks designed for pharmacies.",
  },
  {
    icon: Palette,
    title: "Your Brand, Your Way",
    description:
      "Customize colors, fonts, and layouts to match your pharmacy's brand. Make it yours in minutes.",
  },
  {
    icon: Zap,
    title: "Live Preview — Instant Results",
    description:
      "See every change in real time. What you see is exactly what your patients get.",
  },
];

type WidgetType = "hero" | "products" | "text" | "reviews" | "testimonial";

interface Widget {
  id: WidgetType;
  icon: LucideIcon;
  label: string;
}

const sidebarWidgets: Widget[] = [
  { id: "hero", icon: ImageIcon, label: "Hero Banner" },
  { id: "products", icon: ShoppingBag, label: "Product Grid" },
  { id: "text", icon: Type, label: "Text Block" },
  { id: "reviews", icon: Star, label: "Reviews" },
  { id: "testimonial", icon: MessageSquare, label: "Testimonial" },
];

function CanvasWidget({ type, onRemove }: { type: WidgetType; onRemove: () => void }) {
  const widget = sidebarWidgets.find((w) => w.id === type)!;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-lg border-2 border-dashed border-brand-300 bg-brand-50/50 p-3"
    >
      {/* Label + remove */}
      <div className="absolute -top-2.5 left-3 flex items-center gap-1 rounded-md bg-brand-600 px-2 py-0.5">
        <Move className="size-2.5 text-white" />
        <span className="text-[9px] font-semibold text-white">{widget.label}</span>
      </div>
      <button
        onClick={onRemove}
        className="absolute -right-1.5 -top-1.5 hidden size-5 items-center justify-center rounded-full bg-red-500 text-white shadow-sm group-hover:flex"
        aria-label={`Remove ${widget.label}`}
      >
        <X className="size-3" />
      </button>

      {/* Widget content preview */}
      <div className="mt-2">
        {type === "hero" && (
          <div className="rounded-md bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-5 text-center">
            <p className="text-xs font-bold text-white">Welcome to Main Street Pharmacy</p>
            <p className="mt-1 text-[10px] text-white/70">Your health, delivered to your door</p>
          </div>
        )}
        {type === "products" && (
          <div className="rounded-md border border-gray-200 bg-white p-2.5">
            <p className="mb-2 text-[10px] font-semibold text-gray-700">Featured Products</p>
            <div className="grid grid-cols-3 gap-1.5">
              {["Vitamin D3", "First Aid Kit", "Allergy Relief"].map((name) => (
                <div key={name} className="rounded border border-gray-100 bg-gray-50 p-1.5 text-center">
                  <div className="mx-auto mb-1 flex size-6 items-center justify-center rounded bg-brand-100">
                    <ShoppingBag className="size-3 text-brand-600" />
                  </div>
                  <p className="text-[8px] font-medium text-gray-700">{name}</p>
                  <p className="text-[7px] text-gray-400">$12.99</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {type === "text" && (
          <div className="rounded-md border border-gray-200 bg-white p-3">
            <div className="h-2 w-3/4 rounded bg-gray-200" />
            <div className="mt-2 h-1.5 w-full rounded bg-gray-100" />
            <div className="mt-1 h-1.5 w-5/6 rounded bg-gray-100" />
            <div className="mt-1 h-1.5 w-4/6 rounded bg-gray-100" />
          </div>
        )}
        {type === "reviews" && (
          <div className="rounded-md border border-gray-200 bg-white p-2.5">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="size-3 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1 text-[9px] font-medium text-gray-500">4.9 (128)</span>
            </div>
            <p className="mt-1.5 text-[9px] italic text-gray-500">
              &quot;Best pharmacy experience I&apos;ve ever had online!&quot;
            </p>
            <p className="mt-1 text-[8px] font-medium text-gray-400">— Sarah M.</p>
          </div>
        )}
        {type === "testimonial" && (
          <div className="rounded-md border border-gray-200 bg-white p-2.5">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-brand-100 text-[8px] font-bold text-brand-600">
                JD
              </div>
              <div>
                <p className="text-[9px] font-semibold text-gray-700">Dr. James Davis</p>
                <p className="text-[8px] text-gray-400">Pharmacist, 15 years</p>
              </div>
            </div>
            <p className="mt-2 text-[9px] italic text-gray-500">
              &quot;Set up my store in under an hour. Patients love the online ordering.&quot;
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function StoreBuilderSection() {
  const [canvasWidgets, setCanvasWidgets] = useState<WidgetType[]>(["hero"]);
  const [dragOver, setDragOver] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const addWidget = useCallback((widgetId: WidgetType) => {
    setCanvasWidgets((prev) => [...prev, widgetId]);
    setLastAdded(widgetId);
    setTimeout(() => setLastAdded(null), 600);
  }, []);

  const handleDragStart = useCallback((e: DragEvent, widgetId: WidgetType) => {
    e.dataTransfer.setData("widget", widgetId);
    e.dataTransfer.effectAllowed = "copy";
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const widgetId = e.dataTransfer.getData("widget") as WidgetType;
    if (widgetId) {
      addWidget(widgetId);
    }
  }, [addWidget]);

  const removeWidget = useCallback((index: number) => {
    setCanvasWidgets((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <section className="relative overflow-hidden bg-surface-2 py-24 lg:py-32">
      {/* Decorative blob */}
      <div
        className="blob-orange pointer-events-none absolute -left-32 top-1/2 h-[700px] w-[700px] -translate-y-1/2 opacity-20"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Interactive builder mockup */}
          <AnimateOnScroll direction="left" delay={0.2}>
            <div className="clean-card overflow-hidden rounded-2xl">
              {/* Builder toolbar */}
              <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-400" />
                  <div className="size-3 rounded-full bg-yellow-400" />
                  <div className="size-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-medium text-gray-400">
                  Store Builder
                </span>
                <div className="flex items-center gap-1.5 rounded-md bg-brand-50 px-2.5 py-1">
                  <span className="size-1.5 rounded-full bg-green-500" />
                  <span className="text-[10px] font-medium text-brand-700">
                    Auto-saved
                  </span>
                </div>
              </div>

              <div className="flex">
                {/* Sidebar — draggable widgets */}
                <div className="w-[130px] shrink-0 border-r border-gray-100 bg-gray-50/50 p-3">
                  <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    <span className="hidden sm:inline">Widgets</span>
                    <span className="sm:hidden">Tap to add</span>
                  </p>
                  <div className="space-y-2">
                    {sidebarWidgets.map((widget, i) => (
                      <motion.div
                        key={widget.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.08, duration: 0.3 }}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(
                            e as unknown as DragEvent,
                            widget.id
                          )
                        }
                        onClick={() => addWidget(widget.id)}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border bg-white px-2.5 py-2 text-[11px] font-medium shadow-sm transition-all sm:cursor-grab active:sm:cursor-grabbing ${
                          lastAdded === widget.id
                            ? "border-brand-400 text-brand-700 ring-1 ring-brand-300"
                            : "border-gray-200 text-gray-600"
                        }`}
                      >
                        <GripVertical className="hidden size-3 text-gray-300 sm:block" />
                        <widget.icon className="size-3.5 text-gray-400" />
                        {widget.label}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Canvas — drop zone */}
                <div
                  className={`flex-1 p-4 transition-colors duration-200 ${
                    dragOver ? "bg-brand-50/60" : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e as unknown as DragEvent)}
                >
                  {/* Placed widgets */}
                  <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                      {canvasWidgets.map((type, index) => (
                        <CanvasWidget
                          key={`${type}-${index}`}
                          type={type}
                          onRemove={() => removeWidget(index)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Drop zone hint */}
                  <motion.div
                    animate={{
                      borderColor: dragOver ? "#93c5fd" : "#d1d5db",
                      backgroundColor: dragOver
                        ? "rgba(219,234,254,0.5)"
                        : "rgba(249,250,251,1)",
                    }}
                    className="mt-3 flex items-center justify-center gap-2 rounded-lg border-2 border-dashed px-3 py-4"
                  >
                    <GripVertical className="size-3 text-gray-300" />
                    <span className="text-[10px] text-gray-400">
                      {dragOver
                        ? "Release to drop"
                        : <>
                            <span className="hidden sm:inline">Drag a widget here</span>
                            <span className="sm:hidden">Tap a widget to add it</span>
                          </>
                      }
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right — Text content */}
          <div>
            <AnimateOnScroll direction="blur">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
                <MousePointerClick className="size-3.5" />
                Drag &amp; Drop Builder
              </span>
              <h2 className="mt-4 font-sans text-3xl font-bold text-gray-900 sm:text-4xl">
                Build Your Store{" "}
                <span className="text-gradient-brand">
                  Without Writing Code
                </span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-500">
                You don&apos;t need a developer or a design team. Our visual
                drag-and-drop builder lets any pharmacy owner create a
                professional online store in minutes — not months.
              </p>
            </AnimateOnScroll>

            {/* Benefits */}
            <div className="mt-10 space-y-6">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 20 }}
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
        </div>
      </div>
    </section>
  );
}
