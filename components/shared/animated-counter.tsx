"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => {
    const num = Math.round(v);
    return `${prefix}${num.toLocaleString()}${suffix}`;
  });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, target, {
      duration,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [isInView, motionValue, target, duration]);

  // Update DOM directly to avoid re-renders on every animation frame
  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = v;
      }
    });
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {`${prefix}0${suffix}`}
    </span>
  );
}
