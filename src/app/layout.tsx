import type { Metadata } from "next";
// @ts-expect-error-error
import "../styles/globals.css";
import Providers from "../lib/providers";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Magazord GitHub Explorer",
  description: "Explore GitHub profiles and repositories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
