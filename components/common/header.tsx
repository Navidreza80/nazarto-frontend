"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary to-secondary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">N</span>
                        </div>
                        <span className="text-xl font-bold text-foreground">Nazarto</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-foreground hover:text-primary transition-colors">
                            Home
                        </Link>
                    </nav>

                    {/* Right Side - Auth & Theme */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center space-x-4">
                            <Link href="/login" className="text-foreground hover:text-primary transition-colors">
                                Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                        <ThemeToggle className="text-foreground" />

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-6 border-t border-border/50 bg-surface/50 backdrop-blur-lg">
                        <div className="flex flex-col space-y-3">
                            <Link
                                href="/"
                                className="text-foreground hover:text-primary transition-all duration-300 py-3 px-4 rounded-lg hover:bg-primary/5 font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="/login"
                                className="text-foreground hover:text-primary transition-all duration-300 py-3 px-4 rounded-lg hover:bg-primary/5 font-medium"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="bg-primary to-secondary text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 text-center hover:scale-105 active:scale-95"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}