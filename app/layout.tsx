import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "KaamAsaan",
  description: "Paste your opportunity emails. KaamAsaan scores each one against your profile and tells you exactly what to apply to first.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body style={{ background: "var(--color-bg-primary)", color: "var(--color-text-primary)", fontFamily: "var(--font-regular)" }}>
        <Providers>{children}</Providers>
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
