import { useEffect } from "react";
import { animate } from "animejs";

export const PageMotion = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.style.willChange = "transform, opacity";
          animate(target, {
            opacity: [0, 1],
            y: [22, 0],
            duration: 760,
            ease: "out(3)",
            onComplete: () => {
              target.style.willChange = "auto";
            },
          });
          observer.unobserve(target);
        }),
      { threshold: 0.14, rootMargin: "0px 0px -7%" },
    );
    document
      .querySelectorAll<HTMLElement>("[data-motion-group]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
};
