import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Repository",
  description: "GitHub repository",
};

export default function RepoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
