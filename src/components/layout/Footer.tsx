"use client";

import Link from "next/link";
import { BookingLink } from "@/components/ui/BookingLink";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation("common");
  const pathname = usePathname();

  return (
    <footer className="footer">
      {pathname !== "/" && (
        <div className="footer-mark">
          <div className="word">
            LUXE STUDIO<span className="sup">NB</span>
          </div>
        </div>
      )}
      <div className="footer-grid">
        <div>
          <div className="footer-tag">
            <span className="en-only">{t("footer.tagline")}</span>
            <span className="fr">{t("footer.taglineFr")}</span>
          </div>
          <p className="footer-atelier">
            <span style={{ color: "var(--brass)" }}>◇ {t("footer.theAtelier")}</span>
            <br />
            {t("footer.address1")}
            <br />
            {t("footer.address2")}
            <br />
            {t("footer.address3")}
          </p>
        </div>
        <div>
          <h4>{t("footer.theHouse")}</h4>
          <ul>
            <li>
              <Link href="/">{t("footer.homeLink")}</Link>
            </li>
            <li>
              <Link href="/work">{t("footer.workLink")}</Link>
            </li>
            <li>
              <Link href="/services">{t("footer.servicesLink")}</Link>
            </li>
            <li>
              <Link href="/about">{t("footer.aboutLink")}</Link>
            </li>
            <li>
              <Link href="/experiences">{t("footer.experiencesLink")}</Link>
            </li>
            <li>
              <Link href="/contact">{t("footer.contactLink")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>{t("footer.theRoom")}</h4>
          <ul>
            <li style={{ color: "var(--bone)" }}>{t("footer.hoursTueThu")}</li>
            <li style={{ color: "var(--bone)" }}>{t("footer.hoursFri")}</li>
            <li style={{ color: "var(--bone)" }}>{t("footer.hoursSat")}</li>
            <li style={{ color: "var(--bone)" }}>{t("footer.hoursClosed")}</li>
            <li style={{ marginTop: 14 }}>
              <a href="https://instagram.com/luxestudionb" target="_blank" rel="noopener noreferrer">
                @luxestudionb
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4>{t("footer.direct")}</h4>
          <ul>
            <li>
              <a href="tel:+15065550187">(506) 555 — 0187</a>
            </li>
            <li>
              <a href="mailto:hello@luxestudionb.com">hello@luxestudionb.com</a>
            </li>
            <li style={{ marginTop: 16 }}>
              <BookingLink className="footer-book">
                {t("nav.bookRitual")} →
              </BookingLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{t("footer.copyright")}</span>
        <a href="#">{t("footer.legal")}</a>
        <span>{t("footer.crafted")}</span>
      </div>
    </footer>
  );
}
