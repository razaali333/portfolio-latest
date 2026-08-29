import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/content";

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#374944",
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.person} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  manifest: "/manifest.webmanifest",
  category: "technology",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: `${site.person} | ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.person,
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${site.person} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.person} | ${site.role}`,
    description: site.description,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.person,
    url: site.url,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressCountry: "MV" },
    sameAs: [site.github, site.linkedin, site.instagram],
  };

  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} motion`}>
      <body suppressHydrationWarning className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
        />
        <ClientBody>
          <a className="skip-link" href="#main">
            Skip to main content
          </a>
          <Header />
          {children}
          <Footer />
        </ClientBody>
      </body>
    </html>
  );
}
