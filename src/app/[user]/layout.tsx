import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
  params: {
    user: string;
  };
}

export const metadata: Metadata = {
  title: "Usuário",
  description: "Usuário do GitHub",
};

export default function UserLayout({ children, params }: Readonly<Props>) {
  return <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>;
}
