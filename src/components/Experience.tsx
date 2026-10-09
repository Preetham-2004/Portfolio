import type React from "react";
import { useContext, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Calendar, MapPin, Code, User } from "lucide-react";
import { ThemeCtx, tokens, clipCorner, SplitReveal } from "./design";

type ExperienceType = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
};

type ThemeTokens = (typeof tokens)[keyof typeof tokens];

const EXPERIENCES: ExperienceType[] = [
  {
    company: "IBM SkillsBuild",
    role: "AI & Web Developer Intern",
    period: "July 2024 - Aug 2024",
    location: "Mysore, India",
    description:
      "Internship focused on AI and web development. Developed a mental health web app using NLP and Dialogflow, while collaborating with cross-functional teams using Agile methodologies.",
    achievements: [
      "Developed an AI-powered web app for mental health using NLP, Dialogflow, and the MERN stack.",
      "Optimized database queries reducing load time by 40%.",
      "Collaborated with cross-functional teams using Agile methodologies.",
    ],
    techStack: ["React", "Node.js", "TypeScript", "Dialogflow", "NLP"],
  },
  {
    company: "MindMatrix.io",
    role: "Android Application Developer Intern",
    period: "Feb 2026 - May 2026",
    location: "Bangalore, India",
    description:
      "Industry-aligned, hands-on learning in Android application development, GenAI exploration, UI/UX design, and project-based Android workflows.",
    achievements: [
      "Built Android applications using Kotlin and Jetpack Compose.",
      "Explored GenAI capabilities with Android Studio and Google Cloud Labs.",
      "Designed UI/UX, prototyped features, and completed debugging and iterative enhancements.",
      "Applied Firebase integration, testing, and standard Android development workflows.",
    ],
    techStack: [
      "Kotlin",
      "Jetpack Compose",
      "Firebase",
      "Google Cloud",
      "GenAI",
      "Android Studio",
    ],
  },
];

export const ExperienceSection: React.FC = () => {
  const { theme } = useContext(ThemeCtx);
  const t = tokens[theme];
  const [selectedId, setSelectedId] = useState(EXPERIENCES[0].company);

  const activeExp = EXPERIENCES.find((exp) => exp.company === selectedId)!;

  return (
    <section
      id="experience"
      className="experience-canvas"
      style={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        padding: "72px min(8vw, 96px) 28px",
        borderTop: `1px solid ${t.line}`,
      }}
    >
      <div className="experience-canvas-bg" aria-hidden="true">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: theme === "dark" ? "#0b1111" : "#f5f7f4",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: theme === "dark" ? 0.055 : 0.018,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='.9'/%3E%3C/svg%3E\")",
            mixBlendMode: theme === "dark" ? "screen" : "multiply",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "min(76vw, 1150px)",
            height: "min(66vw, 900px)",
            left: "-28vw",
            top: "-22vw",
            borderRadius: "50%",
            background:
              theme === "dark"
                ? `radial-gradient(ellipse, ${t.accent}12 0%, ${t.accent}06 43%, transparent 73%)`
                : "radial-gradient(ellipse, rgba(13,148,120,0.055) 0%, rgba(13,148,120,0.018) 43%, transparent 73%)",
            filter: "blur(78px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "min(68vw, 1000px)",
            height: "min(68vw, 1000px)",
            right: "-24vw",
            bottom: "-42vw",
            borderRadius: "50%",
            background:
              theme === "dark"
                ? `radial-gradient(ellipse, ${t.accent}0d 0%, ${t.accent}04 42%, transparent 72%)`
                : "radial-gradient(ellipse, rgba(13,148,120,0.038) 0%, rgba(13,148,120,0.012) 42%, transparent 72%)",
            filter: "blur(78px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              theme === "dark"
                ? "radial-gradient(ellipse 58% 85% at 56% 47%, transparent 10%, rgba(5, 10, 11, 0.12) 100%)"
                : "radial-gradient(ellipse 58% 85% at 56% 47%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.03) 58%, rgba(219,231,225,0.08) 100%)",
          }}
        />
      </div>
      <div data-motion-group style={{ marginBottom: 50 }}>
        <div style={{ maxWidth: 620 }}>
          <SplitReveal
            text="My Experiences."
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(34px, 5vw, 64px)",
              color: t.text,
              lineHeight: 1.16,
              letterSpacing: "-0.045em",
              paddingBottom: "0.12em",
            }}
          />
          <p
            style={{
              maxWidth: 420,
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: 14,
              lineHeight: 1.65,
              color: t.textDim,
              margin: "16px 0 0",
            }}
          >
            Select a node below to unlock the full data stream.
          </p>
        </div>
      </div>

      <div
        className="experience-layout"
        data-motion-group
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "clamp(24px, 4vw, 48px)",
          maxWidth: 1040,
          position: "relative",
        }}
      >
        {/* LEFT PANEL: SOFT BOUNCE SELECTOR */}
        <div
          className="experience-options"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            flex: "0 0 auto",
            width: "clamp(160px, 22vw, 240px)",
          }}
        >
          {EXPERIENCES.map((exp) => {
            const isActive = selectedId === exp.company;
            return (
              <motion.button
                key={exp.company}
                aria-pressed={isActive}
                onClick={() => setSelectedId(exp.company)}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                // ✅ Soft satisfying spring, scale up, and a subtle glow
                whileHover={{
                  x: 8,
                  scale: 1.03,
                  boxShadow: `0 0 30px ${t.accent}25`,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 15 }}
                style={{
                  padding: "20px 18px",
                  background: isActive ? t.surfaceRaised : "transparent",
                  border: isActive
                    ? `1px solid ${t.accent}`
                    : `1px solid ${t.line}`,
                  borderRadius: 16,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  boxShadow: isActive ? `0 0 24px ${t.accent}15` : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(circle at 30% 30%, ${t.accent}15, transparent 70%)`,
                      pointerEvents: "none",
                    }}
                  />
                )}
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: isActive ? t.accent : t.text,
                    marginBottom: 4,
                  }}
                >
                  {exp.company}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: t.textFaint,
                    fontFamily: "IBM Plex Mono, monospace",
                  }}
                >
                  {exp.role}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* RIGHT PANEL: SMOOTH 3D TILT CARD */}
        <div style={{ flex: 1, minWidth: 0, perspective: 1200 }}>
          <TiltCard exp={activeExp} t={t} />
        </div>
      </div>
      <style>{`.experience-canvas > :not(.experience-canvas-bg) { position: relative; z-index: 1; }.experience-canvas-bg { position: absolute; z-index: -1; inset: 0; pointer-events: none; } @media (max-width: 680px) { .experience-layout { flex-direction: column !important; } .experience-options { width: 100% !important; flex-direction: row !important; flex-wrap: wrap; } .experience-options > button { flex: 1 1 130px; } }`}</style>
    </section>
  );
};

// --- 3D Tilt Card Sub-Component (Massively smoothed out) ---
const TiltCard: React.FC<{ exp: ExperienceType; t: ThemeTokens }> = ({
  exp,
  t,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // ✅ Smooth spring interpolation eliminates the "sharp" jittery feel
  const springConfig = { stiffness: 140, damping: 16, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(y, [-100, 100], [8, -8]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(x, [-100, 100], [-8, 8]),
    springConfig,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      key={exp.company}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // ✅ Satisfying hover scale + soft box-shadow pop
      whileHover={{ scale: 1.015, boxShadow: "0 30px 80px rgba(0,0,0,0.25)" }}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        background: t.surface,
        border: `1px solid ${t.line}`,
        clipPath: clipCorner(18),
        padding: "clamp(28px, 4vw, 40px)",
        boxShadow: `0 24px 80px rgba(0,0,0,0.2)`,
        position: "relative",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* 1. Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          paddingBottom: 20,
          borderBottom: `1px solid ${t.line}`,
          marginBottom: 20,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: 10.5,
              color: t.flag,
              letterSpacing: "0.08em",
              margin: "0 0 8px",
            }}
          >
            {exp.role.toUpperCase()}
          </p>
          <h3
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 600,
              letterSpacing: "-0.035em",
              color: t.text,
              margin: 0,
            }}
          >
            {exp.company}
          </h3>
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: 30,
            padding: "0 14px",
            background: t.accent,
            color: t.accentText,
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            clipPath: clipCorner(6),
          }}
        >
          Verified
        </span>
      </div>

      {/* 2. Metadata */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 24px",
          marginBottom: 24,
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: 11,
          color: t.textDim,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
          <Calendar size={14} color={t.accent} />
          {exp.period}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
          <MapPin size={14} color={t.accent} />
          {exp.location}
        </span>
      </div>

      {/* 3. Description */}
      <p
        style={{
          fontFamily: "IBM Plex Sans, sans-serif",
          fontSize: 15,
          lineHeight: 1.72,
          color: t.textDim,
          margin: "0 0 28px",
        }}
      >
        {exp.description}
      </p>

      {/* 4. Interactive Achievements (Soft Bounce + Glow) */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <User size={16} color={t.text} />
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: t.text,
            }}
          >
            Key Achievements
          </span>
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {exp.achievements.map((item, i) => (
            <motion.li
              key={item}
              // ✅ Satisfying spring + color pop on hover
              whileHover={{
                x: 10,
                scale: 1.02,
                color: t.accent,
                borderColor: t.accent,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              style={{
                padding: "10px 14px",
                background: t.surfaceRaised,
                border: `1px solid ${t.line}`,
                borderRadius: 12,
                fontFamily: "IBM Plex Sans, sans-serif",
                fontSize: 14,
                lineHeight: 1.5,
                color: t.textDim,
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  color: t.accent,
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: 11,
                  paddingTop: 2,
                }}
              >
                ▸ 0{i + 1}
              </span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* 5. Tech Stack (Bouncy Pillars) */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          flexWrap: "wrap",
          paddingTop: 16,
          borderTop: `1px solid ${t.line}`,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            paddingTop: 4,
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: 10.5,
            color: t.textFaint,
            letterSpacing: "0.07em",
          }}
        >
          <Code size={14} />
          STACK
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {exp.techStack.map((tech) => (
            <motion.span
              key={tech}
              // ✅ Heavy spring + glow on hover
              whileHover={{
                y: -6,
                scale: 1.05,
                borderColor: t.accent,
                boxShadow: `0 0 20px ${t.accent}20`,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 15 }}
              style={{
                padding: "4px 14px",
                border: `1px solid ${t.line}`,
                borderRadius: 999,
                color: t.text,
                fontFamily: "IBM Plex Sans, sans-serif",
                fontSize: 13,
                transition: "border-color 0.2s ease",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
