import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Checkout — Claim Lifetime Access",
  description: "Complete your details and claim lifetime access to EcoPharma for a one-time payment of $999.",
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Minimal header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="EcoPharma — Home">
            <Image
              src="/logo-cropped.png"
              alt="EcoPharma"
              width={600}
              height={150}
              className="h-8 w-auto"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(25%) sepia(69%) saturate(2187%) hue-rotate(215deg) brightness(93%) contrast(95%)",
              }}
            />
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <svg
              className="size-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            <span className="font-medium">Secure Checkout</span>
          </div>
        </div>
      </header>

      <div className="min-h-[calc(100vh-65px)] bg-surface-2">
        {children}
      </div>

      <Toaster position="bottom-right" richColors />
    </>
  );
}
