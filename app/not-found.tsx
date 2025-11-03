import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface shadow-lg text-center space-y-5 p-6">
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-5xl font-bold text-primary">404</h1>
          <p className="text-lg font-medium">Page not found</p>
          <p className="text-sm text-text-secondary">
            The page you’re looking for doesn’t exist or may have been moved.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-border hover:border-primary/50 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
