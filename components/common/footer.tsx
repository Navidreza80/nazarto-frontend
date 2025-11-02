import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-foreground">Nazarto</span>
            </div>
            <p className="text-text-secondary text-sm">
              Enterprise-grade survey analytics with AI-powered insights.
            </p>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 text-text-secondary hover:text-primary cursor-pointer" />
              <Github className="w-5 h-5 text-text-secondary hover:text-primary cursor-pointer" />
              <Linkedin className="w-5 h-5 text-text-secondary hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <div className="space-y-2 text-sm">
              <Link href="/features" className="block text-text-secondary hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="block text-text-secondary hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="/integrations" className="block text-text-secondary hover:text-primary transition-colors">
                Integrations
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-text-secondary hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/careers" className="block text-text-secondary hover:text-primary transition-colors">
                Careers
              </Link>
              <Link href="/contact" className="block text-text-secondary hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <div className="space-y-2 text-sm">
              <Link href="/privacy" className="block text-text-secondary hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="block text-text-secondary hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="block text-text-secondary hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-text-secondary">
          <p>&copy; 2023 Nazarto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}