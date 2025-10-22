import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuário",
  description: "Usuário do GitHub",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
