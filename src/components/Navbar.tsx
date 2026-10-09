import type React from "react";
import { useContext, useEffect, useState } from "react";
import { ThemeCtx, tokens, useScrollY, clipCorner } from "./design";
import resumePdf from "../assets/Resume.pdf";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const TopNav: React.FC = () => {
  const { theme, toggle } = useContext(ThemeCtx);
  const t = tokens[theme];
  const y = useScrollY();
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.querySelector<HTMLButtonElement>(".nav-burger")?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const navOpacity = Math.min(0.78, 0.42 + (y / 300) * 0.36);
  const bgColor =
    theme === "dark"
      ? `linear-gradient(110deg, rgba(5,15,15,${navOpacity}) 0%, rgba(13,34,31,${Math.max(0.42, navOpacity - 0.12)}) 52%, rgba(5,14,14,${navOpacity}) 100%)`
      : `linear-gradient(110deg, rgba(255,255,255,${navOpacity}) 0%, rgba(239,250,246,${Math.max(0.5, navOpacity - 0.1)}) 52%, rgba(255,255,255,${navOpacity}) 100%)`;

  useEffect(() => {
    const handler = () => {
      let current = "about";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4)
          current = item.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    setMenuOpen(false);
  };

  const openResume = () => {
    window.open(resumePdf, "_blank", "noopener,noreferrer");
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 80,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "17px 28px",
        background: bgColor,
        backdropFilter: "blur(28px) saturate(165%)",
        WebkitBackdropFilter: "blur(28px) saturate(165%)",
        borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(13,100,80,0.10)"}`,
        transition:
          "background 0.2s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow:
          y > 12
            ? `0 8px 30px ${theme === "dark" ? "rgba(0,0,0,0.22)" : "rgba(25,83,69,0.07)"}`
            : "none",
      }}
      className="top-nav"
    >
      <span
        style={{
          position: "relative",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "0.04em",
          color: t.text,
        }}
      >
        PREETHAM<span style={{ color: t.accent }}>.</span>
      </span>
      <nav
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 30,
        }}
        className="nav-links"
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className="nav-link"
            onClick={() => scrollTo(item.id)}
            style={{
              background: "transparent",
              border: "1px solid transparent",
              cursor: "pointer",
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: active === item.id ? t.accent : t.textDim,
              padding: "4px 0",
              transition: "color 0.2s ease",
            }}
          >
            {item.label.toUpperCase()}
          </button>
        ))}
        <button
          onClick={openResume}
          className="nav-link"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            cursor: "pointer",
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: t.textDim,
            padding: "4px 0",
            transition: "color 0.2s ease",
          }}
        >
          RESUME
        </button>
      </nav>
      <button
        onClick={toggle}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="theme-toggle"
        style={{
          background: "transparent",
          border: `1px solid ${t.lineStrong}`,
          color: t.text,
          minWidth: 62,
          height: 32,
          padding: "0 10px",
          cursor: "pointer",
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: 9,
          fontWeight: 500,
          letterSpacing: "0.08em",
          transition:
            "color 0.2s ease, border-color 0.2s ease, background 0.2s ease",
        }}
      >
        {theme === "dark" ? "LIGHT" : "DARK"}
      </button>
      <button
        onClick={() => setMenuOpen((m) => !m)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        className="nav-burger"
        style={{
          display: "none",
          background: "none",
          border: `1px solid ${t.line}`,
          width: 38,
          height: 38,
          clipPath: clipCorner(8),
          color: t.text,
          cursor: "pointer",
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: 11,
        }}
      >
        {menuOpen ? "×" : "≡"}
      </button>
      {menuOpen && (
        <div
          id="mobile-navigation"
          style={{
            position: "fixed",
            top: 64,
            right: 20,
            background: t.surfaceRaised,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${t.line}`,
            clipPath: clipCorner(10),
            padding: "10px 0",
            display: "flex",
            flexDirection: "column",
            minWidth: 180,
            zIndex: 95,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: active === item.id ? t.accent : t.text,
                padding: "12px 20px",
                transition: "color 0.2s ease",
              }}
            >
              {item.label.toUpperCase()}
            </button>
          ))}
          <button
            onClick={openResume}
            style={{
              background: "none",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: t.text,
              padding: "12px 20px",
            }}
          >
            RESUME
          </button>
        </div>
      )}
      <style>{`.top-nav .nav-link:hover { color: ${t.text} !important; } .top-nav .theme-toggle:hover { border-color: ${t.accent} !important; color: ${t.accent} !important; }`}</style>
    </header>
  );
};
