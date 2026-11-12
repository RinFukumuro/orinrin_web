"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/ja");
  }, [router]);

  return (
    <main className="min-h-screen grid place-content-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-bold">Rin Fukumuro / Orinrin</h1>
      <p className="text-text-muted">Portfolio & Blog</p>
      <div className="flex justify-center gap-6 text-primary-light">
        <Link href="/ja/" lang="ja">日本語</Link>
        <Link href="/en/" lang="en">English</Link>
      </div>
    </main>
  );
}
