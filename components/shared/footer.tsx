import Link from "next/link";
import {
  Twitter,
  Youtube,
  Instagram,
} from "lucide-react";

import Image from "next/image";
import { SITE, SOCIAL_LINKS, FOOTER_LINKS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Twitter,
  Youtube,
  Instagram,
};

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-gray-600 transition-colors hover:text-brand-600"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-surface-2 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Main Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="EcoPharma — Home">
              <Image
                src="/logo-cropped.png"
                alt="EcoPharma"
                width={600}
                height={150}
                className="h-10 w-auto"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(25%) sepia(69%) saturate(2187%) hue-rotate(215deg) brightness(93%) contrast(95%)",
                }}
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-600">
              The modern e-commerce platform for independent pharmacies.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="rounded-md p-2.5 text-gray-400 transition-colors hover:bg-brand-50 hover:text-brand-600"
                  >
                    {Icon && <Icon className="size-5" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          <FooterLinkGroup title="Product" links={FOOTER_LINKS.product} />
          <FooterLinkGroup title="Resources" links={FOOTER_LINKS.resources} />
          <FooterLinkGroup title="Company" links={FOOTER_LINKS.company} />
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built with care for independent pharmacies.
          </p>
        </div>
      </div>
    </footer>
  );
}
