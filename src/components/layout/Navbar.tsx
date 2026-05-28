"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

const navItems = [
  { href: "/", key: "home" },
  { href: "/work", key: "work" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/experiences", key: "experiences" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  return <NavbarInner key={pathname} pathname={pathname} />;
}

function NavbarInner({ pathname }: { pathname: string }) {
  const { t } = useTranslation("common");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className="nav" aria-label="Main navigation">
        <Link href="/" className="nav-logo">
          <span className="mark" aria-hidden />
          <span>LUXE STUDIO</span>
          <span className="sup">NB</span>
        </Link>

        <div className="nav-links">
          {navItems.map(({ href, key }) => (
            <Link key={href} href={href} className={isActive(href) ? "active" : undefined}>
              {t(`nav.${key}`)}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <LanguageToggle />
          <Link href="/contact" className="nav-cta">
            <span>{t("nav.bookRitual")}</span>
            <span className="arrow">→</span>
          </Link>

          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className={`nav-hamburger-line ${menuOpen ? "open-top" : ""}`} />
            <span className={`nav-hamburger-line ${menuOpen ? "open-mid" : ""}`} />
            <span className={`nav-hamburger-line ${menuOpen ? "open-bot" : ""}`} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={`nav-mobile-overlay${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {navItems.map(({ href, key }) => (
          <Link
            key={href}
            href={href}
            className={isActive(href) ? "active" : undefined}
          >
            {t(`nav.${key}`)}
          </Link>
        ))}
        <Link href="/contact" className="nav-cta">
          <span>{t("nav.bookRitual")}</span>
          <span className="arrow">→</span>
        </Link>
      </div>
    </>
  );
}
