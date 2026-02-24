import type { Metadata } from "next";
import { PageTransition } from "@/components/shared/page-transition";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how EcoPharma collects, uses, and protects your data. Our privacy policy covers data handling, third-party services, cookies, and your rights.",
  openGraph: {
    title: "Privacy Policy | EcoPharma",
    description:
      "Learn how EcoPharma collects, uses, and protects your data.",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <PageTransition>
    <section className="bg-surface-2 pb-24 pt-32 lg:pb-32 lg:pt-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-sans text-3xl font-bold text-gray-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Last updated: February 20, 2026
        </p>

        <div className="prose prose-gray mt-10 max-w-none prose-headings:font-sans prose-headings:font-bold prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline">
          <p>
            EcoPharma (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
            operates the ecopharma.com website and the EcoPharma platform. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website or use our services.
          </p>

          <h2>1. Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>
            When you register for an account, request early access, or contact
            us, we may collect:
          </p>
          <ul>
            <li>
              Pharmacy business name, address, and license/NPI number
            </li>
            <li>Contact details (name, email address, phone number)</li>
            <li>Billing and payment information</li>
            <li>
              Account credentials (email and encrypted password)
            </li>
          </ul>

          <h3>Usage Data</h3>
          <p>
            We automatically collect certain information when you interact with
            our platform, including:
          </p>
          <ul>
            <li>IP address and browser type</li>
            <li>Pages visited, time spent, and navigation paths</li>
            <li>Device information (operating system, screen resolution)</li>
            <li>Referring URL and search terms</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>
              <strong>Provide our services</strong> — set up and maintain your
              pharmacy&apos;s online store, process orders, and manage
              prescriptions
            </li>
            <li>
              <strong>Communicate with you</strong> — send account
              notifications, respond to inquiries, and provide customer support
            </li>
            <li>
              <strong>Improve our platform</strong> — analyze usage patterns,
              diagnose technical issues, and develop new features
            </li>
            <li>
              <strong>Process payments</strong> — handle billing for your
              subscription or lifetime deal
            </li>
            <li>
              <strong>Comply with legal obligations</strong> — meet applicable
              regulatory and legal requirements
            </li>
          </ul>

          <h2>3. Third-Party Services</h2>
          <p>
            We work with trusted third-party providers to deliver our services:
          </p>
          <ul>        
            <li>
              <strong>Analytics providers</strong> — we use privacy-focused
              analytics to understand how visitors use our website and platform.
            </li>
            <li>
              <strong>Email service providers</strong> — to send transactional
              emails such as order confirmations and account notifications.
            </li>
            <li>
              <strong>Cloud hosting</strong> — our platform is hosted on secure,
              industry-standard cloud infrastructure.
            </li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal information to third
            parties for marketing purposes.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            data, including:
          </p>
          <ul>
            <li>
              SSL/TLS encryption for all data transmitted between your browser
              and our servers
            </li>
            <li>Encryption of sensitive data at rest</li>
            <li>
              Role-based access controls limiting who can access your information
            </li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>
              Secure, PCI-compliant payment processing through Stripe
            </li>
          </ul>
          <p>
            While we strive to protect your information, no method of
            transmission over the Internet or electronic storage is 100% secure.
          </p>

          <h2>5. HIPAA &amp; Protected Health Information</h2>
          <p>
            EcoPharma provides software tools designed for independent
            pharmacies. <strong>Important:</strong> The pharmacy is the covered
            entity responsible for HIPAA compliance and the protection of
            Protected Health Information (PHI).
          </p>
          <p>
            Our platform is designed with features to help pharmacies maintain
            compliance, including secure data handling and access controls.
            However, each pharmacy is responsible for configuring and using the
            platform in accordance with HIPAA regulations, state pharmacy board
            requirements, and all applicable healthcare privacy laws.
          </p>
          <p>
            Where required, EcoPharma will enter into a Business Associate
            Agreement (BAA) with pharmacy customers who handle PHI through our
            platform.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>
              <strong>Access</strong> — request a copy of the personal data we
              hold about you
            </li>
            <li>
              <strong>Correction</strong> — request that we correct any
              inaccurate or incomplete data
            </li>
            <li>
              <strong>Deletion</strong> — request that we delete your personal
              data, subject to legal retention requirements
            </li>
            <li>
              <strong>Data export</strong> — request a portable copy of your
              data in a commonly used format
            </li>
            <li>
              <strong>Opt-out</strong> — unsubscribe from marketing
              communications at any time
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:sales@ecopharma.io">sales@ecopharma.io</a>.
          </p>

          <h2>7. Cookies</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>
              Keep you signed in and remember your preferences
            </li>
            <li>Understand how you use our platform</li>
            <li>Improve performance and user experience</li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling
            cookies may affect the functionality of our platform.
          </p>

          <h2>8. Data Retention</h2>
          <p>
            We retain your personal information for as long as your account is
            active or as needed to provide our services. If you request account
            deletion, we will remove your personal data within 30 days, except
            where we are required by law to retain certain records.
          </p>

          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 18. We
            do not knowingly collect personal information from children.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of significant changes by posting the new policy on this page
            and updating the &quot;Last updated&quot; date. Your continued use
            of our services after changes constitutes acceptance of the updated
            policy.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at:
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
