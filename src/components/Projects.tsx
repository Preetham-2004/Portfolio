import type React from "react";
import { useContext, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  SiAndroid,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiGooglegemini,
  SiHuggingface,
  SiJetpackcompose,
  SiJsonwebtokens,
  SiKotlin,
  SiMongodb,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVite,
  SiYolo,
} from "react-icons/si";
import { ThemeCtx, tokens, clipCorner, SplitReveal } from "./design";
import ecosnapImg from "../assets/ecosnap.png";
import plantDiseaseImg from "../assets/Plantdisease.png";
import pennyPilotImg from "../assets/PennyPilot.png";
import santeImg from "../assets/sante.png";
type Project = {
  id: string;
  num: string;
  title: string;
  tag: string;
  description: string;
  stack: string[];
  detail: string;
  phases: string[];
  image: string;
  repoUrl?: string;
  paperUrl?: string;
};

const PROJECTS: Project[] = [
  {
    id: "marketplace",
    num: "01",
    title: "EcoSnap",
    tag: "Hackathon",
    description:
      "An AI-powered web app that identifies waste from images or voice input and guides users to dispose of it correctly as recyclable, non-recyclable, or biodegradable.",
    stack: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "BERT",
      "MobileNetV2",
    ],
    detail:
      "EcoSnap combines MobileNetV2 image classification with BERT-powered text classification to make waste sorting more accessible. Users can upload an image or describe an item by voice, receive real-time disposal guidance and location-aware recommendations, then earn points for correct sorting.",
    phases: [
      "Image and voice-based waste classification",
      "Real-time disposal guidance and local recommendations",
      "Gamified points and engagement tracking",
    ],
    image: ecosnapImg,
    repoUrl: "https://github.com/Preetham-2004/EcoSnap",
  },
  {
    id: "revenue",
    num: "02",
    title: "Plant Disease Detection",
    tag: "Research Project",
    description:
      "A full-stack deep learning system that detects affected plant parts, predicts disease classes, and generates treatment guidance through a production-style web app.",
    stack: [
      "Python",
      "FastAPI",
      "React Vite",
      "TensorFlow",
      "YOLOv8",
      "Firebase",
    ],
    detail:
      "Built for tomato, potato, and eggplant disease analysis using a unified dataset of 8,158 images and 12,913 labeled objects. YOLOv8 localizes affected plant parts, TensorFlow predicts disease classes and severity, and the React + FastAPI app presents visual results, treatment guidance, Firebase-backed authentication, and prediction history.",
    phases: [
      "Plant-part localization with YOLOv8",
      "Disease and severity classification with TensorFlow",
      "Treatment guidance, authentication, and history",
    ],
    image: plantDiseaseImg,
    repoUrl: "https://github.com/Preetham-2004/Plant_Disease_Detection",
    paperUrl: "https://ieeexplore.ieee.org/document/11583553",
  },
  {
    id: "pennypilot",
    num: "03",
    title: "PennyPilot",
    tag: "Expense Tracker",
    description:
      "PennyPilot is a modern personal finance tracker that simplifies your income and expense management. Powered by a smart dashboard, charts, it brings automation and clarity to your financial life.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
    ],
    detail:
      "A full-stack finance manager for securely adding and managing income and expense entries. JWT authentication protects each account, while a real-time dashboard surfaces category-wise charts, filters, summaries, and financial insights from data stored in MongoDB.",
    phases: [
      "JWT authentication and income/expense entry management",
      "Real-time dashboard, charts, and category analytics",
      "MongoDB-backed data with a responsive, dark-themed interface",
    ],
    image: pennyPilotImg,
    repoUrl: "https://github.com/Preetham-2004/PennyPilot",
  },
  {
    id: "discovery",
    num: "04",
    title: "Budakattu-Sante",
    tag: "Android Marketplace",
    description:
      "Budakattu-Sante is a modern offline-first Android marketplace designed to connect tribal cooperatives directly with urban buyers while eliminating middlemen exploitation.",
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "Firebase",
      "Room",
      "Hilt",
      "Gemini API",
    ],
    detail:
      "An offline-first Android platform built with Clean Architecture and MVVM. Buyers can browse, search, trace, and preorder products through a cart and checkout flow, while cooperative leaders manage inventory and access analytics. Firebase synchronization, Room persistence, and background sync support low-network regions; Gemini adds voice accessibility and smart guidance.",
    phases: [
      "Buyer marketplace, product traceability, cart, and checkout",
      "Cooperative inventory management and analytics dashboard",
      "Offline synchronization and Gemini-powered accessibility",
    ],
    image: santeImg,
    repoUrl: "https://github.com/Preetham-2004/Tribal_marketplace",
  },
];

const STACK_LOGOS = {
  Python: { Icon: SiPython, color: "#3776AB" },
  FastAPI: { Icon: SiFastapi, color: "#009688" },
  React: { Icon: SiReact, color: "#61DAFB" },
  "React Vite": { Icon: SiVite, color: "#A074FF" },
  Vite: { Icon: SiVite, color: "#A074FF" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#38BDF8" },
  TensorFlow: { Icon: SiTensorflow, color: "#FF6F00" },
  YOLOv8: { Icon: SiYolo, color: "#00FFFF" },
  BERT: { Icon: SiHuggingface, color: "#FFD21E" },
  MobileNetV2: { Icon: SiTensorflow, color: "#FF6F00" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  Express: { Icon: SiExpress, color: "currentColor" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  JWT: { Icon: SiJsonwebtokens, color: "#D63AFF" },
  Kotlin: { Icon: SiKotlin, color: "#7F52FF" },
  "Jetpack Compose": { Icon: SiJetpackcompose, color: "#4285F4" },
  Firebase: { Icon: SiFirebase, color: "#FFCA28" },
  Room: { Icon: SiAndroid, color: "#3DDC84" },
  Hilt: { Icon: SiAndroid, color: "#3DDC84" },
  "Gemini API": { Icon: SiGooglegemini, color: "#8E75FF" },
};

const StackLogo = ({ name }: { name: string }) => {
  const logo = STACK_LOGOS[name as keyof typeof STACK_LOGOS];
  if (!logo)
    return (
      <span
        aria-hidden="true"
        style={{
          width: 16,
          height: 16,
          display: "inline-grid",
          placeItems: "center",
          color: "currentColor",
          border: "1px solid currentColor",
          borderRadius: 3,
          fontSize: 8,
        }}
      >
        •
      </span>
    );
  return <logo.Icon aria-hidden="true" size={16} color={logo.color} />;
};

const ProjectPreview: React.FC<{ project: Project }> = ({ project }) => (
  <img
    src={project.image}
    alt={`${project.title} preview`}
    loading="lazy"
    decoding="async"
    style={{
      display: "block",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: 8,
    }}
  />
);

const ProjectRow: React.FC<{ project: Project; onOpen: () => void }> = ({
  project,
  onOpen,
}) => {
  const { theme } = useContext(ThemeCtx);
  const t = tokens[theme];
  const dark = theme === "dark";
  const [hover, setHover] = useState(false);
  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);
  const springX = useSpring(previewX, {
    stiffness: 180,
    damping: 24,
    mass: 0.4,
  });
  const springY = useSpring(previewY, {
    stiffness: 180,
    damping: 24,
    mass: 0.4,
  });

  return (
    <a
      href={`/projects/${project.id}`}
      onClick={(event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        onOpen();
      }}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        previewX.set(event.clientX - bounds.left + 18);
        previewY.set(event.clientY - bounds.top - 84);
      }}
      style={{
        color: "inherit",
        textDecoration: "none",
        position: "relative",
        borderBottom: `1px solid ${dark ? t.line : t.lineStrong}`,
        borderLeft: hover ? `3px solid ${t.accent}` : "3px solid transparent",
        padding: "40px min(8vw, 96px)",
        display: "grid",
        gridTemplateColumns: "70px 1fr auto",
        alignItems: "center",
        gap: 32,
        cursor: "pointer",
        overflow: "hidden",
        background: hover
          ? dark
            ? "rgba(77, 225, 151, 0.14)"
            : `linear-gradient(100deg, ${t.accentDim}, rgba(255,255,255,0.97) 48%, rgba(255,255,255,0.84))`
          : dark
            ? "rgba(255,255,255,0.035)"
            : "rgba(255,255,255,0.82)",
        backdropFilter: "blur(18px) saturate(145%)",
        WebkitBackdropFilter: "blur(18px) saturate(145%)",
        boxShadow: hover
          ? `inset 0 1px 0 ${dark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.96)"}, 0 16px 34px ${dark ? "rgba(0,0,0,0.12)" : "rgba(16,17,20,0.08)"}`
          : "none",
        transition:
          "background 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease, box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: hover
          ? "translateY(-2px) scale(1.002)"
          : "translateY(0) scale(1)",
        willChange: "transform, background, box-shadow",
      }}
      className="project-row"
    >
      <motion.div
        className="project-preview"
        initial={false}
        animate={{
          opacity: hover ? 1 : 0,
          scale: hover ? 1 : 0.94,
          rotate: hover ? 1.4 : -1.1,
          y: hover ? 0 : 8,
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          zIndex: 3,
          left: 0,
          top: 0,
          x: springX,
          y: springY,
          width: "clamp(190px, 22vw, 280px)",
          aspectRatio: "1.35",
          overflow: "hidden",
          borderRadius: 12,
          border: `1px solid ${t.lineStrong}`,
          boxShadow: "0 20px 42px rgba(0,0,0,0.32)",
          pointerEvents: "none",
        }}
      >
        <ProjectPreview project={project} />
      </motion.div>
      <span
        style={{
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: 12,
          color: dark ? t.textFaint : t.textDim,
          fontWeight: 600,
        }}
      >
        {project.num}
      </span>

      <div style={{ overflow: "hidden" }}>
        <h3
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(26px, 4.2vw, 50px)",
            color: t.text,
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: "-0.01em",
            transform: hover ? "translateX(10px)" : "translateX(0)",
            transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: 13.5,
            color: t.textDim,
            marginTop: 10,
            maxWidth: 480,
            lineHeight: 1.55,
            opacity: hover || !dark ? 1 : 0.75,
            transition: "opacity 0.3s ease",
          }}
        >
          {project.description}
        </p>
        <div
          style={{ display: "flex", gap: 14, marginTop: 14, flexWrap: "wrap" }}
        >
          {project.stack.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 10,
                color: t.textFaint,
                letterSpacing: "0.03em",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 10,
        }}
      >
        <span
          style={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: 10,
            letterSpacing: "0.08em",
            color: t.accent,
            border: `1px solid ${t.accent}55`,
            background: dark ? "transparent" : t.accentDim,
            padding: "4px 10px",
            clipPath: clipCorner(5),
          }}
        >
          {project.tag.toUpperCase()}
        </span>
        <span
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
            fontSize: 24,
            color: hover ? t.accent : dark ? t.textFaint : t.textDim,
            background: hover && !dark ? t.accentDim : "transparent",
            width: 38,
            height: 38,
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            transition:
              "color 0.3s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: hover ? "translateX(0)" : "translateX(-3px)",
          }}
        >
          →
        </span>
      </div>
    </a>
  );
};

export const Projects: React.FC = () => {
  const { theme } = useContext(ThemeCtx);
  const t = tokens[theme];
  const dark = theme === "dark";
  const openProjectPage = (project: Project) => {
    window.history.pushState({}, "", `/projects/${project.id}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return (
    <section
      id="work"
      style={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        overflowX: "hidden",
        paddingTop: 28,
        position: "relative",
        background: dark
          ? `radial-gradient(circle at 76% 26%, ${t.accent}18 0%, transparent 30%), radial-gradient(circle at 18% 72%, ${t.accent}0f 0%, transparent 34%), rgba(10,12,14,0.28)`
          : `radial-gradient(circle at 76% 12%, ${t.accent}22 0%, transparent 31%), linear-gradient(180deg, ${t.surfaceRaised} 0%, ${t.bg} 100%)`,
        backdropFilter: "blur(18px) saturate(150%)",
        WebkitBackdropFilter: "blur(18px) saturate(150%)",
        border: dark
          ? `1px solid rgba(255,255,255,0.04)`
          : `1px solid ${t.lineStrong}`,
        boxShadow: dark
          ? "0 10px 30px rgba(0,0,0,0.5)"
          : "0 10px 24px rgba(18,18,18,0.06)",
        backgroundClip: "border-box",
      }}
    >
      <div
        data-motion-group
        style={{ padding: "0 min(8vw, 96px)", marginBottom: 32 }}
      >
        <SplitReveal
          text="Selected Work"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(30px, 4.6vw, 56px)",
            color: t.text,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
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
          Breaking things. Fixing them.
        </p>
      </div>
      <div data-motion-group>
        {PROJECTS.map((p) => (
          <ProjectRow
            key={p.id}
            project={p}
            onOpen={() => openProjectPage(p)}
          />
        ))}
      </div>
      <style>{`@media (max-width: 760px) { .project-preview { display: none; } }`}</style>
    </section>
  );
};

export const ProjectDetailPage: React.FC<{ projectId: string }> = ({
  projectId,
}) => {
  const { theme } = useContext(ThemeCtx);
  const t = tokens[theme];
  const dark = theme === "dark";
  const project = PROJECTS.find((item) => item.id === projectId);
  const returnToProjects = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new Event("navigate-projects"));
  };

  if (!project) {
    return (
      <main
        id="main-content"
        tabIndex={-1}
        style={{
          minHeight: "100svh",
          display: "grid",
          placeItems: "center",
          padding: 24,
        }}
      >
        <a href="/" style={{ color: t.accent }}>
          Project not found - return home
        </a>
      </main>
    );
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      style={{
        minHeight: "100svh",
        padding: "clamp(28px, 4vw, 56px) min(6vw, 96px) 72px",
        background: t.surface,
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <button
          onClick={returnToProjects}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            border: `1px solid ${t.line}`,
            borderRadius: 999,
            background: "transparent",
            color: t.text,
            cursor: "pointer",
            font: '500 11px "IBM Plex Mono", monospace',
            letterSpacing: ".1em",
          }}
        >
          <span
            aria-hidden="true"
            style={{ color: t.accent, fontSize: 18, lineHeight: 0 }}
          >
            ←
          </span>{" "}
          BACK TO PROJECTS
        </button>
        <div
          className="project-dossier"
          style={{
            display: "grid",
            gridTemplateColumns: "54px minmax(0, 1.08fr) minmax(320px, 0.92fr)",
            gap: "clamp(24px, 5vw, 72px)",
            marginTop: "clamp(46px, 7vw, 88px)",
            alignItems: "center",
          }}
        >
          <div
            className="project-detail-rail"
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "2px 0",
              borderRight: `1px solid ${t.line}`,
            }}
          >
            <span
              style={{
                color: t.accent,
                font: '600 12px "IBM Plex Mono", monospace',
              }}
            >
              {project.num}
            </span>
            <span
              style={{
                color: t.textFaint,
                font: '500 9px "IBM Plex Mono", monospace',
                letterSpacing: ".14em",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              CASE FILE
            </span>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: t.accent,
                boxShadow: `0 0 18px ${t.accent}`,
              }}
            />
          </div>
          <div>
            <span
              style={{
                display: "block",
                color: t.accent,
                font: '500 11px "IBM Plex Mono", monospace',
                letterSpacing: ".1em",
              }}
            >
              {project.num} / {String(PROJECTS.length).padStart(2, "0")} -{" "}
              {project.tag.toUpperCase()}
            </span>
            <h1
              style={{
                margin: "18px 0 22px",
                color: t.text,
                font: '700 clamp(48px, 7vw, 92px)/0.96 "Space Grotesk", sans-serif',
                letterSpacing: "-0.055em",
              }}
            >
              {project.title}
            </h1>
            <p
              style={{
                maxWidth: 590,
                margin: 0,
                color: t.textDim,
                font: '17px/1.7 "IBM Plex Sans", sans-serif',
              }}
            >
              {project.description}
            </p>
          </div>
          <div
            style={{
              position: "relative",
              aspectRatio: "1.25",
              overflow: "hidden",
              borderRadius: "22px 4px 22px 4px",
              border: `1px solid ${t.lineStrong}`,
              boxShadow: "0 24px 70px rgba(0,0,0,0.25)",
            }}
          >
            <ProjectPreview project={project} />
            <span
              style={{
                position: "absolute",
                right: 18,
                top: 4,
                color: "rgba(255,255,255,0.22)",
                font: '700 clamp(58px, 7vw, 104px)/1 "Space Grotesk", sans-serif',
                letterSpacing: "-.08em",
                pointerEvents: "none",
              }}
            >
              {project.num}
            </span>
            <div
              style={{
                position: "absolute",
                left: 16,
                bottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  padding: "7px 10px",
                  border: `1px solid ${dark ? t.line : "rgba(255,255,255,0.22)"}`,
                  borderRadius: 2,
                  background: "rgba(8,12,14,0.82)",
                  color: "#f7fbf9",
                  font: '500 10px "IBM Plex Mono", monospace',
                  letterSpacing: ".08em",
                }}
              >
                PROJECT PREVIEW
              </span>
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "7px 10px",
                    border: `1px solid ${t.accent}99`,
                    borderRadius: 2,
                    background: t.accent,
                    color: t.accentText,
                    textDecoration: "none",
                    font: '600 10px "IBM Plex Mono", monospace',
                    letterSpacing: ".08em",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                      fill="currentColor"
                    />
                  </svg>
                  GITHUB ↗
                </a>
              )}
              {project.paperUrl && (
                <a
                  href={project.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View the ${project.title} paper`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "7px 10px",
                    border: `1px solid ${dark ? t.line : "rgba(255,255,255,0.22)"}`,
                    borderRadius: 2,
                    background: "rgba(8,12,14,0.88)",
                    color: "#f7fbf9",
                    textDecoration: "none",
                    font: '600 10px "IBM Plex Mono", monospace',
                    letterSpacing: ".08em",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{ color: t.accent, fontSize: 13, lineHeight: 1 }}
                  >
                    ↗
                  </span>
                  VIEW PAPER
                </a>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.35fr) minmax(260px, 0.65fr)",
            gap: "clamp(32px, 7vw, 100px)",
            marginTop: "clamp(64px, 9vw, 120px)",
            alignItems: "start",
          }}
          className="project-detail-content"
        >
          <section
            style={{
              position: "relative",
              padding: "clamp(22px, 3vw, 36px) clamp(22px, 4vw, 54px)",
              borderTop: `1px solid ${t.accent}`,
              borderBottom: `1px solid ${t.line}`,
              background: `linear-gradient(90deg, ${t.accent}0c, transparent 70%)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  color: t.accent,
                  font: '600 10px "IBM Plex Mono", monospace',
                }}
              >
                01
              </span>
              <p
                style={{
                  margin: 0,
                  color: t.textFaint,
                  font: '500 10px "IBM Plex Mono", monospace',
                  letterSpacing: ".12em",
                }}
              >
                PROJECT OVERVIEW
              </p>
            </div>
            <p
              style={{
                maxWidth: 720,
                margin: "22px 0 0",
                color: t.text,
                font: '400 clamp(21px, 2.25vw, 31px)/1.42 "Space Grotesk", sans-serif',
                letterSpacing: "-0.025em",
              }}
            >
              {project.detail}
            </p>
          </section>
          <aside
            style={{
              borderLeft: `1px solid ${t.line}`,
              padding: "8px 0 8px 22px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: t.textFaint,
                font: '500 10px "IBM Plex Mono", monospace',
                letterSpacing: ".12em",
              }}
            >
              SYSTEM COMPONENTS
            </p>
            <div style={{ marginTop: 14 }}>
              {project.stack.map((item, index) => (
                <div
                  key={item}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "32px 20px 1fr",
                    alignItems: "center",
                    gap: 9,
                    padding: "10px 0",
                    borderBottom: `1px solid ${t.line}`,
                    color: t.textDim,
                    font: '500 11px "IBM Plex Mono", monospace',
                  }}
                >
                  <span style={{ color: t.accent }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <StackLogo name={item} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: `1px solid ${t.accent}`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: t.textFaint,
                  font: '500 10px "IBM Plex Mono", monospace',
                  letterSpacing: ".12em",
                }}
              >
                DELIVERY MODEL
              </p>
              <p
                style={{
                  margin: "9px 0 0",
                  color: t.textDim,
                  font: '15px/1.55 "IBM Plex Sans", sans-serif',
                }}
              >
                {project.phases.length} independent phases, one connected
                product system.
              </p>
            </div>
          </aside>
        </div>
        <section
          style={{
            marginTop: "clamp(36px, 5vw, 64px)",
            paddingTop: 16,
            borderTop: `1px solid ${t.line}`,
          }}
        >
          <p
            style={{
              margin: 0,
              color: t.textFaint,
              font: '500 10px "IBM Plex Mono", monospace',
              letterSpacing: ".12em",
            }}
          >
            BUILD PHASES
          </p>
          <div style={{ marginTop: 12 }}>
            {project.phases.map((phase, index) => (
              <div
                key={phase}
                style={{
                  display: "grid",
                  gridTemplateColumns: "52px 1fr",
                  gap: 12,
                  padding: "13px 0",
                  borderBottom: `1px solid ${t.line}`,
                  color: t.text,
                }}
              >
                <span
                  style={{
                    color: t.accent,
                    font: '500 11px "IBM Plex Mono", monospace',
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    font: '600 clamp(17px, 1.8vw, 22px) "Space Grotesk", sans-serif',
                  }}
                >
                  {phase}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <style>{`@media (max-width: 760px) { .project-dossier, .project-detail-content { grid-template-columns: 1fr !important; } .project-detail-rail { display: none !important; } }`}</style>
    </main>
  );
};
