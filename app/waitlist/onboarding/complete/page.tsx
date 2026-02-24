import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Mail,
  Clock,
  Headphones,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/lib/constants";
import { LIFETIME_DEAL } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Preferences Saved — EcoPharma",
  description:
    "Your store preferences are saved. We'll have everything ready when your spot opens.",
  robots: { index: false, follow: false },
};

const nextSteps = [
  {
    icon: Mail,
    title: "Check your inbox",
    description:
      "We've sent a confirmation email with a summary of your store preferences.",
  },
  {
    icon: Clock,
    title: "We'll prepare your store",
    description:
      "When your spot opens, your store will be pre-configured with the template, colors, and services you chose.",
  },
  {
    icon: Headphones,
    title: "Personalized walkthrough",
    description:
      "A member of our team will reach out to help you finalize everything and go live.",
  },
];

export default function WaitlistOnboardingCompletePage() {
  return (
    <div className="min-h-screen bg-surface-2">
      {/* Minimal header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
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
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-12 xl:gap-16">
          {/* ===== LEFT: Main Content (60%) ===== */}
          <div className="lg:col-span-3">
            {/* Success Icon + Heading */}
            <div className="mb-10">
              <div className="flex size-16 items-center justify-center rounded-full bg-brand-50">
                <CheckCircle2 className="size-8 text-brand-600" />
              </div>

              <h1 className="mt-6 font-sans text-3xl font-bold text-gray-900 sm:text-4xl">
                Your preferences are saved!
              </h1>
              <p className="mt-3 text-lg text-gray-500">
                We&apos;ll use your choices to build your store when your spot
                opens. Here&apos;s what happens next.
              </p>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              {nextSteps.map((step, i) => (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                    <span className="text-sm font-bold text-brand-600">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <step.icon className="size-4 text-brand-500" />
                      <h3 className="font-semibold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-200"
              >
                <Link href="/">
                  Back to Homepage
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* ===== RIGHT: Sidebar (40%) ===== */}
          <aside className="mt-10 lg:col-span-2 lg:mt-0">
            <div className="space-y-6 lg:sticky lg:top-8">
              {/* Upsell Card */}
              <div className="rounded-2xl border border-accent-200 bg-accent-50 p-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-accent-600" />
                  <h3 className="text-sm font-semibold text-accent-900">
                    Don&apos;t want to wait?
                  </h3>
                </div>
                <p className="mt-2 text-sm text-accent-700">
                  Skip the waitlist and get lifetime access to EcoPharma for a
                  one-time payment of ${LIFETIME_DEAL.price}. No monthly fees,
                  ever.
                </p>
                <Button
                  asChild
                  className="mt-4 w-full bg-accent-500 text-white hover:bg-accent-600"
                >
                  <Link href="/checkout">
                    Claim Lifetime Access
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>

              {/* Contact Card */}
              <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
                <h3 className="text-sm font-semibold text-brand-900">
                  Questions? We&apos;re here to help.
                </h3>
                <p className="mt-2 text-sm text-brand-700">
                  Email us at{" "}
                  <a
                    href="mailto:sales@ecopharma.io"
                    className="font-medium underline"
                  >
                    sales@ecopharma.io
                  </a>{" "}
                  and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              {/* Follow Us Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900">
                  Follow us for updates
                </h3>
                <div className="mt-4 space-y-3">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3 text-sm text-gray-600 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                    >
                      <span className="font-medium">{link.label}</span>
                      <ExternalLink className="size-3.5 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
