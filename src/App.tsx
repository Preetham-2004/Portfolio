import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from "framer-motion";
import {
  GlobalStyles,
  ThemeCtx,
  tokens,
  type Theme,
} from "./components/design";
import { TopNav } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProjectDetailPage, Projects } from "./components/Projects";
import { About } from "./components/About";
import { SkillsSection } from "./components/Skills";
import { ExperienceSection } from "./components/Experience";
import { Contact, Footer } from "./components/Contact";
import { PageMotion } from "./components/PageMotion";

const LOADER_GREETINGS = [
  "Hello",
  "\u0928\u092e\u0938\u094d\u0924\u0947",
  "Hola",
  "Bonjour",
  "\u3053\u3093\u306b\u3061\u306f",
  "\u4f60\u597d",
  "Ciao",
];

export default function App() {
  const reducedMotion = useReducedMotion();
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem("portfolio-theme") === "light"
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [projectReturn, setProjectReturn] = useState(false);
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const lenisRef = useRef<Lenis | null>(null);
  const projectReturnLock = useRef(false);
  const toggle = useCallback(
    () => setTheme((previous) => (previous === "dark" ? "light" : "dark")),
    [],
  );
  const palette = tokens[theme];
  useEffect(() => {
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Storage can be disabled; switching themes still works for this visit.
    }
  }, [theme]);
  const greetingIndex = Math.min(
    LOADER_GREETINGS.length - 1,
    Math.floor(loaderProgress / (100 / LOADER_GREETINGS.length)),
  );

  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({
      anchors: true,
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.08,
      wheelMultiplier: 0.88,
      touchMultiplier: 1,
    });
    lenisRef.current = lenis;
    let frame = 0;
    const animate = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setIsLoading(false);
      return;
    }
    const duration = 3000;
    const start = performance.now();
    let frame = 0;
    let finish = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setLoaderProgress(Math.round(progress * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else finish = window.setTimeout(() => setIsLoading(false), 260);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(finish);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading || projectReturnLock.current) return;
    window.history.scrollRestoration = "manual";
    const resetToHero = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      const top = target
        ? target.getBoundingClientRect().top + window.scrollY
        : 0;
      if (lenisRef.current) {
        lenisRef.current.resize();
        lenisRef.current.scrollTo(top, { immediate: true, force: true });
      } else {
        window.scrollTo({ top, left: 0, behavior: "auto" });
      }
    };
    resetToHero();
    const frame = window.requestAnimationFrame(resetToHero);
    const settles = [80, 260, 700].map((delay) =>
      window.setTimeout(resetToHero, delay),
    );
    return () => {
      window.cancelAnimationFrame(frame);
      settles.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [pathname, isLoading]);

  useEffect(() => {
    const syncPath = () => {
      const nextPath = window.location.pathname;
      const returning = pathname.startsWith("/projects/") && nextPath === "/";
      projectReturnLock.current = returning;
      setProjectReturn(returning);
      setPathname(nextPath);
    };
    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, [pathname]);

  useEffect(() => {
    let timeout = 0;
    const returnToProjects = () => {
      projectReturnLock.current = true;
      setProjectReturn(true);
      window.clearTimeout(timeout);
      timeout = window.setTimeout(
        () => setPathname("/"),
        reducedMotion ? 0 : 180,
      );
    };
    window.addEventListener("navigate-projects", returnToProjects);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("navigate-projects", returnToProjects);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (pathname !== "/" || !projectReturn) return;
    const moveToProjects = () => {
      const projects = document.getElementById("work");
      if (!projects) return;
      const top = projects.getBoundingClientRect().top + window.scrollY;
      if (lenisRef.current) {
        lenisRef.current.resize();
        lenisRef.current.scrollTo(top, { immediate: true, force: true });
      } else {
        window.scrollTo({ top, behavior: "auto" });
      }
    };
    moveToProjects();
    const firstFrame = window.requestAnimationFrame(moveToProjects);
    const settle = window.setTimeout(moveToProjects, 80);
    const finish = window.setTimeout(() => {
      projectReturnLock.current = false;
      setProjectReturn(false);
    }, 300);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.clearTimeout(settle);
      window.clearTimeout(finish);
    };
  }, [pathname, projectReturn]);

  const projectMatch = pathname.match(/^\/projects\/(.*?)\/?$/);

  return (
    <MotionConfig reducedMotion="user">
      <ThemeCtx.Provider value={{ theme, toggle }}>
        <div
          style={{
            background: palette.bg,
            color: palette.text,
            minHeight: "100vh",
            transition: "background 0.4s ease, color 0.4s ease",
            fontFamily: "IBM Plex Sans, sans-serif",
          }}
        >
          <GlobalStyles theme={theme} />
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          {!isLoading && !projectMatch && <PageMotion />}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                key="site-loader"
                className="site-loader"
                initial={{ opacity: 1 }}
                exit={{
                  clipPath: "inset(0 0 100% 0)",
                  transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
                }}
                style={{ background: palette.bg, color: palette.text }}
              >
                <span className="site-loader-name" aria-label="Welcome">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={LOADER_GREETINGS[greetingIndex]}
                      initial={{ opacity: 0, y: 54, filter: "blur(12px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -42, filter: "blur(10px)" }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: "block",
                        minWidth: "5ch",
                        color:
                          greetingIndex === LOADER_GREETINGS.length - 1
                            ? palette.accent
                            : palette.text,
                      }}
                    >
                      {LOADER_GREETINGS[greetingIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 2.9,
                    delay: 0.26,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="site-loader-line"
                  style={{ background: palette.accent }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.42 }}
                  className="site-loader-meta"
                >
                  <span>PORTFOLIO</span>
                  <span style={{ color: palette.accent }}>LOADING</span>
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="site-loader-progress"
                  style={{ color: palette.accent }}
                >
                  {String(loaderProgress).padStart(3, "0")}
                </motion.span>
              </motion.div>
            )}
            {projectReturn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 250,
                  pointerEvents: "none",
                  background: palette.bg,
                }}
              />
            )}
          </AnimatePresence>
          <div>
            {!projectMatch && <TopNav />}
            {projectMatch ? (
              <ProjectDetailPage projectId={projectMatch[1]} />
            ) : (
              <>
                <main id="main-content" tabIndex={-1}>
                  <Hero />
                  <About />
                  <ExperienceSection />
                  <Projects />
                  <SkillsSection />
                  <Contact />
                </main>
                <Footer />
              </>
            )}
          </div>
        </div>
      </ThemeCtx.Provider>
    </MotionConfig>
  );
}
