import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Starred Repositories",
  description: "Starred repositories of a GitHub user",
};

export default function StarredLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
