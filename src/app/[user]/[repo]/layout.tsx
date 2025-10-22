import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Repositório",
  description: "Repositório do GitHub",
};

export default function RepoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
