import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { LeadCaptureProvider } from "@/components/shared/lead-capture-provider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LeadCaptureProvider>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </LeadCaptureProvider>
  );
}
