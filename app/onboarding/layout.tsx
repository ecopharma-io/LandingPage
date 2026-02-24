import Link from "next/link";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";

export default function OnboardingLayout({
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
          <span className="text-xs font-medium text-gray-400">
            Account Setup
          </span>
        </div>
      </header>

      <div className="min-h-[calc(100vh-65px)] bg-surface-2">
        {children}
      </div>

      <Toaster position="bottom-right" richColors />
    </>
  );
}
