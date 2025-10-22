import type { Metadata } from "next";
// @ts-expect-error-error
import "../styles/globals.css";
import Providers from "../lib/providers";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Explorador Magazord GitHub",
  description: "Explore repositórios GitHub de usuários facilmente",
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
          <Header local="Início" />
          <main className="container mx-auto px-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
