import type React from "react";
import { useContext, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import { ThemeCtx, tokens, SplitReveal } from "./design";

type SkillItem = { name: string; role: string };
type Category = {
  id: string;
  label: string;
  items: SkillItem[];
};

const CATEGORIES: Category[] = [
  {
    id: "languages",
    label: "Programming Languages",
    items: [
      {
        name: "Python",
        role: "Backend and machine learning",
      },
      {
        name: "Java",
        role: "Application development",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend Frameworks",
    items: [
      {
        name: "FastAPI",
        role: "Python API services",
      },
      {
        name: "Node.js",
        role: "JavaScript runtime",
      },
      {
        name: "Express.js",
        role: "Web services and routing",
      },
      {
        name: "REST APIs",
        role: "Service design",
      },
    ],
  },
  {
    id: "ai",
    label: "AI/ML Frameworks",
    items: [
      {
        name: "TensorFlow",
        role: "Deep learning",
      },
      {
        name: "PyTorch",
        role: "Deep learning",
      },
      {
        name: "Scikit-learn",
        role: "Machine learning",
      },
      {
        name: "YOLOv8",
        role: "Object detection",
      },
      {
        name: "BERT",
        role: "Natural language processing",
      },
      {
        name: "Pandas",
        role: "Data analysis",
      },
      {
        name: "NumPy",
        role: "Numerical computing",
      },
    ],
  },
  {
    id: "databases",
    label: "Databases & Caching",
    items: [
      {
        name: "MySQL",
        role: "Relational storage",
      },
      {
        name: "MongoDB",
        role: "Document storage",
      },
      {
        name: "Redis",
        role: "Caching",
      },
    ],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    items: [
      {
        name: "Git",
        role: "Version control",
      },
      {
        name: "GitHub",
        role: "Code collaboration",
      },
      {
        name: "Docker",
        role: "Containerization",
      },
      {
        name: "Postman",
        role: "API testing",
      },
      {
        name: "GitHub Actions",
        role: "Workflow automation",
      },
      {
        name: "CI/CD",
        role: "Continuous integration and delivery",
      },
      {
        name: "Render",
        role: "Deployment",
      },
    ],
  },
  {
    id: "other",
    label: "Other Technologies",
    items: [
      {
        name: "React.js",
        role: "Frontend interfaces",
      },
      {
        name: "JWT",
        role: "Token-based authentication",
      },
      {
        name: "OAuth 2.0",
        role: "Delegated authorization",
      },
      {
        name: "RabbitMQ",
        role: "Message queuing",
      },
      {
        name: "Jest",
        role: "Testing",
      },
    ],
  },
];

const DEFAULT_HISTORY = [
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `  ✦  TERMINAL  ✦`,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `  Type 'help' to see available topics.`,
  ``,
];

const MAX_INPUT_LENGTH = 64;
const MAX_HISTORY_LINES = 90;
const limitHistory = (lines: string[]) => lines.slice(-MAX_HISTORY_LINES);

const Line: React.FC<{ text: string; isPrompt?: boolean; accent?: string }> = ({
  text,
  isPrompt,
  accent,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.12 }}
    style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: "clamp(13px, 1.1vw, 16px)",
      color: isPrompt ? accent : undefined,
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      padding: isPrompt ? "4px 0" : "2px 0",
      lineHeight: 1.6,
    }}
  >
    {text}
  </motion.div>
);

export const SkillsSection: React.FC = () => {
  const { theme } = useContext(ThemeCtx);
  const t = tokens[theme];
  const dark = theme === "dark";

  const [history, setHistory] = useState<string[]>(DEFAULT_HISTORY);
  const [input, setInput] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (history.length > MAX_HISTORY_LINES) setHistory(limitHistory);
  }, [history]);

  // Smooth auto-scroll to bottom
  useEffect(() => {
    if (scrollContainerRef.current) {
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop =
            scrollContainerRef.current.scrollHeight;
        }
      });
    }
  }, [history]);

  const processCommand = (raw: string) => {
    const safeRaw = raw.replace(/[^\x20-\x7E]/g, "").slice(0, MAX_INPUT_LENGTH);
    const trimmed = safeRaw.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => limitHistory([...prev, `$ ${safeRaw.trim()}`]));

    if (trimmed === "clear" || trimmed === "cls") {
      setHistory(DEFAULT_HISTORY);
      return;
    }

    if (trimmed === "help") {
      const ids = CATEGORIES.map(
        (c) => `  ➜ ${c.id.padEnd(14)} ${c.label}`,
      ).join("\n");
      setHistory((prev) => [
        ...prev,
        `Available Categories:`,
        ids,
        ``,
        `Just type the category name (e.g., "backend", "ai").`,
      ]);
      return;
    }

    const cat = CATEGORIES.find((c) => c.id === trimmed);
    if (cat) {
      const skillLines = cat.items.map(
        (item) => `  ${item.name.padEnd(14)} ➜ ${item.role}`,
      );
      setHistory((prev) => [
        ...prev,
        `┌── ${cat.label.toUpperCase()} ──`,
        ...skillLines,
        ``,
        ``,
      ]);
      return;
    }

    const parts = trimmed.split(/\s+/);
    if (parts[0] === "show" && parts.length === 2) {
      const catAlias = CATEGORIES.find((c) => c.id === parts[1]);
      if (catAlias) {
        const skillLines = catAlias.items.map(
          (item) => `  ${item.name.padEnd(14)} ➜ ${item.role}`,
        );
        setHistory((prev) => [
          ...prev,
          `┌── ${catAlias.label.toUpperCase()} ──`,
          ...skillLines,
          `└───────────────────────────────`,
          ``,
        ]);
        return;
      }
    }

    setHistory((prev) => [
      ...prev,
      `  ❌ Unknown: "${parts[0]}". Type 'help' to list categories.`,
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    }
  };

  const bgColor = dark ? "rgba(11,12,16,0.82)" : "rgba(255,255,255,0.82)";
  const borderColor = t.line;
  const promptColor = t.accent;
  const textColor = t.text;

  return (
    <section
      id="skills"
      className="skills-canvas"
      style={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        paddingTop: 90,
        paddingBottom: 34,
        borderTop: `1px solid ${t.line}`,
      }}
    >
      <div className="skills-canvas-bg" aria-hidden="true">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: dark ? "#07100f" : "#f1f6f3",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: dark ? 0.11 : 0.028,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='.9'/%3E%3C/svg%3E\")",
            mixBlendMode: dark ? "screen" : "multiply",
          }}
        />
        <motion.div
          animate={{
            x: ["-8%", "9%", "-8%"],
            y: ["-5%", "8%", "-5%"],
            scale: [0.94, 1.06, 0.94],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: "min(76vw, 1100px)",
            height: "min(64vw, 900px)",
            left: "-27vw",
            top: "-27vw",
            borderRadius: "50%",
            background: dark
              ? "radial-gradient(ellipse, rgba(94,234,212,0.19), rgba(94,234,212,0.055) 44%, transparent 72%)"
              : "radial-gradient(ellipse, rgba(13,148,120,0.13), rgba(13,148,120,0.035) 44%, transparent 72%)",
            filter: "blur(68px)",
          }}
        />
        <motion.div
          animate={{ x: ["10%", "-10%", "10%"], y: ["5%", "-8%", "5%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: "min(58vw, 850px)",
            height: "min(58vw, 850px)",
            right: "-20vw",
            bottom: "-40vw",
            borderRadius: "50%",
            background: dark
              ? "radial-gradient(ellipse, rgba(94,234,212,0.13), transparent 68%)"
              : "radial-gradient(ellipse, rgba(13,148,120,0.09), transparent 68%)",
            filter: "blur(72px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: dark
              ? "linear-gradient(rgba(94,234,212,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.035) 1px, transparent 1px)"
              : "linear-gradient(rgba(13,148,120,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,120,0.035) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          }}
        />
      </div>
      <div
        data-motion-group
        style={{ padding: "0 min(8vw, 96px)", marginBottom: 32 }}
      >
        <SplitReveal
          text="Skill Codex"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(30px, 4.6vw, 56px)",
            color: t.text,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            marginBottom: 8,
          }}
        />
        <p
          style={{
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: 16,
            color: t.textDim,
            maxWidth: 560,
            margin: 0,
          }}
        >
          A modern terminal. Type{" "}
          <code style={{ fontFamily: "IBM Plex Mono" }}>help</code> to begin.
        </p>
      </div>

      <div
        data-motion-group
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0 min(8vw, 96px)",
          marginBottom: 32,
        }}
      >
        {/* MODERN TERMINAL WRAPPER */}
        <div
          style={{
            width: "100%",
            maxWidth: 820,
            height: 500,
            background: bgColor,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: `1px solid ${t.accent}25`, // Subtle glowing border
            borderRadius: 24,
            boxShadow: `0 24px 80px ${dark ? "rgba(0,0,0,0.3)" : "rgba(16,17,20,0.12)"}, inset 0 0 80px ${t.accent}08`,
            display: "flex",
            flexDirection: "column",
            fontFamily: "'IBM Plex Mono', monospace",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* 1. MODERN FIXED HEADER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 24px",
              borderBottom: `1px solid ${borderColor}`,
              background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Terminal size={18} color={t.accent} />
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: t.accent,
                  letterSpacing: "0.02em",
                }}
              >
                TRM
              </span>
            </div>
            <span style={{ fontSize: 11, color: t.textFaint }}>
              <span style={{ color: "#38c172", marginRight: 6 }}>●</span> ready
            </span>
          </div>

          {/* 2. SCROLLABLE HISTORY AREA */}
          <div
            ref={scrollContainerRef}
            data-lenis-prevent
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              overscrollBehavior: "contain",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <AnimatePresence initial={false}>
              {history.map((line, i) => (
                <Line
                  key={i}
                  text={line}
                  isPrompt={line.startsWith("$")}
                  accent={promptColor}
                />
              ))}
            </AnimatePresence>
          </div>

          <label
            htmlFor="skills-command"
            style={{
              margin: "16px 20px 8px",
              color: t.textDim,
              font: '500 10px "IBM Plex Mono", monospace',
              letterSpacing: "0.1em",
            }}
          >
            TYPE A COMMAND
          </label>
          <div
            className="terminal-input-bar"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              margin: "0 20px 20px",
              padding: "12px 14px",
              border: `1px solid ${dark ? `${t.accent}70` : t.accent}`,
              borderRadius: 10,
              flexShrink: 0,
              color: textColor,
              background: dark
                ? "rgba(94,234,212,0.07)"
                : "rgba(13,148,120,0.06)",
              transition: "box-shadow 0.2s ease, background 0.2s ease",
            }}
          >
            <span
              aria-hidden="true"
              style={{ color: promptColor, fontWeight: 700, fontSize: 16 }}
            >
              $
            </span>
            <input
              type="text"
              id="skills-command"
              aria-describedby="skills-command-hint"
              aria-label="Skills terminal command"
              value={input}
              onChange={(e) =>
                setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))
              }
              onKeyDown={handleKeyDown}
              maxLength={MAX_INPUT_LENGTH}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="Type help here…"
              style={{
                flex: 1,
                minWidth: 0,
                background: "transparent",
                border: "none",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "clamp(14px, 1.1vw, 16px)",
                color: textColor,
                caretColor: promptColor,
                padding: "6px 0",
              }}
            />
            <span
              id="skills-command-hint"
              style={{
                color: t.textDim,
                font: '500 10px "IBM Plex Mono", monospace',
                whiteSpace: "nowrap",
                border: `1px solid ${t.lineStrong}`,
                borderRadius: 5,
                padding: "5px 7px",
              }}
            >
              Enter ↵
            </span>
          </div>
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: 11,
          letterSpacing: "0.06em",
          color: t.textFaint,
          marginBottom: 32,
        }}
      >
        type · explore · discover
      </p>

      <style>{`
        .skills-canvas > :not(.skills-canvas-bg) { position: relative; z-index: 1; }
        .skills-canvas-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        #skills div::-webkit-scrollbar { width: 4px; }
        #skills div::-webkit-scrollbar-track { background: transparent; }
        #skills div::-webkit-scrollbar-thumb { background: ${t.accent}60; border-radius: 6px; }
        #skills div::-webkit-scrollbar-thumb:hover { background: ${t.accent}90; }
        .terminal-input-bar:focus-within { box-shadow: 0 0 0 2px ${t.accent}55, 0 0 24px ${t.accent}12; }
        #skills-command::placeholder { color: ${t.textDim}; opacity: 1; }
        #skills-command:focus-visible { outline: none; }
      `}</style>
    </section>
  );
};
