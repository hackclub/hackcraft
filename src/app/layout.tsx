import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "~/styles/base.css";
import "~/styles/buttons.css";
import "~/styles/content.css";
import "~/styles/gallery.css";

const title = "Hackcraft: Make a mod, get games and servers!";
const description =
  "Ship a Minecraft mod as a teenager and get Minecraft or other prizes for free. A Hack Club YSWS program.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hackcraft.hackclub.com"),
  title: {
    default: title,
    template: "%s | Hackcraft",
  },
  description,
  creator: "Hack Club",
  verification: {
    google: "v1x6X5NrqBMtSsYBVfEia4x9DFaQJw91sUEUhj77OSs",
  },
  openGraph: {
    title,
    description,
    url: "https://hackcraft.hackclub.com",
    siteName: "Hackcraft",
    images: [{ url: "/images/logo.webp" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@hackclub",
    images: ["/images/logo.webp"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hackcraft",
  url: "https://hackcraft.hackclub.com",
  logo: "https://hackcraft.hackclub.com/images/logo.webp",
  description,
  parentOrganization: {
    "@type": "NGO",
    name: "Hack Club",
    alternateName: "The Hack Foundation",
    email: "team@hackclub.com",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "18556254225",
    },
    url: "https://hackclub.com",
    logo: "https://assets.hackclub.com/flag-standalone.png",
    sameAs: [
      "https://twitter.com/hackclub",
      "https://github.com/hackclub",
      "https://www.youtube.com/c/HackClubHQ",
      "https://www.instagram.com/starthackclub",
      "https://en.wikipedia.org/wiki/Hack_Club",
      "https://www.wikidata.org/wiki/Q98127305",
    ],
    taxId: "81-2908499",
    address: {
      "@type": "PostalAddress",
      streetAddress: "212 Battery St Ste 3",
      addressLocality: "Burlington",
      addressRegion: "VT",
      postalCode: "05401",
      addressCountry: "US",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/Minecraft.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Minecraftia-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>
        <a href="https://hackclub.com/">
          <img
            className="banner"
            src="https://assets.hackclub.com/flag-orpheus-top.svg"
            alt="Hack Club"
          />
        </a>
        {children}
      </body>
    </html>
  );
}
