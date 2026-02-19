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
                href="https://www.instagram.com/olives_wholeness"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61579237815375"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span>Facebook</span>
              </a>
              <a
                href="https://www.youtube.com/@olives_wholeness"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
                <span>YouTube</span>
              </a>
              <a
                href="https://www.tiktok.com/@olivesofwholeness"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
                <span>TikTok</span>
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
