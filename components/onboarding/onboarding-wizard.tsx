"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Store,
  Settings,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Check,
  CheckCircle2,
  Clock,
  Headphones,
  Palette,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  US_STATES,
  SERVICES_OPTIONS,
  TEMPLATE_OPTIONS,
  COLOR_SWATCH_OPTIONS,
} from "@/lib/form-options";

// ============================================
// Types
// ============================================

interface Step1Data {
  businessLegalName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  deaNumber: string;
  stateLicenseNumber: string;
}

interface Step2Data {
  preferredDomain: string;
  storeName: string;
  tagline: string;
  primaryColor: string;
  template: string;
}

interface Step3Data {
  servicesOffered: string[];
  operatingHours: string;
  acceptedInsurance: string;
  specialNotes: string;
}

type FormErrors = Record<string, string | undefined>;

const initialStep1: Step1Data = {
  businessLegalName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  deaNumber: "",
  stateLicenseNumber: "",
};

const initialStep2: Step2Data = {
  preferredDomain: "",
  storeName: "",
  tagline: "",
  primaryColor: COLOR_SWATCH_OPTIONS[0].value,
  template: TEMPLATE_OPTIONS[0].id,
};

const initialStep3: Step3Data = {
  servicesOffered: [],
  operatingHours: "",
  acceptedInsurance: "",
  specialNotes: "",
};

const STEPS = [
  { label: "Business Details", icon: Building2 },
  { label: "Your Online Store", icon: Store },
  { label: "Services", icon: Settings },
] as const;

const SERVICE_ICONS: Record<string, typeof Package> = {
  "Prescription Pickup": Package,
  "Local Delivery": Truck,
  "Shipping": Globe,
  "Telehealth": Video,
  "Compounding": FlaskConical,
  "Immunizations": Syringe,
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
          <Palette className="size-4 text-brand-500" />
          Quick Tips
        </h3>
        <ul className="mt-4 space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-brand-400" />
            You can always update your store preferences later from your dashboard.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-brand-400" />
            Choose a domain that matches your pharmacy name for best SEO results.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-brand-400" />
            We&apos;ll build your store within 24-48 hours of setup completion.
          </li>
        </ul>
      </div>

      {/* Timeline Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900">What Happens Next</h3>
        <div className="mt-4 space-y-4">
          <div className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50">
              <CheckCircle2 className="size-4 text-brand-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Complete setup</p>
              <p className="text-xs text-gray-500">Fill in your store details</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gray-50">
              <Clock className="size-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">We build your store</p>
              <p className="text-xs text-gray-500">24-48 hours turnaround</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gray-50">
              <Headphones className="size-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Onboarding call</p>
              <p className="text-xs text-gray-500">Personalized walkthrough</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Onboarding Wizard
// ============================================

export function OnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [step1, setStep1] = useState<Step1Data>(initialStep1);
  const [step2, setStep2] = useState<Step2Data>(initialStep2);
  const [step3, setStep3] = useState<Step3Data>(initialStep3);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const clearError = useCallback((key: string) => {
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  function validateStep1(): FormErrors {
    const e: FormErrors = {};
    if (!step1.businessLegalName.trim())
      e.businessLegalName = "Business name is required.";
    if (!step1.address.trim()) e.address = "Address is required.";
    if (!step1.city.trim()) e.city = "City is required.";
    if (!step1.state) e.state = "State is required.";
    if (!step1.zip.trim()) e.zip = "ZIP code is required.";
    if (!step1.phone.trim()) e.phone = "Phone is required.";
    return e;
  }

  function validateStep2(): FormErrors {
    const e: FormErrors = {};
    if (!step2.preferredDomain.trim())
      e.preferredDomain = "Domain is required.";
    if (!step2.storeName.trim()) e.storeName = "Store name is required.";
    return e;
  }

  function validateStep3(): FormErrors {
    const e: FormErrors = {};
    if (step3.servicesOffered.length === 0)
      e.servicesOffered = "Select at least one service.";
    if (!step3.operatingHours.trim())
      e.operatingHours = "Operating hours are required.";
    return e;
  }

  function handleNext() {
    let errs: FormErrors = {};
    if (currentStep === 0) errs = validateStep1();
    if (currentStep === 1) errs = validateStep2();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
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

  function toggleService(service: string) {
    setStep3((prev) => ({
      ...prev,
      servicesOffered: prev.servicesOffered.includes(service)
        ? prev.servicesOffered.filter((s) => s !== service)
        : [...prev.servicesOffered, service],
    }));
    clearError("servicesOffered");
  }

  async function handleSubmit() {
    const errs = validateStep3();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...step1, ...step2, ...step3 }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed.");
      }

      router.push("/thank-you");
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
      <p id={`ob-${field}-error`} className="text-xs text-error">
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
              Tell us about your pharmacy and we&apos;ll build your online store.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <StepIndicator currentStep={currentStep} />
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            {/* ======= STEP 1: Business Details ======= */}
            {currentStep === 0 && (
              <div className="grid gap-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Business Details
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Tell us about your pharmacy so we can set things up
                    correctly.
                  </p>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="ob-legalName">
                    Business Legal Name <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="ob-legalName"
                    placeholder="e.g. Main Street Pharmacy LLC"
                    value={step1.businessLegalName}
                    onChange={(e) => {
                      setStep1((p) => ({
                        ...p,
                        businessLegalName: e.target.value,
                      }));
                      clearError("businessLegalName");
                    }}
                    aria-invalid={!!errors.businessLegalName}
                    aria-describedby={
                      errors.businessLegalName
                        ? "ob-businessLegalName-error"
                        : undefined
                    }
                  />
                  <FieldError field="businessLegalName" />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="ob-address">
                    Street Address <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="ob-address"
                    placeholder="e.g. 123 Main Street"
                    value={step1.address}
                    onChange={(e) => {
                      setStep1((p) => ({ ...p, address: e.target.value }));
                      clearError("address");
                    }}
                    aria-invalid={!!errors.address}
                    aria-describedby={
                      errors.address ? "ob-address-error" : undefined
                    }
                  />
                  <FieldError field="address" />
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="ob-city">
                      City <span className="text-error">*</span>
                    </Label>
                    <Input
                      id="ob-city"
                      placeholder="City"
                      value={step1.city}
                      onChange={(e) => {
                        setStep1((p) => ({ ...p, city: e.target.value }));
                        clearError("city");
                      }}
                      aria-invalid={!!errors.city}
                    />
                    <FieldError field="city" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="ob-state">
                      State <span className="text-error">*</span>
                    </Label>
                    <Select
                      value={step1.state}
                      onValueChange={(v) => {
                        setStep1((p) => ({ ...p, state: v }));
                        clearError("state");
                      }}
                    >
                      <SelectTrigger
                        id="ob-state"
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
                    <Label htmlFor="ob-zip">
                      ZIP <span className="text-error">*</span>
                    </Label>
                    <Input
                      id="ob-zip"
                      placeholder="ZIP"
                      value={step1.zip}
                      onChange={(e) => {
                        setStep1((p) => ({ ...p, zip: e.target.value }));
                        clearError("zip");
                      }}
                      aria-invalid={!!errors.zip}
                    />
                    <FieldError field="zip" />
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="ob-phone">
                    Phone <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="ob-phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={step1.phone}
                    onChange={(e) => {
                      setStep1((p) => ({ ...p, phone: e.target.value }));
                      clearError("phone");
                    }}
                    aria-invalid={!!errors.phone}
                  />
                  <FieldError field="phone" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="ob-dea">DEA Number (optional)</Label>
                    <Input
                      id="ob-dea"
                      placeholder="e.g. AB1234567"
                      value={step1.deaNumber}
                      onChange={(e) =>
                        setStep1((p) => ({ ...p, deaNumber: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="ob-license">
                      State License # (optional)
                    </Label>
                    <Input
                      id="ob-license"
                      placeholder="License number"
                      value={step1.stateLicenseNumber}
                      onChange={(e) =>
                        setStep1((p) => ({
                          ...p,
                          stateLicenseNumber: e.target.value,
                        }))
                      }
                    />
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

            {/* ======= STEP 2: Your Online Store ======= */}
            {currentStep === 1 && (
              <div className="grid gap-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Your Online Store
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Customize how your pharmacy looks online.
                  </p>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="ob-domain">
                    Preferred Domain <span className="text-error">*</span>
                  </Label>
                  <div className="flex items-center gap-0">
                    <Input
                      id="ob-domain"
                      placeholder="mypharmacy"
                      value={step2.preferredDomain}
                      onChange={(e) => {
                        setStep2((p) => ({
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

                <div className="grid gap-1.5">
                  <Label htmlFor="ob-storeName">
                    Store Name <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="ob-storeName"
                    placeholder="e.g. Main Street Pharmacy"
                    value={step2.storeName}
                    onChange={(e) => {
                      setStep2((p) => ({ ...p, storeName: e.target.value }));
                      clearError("storeName");
                    }}
                    aria-invalid={!!errors.storeName}
                  />
                  <FieldError field="storeName" />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="ob-tagline">Tagline (optional)</Label>
                  <Input
                    id="ob-tagline"
                    placeholder="e.g. Your neighborhood pharmacy, now online"
                    value={step2.tagline}
                    onChange={(e) =>
                      setStep2((p) => ({ ...p, tagline: e.target.value }))
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
                          setStep2((p) => ({
                            ...p,
                            primaryColor: color.value,
                          }))
                        }
                        className={`group relative flex size-11 items-center justify-center rounded-full border-2 transition-all ${
                          step2.primaryColor === color.value
                            ? "scale-110 border-gray-900 shadow-md"
                            : "border-transparent hover:scale-105 hover:shadow-sm"
                        }`}
                        style={{ backgroundColor: color.value }}
                        aria-label={color.label}
                      >
                        {step2.primaryColor === color.value && (
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
                          setStep2((p) => ({ ...p, template: tpl.id }))
                        }
                        className={`rounded-xl border-2 p-3 text-center transition-all ${
                          step2.template === tpl.id
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

            {/* ======= STEP 3: Services & Operations ======= */}
            {currentStep === 2 && (
              <div className="grid gap-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Services & Operations
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Let us know what services you offer and your hours.
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
                        step3.servicesOffered.includes(service);
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

                <div className="grid gap-1.5">
                  <Label htmlFor="ob-hours">
                    Operating Hours <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="ob-hours"
                    placeholder="e.g. Mon-Fri 9am-6pm, Sat 10am-2pm"
                    value={step3.operatingHours}
                    onChange={(e) => {
                      setStep3((p) => ({
                        ...p,
                        operatingHours: e.target.value,
                      }));
                      clearError("operatingHours");
                    }}
                    aria-invalid={!!errors.operatingHours}
                  />
                  <FieldError field="operatingHours" />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="ob-insurance">
                    Accepted Insurance (optional)
                  </Label>
                  <Input
                    id="ob-insurance"
                    placeholder="e.g. Blue Cross, Aetna, Medicare"
                    value={step3.acceptedInsurance}
                    onChange={(e) =>
                      setStep3((p) => ({
                        ...p,
                        acceptedInsurance: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="ob-notes">Special Notes (optional)</Label>
                  <textarea
                    id="ob-notes"
                    rows={3}
                    placeholder="Anything else you'd like us to know about your pharmacy..."
                    value={step3.specialNotes}
                    onChange={(e) =>
                      setStep3((p) => ({
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
                        Completing Setup...
                      </>
                    ) : (
                      "Complete Setup"
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
