import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black text-white shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition">
            Uki Tech
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-gray-300 transition">
              ホーム
            </Link>
            <Link href="/about" className="hover:text-gray-300 transition">
              About
            </Link>
            <Link href="/admin" className="hover:text-gray-300 transition">
              管理
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
