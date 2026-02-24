"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale" | "blur";

interface AnimateOnScrollProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

function getInitial(direction: Direction): Record<string, number | string> {
  switch (direction) {
    case "up":
      return { opacity: 0, y: 30 };
    case "down":
      return { opacity: 0, y: -30 };
    case "left":
      return { opacity: 0, x: -30 };
    case "right":
      return { opacity: 0, x: 30 };
    case "scale":
      return { opacity: 0, scale: 0.95 };
    case "blur":
      return { opacity: 0, y: 20 };
    case "fade":
    default:
      return { opacity: 0 };
  }
}

function getAnimate(direction: Direction): Record<string, number | string> {
  switch (direction) {
    case "up":
    case "down":
      return { opacity: 1, y: 0 };
    case "left":
    case "right":
      return { opacity: 1, x: 0 };
    case "scale":
      return { opacity: 1, scale: 1 };
    case "blur":
      return { opacity: 1, y: 0 };
    case "fade":
    default:
      return { opacity: 1 };
  }
}

export function AnimateOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  className,
}: AnimateOnScrollProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={getInitial(direction)}
      whileInView={getAnimate(direction)}
      viewport={{ once, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
