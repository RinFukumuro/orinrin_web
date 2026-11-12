import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-content-center gap-6 px-6 text-center">
      <p className="text-emerald-300 font-mono">404</p>
      <h1 className="text-2xl font-bold">ページが見つかりません</h1>
      <p lang="en" className="text-text-muted">The page you requested could not be found.</p>
      <div className="flex justify-center gap-6 text-emerald-300">
        <Link href="/ja/" lang="ja">ホームへ</Link>
        <Link href="/en/" lang="en">English home</Link>
      </div>
    </main>
  );
}
