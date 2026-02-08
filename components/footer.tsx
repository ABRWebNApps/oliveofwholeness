import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.jpg"
                alt="Olives of Wholeness Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-semibold text-lg">Olives of Wholeness</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Guiding people on a journey of emotional healing and spiritual
              renewal through the love of Christ.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Services
              </Link>
              <Link
                href="/resources"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Resources
              </Link>
              <Link
                href="/community"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Community Feed
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect With Us</h3>
            <div className="space-y-3">
              <a
                href="mailto:info@olivesofwholeness.org"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                <span>info@olivesofwholeness.org</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Instagram className="h-4 w-4" />
                <span>Follow us on Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Olives of Wholeness. All rights reserved. | Confidential
            therapy services in line with our ethics.
          </p>
        </div>
      </div>
    </footer>
  );
}
