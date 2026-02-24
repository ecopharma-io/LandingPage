import { Suspense } from "react";
import { WaitlistWizard } from "@/components/waitlist/waitlist-wizard";

export default function WaitlistOnboardingPage() {
  return (
    <Suspense>
      <WaitlistWizard />
    </Suspense>
  );
}
