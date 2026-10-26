import type { Metadata } from "next";
import { SITE_URL, identity } from "@/content/site";
import "./globals.css";
const description =
  "Full-stack developer based in Greece. TypeScript, React, Node.js, and PostgreSQL, with experience in logistics technology and internal tools.";
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
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${identity.name} — ${identity.role}`,
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
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
