import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "GitHub user profile",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>;
}
