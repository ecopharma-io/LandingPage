"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { US_STATES, LOCATION_OPTIONS, CHALLENGE_OPTIONS } from "@/lib/form-options";

// ============================================
// Component
// ============================================

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  pharmacyName: string;
  contactName: string;
  email: string;
  phone: string;
  state: string;
  locations: string;
  challenge: string;
}

interface FormErrors {
  pharmacyName?: string;
  contactName?: string;
  email?: string;
  state?: string;
  locations?: string;
  challenge?: string;
}

const initialForm: FormData = {
  pharmacyName: "",
  contactName: "",
  email: "",
  phone: "",
  state: "",
  locations: "",
  challenge: "",
};

export function LeadCaptureModal({ open, onOpenChange }: LeadCaptureModalProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      // Delay reset so closing animation finishes
      const timer = setTimeout(() => {
        setForm(initialForm);
        setErrors({});
        setStatus("idle");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Auto-close on success (longer to give time for upsell)
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => onOpenChange(false), 15000);
      return () => clearTimeout(timer);
    }
  }, [status, onOpenChange]);

  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      // Clear error on change
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    []
  );

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.pharmacyName.trim()) e.pharmacyName = "Pharmacy name is required.";
    if (!form.contactName.trim()) e.contactName = "Contact name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email.";
    }
    if (!form.state) e.state = "State is required.";
    if (!form.locations) e.locations = "Please select number of locations.";
    if (!form.challenge) e.challenge = "Please select your biggest challenge.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("idle");
      toast.error(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        {status === "success" ? (
          /* ---- Success State ---- */
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-brand-50">
              <CheckCircle2 className="size-8 text-brand-600" />
            </div>
            <h3 className="text-xl font-semibold text-brand-950">
              You&apos;re on the list!
            </h3>
            <p className="text-sm text-text-muted">
              We&apos;ll be in touch within 24 hours.
            </p>

            {/* Set Up Store CTA */}
            <Button
              className="w-full bg-brand-600 text-white hover:bg-brand-700"
              onClick={() => {
                onOpenChange(false);
                setTimeout(
                  () =>
                    router.push(
                      `/waitlist/onboarding?email=${encodeURIComponent(form.email)}`
                    ),
                  300
                );
              }}
            >
              Set Up Your Store
              <ArrowRight className="ml-2 size-4" />
            </Button>

            {/* Upsell Card */}
            <div className="my-2 w-full border-t border-gray-200" />
            <div className="w-full rounded-xl border border-brand-200 bg-brand-50 p-5">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="size-4 text-brand-600" />
                <p className="text-sm font-semibold text-brand-900">
                  Skip the line — get lifetime access now
                </p>
              </div>
              <p className="mt-1.5 text-xs text-brand-700">
                $999 one-time payment. No monthly fees, ever.
              </p>
              <Button
                variant="outline"
                className="mt-3 w-full"
                onClick={() => {
                  onOpenChange(false);
                  setTimeout(() => router.push("/checkout"), 300);
                }}
              >
                Claim Lifetime Access
              </Button>
            </div>
          </div>
        ) : (
          /* ---- Form State ---- */
          <>
            <DialogHeader>
              <DialogTitle>Get Early Access</DialogTitle>
              <DialogDescription>
                Join the EcoPharma Founder&apos;s Program. Limited spots available.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* Pharmacy Name */}
              <div className="grid gap-1.5">
                <Label htmlFor="pharmacyName">
                  Pharmacy Name <span className="text-error">*</span>
                </Label>
                <Input
                  id="pharmacyName"
                  placeholder="e.g. Main Street Pharmacy"
                  value={form.pharmacyName}
                  onChange={(e) => updateField("pharmacyName", e.target.value)}
                  disabled={status === "loading"}
                  aria-invalid={!!errors.pharmacyName}
                  aria-describedby={errors.pharmacyName ? "pharmacyName-error" : undefined}
                />
                {errors.pharmacyName && (
                  <p id="pharmacyName-error" className="text-xs text-error">{errors.pharmacyName}</p>
                )}
              </div>

              {/* Contact Name */}
              <div className="grid gap-1.5">
                <Label htmlFor="contactName">
                  Owner / Contact Name <span className="text-error">*</span>
                </Label>
                <Input
                  id="contactName"
                  placeholder="e.g. John Smith"
                  value={form.contactName}
                  onChange={(e) => updateField("contactName", e.target.value)}
                  disabled={status === "loading"}
                  aria-invalid={!!errors.contactName}
                  aria-describedby={errors.contactName ? "contactName-error" : undefined}
                />
                {errors.contactName && (
                  <p id="contactName-error" className="text-xs text-error">{errors.contactName}</p>
                )}
              </div>

              {/* Email */}
              <div className="grid gap-1.5">
                <Label htmlFor="email">
                  Email <span className="text-error">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@pharmacy.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  disabled={status === "loading"}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-error">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="grid gap-1.5">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  disabled={status === "loading"}
                />
              </div>

              {/* State */}
              <div className="grid gap-1.5">
                <Label htmlFor="state">
                  State <span className="text-error">*</span>
                </Label>
                <Select
                  value={form.state}
                  onValueChange={(v) => updateField("state", v)}
                  disabled={status === "loading"}
                >
                  <SelectTrigger id="state" className="w-full" aria-invalid={!!errors.state}>
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p id="state-error" className="text-xs text-error">{errors.state}</p>
                )}
              </div>

              {/* Number of Locations */}
              <div className="grid gap-1.5">
                <Label htmlFor="locations">
                  Number of Locations <span className="text-error">*</span>
                </Label>
                <Select
                  value={form.locations}
                  onValueChange={(v) => updateField("locations", v)}
                  disabled={status === "loading"}
                >
                  <SelectTrigger id="locations" className="w-full" aria-invalid={!!errors.locations}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATION_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.locations && (
                  <p id="locations-error" className="text-xs text-error">{errors.locations}</p>
                )}
              </div>

              {/* Biggest Challenge */}
              <div className="grid gap-1.5">
                <Label htmlFor="challenge">
                  Biggest Challenge <span className="text-error">*</span>
                </Label>
                <Select
                  value={form.challenge}
                  onValueChange={(v) => updateField("challenge", v)}
                  disabled={status === "loading"}
                >
                  <SelectTrigger id="challenge" className="w-full" aria-invalid={!!errors.challenge}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {CHALLENGE_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.challenge && (
                  <p id="challenge-error" className="text-xs text-error">{errors.challenge}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="mt-2 w-full bg-accent-500 text-white hover:bg-accent-600"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Join the Waitlist"
                )}
              </Button>

              <p className="text-center text-xs text-text-muted">
                No spam, ever. Your data is kept private.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
