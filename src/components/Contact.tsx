import type React from "react";
import { useContext, useRef, useState } from "react";
import { ArrowUp, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { ThemeCtx, tokens, clipCorner, Reveal, SplitReveal } from "./design";
import { Captcha } from "./Captcha";
export const Contact: React.FC = () => {
  const { theme } = useContext(ThemeCtx);
  const t = tokens[theme];
  const formRef = useRef<HTMLFormElement>(null);
  const submitting = useRef(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaAttempt, setCaptchaAttempt] = useState(0);
  const captchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const emailConfigured = Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY &&
    captchaSiteKey,
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || submitting.current || !emailConfigured) return;
    const element = formRef.current;
    if (new FormData(element).get("website")) return;
    for (const name of ["name", "email", "subject", "message"]) {
      const field = element.elements.namedItem(name) as
        HTMLInputElement | HTMLTextAreaElement;
      field.setCustomValidity(
        !field.value.trim()
          ? "Please enter a value."
          : field.value.length > field.maxLength
            ? `Please use at most ${field.maxLength} characters.`
            : "",
      );
    }
    if (!element.reportValidity()) return;
    if (!captchaToken) return;
    // Capture before awaiting the SDK so the submitted values cannot change.
    const fields = new FormData(element);
    const snapshot = {
      name: String(fields.get("name")).trim(),
      email: String(fields.get("email")).trim(),
      subject: String(fields.get("subject")).trim(),
      message: String(fields.get("message")).trim(),
      "g-recaptcha-response": captchaToken,
    };
    submitting.current = true;

    setStatus("sending");
    try {
      const {
        VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID,
        VITE_EMAILJS_PUBLIC_KEY,
      } = import.meta.env;
      if (
        !VITE_EMAILJS_SERVICE_ID ||
        !VITE_EMAILJS_TEMPLATE_ID ||
        !VITE_EMAILJS_PUBLIC_KEY
      ) {
        throw new Error("Email service configuration is missing.");
      }

      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID,
        snapshot,
        VITE_EMAILJS_PUBLIC_KEY,
      );
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
      setCaptchaToken("");
      setCaptchaAttempt((attempt) => attempt + 1);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 14px",
    border: `1px solid ${t.lineStrong}`,
    borderRadius: 8,
    background:
      theme === "dark" ? "rgba(4, 11, 11, 0.42)" : "rgba(255,255,255,0.74)",
    color: t.text,
    fontFamily: "IBM Plex Sans, sans-serif",
    fontSize: 15,
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        padding: "clamp(84px, 11vw, 140px) min(8vw, 96px) 100px",
        borderTop: `1px solid ${t.line}`,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          zIndex: -1,
          inset: 0,
          background:
            theme === "dark"
              ? "linear-gradient(125deg, #071412 0%, #0d1c19 48%, #06100f 100%)"
              : "linear-gradient(125deg, #edf6f2 0%, #f9fbf8 48%, #e7f3ee 100%)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          zIndex: -1,
          width: "min(66vw, 920px)",
          height: "min(54vw, 740px)",
          borderRadius: "50%",
          right: "-18vw",
          top: "-30vw",
          filter: "blur(68px)",
          background:
            theme === "dark"
              ? "rgba(94,234,212,0.14)"
              : "rgba(13,148,120,0.12)",
        }}
      />
      <div
        className="contact-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(320px, 1.1fr)",
          gap: "clamp(42px, 9vw, 132px)",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <div data-motion-group>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "IBM Plex Mono, monospace",
              color: t.accent,
              fontSize: 11,
              letterSpacing: "0.12em",
            }}
          >
            <Sparkles size={14} /> START A CONVERSATION
          </span>
          <div style={{ margin: "18px 0 20px" }}>
            <SplitReveal
              text="Have a project in mind?"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(46px, 6.5vw, 94px)",
                color: t.text,
                lineHeight: 0.98,
                letterSpacing: "-0.055em",
              }}
            />
          </div>
          <Reveal delay={0.15}>
            <p
              style={{
                fontFamily: "IBM Plex Sans, sans-serif",
                fontSize: "clamp(15px, 1.4vw, 18px)",
                lineHeight: 1.65,
                color: t.textDim,
                maxWidth: 455,
                margin: 0,
              }}
            >
              Have a product idea, a collaboration in mind, or a problem worth
              solving? Send a note with the details and I&apos;ll get back to
              you soon.
            </p>
            <div
              style={{
                marginTop: 46,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  color: t.text,
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: 12,
                }}
              >
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: t.accentDim,
                    color: t.accent,
                  }}
                >
                  <Mail size={15} />
                </span>{" "}
                REPLIES WITHIN 1–2 DAYS
              </div>
              <div
                style={{
                  color: t.textFaint,
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                }}
              >
                BASED IN MYSURU, WORKING WORLDWIDE
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.28}>
          <form
            data-motion-group
            ref={formRef}
            onSubmit={handleSubmit}
            onInput={(event) => {
              const field = event.target;
              if (
                field instanceof HTMLInputElement ||
                field instanceof HTMLTextAreaElement
              )
                field.setCustomValidity("");
            }}
            aria-busy={status === "sending"}
            style={{
              padding: "clamp(24px, 4vw, 42px)",
              border: `1px solid ${t.lineStrong}`,
              background:
                theme === "dark"
                  ? "rgba(5,12,11,0.68)"
                  : "rgba(255,255,255,0.78)",
              boxShadow:
                theme === "dark"
                  ? "0 28px 80px rgba(0,0,0,0.22)"
                  : "0 24px 60px rgba(19,70,58,0.09)",
              backdropFilter: "blur(14px)",
              clipPath: clipCorner(18),
              display: "flex",
              flexDirection: "column",
              gap: 17,
            }}
          >
            <div hidden aria-hidden="true">
              <label>
                Leave this field empty
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            {!emailConfigured && (
              <p role="status">
                The contact form is currently unavailable. Please use the email
                link in the About section.
              </p>
            )}
            <div style={{ marginBottom: 6 }}>
              <p
                style={{
                  margin: 0,
                  color: t.text,
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 22,
                  fontWeight: 600,
                }}
              >
                Send a message
              </p>
              <p
                style={{
                  margin: "5px 0 0",
                  color: t.textDim,
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: 13,
                }}
              >
                I’ll get back to you as soon as I can.
              </p>
            </div>
            {status !== "idle" && (
              <p
                role="status"
                style={{
                  margin: 0,
                  padding: "12px 14px",
                  border: `1px solid ${status === "success" ? t.accent : t.flag}`,
                  background: status === "success" ? t.accentDim : t.flagDim,
                  color: status === "success" ? t.text : t.flag,
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: 13,
                }}
              >
                {status === "success"
                  ? "Message sent — I'll get back to you shortly."
                  : status === "sending"
                    ? "Sending your message…"
                    : "Your message could not be sent. Please try again."}
              </p>
            )}
            <label
              style={{
                display: "grid",
                gap: 7,
                color: t.textDim,
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 10,
                letterSpacing: "0.08em",
              }}
            >
              YOUR NAME
              <input
                name="name"
                disabled={status === "sending"}
                autoComplete="name"
                maxLength={100}
                placeholder="Enter your name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
              />
            </label>
            <label
              style={{
                display: "grid",
                gap: 7,
                color: t.textDim,
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 10,
                letterSpacing: "0.08em",
              }}
            >
              EMAIL ADDRESS
              <input
                name="email"
                disabled={status === "sending"}
                autoComplete="email"
                maxLength={254}
                placeholder="you@example.com"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
              />
            </label>
            <label
              style={{
                display: "grid",
                gap: 7,
                color: t.textDim,
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 10,
                letterSpacing: "0.08em",
              }}
            >
              SUBJECT
              <input
                name="subject"
                disabled={status === "sending"}
                maxLength={200}
                placeholder="What can I help with?"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                style={inputStyle}
              />
            </label>
            <label
              style={{
                display: "grid",
                gap: 7,
                color: t.textDim,
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 10,
                letterSpacing: "0.08em",
              }}
            >
              MESSAGE
              <textarea
                name="message"
                disabled={status === "sending"}
                maxLength={5000}
                placeholder="What are you building, or what would you like to know?"
                required
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
              />
            </label>
            {emailConfigured && (
              <div
                style={{
                  borderTop: `1px solid ${t.line}`,
                  paddingTop: 18,
                  marginTop: 3,
                  display: "grid",
                  gap: 12,
                  minWidth: 0,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    font: '500 10px "IBM Plex Mono", monospace',
                    letterSpacing: "0.08em",
                    color: captchaToken ? t.accent : t.textFaint,
                  }}
                >
                  {captchaToken
                    ? "VERIFIED — READY TO SEND"
                    : "QUICK VERIFICATION"}
                </p>
                <Captcha
                  key={captchaAttempt}
                  siteKey={captchaSiteKey}
                  onVerify={setCaptchaToken}
                  theme={theme}
                />
              </div>
            )}
            <button
              type="submit"
              disabled={
                status === "sending" || !emailConfigured || !captchaToken
              }
              style={{
                marginTop: 10,
                alignSelf: "flex-start",
                padding: "15px 34px",
                clipPath: clipCorner(10),
                background: t.accent,
                color: t.accentText,
                border: "none",
                fontFamily: "IBM Plex Sans, sans-serif",
                fontSize: 14,
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                cursor: status === "sending" ? "wait" : "pointer",
                opacity: status === "sending" ? 0.7 : 1,
              }}
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        </Reveal>
      </div>
      <style>{`@media (max-width: 760px) { .contact-layout { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
};

export const Footer: React.FC = () => {
  const { theme } = useContext(ThemeCtx);
  const t = tokens[theme];
  return (
    <footer
      style={{
        borderTop: `1px solid ${t.line}`,
        background:
          theme === "dark"
            ? "rgba(4, 10, 9, 0.72)"
            : "rgba(247, 250, 248, 0.9)",
        padding: "20px min(8vw, 96px)",
      }}
    >
      <div
        className="site-footer-bottom"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: 11,
            color: t.textFaint,
            letterSpacing: "0.05em",
          }}
        >
          © 2026 PREETHAM
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          <a
            href="https://github.com/Preetham-2004"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{
              display: "grid",
              placeItems: "center",
              width: 34,
              height: 34,
              border: `1px solid ${t.line}`,
              borderRadius: "50%",
              color: t.textDim,
              textDecoration: "none",
            }}
          >
            <Github size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/preetham-bhat-p1104/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{
              display: "grid",
              placeItems: "center",
              width: 34,
              height: 34,
              border: `1px solid ${t.line}`,
              borderRadius: "50%",
              color: t.textDim,
              textDecoration: "none",
            }}
          >
            <Linkedin size={15} />
          </a>
          <a
            href="#hero"
            aria-label="Back to top"
            style={{
              display: "grid",
              placeItems: "center",
              width: 34,
              height: 34,
              marginLeft: 4,
              border: `1px solid ${t.line}`,
              borderRadius: "50%",
              color: t.textDim,
              textDecoration: "none",
            }}
          >
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
      <style>{`@media (max-width: 560px) { .site-footer-bottom { align-items: flex-start !important; } }`}</style>
    </footer>
  );
};
