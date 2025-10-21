import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layout do Usuário",
  description: "Layout para páginas específicas do usuário",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>UserLayout</h1>
      {children}
    </div>
  );
}
