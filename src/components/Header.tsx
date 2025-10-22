"use client";

import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  local: string;
}

const Header = ({ local }: HeaderProps) => {
  return (
    <div className="w-full bg-zinc-900 text-white">
      <div className="container mx-auto flex item-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/img/github-mark-white.png"
            alt="Magazord Logo"
            width={24}
            height={24}
          />
          <Image
            src="/img/GitHub_Logo_White.png"
            alt="GitHub Logo"
            width={96}
            height={96}
          />
        </Link>
        <span className="text-zinc-400 font-normal text-2xl text-center align-middle">
          /
        </span>
        <span className="text-zinc-400 font-light text-base text-center">
          {local}
        </span>
      </div>
    </div>
  );
};

export default Header;
