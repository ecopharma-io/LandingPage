"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Building2,
  ClipboardCheck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Loader2,
  CheckCircle2,
  Shield,
  Zap,
  Headphones,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  US_STATES,
  LOCATION_OPTIONS,
  ROLE_OPTIONS,
  PHARMACY_TYPE_OPTIONS,
} from "@/lib/form-options";
import { LIFETIME_DEAL } from "@/lib/pricing";

// ============================================
// Types
// ============================================

interface Step1Data {
  ownerName: string;
  email: string;
  phone: string;
  role: string;
}

interface Step2Data {
  pharmacyName: string;
  pharmacyType: string;
  npiNumber: string;
  state: string;
  locations: string;
  currentWebsite: string;
}

type FormErrors = Record<string, string | undefined>;

const initialStep1: Step1Data = {
  ownerName: "",
  email: "",
  phone: "",
  role: "",
};

const initialStep2: Step2Data = {
  pharmacyName: "",
  pharmacyType: "",
  npiNumber: "",
  state: "",
  locations: "",
  currentWebsite: "",
};

const STEPS = [
  { label: "About You", icon: User },
  { label: "Your Pharmacy", icon: Building2 },
  { label: "Review", icon: ClipboardCheck },
] as const;

const TRUST_SIGNALS = [
  { icon: Shield, text: "60-day money-back guarantee" },
  { icon: Lock, text: "256-bit SSL encryption" },
  { icon: Headphones, text: "Dedicated onboarding support" },
];

const TOP_FEATURES = [
  "Unlimited pharmacy locations",
  "Full e-commerce storefront",
  "Prescription management with OCR",
  "HIPAA-compliant infrastructure",
  "Telehealth consultations",
  "All future features — forever",
];

// ============================================
// Step Indicator
// ============================================

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-3">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;

        return (
          <div key={step.label} className="flex items-center gap-3">
            {i > 0 && (
              <div
                className={`h-px w-8 transition-colors duration-300 sm:w-12 ${
                  isCompleted ? "bg-brand-500" : "bg-gray-200"
                }`}
              />
            )}
            <div className="flex items-center gap-2">
              <div
                className={`flex size-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/25"
                    : isCompleted
                      ? "bg-brand-100 text-brand-700"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="size-4" />
                ) : (
                  <Icon className="size-4" />
                )}
              </div>
              <span
                className={`hidden text-sm font-medium sm:inline ${
                  isActive
                    ? "text-gray-900"
                    : isCompleted
                      ? "text-brand-600"
                      : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================
// Order Summary Sidebar
// ============================================

function OrderSidebar() {
  return (
    <div className="space-y-6">
      {/* Order Summary Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Order Summary
        </h3>

        <div className="mt-4 flex items-baseline justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">
              {LIFETIME_DEAL.name}
            </p>
            <p className="text-sm text-gray-500">One-time payment</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">
              ${LIFETIME_DEAL.price}
            </p>
            <p className="text-xs text-gray-400 line-through">
              ${LIFETIME_DEAL.originalMonthly}/mo
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-center">
          <span className="text-sm font-semibold text-brand-700">
            Save {LIFETIME_DEAL.savingsPercent}% vs monthly
          </span>
        </div>
      </div>

      {/* What's Included */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <Zap className="size-4 text-brand-500" />
          What&apos;s Included
        </h3>
        <ul className="mt-4 space-y-3">
          {TOP_FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-500" />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-gray-400">
          + {LIFETIME_DEAL.features.length - TOP_FEATURES.length} more features
          included
        </p>
      </div>

      {/* Trust Signals */}
      <div className="space-y-3">
        {TRUST_SIGNALS.map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3"
          >
            <item.icon className="size-4 shrink-0 text-brand-500" />
            <span className="text-sm text-gray-600">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="size-4 fill-amber-400 text-amber-400"
            />
          ))}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 italic">
          &ldquo;EcoPharma transformed our business. We went from zero online
          presence to processing 50+ orders per week in less than a
          month.&rdquo;
        </p>
        <p className="mt-2 text-xs font-medium text-gray-500">
          &mdash; Independent pharmacy owner, Texas
        </p>
      </div>
    </div>
  );
}

// ============================================
// Checkout Page
// ============================================

export default function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [step1, setStep1] = useState<Step1Data>(initialStep1);
  const [step2, setStep2] = useState<Step2Data>(initialStep2);
  const [errors, setErrors] = useState<FormErrors>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const clearError = useCallback((key: string) => {
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  // ---- Validation ----
  function validateStep1(): FormErrors {
    const e: FormErrors = {};
    if (!step1.ownerName.trim()) e.ownerName = "Name is required.";
    if (!step1.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step1.email)) {
      e.email = "Please enter a valid email.";
    }
    if (!step1.role) e.role = "Role is required.";
    return e;
  }

  function validateStep2(): FormErrors {
    const e: FormErrors = {};
    if (!step2.pharmacyName.trim())
      e.pharmacyName = "Pharmacy name is required.";
    if (!step2.pharmacyType) e.pharmacyType = "Pharmacy type is required.";
    if (!step2.state) e.state = "State is required.";
    if (!step2.locations) e.locations = "Number of locations is required.";
    return e;
  }

  function handleNext() {
    if (currentStep === 0) {
      const errs = validateStep1();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
    }
    if (currentStep === 1) {
      const errs = validateStep2();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
    }
    setErrors({});
    setCurrentStep((s) => Math.min(s + 1, 2));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    if (!agreedToTerms) {
      toast.error("Please agree to the terms to continue.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...step1, ...step2 }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed.");
      }

      if (LIFETIME_DEAL.paymentLink && LIFETIME_DEAL.paymentLink !== "#") {
        window.location.href = LIFETIME_DEAL.paymentLink;
      } else {
        // Payment not yet configured — redirect to thank-you page
        router.push("/thank-you");
      }
    } catch (err) {
      setStatus("idle");
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  // ---- Field Error Helper ----
  function FieldError({ field }: { field: string }) {
    if (!errors[field]) return null;
    return (
      <p id={`co-${field}-error`} className="text-xs text-error">
        {errors[field]}
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Back link */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="size-3.5" />
        Back to homepage
      </Link>

      <div className="lg:grid lg:grid-cols-5 lg:gap-12 xl:gap-16">
        {/* ===== LEFT: Form (60%) ===== */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-sans text-2xl font-bold text-gray-900 sm:text-3xl">
              Claim Lifetime Access
            </h1>
            <p className="mt-2 text-gray-500">
              Complete these details before proceeding to secure payment.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <StepIndicator currentStep={currentStep} />
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            {/* ======= STEP 1: About You ======= */}
            {currentStep === 0 && (
              <div className="grid gap-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    About You
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Tell us about yourself so we can personalize your experience.
                  </p>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="co-ownerName">
                    Full Name <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="co-ownerName"
                    placeholder="e.g. John Smith"
                    value={step1.ownerName}
                    onChange={(e) => {
                      setStep1((p) => ({ ...p, ownerName: e.target.value }));
                      clearError("ownerName");
                    }}
                    aria-invalid={!!errors.ownerName}
                    aria-describedby={
                      errors.ownerName ? "co-ownerName-error" : undefined
                    }
                  />
                  <FieldError field="ownerName" />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="co-email">
                    Email <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="co-email"
                    type="email"
                    placeholder="you@pharmacy.com"
                    value={step1.email}
                    onChange={(e) => {
                      setStep1((p) => ({ ...p, email: e.target.value }));
                      clearError("email");
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "co-email-error" : undefined
                    }
                  />
                  <FieldError field="email" />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="co-phone">Phone (optional)</Label>
                  <Input
                    id="co-phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={step1.phone}
                    onChange={(e) =>
                      setStep1((p) => ({ ...p, phone: e.target.value }))
                    }
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="co-role">
                    Your Role <span className="text-error">*</span>
                  </Label>
                  <Select
                    value={step1.role}
                    onValueChange={(v) => {
                      setStep1((p) => ({ ...p, role: v }));
                      clearError("role");
                    }}
                  >
                    <SelectTrigger
                      id="co-role"
                      className="w-full"
                      aria-invalid={!!errors.role}
                    >
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_OPTIONS.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError field="role" />
                </div>

                <Button
                  onClick={handleNext}
                  className="mt-2 w-full bg-brand-600 text-white hover:bg-brand-700"
                  size="lg"
                >
                  Continue
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            )}

            {/* ======= STEP 2: About Your Pharmacy ======= */}
            {currentStep === 1 && (
              <div className="grid gap-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Your Pharmacy
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Help us understand your pharmacy so we can configure your
                    store perfectly.
                  </p>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="co-pharmacyName">
                    Pharmacy Name <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="co-pharmacyName"
                    placeholder="e.g. Main Street Pharmacy"
                    value={step2.pharmacyName}
                    onChange={(e) => {
                      setStep2((p) => ({
                        ...p,
                        pharmacyName: e.target.value,
                      }));
                      clearError("pharmacyName");
                    }}
                    aria-invalid={!!errors.pharmacyName}
                    aria-describedby={
                      errors.pharmacyName
                        ? "co-pharmacyName-error"
                        : undefined
                    }
                  />
                  <FieldError field="pharmacyName" />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="co-pharmacyType">
                    Pharmacy Type <span className="text-error">*</span>
                  </Label>
                  <Select
                    value={step2.pharmacyType}
                    onValueChange={(v) => {
                      setStep2((p) => ({ ...p, pharmacyType: v }));
                      clearError("pharmacyType");
                    }}
                  >
                    <SelectTrigger
                      id="co-pharmacyType"
                      className="w-full"
                      aria-invalid={!!errors.pharmacyType}
                    >
                      <SelectValue placeholder="Select pharmacy type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PHARMACY_TYPE_OPTIONS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError field="pharmacyType" />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="co-npi">NPI Number (optional)</Label>
                  <Input
                    id="co-npi"
                    placeholder="e.g. 1234567890"
                    value={step2.npiNumber}
                    onChange={(e) =>
                      setStep2((p) => ({ ...p, npiNumber: e.target.value }))
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="co-state">
                      State <span className="text-error">*</span>
                    </Label>
                    <Select
                      value={step2.state}
                      onValueChange={(v) => {
                        setStep2((p) => ({ ...p, state: v }));
                        clearError("state");
                      }}
                    >
                      <SelectTrigger
                        id="co-state"
                        className="w-full"
                        aria-invalid={!!errors.state}
                      >
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        {US_STATES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError field="state" />
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="co-locations">
                      Locations <span className="text-error">*</span>
                    </Label>
                    <Select
                      value={step2.locations}
                      onValueChange={(v) => {
                        setStep2((p) => ({ ...p, locations: v }));
                        clearError("locations");
                      }}
                    >
                      <SelectTrigger
                        id="co-locations"
                        className="w-full"
                        aria-invalid={!!errors.locations}
                      >
                        <SelectValue placeholder="Count" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATION_OPTIONS.map((l) => (
                          <SelectItem key={l} value={l}>
                            {l}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError field="locations" />
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="co-website">
                    Current Website (optional)
                  </Label>
                  <Input
                    id="co-website"
                    placeholder="e.g. www.mypharmacy.com"
                    value={step2.currentWebsite}
                    onChange={(e) =>
                      setStep2((p) => ({
                        ...p,
                        currentWebsite: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="mt-2 flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                    size="lg"
                  >
                    <ArrowLeft className="mr-2 size-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-brand-600 text-white hover:bg-brand-700"
                    size="lg"
                  >
                    Continue
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ======= STEP 3: Review & Continue to Payment ======= */}
            {currentStep === 2 && (
              <div className="grid gap-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Review & Pay
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Double-check your info, then proceed to secure payment.
                  </p>
                </div>

                {/* Summary */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    Your Information
                  </h4>
                  <div className="grid gap-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name</span>
                      <span className="font-medium text-gray-900">
                        {step1.ownerName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email</span>
                      <span className="font-medium text-gray-900">
                        {step1.email}
                      </span>
                    </div>
                    {step1.phone && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Phone</span>
                        <span className="font-medium text-gray-900">
                          {step1.phone}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Role</span>
                      <span className="font-medium text-gray-900">
                        {step1.role}
                      </span>
                    </div>
                  </div>

                  <hr className="my-4 border-gray-200" />

                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    Your Pharmacy
                  </h4>
                  <div className="grid gap-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Pharmacy</span>
                      <span className="font-medium text-gray-900">
                        {step2.pharmacyName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type</span>
                      <span className="font-medium text-gray-900">
                        {step2.pharmacyType}
                      </span>
                    </div>
                    {step2.npiNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">NPI</span>
                        <span className="font-medium text-gray-900">
                          {step2.npiNumber}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">State</span>
                      <span className="font-medium text-gray-900">
                        {step2.state}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Locations</span>
                      <span className="font-medium text-gray-900">
                        {step2.locations}
                      </span>
                    </div>
                    {step2.currentWebsite && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Website</span>
                        <span className="font-medium text-gray-900">
                          {step2.currentWebsite}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price summary */}
                <div className="rounded-xl border border-brand-200 bg-brand-50 p-5 text-center">
                  <p className="text-sm font-medium text-brand-700">
                    One-time payment
                  </p>
                  <p className="mt-1 text-4xl font-bold text-brand-900">
                    ${LIFETIME_DEAL.price}
                  </p>
                  <p className="mt-1 text-xs text-brand-600">
                    {LIFETIME_DEAL.guarantee}
                  </p>
                </div>

                {/* Terms checkbox */}
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 size-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-xs leading-relaxed text-gray-500">
                    I agree to the{" "}
                    <a
                      href="/terms"
                      target="_blank"
                      className="text-brand-600 underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      className="text-brand-600 underline"
                    >
                      Privacy Policy
                    </a>
                    . I understand this is a one-time payment of $
                    {LIFETIME_DEAL.price} for lifetime access.
                  </span>
                </label>

                {/* Early access notice */}
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                  <p className="text-sm font-medium text-amber-800">
                    Early Access Notice
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-amber-700">
                    The EcoPharma platform is currently under development and
                    not yet live. By purchasing now, you're securing your
                    lifetime access at the Founder's price. We'll notify you as
                    soon as the platform is ready to launch.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                    disabled={status === "loading"}
                    size="lg"
                  >
                    <ArrowLeft className="mr-2 size-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={status === "loading" || !agreedToTerms}
                    className="flex-1 bg-accent-500 text-white hover:bg-accent-600"
                    size="lg"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 size-4" />
                        Continue to Payment
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ===== RIGHT: Sidebar (40%) ===== */}
        <aside className="mt-10 lg:col-span-2 lg:mt-0">
          <div className="lg:sticky lg:top-8">
            <OrderSidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}
