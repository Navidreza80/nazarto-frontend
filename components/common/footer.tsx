import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-surface border-t border-border px-10">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                    <div className="flex space-x-4">
                        <Twitter className="w-5 h-5 text-text-secondary hover:text-primary cursor-pointer" />
                        <Github className="w-5 h-5 text-text-secondary hover:text-primary cursor-pointer" />
                        <Linkedin className="w-5 h-5 text-text-secondary hover:text-primary cursor-pointer" />
                    </div>

                    {/* Copyright */}
                    <div className="text-text-secondary text-sm">
                        &copy; 2025 Nazarto. All rights reserved.
                    </div>

                    {/* Simple Links */}
                    <div className="flex items-center gap-6 text-sm">
                        <div className="text-text-secondary transition-colors flex gap-3">
                            <span>Privacy</span><span>Terms</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}