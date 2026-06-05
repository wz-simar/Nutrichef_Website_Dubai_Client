import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { TenantProvider } from "@/contexts/TenantContext";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { defaultSiteMetadata } from "@/lib/metadata";

const fontUi = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  ...defaultSiteMetadata,
  icons: {
    icon: [
      { url: "/fav/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/fav/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/fav/favicon.ico",
    apple: "/fav/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontUi.variable} ${fontDisplay.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className={`${fontUi.className} flex min-h-screen flex-col antialiased bg-background text-foreground`}
      >
        <OrganizationSchema />
        <AuthProvider>
          <TenantProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <WhatsAppButton />
          </TenantProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
