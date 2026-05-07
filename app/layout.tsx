import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KaamAsaan",
  description: "Paste your opportunity emails. KaamAsaan scores each one against your profile and tells you exactly what to apply to first.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen`} style={{ background: "var(--color-bg-primary)", color: "var(--color-text-primary)" }}>
        <Providers>{children}</Providers>
        <Toaster position="bottom-right" theme="dark" richColors />
      </body>
    </html>
  );
}
