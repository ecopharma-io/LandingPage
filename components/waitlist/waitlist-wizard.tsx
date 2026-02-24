"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Store,
  Settings,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Check,
  CheckCircle2,
  Clock,
  Headphones,
  Lightbulb,
  Mail,
  Package,
  Truck,
  Video,
  FlaskConical,
  Syringe,
  HeartPulse,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SERVICES_OPTIONS,
  TEMPLATE_OPTIONS,
  COLOR_SWATCH_OPTIONS,
} from "@/lib/form-options";

// ============================================
// Types
// ============================================

interface Step1Data {
  email: string;
  storeName: string;
  preferredDomain: string;
  tagline: string;
  primaryColor: string;
  template: string;
}

interface Step2Data {
  servicesOffered: string[];
  operatingHours: string;
  specialNotes: string;
}

type FormErrors = Record<string, string | undefined>;

const STEPS = [
  { label: "Your Store", icon: Store },
  { label: "Services", icon: Settings },
] as const;

const SERVICE_ICONS: Record<string, typeof Package> = {
  "Prescription Pickup": Package,
  "Local Delivery": Truck,
  Shipping: Globe,
  Telehealth: Video,
  Compounding: FlaskConical,
  Immunizations: Syringe,
  "Health Screenings": HeartPulse,
};

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
// Progress Sidebar
// ============================================

function ProgressSidebar({ currentStep }: { currentStep: number }) {
  const progress = Math.round(((currentStep + 1) / STEPS.length) * 100);

  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Setup Progress
        </h3>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <span className="font-semibold text-brand-600">{progress}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {STEPS.map((step, i) => {
            const isCompleted = i < currentStep;
            const isActive = i === currentStep;
            return (
              <div key={step.label} className="flex items-center gap-3">
                <div
                  className={`flex size-6 items-center justify-center rounded-full text-xs ${
                    isCompleted
                      ? "bg-brand-100 text-brand-600"
                      : isActive
                        ? "bg-brand-600 text-white"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="size-3.5" />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    isCompleted
                      ? "text-brand-600 line-through"
                      : isActive
                        ? "font-medium text-gray-900"
                        : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <Lightbulb className="size-4 text-brand-500" />
          Quick Tips
        </h3>
        <ul className="mt-4 space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-brand-400" />
            We&apos;ll pre-configure your store based on these preferences.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-brand-400" />
            This takes about 2 minutes to complete.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-brand-400" />
            You can always change everything later from your dashboard.
          </li>
        </ul>
      </div>

      {/* Timeline Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900">
          What Happens Next
        </h3>
        <div className="mt-4 space-y-4">
          <div className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50">
              <CheckCircle2 className="size-4 text-brand-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Complete preferences
              </p>
              <p className="text-xs text-gray-500">
                Tell us how you want your store
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gray-50">
              <Clock className="size-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                We prepare your store
              </p>
              <p className="text-xs text-gray-500">
                Pre-configured when your spot opens
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gray-50">
              <Mail className="size-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                You get notified
              </p>
              <p className="text-xs text-gray-500">
                Email with login credentials
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gray-50">
              <Headphones className="size-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Onboarding call
              </p>
              <p className="text-xs text-gray-500">
                Personalized walkthrough
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Waitlist Wizard
// ============================================

export function WaitlistWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState(0);
  const [step1, setStep1] = useState<Step1Data>({
    email: searchParams.get("email") || "",
    storeName: "",
    preferredDomain: "",
    tagline: "",
    primaryColor: COLOR_SWATCH_OPTIONS[0].value,
    template: TEMPLATE_OPTIONS[0].id,
  });
  const [step2, setStep2] = useState<Step2Data>({
    servicesOffered: [],
    operatingHours: "",
    specialNotes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const clearError = useCallback((key: string) => {
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  function validateStep1(): FormErrors {
    const e: FormErrors = {};
    if (!step1.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step1.email)) {
      e.email = "Please enter a valid email.";
    }
    if (!step1.storeName.trim()) e.storeName = "Store name is required.";
    if (!step1.preferredDomain.trim())
      e.preferredDomain = "Domain is required.";
    return e;
  }

  function validateStep2(): FormErrors {
    const e: FormErrors = {};
    if (step2.servicesOffered.length === 0)
      e.servicesOffered = "Select at least one service.";
    if (!step2.operatingHours.trim())
      e.operatingHours = "Operating hours are required.";
    return e;
  }

  function handleNext() {
    const errs = validateStep1();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setErrors({});
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleService(service: string) {
    setStep2((prev) => ({
      ...prev,
      servicesOffered: prev.servicesOffered.includes(service)
        ? prev.servicesOffered.filter((s) => s !== service)
        : [...prev.servicesOffered, service],
    }));
    clearError("servicesOffered");
  }

  async function handleSubmit() {
    const errs = validateStep2();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist-onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...step1, ...step2 }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed.");
      }

      router.push("/waitlist/onboarding/complete");
    } catch (err) {
      setStatus("idle");
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  function FieldError({ field }: { field: string }) {
    if (!errors[field]) return null;
    return (
      <p id={`wl-${field}-error`} className="text-xs text-error">
        {errors[field]}
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="lg:grid lg:grid-cols-5 lg:gap-12 xl:gap-16">
        {/* ===== LEFT: Form (60%) ===== */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-sans text-2xl font-bold text-gray-900 sm:text-3xl">
              Set Up Your Store
            </h1>
            <p className="mt-2 text-gray-500">
              Tell us how you want your pharmacy to look online. We&apos;ll
              have everything ready when your spot opens.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <StepIndicator currentStep={currentStep} />
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            {/* ======= STEP 1: Your Store ======= */}
            {currentStep === 0 && (
              <div className="grid gap-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Your Store
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose how your online pharmacy will look and feel.
                  </p>
                </div>

                {/* Email */}
                <div className="grid gap-1.5">
                  <Label htmlFor="wl-email">
                    Email <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="wl-email"
                    type="email"
                    placeholder="you@example.com"
                    value={step1.email}
                    onChange={(e) => {
                      setStep1((p) => ({ ...p, email: e.target.value }));
                      clearError("email");
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "wl-email-error" : undefined
                    }
                  />
                  <FieldError field="email" />
                </div>

                {/* Store Name */}
                <div className="grid gap-1.5">
                  <Label htmlFor="wl-storeName">
                    Store Name <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="wl-storeName"
                    placeholder="e.g. Main Street Pharmacy"
                    value={step1.storeName}
                    onChange={(e) => {
                      setStep1((p) => ({ ...p, storeName: e.target.value }));
                      clearError("storeName");
                    }}
                    aria-invalid={!!errors.storeName}
                    aria-describedby={
                      errors.storeName ? "wl-storeName-error" : undefined
                    }
                  />
                  <FieldError field="storeName" />
                </div>

                {/* Domain */}
                <div className="grid gap-1.5">
                  <Label htmlFor="wl-domain">
                    Preferred Domain <span className="text-error">*</span>
                  </Label>
                  <div className="flex items-center gap-0">
                    <Input
                      id="wl-domain"
                      placeholder="mypharmacy"
                      value={step1.preferredDomain}
                      onChange={(e) => {
                        setStep1((p) => ({
                          ...p,
                          preferredDomain: e.target.value,
                        }));
                        clearError("preferredDomain");
                      }}
                      className="rounded-r-none"
                      aria-invalid={!!errors.preferredDomain}
                    />
                    <span className="inline-flex h-9 items-center rounded-r-md border border-l-0 border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">
                      .ecopharma.io
                    </span>
                  </div>
                  <FieldError field="preferredDomain" />
                </div>

                {/* Tagline */}
                <div className="grid gap-1.5">
                  <Label htmlFor="wl-tagline">Tagline (optional)</Label>
                  <Input
                    id="wl-tagline"
                    placeholder="e.g. Your neighborhood pharmacy, now online"
                    value={step1.tagline}
                    onChange={(e) =>
                      setStep1((p) => ({ ...p, tagline: e.target.value }))
                    }
                  />
                </div>

                {/* Color Picker */}
                <div className="grid gap-2">
                  <Label>Primary Color</Label>
                  <div className="flex flex-wrap gap-3">
                    {COLOR_SWATCH_OPTIONS.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() =>
                          setStep1((p) => ({
                            ...p,
                            primaryColor: color.value,
                          }))
                        }
                        className={`group relative flex size-11 items-center justify-center rounded-full border-2 transition-all ${
                          step1.primaryColor === color.value
                            ? "scale-110 border-gray-900 shadow-md"
                            : "border-transparent hover:scale-105 hover:shadow-sm"
                        }`}
                        style={{ backgroundColor: color.value }}
                        aria-label={color.label}
                      >
                        {step1.primaryColor === color.value && (
                          <Check className="size-4 text-white drop-shadow-sm" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Template Picker */}
                <div className="grid gap-2">
                  <Label>Template</Label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {TEMPLATE_OPTIONS.map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() =>
                          setStep1((p) => ({ ...p, template: tpl.id }))
                        }
                        className={`rounded-xl border-2 p-3 text-center transition-all ${
                          step1.template === tpl.id
                            ? "border-brand-500 bg-brand-50 shadow-sm ring-1 ring-brand-300"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                        }`}
                      >
                        <div
                          className="mx-auto mb-2 h-12 w-full rounded-md"
                          style={{ backgroundColor: tpl.color }}
                        />
                        <p className="text-xs font-medium text-gray-700">
                          {tpl.label}
                        </p>
                      </button>
                    ))}
                  </div>
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

            {/* ======= STEP 2: Services & Preferences ======= */}
            {currentStep === 1 && (
              <div className="grid gap-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Services & Preferences
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Let us know what services you plan to offer online.
                  </p>
                </div>

                {/* Services with Icons */}
                <div className="grid gap-2">
                  <Label>
                    Services Offered <span className="text-error">*</span>
                  </Label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {SERVICES_OPTIONS.map((service) => {
                      const isChecked =
                        step2.servicesOffered.includes(service);
                      const ServiceIcon = SERVICE_ICONS[service] || Package;
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                            isChecked
                              ? "border-brand-400 bg-brand-50 text-brand-700 shadow-sm"
                              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:shadow-sm"
                          }`}
                        >
                          <ServiceIcon
                            className={`size-4 shrink-0 ${
                              isChecked ? "text-brand-500" : "text-gray-400"
                            }`}
                          />
                          <span className="flex-1 font-medium">{service}</span>
                          <div
                            className={`flex size-5 shrink-0 items-center justify-center rounded border ${
                              isChecked
                                ? "border-brand-500 bg-brand-600"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isChecked && (
                              <Check className="size-3 text-white" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <FieldError field="servicesOffered" />
                </div>

                {/* Operating Hours */}
                <div className="grid gap-1.5">
                  <Label htmlFor="wl-hours">
                    Operating Hours <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="wl-hours"
                    placeholder="e.g. Mon-Fri 9am-6pm, Sat 10am-2pm"
                    value={step2.operatingHours}
                    onChange={(e) => {
                      setStep2((p) => ({
                        ...p,
                        operatingHours: e.target.value,
                      }));
                      clearError("operatingHours");
                    }}
                    aria-invalid={!!errors.operatingHours}
                  />
                  <FieldError field="operatingHours" />
                </div>

                {/* Special Notes */}
                <div className="grid gap-1.5">
                  <Label htmlFor="wl-notes">Special Notes (optional)</Label>
                  <textarea
                    id="wl-notes"
                    rows={3}
                    placeholder="Anything else you'd like us to know about your pharmacy..."
                    value={step2.specialNotes}
                    onChange={(e) =>
                      setStep2((p) => ({
                        ...p,
                        specialNotes: e.target.value,
                      }))
                    }
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>

                <div className="mt-2 flex gap-3">
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
                    disabled={status === "loading"}
                    className="flex-1 bg-accent-500 text-white hover:bg-accent-600"
                    size="lg"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Saving Preferences...
                      </>
                    ) : (
                      "Save Preferences"
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
            <ProgressSidebar currentStep={currentStep} />
          </div>
        </aside>
      </div>
    </div>
  );
}
