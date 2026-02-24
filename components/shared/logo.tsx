import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "light";
  className?: string;
}

export function Logo({ variant = "default", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label="EcoPharma — Home"
    >
      <Image
        src="/logo.png"
        alt="EcoPharma"
        width={500}
        height={500}
        className="w-36 sm:w-44"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(25%) sepia(69%) saturate(2187%) hue-rotate(215deg) brightness(93%) contrast(95%)",
        }}
        priority
      />
    </Link>
  );
}
