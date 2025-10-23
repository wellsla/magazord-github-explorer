"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/ui/button";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const formatRepoName = (repoName: string): string => {
    const withSpaces = repoName.replace(/[-_]/g, " ");
    const lowercase = withSpaces.toLowerCase();
    return lowercase
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  let title = "Home";
  let showBackButton = false;
  let backUrl = "/";

  if (pathname !== "/" && pathname.split("/").filter(Boolean).length === 2) {
    const parts = pathname.split("/").filter(Boolean);
    const repoName = parts[1];

    if (repoName !== "starred") {
      title = formatRepoName(repoName);
      showBackButton = true;
      const username = parts[0];
      backUrl = `/${username}`;
    } else {
      title = "Profile";
      showBackButton = true;
      const username = parts[0];
      backUrl = `/${username}`;
    }
  } else if (
    pathname !== "/" &&
    pathname.split("/").filter(Boolean).length === 1
  ) {
    title = "Profile";
  }

  return (
    <header className="w-full h-16 md:h-[72px] border-b border-[#1B1F23] bg-[#24292E] text-white">
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 h-full">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 h-full py-3">
            <Image
              src="/img/github-mark-white.png"
              alt="GitHub Logo"
              width={24}
              height={24}
              className="object-contain"
            />
            <Image
              src="/img/GitHub_Logo_White.png"
              alt="GitHub Text Logo"
              width={84}
              height={24}
              className="object-contain"
            />
          </Link>
          <span className="text-zinc-400 font-normal text-2xl leading-none flex items-center h-full">
            /
          </span>
          <span className="text-zinc-400 font-light text-base leading-none flex items-center h-full">
            {title}
          </span>
        </div>

        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(backUrl)}
            className="text-white hover:bg-white/10 gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
