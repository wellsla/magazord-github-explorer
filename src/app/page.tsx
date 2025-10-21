"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");

  return (
    <div>
      <input
        type="text"
        value={username}
        placeholder="GitHub username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Link href={`/${username}`}>
        <button>Procurar</button>
      </Link>
    </div>
  );
}
