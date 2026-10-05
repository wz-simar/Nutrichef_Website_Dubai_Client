import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { TenantProvider } from "@/contexts/TenantContext";
import { RegionProvider } from "@/contexts/RegionContext";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { DeferredAds } from "@/components/DeferredAds";
import { DeferredFonts } from "@/components/DeferredFonts";
import { defaultSiteMetadata } from "@/lib/metadata";

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
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className="flex min-h-screen flex-col antialiased bg-background text-foreground"
      >
        <DeferredFonts />
        <DeferredAds />
        <OrganizationSchema />
        <AuthProvider>
          <TenantProvider>
            <RegionProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <WhatsAppButton />
            </RegionProvider>
          </TenantProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
