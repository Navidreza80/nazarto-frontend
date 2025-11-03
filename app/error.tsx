"use client";

import Link from "next/link";
import { OctagonAlert } from "lucide-react";

export default function GlobalAppError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-dvh bg-background text-foreground flex items-center justify-center px-4">
            <div className="w-full max-w-lg rounded-2xl border border-border bg-surface shadow-xl p-6 text-center space-y-3">
                <div className="mx-auto size-12 rounded-full grid place-items-center bg-primary/10">
                    <OctagonAlert className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-xl font-semibold">App crashed unexpectedly</h1>
                <p className="text-text-secondary">
                    {error?.message || "Please try again or return to the homepage."}
                </p>
                <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                        onClick={() => reset()}
                        className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="px-4 py-2 rounded-md border border-border hover:border-primary/50 transition-colors"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
