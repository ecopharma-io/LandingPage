import type { Metadata } from "next";
import { PageTransition } from "@/components/shared/page-transition";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the EcoPharma Terms of Service covering platform usage, payment terms, regulatory compliance, intellectual property, and more.",
  openGraph: {
    title: "Terms of Service | EcoPharma",
    description:
      "Read the EcoPharma Terms of Service for our pharmacy e-commerce platform.",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <PageTransition>
    <section className="bg-surface-2 pb-24 pt-32 lg:pb-32 lg:pt-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-sans text-3xl font-bold text-gray-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Last updated: February 20, 2026
        </p>

        <div className="prose prose-gray mt-10 max-w-none prose-headings:font-sans prose-headings:font-bold prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of the EcoPharma platform and services provided by EcoPharma
            (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By creating an
            account or using our services, you agree to be bound by these Terms.
          </p>

          <h2>1. Service Description</h2>
          <p>
            EcoPharma is an all-in-one e-commerce platform built for independent
            pharmacies. Our services include online store creation and
            management, prescription order processing tools, HIPAA-aligned
            security features, telehealth integration capabilities, and AI-powered
            patient engagement tools.
          </p>
          <p>
            We reserve the right to modify, suspend, or discontinue any part of
            our services at any time with reasonable notice.
          </p>

          <h2>2. Account Terms</h2>
          <ul>
            <li>
              You must be at least 18 years old and authorized to operate a
              pharmacy business to create an account.
            </li>
            <li>
              You are responsible for maintaining the security of your account
              credentials and for all activity that occurs under your account.
            </li>
            <li>
              You must provide accurate and complete registration information,
              including valid pharmacy license details.
            </li>
            <li>
              You agree to notify us immediately of any unauthorized access to
              your account.
            </li>
          </ul>

          <h2>3. Regulatory Compliance</h2>
          <p>
            <strong>
              The pharmacy is responsible for all regulatory compliance,
              including HIPAA, state pharmacy board regulations, and DEA
              requirements. EcoPharma provides software tools only.
            </strong>
          </p>
          <p>You acknowledge and agree that:</p>
          <ul>
            <li>
              You are the covered entity under HIPAA and bear full
              responsibility for the protection of Protected Health Information
              (PHI).
            </li>
            <li>
              You will comply with all applicable federal, state, and local laws
              governing pharmacy operations, including controlled substance
              regulations.
            </li>
            <li>
              You will ensure that your use of our platform meets the
              requirements of your state pharmacy board.
            </li>
            <li>
              EcoPharma does not provide legal, medical, or regulatory advice.
              Consult qualified professionals for compliance guidance.
            </li>
          </ul>

          <h2>4. Payment Terms</h2>
          <h3>Lifetime Deal</h3>
          <p>
            During our Founder&apos;s Program, EcoPharma offers a one-time
            lifetime deal that provides access to the platform for as long as it
            operates. The lifetime deal includes all core features and future
            updates at no additional cost.
          </p>

          <h3>Refund Policy — 60-Day Guarantee</h3>
          <p>
            We offer a 60-day money-back guarantee on all purchases. If you are
            not satisfied with our platform within the first 60 days of your
            purchase, contact us for a full refund. After the 60-day period,
            purchases are non-refundable.
          </p>

          <h3>Future Pricing</h3>
          <p>
            After the Founder&apos;s Program ends, EcoPharma may introduce
            subscription-based pricing for new customers. Lifetime deal holders
            will retain their existing access and benefits.
          </p>

          <h2>5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Use the platform for any unlawful purpose or in violation of any
              applicable laws or regulations
            </li>
            <li>
              Sell or distribute controlled substances in violation of federal or
              state law
            </li>
            <li>
              Attempt to gain unauthorized access to our systems or other
              users&apos; accounts
            </li>
            <li>
              Upload malicious code, viruses, or any harmful content to the
              platform
            </li>
            <li>
              Interfere with or disrupt the integrity or performance of our
              services
            </li>
            <li>
              Resell, sublicense, or redistribute access to the platform without
              our written consent
            </li>
            <li>
              Misrepresent your pharmacy&apos;s credentials, licensing, or
              regulatory status
            </li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>
            The EcoPharma platform, including its design, code, features,
            documentation, and branding, is owned by EcoPharma and protected by
            intellectual property laws. You may not copy, modify, distribute, or
            create derivative works from our platform without written permission.
          </p>
          <p>
            You retain ownership of all content you upload to the platform,
            including product listings, images, and pharmacy information. By
            uploading content, you grant us a limited license to display and
            process that content as necessary to provide our services.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, EcoPharma shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, including but not limited to:
          </p>
          <ul>
            <li>Loss of profits, revenue, or data</li>
            <li>Business interruption</li>
            <li>
              Regulatory fines or penalties arising from your non-compliance
            </li>
            <li>
              Errors or omissions in content or information provided through the
              platform
            </li>
          </ul>
          <p>
            Our total liability for any claim arising from these Terms or your
            use of our services shall not exceed the amount you paid to
            EcoPharma in the 12 months preceding the claim.
          </p>

          <h2>8. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless EcoPharma, its officers,
            directors, employees, and agents from any claims, damages, losses,
            or expenses (including reasonable legal fees) arising from your use
            of the platform, violation of these Terms, or violation of any
            applicable law or regulation.
          </p>

          <h2>9. Termination</h2>
          <p>
            We may suspend or terminate your account if you violate these Terms,
            engage in fraudulent activity, or fail to maintain valid pharmacy
            licensing. Upon termination:
          </p>
          <ul>
            <li>
              Your access to the platform will be revoked.
            </li>
            <li>
              We will provide a reasonable period (at least 30 days) to export
              your data, unless termination is due to illegal activity.
            </li>
            <li>
              Provisions that by their nature should survive termination
              (including liability limitations and indemnification) will remain
              in effect.
            </li>
          </ul>
          <p>
            You may terminate your account at any time by contacting us at{" "}
            <a href="mailto:sales@ecopharma.io">sales@ecopharma.io</a>.
          </p>

          <h2>10. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. We will notify you of
            material changes by email or by posting a notice on our platform at
            least 30 days before the changes take effect. Your continued use of
            our services after the effective date constitutes acceptance of the
            updated Terms.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the United States. Any disputes arising from these Terms
            or your use of our services shall be resolved through binding
            arbitration, except where prohibited by law.
          </p>

          <h2>12. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or
            invalid, that provision shall be limited or eliminated to the
            minimum extent necessary, and the remaining provisions shall remain
            in full force and effect.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have questions about these Terms of Service, please contact
            us at:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:sales@ecopharma.io">sales@ecopharma.io</a>
            </li>
            <li>
              <strong>Website:</strong>{" "}
              <a
                href="https://ecopharma.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                ecopharma.io
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
    </PageTransition>
  );
}
