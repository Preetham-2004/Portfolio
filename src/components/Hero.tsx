import type React from "react";
import { useContext, useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { animate, stagger } from "animejs";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ThemeCtx, tokens } from "./design";

const MARQUEE_SKILLS = [
  "REACT",
  "TYPESCRIPT",
  "NODE.JS",
  "PYTHON",
  "FASTAPI",
  "KOTLIN",
  "JETPACK COMPOSE",
  "FIREBASE",
  "POSTGRESQL",
  "MONGODB",
  "DOCKER",
  "GEN AI",
  "DIALOGFLOW",
  "REST APIS",
  "GITHUB ACTIONS",
  "DESIGN SYSTEMS",
  "FRONTEND DEVELOPMENT",
  "MOTION DIRECTION",
];

const HeroBackground: React.FC<{ accent: string; reducedMotion: boolean }> = ({
  accent,
  reducedMotion,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;
    const particles = Array.from({ length: 32 }, (_, index) => ({
      x: ((index * 97) % 100) / 100,
      y: ((index * 47) % 100) / 100,
      size: 0.8 + (index % 4) * 0.55,
      speed: 0.08 + (index % 5) * 0.025,
      phase: index * 0.78,
    }));
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      if (reducedMotion) draw(0);
    };
    const draw = (time: number) => {
      const tick = time * 0.001;
      context.clearRect(0, 0, width, height);
      const glowX = width * (0.67 + Math.sin(tick * 0.18) * 0.08);
      const glowY = height * (0.42 + Math.cos(tick * 0.14) * 0.1);
      const glow = context.createRadialGradient(
        glowX,
        glowY,
        0,
        glowX,
        glowY,
        Math.max(width, height) * 0.48,
      );
      glow.addColorStop(0, `${accent}30`);
      glow.addColorStop(0.45, `${accent}0e`);
      glow.addColorStop(1, "transparent");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      particles.forEach((particle, index) => {
        const x =
          (particle.x +
            Math.sin(tick * particle.speed + particle.phase) * 0.045) *
          width;
        const y =
          (particle.y +
            Math.cos(tick * particle.speed * 1.4 + particle.phase) * 0.055) *
          height;
        const pulse = 0.45 + Math.sin(tick * 1.2 + particle.phase) * 0.25;
        context.beginPath();
        context.arc(x, y, particle.size + pulse, 0, Math.PI * 2);
        context.fillStyle = `${accent}${Math.round((0.18 + pulse * 0.32) * 255)
          .toString(16)
          .padStart(2, "0")}`;
        context.fill();
        particles.slice(index + 1).forEach((other) => {
          const ox =
            (other.x + Math.sin(tick * other.speed + other.phase) * 0.045) *
            width;
          const oy =
            (other.y +
              Math.cos(tick * other.speed * 1.4 + other.phase) * 0.055) *
            height;
          const distance = Math.hypot(x - ox, y - oy);
          if (distance < 132) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(ox, oy);
            context.strokeStyle = `${accent}${Math.round(
              (1 - distance / 132) * 30,
            )
              .toString(16)
              .padStart(2, "0")}`;
            context.lineWidth = 0.55;
            context.stroke();
          }
        });
      });
      frame = !reducedMotion && isVisible ? requestAnimationFrame(draw) : 0;
    };
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !frame && !reducedMotion)
          frame = requestAnimationFrame(draw);
      },
      { threshold: 0.01 },
    );
    resize();
    window.addEventListener("resize", resize);
    visibilityObserver.observe(canvas);
    if (!reducedMotion) frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [accent, reducedMotion]);
  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
};

export const Hero: React.FC = () => {
  const { theme } = useContext(ThemeCtx);
  const t = tokens[theme];
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const scroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.38,
  });
  const copyY = useTransform(scroll, [0, 1], [0, -84]);
  const backgroundY = useTransform(scroll, [0, 1], [0, -110]);
  const backgroundScale = useTransform(scroll, [0, 1], [1, 1.16]);

  useEffect(() => {
    const root = heroRef.current;
    if (!root || reducedMotion) return;
    const select = (value: string) =>
      Array.from(root.querySelectorAll<HTMLElement>(value));
    const animations = [
      animate(select("[data-reveal-meta]"), {
        opacity: [0, 1],
        y: [-16, 0],
        delay: 90,
        duration: 650,
        ease: "outExpo",
      }),
      animate(select("[data-reveal-line]"), {
        opacity: [0, 1],
        y: [120, 0],
        rotate: [5, 0],
        delay: stagger(135, { start: 160 }),
        duration: 1150,
        ease: "outExpo",
      }),
      animate(select("[data-reveal-detail]"), {
        opacity: [0, 1],
        y: [30, 0],
        delay: stagger(100, { start: 640 }),
        duration: 800,
        ease: "outExpo",
      }),
    ];
    return () => animations.forEach((animation) => animation?.revert());
  }, [reducedMotion]);

  const scrollToSection = (
    target: string,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    document
      .querySelector(target)
      ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`atelier-hero atelier-hero--${theme}`}
      style={
        {
          background: t.bg,
          color: t.text,
          "--hero-accent": t.accent,
          "--hero-line": t.lineStrong,
          "--hero-dim": t.textDim,
        } as React.CSSProperties
      }
    >
      <div className="atelier-grid" aria-hidden="true" />
      <div className="atelier-light-aurora" aria-hidden="true" />
      <motion.div
        className="atelier-background"
        style={{
          y: reducedMotion ? 0 : backgroundY,
          scale: reducedMotion ? 1 : backgroundScale,
        }}
      >
        <HeroBackground
          accent={t.accent}
          reducedMotion={Boolean(reducedMotion)}
        />
      </motion.div>
      <div className="atelier-canvas-grain" aria-hidden="true" />
      <div className="atelier-header" data-reveal-meta>
        <span>PREETHAM BHAT / INDEPENDENT DEVELOPER</span>
      </div>
      <motion.div
        className="atelier-copy"
        style={{ y: reducedMotion ? 0 : copyY }}
      >
        <p className="atelier-label" data-reveal-meta>
          <Sparkles size={13} /> DIGITAL EXPERIENCES, CAREFULLY BUILT
        </p>
        <h1>
          <span data-reveal-line>Crafting digital</span>
          <span data-reveal-line>dreams, one line</span>
          <span data-reveal-line>
            <em>at a time.</em>
          </span>
        </h1>
        <div className="atelier-bottom" data-reveal-detail>
          <p style={{ color: t.textDim }}>
            I turn ambitious ideas into considered products — blending product
            design, expressive motion, and resilient engineering.
          </p>
          <div className="atelier-actions">
            <motion.a
              onClick={(event) => scrollToSection("#work", event)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
              href="#work"
              style={{ background: t.accent, color: t.accentText }}
            >
              View selected work <ArrowUpRight size={17} />
            </motion.a>
            <motion.a
              onClick={(event) => scrollToSection("#contact", event)}
              whileHover={{ x: 5 }}
              href="#contact"
              style={{ color: t.text }}
            >
              Get in touch{" "}
              <ArrowUpRight size={16} style={{ color: t.accent }} />
            </motion.a>
          </div>
        </div>
      </motion.div>
      <motion.a
        onClick={(event) => scrollToSection("#about", event)}
        data-reveal-detail
        whileHover={{ y: 5 }}
        href="#about"
        className="atelier-scroll"
        style={{ borderColor: t.lineStrong, color: t.text }}
        aria-label="Scroll to discover"
      >
        <span>SCROLL</span>
        <ArrowDown size={20} />
      </motion.a>
      <div
        className="atelier-marquee"
        style={{ borderColor: t.line }}
        aria-label="Technical skills"
      >
        <div className="atelier-marquee-track">
          {[0, 1].map((group) => (
            <div
              className="atelier-marquee-group"
              aria-hidden={group > 0}
              key={`skills-${group}`}
            >
              {MARQUEE_SKILLS.flatMap((skill) => [
                <span key={`${group}-${skill}`}>{skill}</span>,
                <b key={`${group}-${skill}-mark`}>{"\u2726"}</b>,
              ])}
            </div>
          ))}
        </div>
      </div>
      <style>{`
.atelier-hero {
  position: relative;
  isolation: isolate;
  min-height: 100svh;
  overflow: hidden;
  padding: 112px clamp(24px, 6vw, 104px) 74px;
}
.atelier-hero::before {
  content: "";
  position: absolute;
  z-index: -3;
  width: min(85vw, 1200px);
  aspect-ratio: 1.4;
  right: -24vw;
  top: -32%;
  border-radius: 42% 58% 57% 43%;
  background: conic-gradient(
    from 215deg,
    transparent 0 24%,
    color-mix(in srgb, var(--hero-accent) 18%, transparent) 38%,
    transparent 52% 69%,
    color-mix(in srgb, var(--hero-accent) 12%, transparent) 84%,
    transparent
  );
  filter: blur(52px);
  animation: heroCanvasFlow 20s ease-in-out infinite;
  pointer-events: none;
}
.atelier-hero::after {
  content: "";
  position: absolute;
  z-index: 1;
  inset: 14px;
  pointer-events: none;
  border: 1px solid color-mix(in srgb, var(--hero-line) 62%, transparent);
  box-shadow: inset 0 0 0 1px
    color-mix(in srgb, var(--hero-accent) 3%, transparent);
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 12%,
    #000 88%,
    transparent
  );
  opacity: 0.72;
}
.atelier-grid {
  position: absolute;
  z-index: -2;
  inset: 0;
  opacity: 0.25;
  background-image: linear-gradient(
    120deg,
    transparent 12%,
    color-mix(in srgb, var(--hero-accent) 10%, transparent) 48%,
    transparent 84%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent,
    #000 18%,
    #000 83%,
    transparent
  );
}
.atelier-light-aurora {
  display: none;
}
.atelier-hero--light {
  background: linear-gradient(
    135deg,
    #fcfdfc 0%,
    #f0f6f3 50%,
    #eaf3ef 100%
  ) !important;
}
.atelier-hero--light .atelier-light-aurora {
  position: absolute;
  z-index: -1;
  inset: -18%;
  display: block;
  pointer-events: none;
  opacity: 0.72;
  background-image:
    repeating-radial-gradient(
      ellipse 82% 70% at 74% 48%,
      transparent 0 26px,
      rgba(8, 122, 100, 0.18) 27px 28px,
      transparent 29px 52px
    ),
    repeating-radial-gradient(
      ellipse 54% 60% at 22% 78%,
      transparent 0 34px,
      rgba(8, 122, 100, 0.13) 35px 36px,
      transparent 37px 68px
    );
  background-size:
    112% 112%,
    118% 118%;
  background-position:
    12% 38%,
    72% 20%;
  mask-image: radial-gradient(
    ellipse at 66% 47%,
    black 10%,
    rgba(0, 0, 0, 0.82) 45%,
    transparent 78%
  );
  transform: translate3d(0, 0, 0);
  will-change: transform;
  animation: heroLightContours 20s cubic-bezier(0.45, 0, 0.55, 1) infinite
    alternate;
}
.atelier-hero--light .atelier-light-aurora::before {
  content: "";
  position: absolute;
  inset: 16% 8%;
  border: 1px solid rgba(8, 122, 100, 0.22);
  border-radius: 48% 52% 43% 57% / 57% 42% 58% 43%;
  box-shadow:
    0 0 0 26px rgba(8, 122, 100, 0.035),
    0 0 0 53px rgba(8, 122, 100, 0.028),
    0 0 0 81px rgba(8, 122, 100, 0.02);
  will-change: transform;
  animation: heroLightContourShift 15s ease-in-out infinite alternate;
}
.atelier-hero--light .atelier-light-aurora::after {
  content: "";
  position: absolute;
  right: 14%;
  top: 23%;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--hero-accent);
  box-shadow:
    -88px 138px 0 -2px rgba(8, 122, 100, 0.46),
    -224px 268px 0 -3px rgba(8, 122, 100, 0.32),
    162px 310px 0 -3px rgba(8, 122, 100, 0.32),
    284px 105px 0 -4px rgba(8, 122, 100, 0.26);
  will-change: transform, opacity;
  animation: heroLightSignal 8s ease-in-out infinite;
}
.atelier-hero--light::before {
  opacity: 0.36;
  filter: blur(62px) saturate(0.75);
}
.atelier-hero--light::after {
  border-color: rgba(13, 100, 80, 0.16);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.7);
}
.atelier-hero--light .atelier-grid {
  opacity: 0.33;
  background-image:
    linear-gradient(90deg, rgba(13, 148, 120, 0.045) 1px, transparent 1px),
    linear-gradient(rgba(13, 148, 120, 0.045) 1px, transparent 1px);
  background-size: 76px 76px;
}
.atelier-hero--light .atelier-background {
  opacity: 0.22;
  mix-blend-mode: multiply;
}
.atelier-hero--light .atelier-canvas-grain {
  opacity: 0.035;
  mix-blend-mode: multiply;
}
.atelier-hero--light .atelier-copy h1 {
  filter: drop-shadow(0 14px 22px rgba(22, 83, 69, 0.1));
}
.atelier-hero--light .atelier-header span {
  text-shadow: none;
}
.atelier-hero--light .atelier-bottom > p {
  border-color: rgba(13, 100, 80, 0.22);
}
.atelier-hero--light .atelier-actions a:first-child {
  box-shadow: 0 12px 24px rgba(13, 148, 120, 0.2);
}
.atelier-hero--dark .atelier-light-aurora {
  position: absolute;
  z-index: -1;
  inset: -18%;
  display: block;
  pointer-events: none;
  opacity: 0.68;
  background-image:
    repeating-radial-gradient(
      ellipse 82% 70% at 74% 48%,
      transparent 0 26px,
      color-mix(in srgb, var(--hero-accent) 35%, transparent) 27px 28px,
      transparent 29px 52px
    ),
    repeating-radial-gradient(
      ellipse 54% 60% at 22% 78%,
      transparent 0 34px,
      color-mix(in srgb, var(--hero-accent) 25%, transparent) 35px 36px,
      transparent 37px 68px
    );
  background-size:
    112% 112%,
    118% 118%;
  background-position:
    12% 38%,
    72% 20%;
  mask-image: radial-gradient(
    ellipse at 66% 47%,
    black 10%,
    rgba(0, 0, 0, 0.82) 45%,
    transparent 78%
  );
  transform: translate3d(0, 0, 0);
  will-change: transform;
  animation: heroLightContours 20s cubic-bezier(0.45, 0, 0.55, 1) infinite
    alternate;
}
.atelier-hero--dark .atelier-light-aurora::before {
  content: "";
  position: absolute;
  inset: 16% 8%;
  border: 1px solid color-mix(in srgb, var(--hero-accent) 42%, transparent);
  border-radius: 48% 52% 43% 57% / 57% 42% 58% 43%;
  box-shadow:
    0 0 0 26px color-mix(in srgb, var(--hero-accent) 7%, transparent),
    0 0 0 53px color-mix(in srgb, var(--hero-accent) 5%, transparent),
    0 0 0 81px color-mix(in srgb, var(--hero-accent) 3%, transparent);
  will-change: transform;
  animation: heroLightContourShift 15s ease-in-out infinite alternate;
}
.atelier-hero--dark .atelier-light-aurora::after {
  content: "";
  position: absolute;
  right: 14%;
  top: 23%;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--hero-accent);
  box-shadow:
    -88px 138px 0 -2px color-mix(in srgb, var(--hero-accent) 62%, transparent),
    -224px 268px 0 -3px color-mix(in srgb, var(--hero-accent) 42%, transparent),
    162px 310px 0 -3px color-mix(in srgb, var(--hero-accent) 42%, transparent),
    284px 105px 0 -4px color-mix(in srgb, var(--hero-accent) 34%, transparent);
  will-change: transform, opacity;
  animation: heroLightSignal 8s ease-in-out infinite;
}
.atelier-background {
  position: absolute;
  z-index: -1;
  inset: -8%;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.56;
}
.hero-canvas {
  display: block;
  width: 100%;
  height: 100%;
  filter: saturate(0.75) blur(0.15px);
}
.atelier-canvas-grain {
  position: absolute;
  z-index: 1;
  inset: 0;
  pointer-events: none;
  opacity: 0.065;
  mix-blend-mode: screen;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.atelier-header,
.atelier-copy,
.atelier-scroll,
.atelier-marquee {
  position: relative;
  z-index: 2;
}
.atelier-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font:
    500 10px "IBM Plex Mono",
    monospace;
  letter-spacing: 0.11em;
}
.atelier-header span {
  text-shadow: 0 1px 12px
    color-mix(in srgb, var(--hero-accent) 16%, transparent);
}
.atelier-copy {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100svh - 186px);
  max-width: 100%;
}
.atelier-label {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 clamp(26px, 5vh, 60px);
  color: var(--hero-dim);
  font:
    500 10px "IBM Plex Mono",
    monospace;
  letter-spacing: 0.12em;
}
.atelier-copy h1 {
  margin: 0;
  padding-inline: clamp(4px, 1vw, 18px);
  font:
    700 clamp(62px, 8.3vw, 154px)/0.82 "Space Grotesk",
    sans-serif;
  letter-spacing: -0.085em;
  filter: drop-shadow(0 16px 28px rgba(0, 0, 0, 0.14));
}
.atelier-copy h1 span {
  display: block;
}
.atelier-copy h1 span + span {
  margin-top: clamp(5px, 0.65vw, 12px);
}
.atelier-copy h1 span:nth-child(2) {
  margin-left: clamp(11vw, 19vw, 340px);
}
.atelier-copy h1 span:nth-child(3) {
  margin-left: 0;
  padding-right: clamp(0px, 7vw, 118px);
  text-align: right;
}
.atelier-copy h1 em {
  color: var(--hero-accent);
  font-style: normal;
  text-shadow: 0 0 44px color-mix(in srgb, var(--hero-accent) 34%, transparent);
}
.atelier-bottom {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  margin: clamp(14px, 3vh, 38px) 0 0 clamp(8px, 2vw, 34px);
}
.atelier-bottom > p {
  max-width: 330px;
  margin: 0;
  padding-left: 14px;
  border-left: 1px solid var(--hero-line);
  font:
    400 clamp(15px, 1.15vw, 18px)/1.55 "IBM Plex Sans",
    sans-serif;
}
.atelier-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
}
.atelier-actions a {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 46px;
  padding: 0 17px;
  text-decoration: none;
  font:
    600 13px "IBM Plex Sans",
    sans-serif;
}
.atelier-actions a:first-child {
  clip-path: polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 0 100%);
  box-shadow: 0 10px 22px
    color-mix(in srgb, var(--hero-accent) 15%, transparent);
}
.atelier-actions a:last-child {
  padding: 0 2px;
  border-bottom: 1px solid var(--hero-line);
}
.atelier-scroll {
  position: absolute;
  z-index: 4;
  right: clamp(24px, 6vw, 104px);
  bottom: 94px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 48px;
  height: 62px;
  padding-top: 9px;
  border: 1px solid;
  border-radius: 25px;
  text-decoration: none;
}
.atelier-scroll span {
  font:
    500 8px "IBM Plex Mono",
    monospace;
  letter-spacing: 0.08em;
  writing-mode: vertical-rl;
}
.atelier-marquee {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 46px;
  overflow: hidden;
  border-top: 1px solid;
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.atelier-marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: atelierMarquee 24s linear infinite;
}
.atelier-marquee-group {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
}
.atelier-marquee span,
.atelier-marquee b {
  flex: 0 0 auto;
  padding-right: 28px;
  font:
    500 10px "IBM Plex Mono",
    monospace;
  letter-spacing: 0.1em;
}
.atelier-marquee b {
  color: var(--hero-accent);
}
@keyframes heroCanvasFlow {
  50% {
    transform: translate(-11%, 12%) rotate(13deg) scale(1.12);
    opacity: 0.82;
  }
}
@keyframes heroLightContours {
  0% {
    transform: translate3d(-2%, -1%, 0) rotate(-3deg) scale(1);
  }
  100% {
    transform: translate3d(3%, 2%, 0) rotate(4deg) scale(1.08);
  }
}
@keyframes heroLightContourShift {
  0% {
    transform: translate3d(-7%, 5%, 0) rotate(-9deg) scale(0.88);
    border-radius: 48% 52% 43% 57% / 57% 42% 58% 43%;
  }
  100% {
    transform: translate3d(7%, -5%, 0) rotate(11deg) scale(1.09);
    border-radius: 57% 43% 55% 45% / 44% 57% 43% 56%;
  }
}
@keyframes heroLightSignal {
  0%,
  100% {
    opacity: 0.38;
    transform: scale(0.75);
  }
  50% {
    opacity: 0.92;
    transform: scale(1.12);
  }
}
@keyframes atelierMarquee {
  to {
    transform: translateX(-50%);
  }
}
@media (max-width: 900px) {
  .atelier-hero {
    min-height: auto;
    padding-top: 104px;
  }
  .atelier-copy {
    max-width: 100%;
    min-height: auto;
    padding: 70px 0 116px;
  }
  .atelier-copy h1 span:nth-child(2) {
    margin-left: 8vw;
  }
  .atelier-copy h1 span:nth-child(3) {
    padding-right: 0;
  }
  .atelier-scroll {
    display: none;
  }
}
@media (max-width: 620px) {
  .atelier-hero {
    box-sizing: border-box;
    flex-direction: column;
    min-height: auto;
    height: auto;
    display: block;
    padding: 96px 22px 58px;
  }
  .atelier-hero::before {
    width: min(85vw, 1200px);
    right: -24vw;
    top: -32%;
    opacity: 1;
    filter: blur(52px);
    animation: heroCanvasFlow 20s ease-in-out infinite;
  }
  .atelier-hero::after {
    inset: 14px;
    opacity: 0.72;
  }
  .atelier-header {
    flex: 0 0 auto;
    font-size: 10px;
  }
  .atelier-header span:last-child {
    display: inline;
  }
  .atelier-copy {
    flex: 1;
    display: flex;
    min-height: auto;
    padding: 70px 0 116px;
    justify-content: center;
  }
  .atelier-label {
    margin-bottom: clamp(26px, 5vh, 60px);
    font-size: 10px;
    letter-spacing: 0.12em;
  }
  .atelier-copy h1 {
    position: relative;
    z-index: 2;
    font-size: clamp(61px, 17vw, 96px);
    line-height: 0.82;
    text-align: initial;
    text-shadow: none;
  }
  .atelier-bottom {
    position: relative;
    z-index: 2;
    margin: 22px 0 0;
    display: block;
    margin-left: 0;
  }
  .atelier-bottom > p {
    max-width: 330px;
    padding-left: 14px;
    font-size: clamp(15px, 1.15vw, 18px);
    line-height: 1.55;
  }
  .atelier-actions {
    margin-top: 28px;
    width: auto;
  }
  .atelier-actions a {
    min-height: 46px;
  }
  .atelier-actions a:first-child {
    flex: initial;
    justify-content: initial;
  }
  .atelier-actions a:last-child {
    margin-top: 0;
  }
  .atelier-light-aurora {
    display: block !important;
  }
  .atelier-background {
    inset: -8%;
    opacity: 0.56;
  }
  .atelier-grid {
    opacity: 0.25;
  }
  .atelier-canvas-grain {
    opacity: 0.065;
  }
  .atelier-marquee {
    height: 38px;
  }
  .atelier-marquee span,
  .atelier-marquee b {
    font-size: 8px;
    padding-right: 18px;
  }
  .hero-canvas {
    filter: saturate(1.08) blur(0.1px);
  }
  .atelier-copy h1 span:nth-child(2) {
    margin-left: 8vw;
  }
  .atelier-copy h1 span:nth-child(3) {
    margin-left: 7vw;
    padding-right: 0;
    text-align: right;
  }
}
@media (prefers-reduced-motion: reduce) {
  .atelier-light-aurora,
  .atelier-light-aurora::before,
  .atelier-light-aurora::after,
  .atelier-marquee-track {
    animation: none;
  }
}
`}</style>
    </section>
  );
};
