"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { LeadCaptureModal } from "@/components/shared/lead-capture-modal";

interface LeadCaptureContextValue {
  openLeadModal: () => void;
}

const LeadCaptureContext = createContext<LeadCaptureContextValue | null>(null);

export function useLeadCapture() {
  const ctx = useContext(LeadCaptureContext);
  if (!ctx) {
    throw new Error("useLeadCapture must be used within <LeadCaptureProvider>");
  }
  return ctx;
}

export function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openLeadModal = useCallback(() => setOpen(true), []);

  return (
    <LeadCaptureContext.Provider value={{ openLeadModal }}>
      {children}
      <LeadCaptureModal open={open} onOpenChange={setOpen} />
    </LeadCaptureContext.Provider>
  );
}
