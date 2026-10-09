/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState, createContext } from "react";
import { useReducedMotion } from "framer-motion";

export type Theme = "dark" | "light";
export const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export const tokens = {
  dark: {
    bg: "#05080A",
    surface: "rgba(10,14,13,0.72)",
    surfaceRaised: "#1A1D24",
    text: "#F5F7F6",
    textDim: "#8A9490",
    textFaint: "rgba(138,148,144,0.6)",
    line: "rgba(255,255,255,0.04)",
    lineStrong: "rgba(94,234,212,0.25)",
    accent: "#5EEAD4",
    accentDim: "rgba(94,234,212,0.14)",
    accentText: "#05080A",
    flag: "#FF6B4A",
    flagDim: "rgba(255,107,74,0.14)",
  },
  light: {
    bg: "#F3F5F2",
    surface: "rgba(255,255,255,0.6)",
    surfaceRaised: "#FBFBF8",
    text: "#0B1210",
    textDim: "#5B6864",
    textFaint: "rgba(91,104,100,0.62)",
    line: "rgba(5,8,10,0.06)",
    lineStrong: "rgba(13,148,120,0.25)",
    accent: "#0D9478",
    accentDim: "rgba(13,148,120,0.10)",
    accentText: "#F3F5F2",
    flag: "#D8472B",
    flagDim: "rgba(216,71,43,0.10)",
  },
};

/* Clipped HUD-corner panel shape, reused everywhere a "card" would normally
   appear. Defined once as a CSS clip-path string so every surface element
   shares the same notch geometry. */
export const clipCorner = (size = 14) =>
  `polygon(${size}px 0, 100% 0, 100% calc(100% - ${size}px), calc(100% - ${size}px) 100%, 0 100%, 0 ${size}px)`;

/* ----------------------------------------------------------------------------
   Hooks
 ---------------------------------------------------------------------------- */
function useInView(threshold: number) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, reducedMotion]);
  return { ref, inView: Boolean(reducedMotion) || inView };
}

export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

/* Each word rises independently with a slight skew. */
export const SplitReveal: React.FC<{
  text: string;
  style?: React.CSSProperties;
}> = ({ text, style }) => {
  const { ref, inView } = useInView(0.3);
  const words = text.split(" ");
  return (
    <h2 ref={ref} style={{ ...style, display: "block" }} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            marginRight: "0.26em",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: inView
                ? "translateY(0%) skewY(0deg)"
                : "translateY(108%) skewY(4deg)",
              transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${wi * 0.04}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </h2>
  );
};

export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView(0.12);
  return (
    <div
      ref={ref}
      style={{
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(22px) scale(0.985)",
        opacity: inView ? 1 : 0,
        filter: inView ? "blur(0)" : "blur(6px)",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, filter 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export const GlobalStyles: React.FC<{ theme: Theme }> = ({ theme }) => {
  const t = tokens[theme];

  return (
    <style>{`
:root {
  color-scheme: ${theme};
  --scroll-track: ${t.surface};
  --scroll-thumb: ${t.accent};
  --scroll-thumb-hover: ${theme === "dark" ? "#A8FFCB" : "#087B43"};
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background: ${t.bg};
}
::selection {
  background: ${t.accent};
  color: ${t.accentText};
}
input::placeholder,
textarea::placeholder {
  color: ${t.textFaint};
}
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid ${t.accent};
  outline-offset: 2px;
}
html.lenis,
html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-stopped {
  overflow: clip;
}
.project-row:hover h3 {
  color: ${t.accent} !important;
}
.site-loader {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: clamp(26px, 3vw, 52px);
  overflow: hidden;
}
.site-loader::before {
  content: "";
  position: absolute;
  width: min(52vw, 760px);
  aspect-ratio: 1;
  right: -18vw;
  top: -30%;
  background: ${t.accent};
  filter: blur(130px);
  border-radius: 50%;
  opacity: 0.16;
}
.site-loader-name {
  position: relative;
  font:
    700 clamp(72px, 12vw, 210px)/0.82 "Space Grotesk",
    sans-serif;
  letter-spacing: -0.085em;
}
.site-loader-line {
  display: block;
  position: relative;
  width: min(520px, 48vw);
  height: 5px;
  margin-top: clamp(25px, 5vh, 64px);
  transform-origin: left;
}
.site-loader-meta {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: min(520px, 48vw);
  margin-top: 12px;
  font:
    500 10px "IBM Plex Mono",
    monospace;
  letter-spacing: 0.11em;
}
.site-loader-progress {
  position: relative;
  margin-top: auto;
  font:
    500 clamp(72px, 11vw, 190px)/0.8 "Space Grotesk",
    sans-serif;
  letter-spacing: -0.075em;
  font-variant-numeric: tabular-nums;
}
@media (max-width: 860px) {
  .site-loader {
    padding: 28px 22px;
  }
  .site-loader-line,
  .site-loader-meta {
    width: min(340px, 78vw);
  }
  .top-nav {
    left: 0 !important;
    padding: 18px 20px !important;
  }
  .nav-links {
    display: none !important;
  }
  .nav-burger {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
  .about-grid {
    grid-template-columns: 1fr !important;
    gap: 28px !important;
  }
  .project-row {
    grid-template-columns: 36px 1fr !important;
    padding: 32px 20px !important;
  }
  .project-row > div:last-child {
    display: none !important;
  }
  section {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}
`}</style>
  );
};
