import type { Metadata } from "next";
import { SITE_URL, identity } from "@/content/site";
import "./globals.css";

const description =
  "Former freight dispatcher turned founder. Built Kelévo — a multi-tenant TMS SaaS for trucking operations — solo, zero to launch.";
const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${identity.name} — ${identity.role}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${identity.name} — ${identity.role}`,
  description,
  openGraph: {
    title: `${identity.name} — ${identity.role}`,
    description,
    url: SITE_URL,
    siteName: identity.name,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
