import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minecraft: YSWS Edition",
  description: "Ship a mod -> Get Minecraft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
