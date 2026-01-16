import type { Metadata } from "next";
import "~/styles/global.css";

export const metadata: Metadata = {
  title: "Minecraft: YSWS Edition",
  description: "Ship a mod, Get Minecraft!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
