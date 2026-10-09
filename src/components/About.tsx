import type React from "react";
import { useContext, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub, SiGmail } from "react-icons/si";
import { ThemeCtx, tokens } from "./design";
import profileAvatar from "../assets/profile-avatar.jpeg";

const beats = [
  {
    tag: "intro",
    eyebrow: "FULL-STACK DEVELOPER • AI ENGINEER",
    title:
      "Crafting digital experiences that feel effortless, intuitive, and built to last.",
  },
  {
    tag: "vision",
    eyebrow: "DESIGN WITH PURPOSE",
    title:
      "Every interface begins with clarity, because great products should never feel complicated.",
  },
  {
    tag: "engineering",
    eyebrow: "ENGINEERED TO SCALE",
    title:
      "From responsive frontends to reliable backends, every detail is built for real-world use.",
  },
  {
    tag: "innovation",
    eyebrow: "AI × WEB",
    title:
      "Blending intelligent automation with modern web technologies to create meaningful digital products.",
  },
  {
    tag: "future",
    eyebrow: "WHAT'S NEXT",
    title:
      "Continuously learning, building, and exploring ideas that shape the next generation of digital experiences.",
  },
];

const N = beats.length;

const socials = [
  {
    icon: SiGithub,
    href: "https://github.com/Preetham-2004",
    label: "GitHub",
    brandColor: "#181717",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/preetham-bhat-p1104/",
    label: "LinkedIn",
    brandColor: "#0A66C2",
  },
  {
    icon: SiGmail,
    href: "mailto:preethambhat1104@gmail.com",
    label: "Email",
    brandColor: "#EA4335",
  },
];

const Beat: React.FC<{
  index: number;
  progress: MotionValue<number>;
  t: typeof tokens.dark;
}> = ({ index, progress, t }) => {
  const start = index / N;
  const end = (index + 1) / N;
  const pad = 0.35 / N;
  const isFirst = index === 0;
  const isLast = index === N - 1;

  const spring = { stiffness: 150, damping: 30, mass: 0.32 };
  const opacity = useSpring(
    useTransform(
      progress,
      [start, start + pad, end - pad, end],
      [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0],
    ),
    spring,
  );
  const y = useSpring(
    useTransform(
      progress,
      [start, start + pad, end - pad, end],
      [isFirst ? 0 : 18, 0, 0, isLast ? 0 : -18],
    ),
    spring,
  );
  const beat = beats[index];

  return (
    <motion.div
      style={{
        opacity,
        y,
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        willChange: "transform, opacity",
        transform: "translateZ(0)",
      }}
    >
      <p
        style={{
          margin: "0 0 16px",
          color: t.accent,
          font: '500 12px "IBM Plex Mono", monospace',
          letterSpacing: ".12em",
        }}
      >
        {beat.eyebrow}
      </p>
      <h2
        style={{
          margin: 0,
          maxWidth: 640,
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: "clamp(30px, 3.6vw, 50px)",
          fontWeight: 600,
          lineHeight: 1.12,
          letterSpacing: "-0.03em",
          color: t.text,
        }}
      >
        {beat.title}
      </h2>
    </motion.div>
  );
};

export const About: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const { theme } = useContext(ThemeCtx);
  const t = tokens[theme];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const dark = theme === "dark";
  const glassBg = dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.4)";
  const glassBorder = dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.5)";
  const chipBg = dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.5)";

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
    restDelta: 0.001,
  });

  const jumpTo = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const distance = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + (i / N) * distance + 4;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="about-scroller"
      style={{
        position: "relative",
        height: `${N * 100}vh`,
        background: t.surface,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          width: "100%",
          overflow: "hidden",
        }}
        className="about-pinned"
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: dark ? 0.075 : 0.055,
            pointerEvents: "none",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='.9'/%3E%3C/svg%3E\")",
            mixBlendMode: dark ? "screen" : "multiply",
          }}
        />
        <motion.div
          aria-hidden="true"
          animate={{
            x: ["-5%", "5%"],
            y: ["-4%", "4%"],
            opacity: [0.18, 0.34, 0.18],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: "-20%",
            backgroundImage: `linear-gradient(${t.accent}20 1px, transparent 1px), linear-gradient(90deg, ${t.accent}20 1px, transparent 1px)`,
            backgroundSize: "150px 150px",
            maskImage:
              "radial-gradient(ellipse at 64% 48%, black, transparent 68%)",
            rotate: -12,
            willChange: "transform, opacity",
            pointerEvents: "none",
          }}
        />
        <motion.div
          aria-hidden="true"
          animate={{ x: ["-35%", "110%"], opacity: [0, 0.38, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
          style={{
            position: "absolute",
            top: "12%",
            width: "42vw",
            height: "110%",
            background: `linear-gradient(90deg, transparent, ${t.accent}24, transparent)`,
            filter: "blur(22px)",
            transform: "skewX(-18deg)",
            pointerEvents: "none",
          }}
        />
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.08, 0.34, 0.08], scaleX: [0.65, 1, 0.65] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            right: "8%",
            left: "37%",
            top: "19%",
            height: 1,
            transformOrigin: "left",
            background: `linear-gradient(90deg, transparent, ${t.accent}b8, transparent)`,
            boxShadow: `0 0 24px ${t.accent}55`,
            pointerEvents: "none",
          }}
        />

        {/* The glass surface IS the section now — full width, full height,
            no floating card with dead space around it. */}
        <div
          className="about-card"
          data-motion-group
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            padding: "clamp(28px, 4vw, 72px) min(6vw, 88px)",
            background: glassBg,
            border: `1px solid ${glassBorder}`,
            borderTop: `1px solid ${t.line}`,
            backdropFilter: "blur(30px) saturate(150%)",
            WebkitBackdropFilter: "blur(30px) saturate(150%)",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div
            className="about-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(240px, 0.85fr) minmax(0, 1.4fr)",
              gap: "clamp(32px, 5vw, 96px)",
              height: "100%",
            }}
          >
            {/* Identity column — spans the full height, top-anchored avatar,
                bottom-anchored socials, so it uses the vertical space instead
                of clumping in the middle. */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                paddingTop: "clamp(80px, 12vh, 140px)",
                boxSizing: "border-box",
              }}
            >
              <div>
                <div style={{ position: "relative", width: 112, height: 112 }}>
                  <motion.div
                    aria-hidden="true"
                    animate={{
                      scale: [0.86, 1.18, 0.86],
                      opacity: [0.08, 0.26, 0.08],
                    }}
                    transition={{
                      duration: 3.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      inset: -22,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${t.accent}65, transparent 66%)`,
                      filter: "blur(8px)",
                    }}
                  />
                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 14,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      position: "absolute",
                      inset: -3,
                      borderRadius: "50%",
                      background: `conic-gradient(from 0deg, ${t.accent}, transparent 40%, ${t.accent}90 70%, transparent)`,
                      padding: 2,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        background: t.surface,
                      }}
                    />
                  </motion.div>
                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 9,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      position: "absolute",
                      inset: -12,
                      border: `1px dashed ${t.accent}70`,
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{
                        position: "absolute",
                        top: -4,
                        left: "50%",
                        width: 7,
                        height: 7,
                        marginLeft: -3.5,
                        borderRadius: "50%",
                        background: t.accent,
                        boxShadow: `0 0 12px ${t.accent}`,
                      }}
                    />
                  </motion.div>
                  <motion.div
                    animate={{ rotateY: [0, 5, 0, -5, 0], y: [0, -2, 0] }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      inset: 3,
                      overflow: "hidden",
                      borderRadius: "50%",
                      background: dark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.7)",
                      transformPerspective: 500,
                    }}
                  >
                    <img
                      src={profileAvatar}
                      alt="Preetham Bhat"
                      loading="lazy"
                      decoding="async"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(145deg, ${t.accent}22, transparent 44%, rgba(0,0,0,.16))`,
                        mixBlendMode: "soft-light",
                      }}
                    />
                  </motion.div>
                  <motion.span
                    animate={{
                      scale: [1, 1.32, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(61,220,132,.55)",
                        "0 0 0 9px rgba(61,220,132,0)",
                        "0 0 0 0 rgba(61,220,132,0)",
                      ],
                    }}
                    transition={{
                      duration: 2.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      bottom: 3,
                      right: 3,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "#3ddc84",
                      border: `2px solid ${t.surface}`,
                    }}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h2
                    style={{
                      margin: "22px 0 0",
                      font: '600 28px "Space Grotesk", sans-serif',
                      color: t.text,
                    }}
                  >
                    Preetham Bhat
                  </h2>
                  <p
                    style={{
                      margin: "6px 0 0",
                      color: t.accent,
                      font: '500 13px "IBM Plex Mono", monospace',
                    }}
                  >
                    Product-minded developer
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginTop: 20,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "7px 12px",
                        borderRadius: 999,
                        background: chipBg,
                        border: `1px solid ${t.line}`,
                        color: t.textDim,
                        font: '500 11px "IBM Plex Mono", monospace',
                      }}
                    >
                      <MapPin size={12} color={t.accent} /> Mysuru, IN
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "7px 12px",
                        borderRadius: 999,
                        background: chipBg,
                        border: `1px solid ${t.line}`,
                        color: t.textDim,
                        font: '500 11px "IBM Plex Mono", monospace',
                      }}
                    >
                      4+ yrs building
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p
                  style={{
                    margin: "0 0 12px",
                    color: t.textFaint,
                    font: '500 10px "IBM Plex Mono", monospace',
                    letterSpacing: ".1em",
                  }}
                >
                  FIND ME ON
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  {socials.map(({ icon: Icon, href, label, brandColor }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      style={{
                        display: "grid",
                        placeItems: "center",
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: dark
                          ? `${brandColor}14`
                          : `${brandColor}0d`,
                        border: `1px solid ${dark ? `${brandColor}48` : `${brandColor}35`}`,
                        color:
                          label === "GitHub" && dark ? "#f5f7f6" : brandColor,
                        transition: "transform 0.2s ease, background 0.2s ease",
                      }}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Story column — vertically centered scroll-story on top,
                CTA + progress bar anchored to the bottom of the section. */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div
                className="about-story"
                style={{
                  position: "relative",
                  flex: 1,
                  display: "flex",
                  flexDirection: reducedMotion ? "column" : undefined,
                  justifyContent: "center",
                  gap: reducedMotion ? 28 : undefined,
                }}
              >
                {reducedMotion
                  ? beats.map((beat) => (
                      <div key={beat.tag}>
                        <p
                          style={{
                            marginBottom: 12,
                            color: t.accent,
                            font: '500 11px "IBM Plex Mono", monospace',
                          }}
                        >
                          {beat.eyebrow}
                        </p>
                        <h3
                          style={{
                            font: '600 clamp(24px, 3vw, 40px)/1.2 "Space Grotesk", sans-serif',
                            color: t.text,
                          }}
                        >
                          {beat.title}
                        </h3>
                      </div>
                    ))
                  : beats.map((_, i) => (
                      <Beat key={i} index={i} progress={smoothProgress} t={t} />
                    ))}
              </div>
              <div>
                <a
                  href="#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 18px",
                    borderRadius: 999,
                    border: `1px solid ${t.line}`,
                    color: t.text,
                    textDecoration: "none",
                    font: '500 13px "IBM Plex Mono", monospace',
                    background: chipBg,
                  }}
                >
                  View contact details{" "}
                  <ArrowUpRight size={16} color={t.accent} />
                </a>

                <div
                  style={{
                    marginTop: 28,
                    display: reducedMotion ? "none" : undefined,
                  }}
                >
                  <div
                    style={{
                      height: 3,
                      borderRadius: 999,
                      background: t.line,
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      style={{
                        height: "100%",
                        background: t.accent,
                        borderRadius: 999,
                        scaleX: smoothProgress,
                        transformOrigin: "left",
                        willChange: "transform",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    {beats.map((b, i) => (
                      <button
                        key={b.tag}
                        onClick={() => jumpTo(i)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          color: t.textFaint,
                          font: '500 10px "IBM Plex Mono", monospace',
                          letterSpacing: ".06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {b.tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .about-scroller { padding: 0 !important; }
          .about-grid { grid-template-columns: 1fr !important; height: auto !important; gap: 32px !important; }
          .about-grid > div:first-child { padding-top: 0 !important; gap: 28px; }
          .about-story { min-height: 320px; margin-bottom: 24px; }
          .about-card { height: auto !important; min-height: 100svh; padding-top: 96px !important; padding-bottom: 40px !important; overflow-y: auto !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-scroller { height: auto !important; }
          .about-pinned { position: relative !important; height: auto !important; }
          .about-card { height: auto !important; padding: 72px min(6vw, 88px) !important; }
        }
      `}</style>
    </section>
  );
};
