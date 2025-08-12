export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100">
      <nav className="border-b border-neutral-800 p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="font-bold">rekt.xyz</div>
          <div className="text-sm text-neutral-400">Mint on Arbitrum · Warpcast integration</div>
        </div>
      </nav>
      {children}
      <footer className="border-t border-neutral-800 p-4 mt-12 text-center text-neutral-500">Built for rekt storytellers</footer>
    </div>
  );
}
