"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  // Determinar o título com base na rota atual
  let title = "Início";

  if (pathname.includes("/starred")) {
    title = "Starred Repositories";
  } else if (pathname !== "/" && pathname.split("/").length > 1) {
    title = "Repository";
  } else if (pathname !== "/") {
    title = "Profile";
  }

  return (
    <header className="w-full border-b bg-zinc-900 text-white">
      <div className="container mx-auto flex item-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/img/github-mark-white.png"
            alt="GitHub Logo"
            width={24}
            height={24}
          />
          <Image
            src="/img/GitHub_Logo_White.png"
            alt="GitHub Text Logo"
            width={96}
            height={24}
          />
        </Link>
        <span className="text-zinc-400 font-normal text-2xl">/</span>
        <span className="text-zinc-400 font-light text-base">{title}</span>
      </div>
    </header>
  );
};

export default Header;
