import { useEffect, useRef, useState } from "react";

type CaptchaApi = {
  ready: (callback: () => void) => void;
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      size: "compact" | "normal";
      theme: "dark" | "light";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => number;
  reset: (id: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: CaptchaApi;
  }
}

let apiPromise: Promise<CaptchaApi> | undefined;

function loadCaptcha() {
  if (!apiPromise) {
    apiPromise = new Promise<CaptchaApi>((resolve, reject) => {
      const script = document.createElement("script");
      const timeout = window.setTimeout(fail, 15_000);
      function fail() {
        window.clearTimeout(timeout);
        script.remove();
        reject(new Error("Verification could not load."));
      }
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.onerror = fail;
      script.onload = () => {
        const api = window.grecaptcha;
        if (!api) return fail();
        api.ready(() => {
          window.clearTimeout(timeout);
          resolve(api);
        });
      };
      document.head.append(script);
    }).catch((error: unknown) => {
      apiPromise = undefined;
      throw error;
    });
  }
  return apiPromise;
}

export function Captcha({
  siteKey,
  onVerify,
  theme,
}: {
  siteKey: string;
  onVerify: (token: string) => void;
  theme: "dark" | "light";
}) {
  const container = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<"compact" | "normal">("compact");
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize(entry.contentRect.width >= 304 ? "normal" : "compact");
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    onVerify("");
    const mount = document.createElement("div");
    element.append(mount);
    let disposed = false;
    let widget: number | undefined;
    let api: CaptchaApi | undefined;
    const fail = () => {
      if (disposed) return;
      onVerify("");
      setFailed(true);
    };
    void loadCaptcha()
      .then((loaded) => {
        if (disposed) return;
        api = loaded;
        widget = api.render(mount, {
          sitekey: siteKey,
          size,
          theme,
          callback: (token) => {
            if (disposed) return;
            setFailed(false);
            onVerify(token);
          },
          "expired-callback": () => {
            if (!disposed) onVerify("");
          },
          "error-callback": fail,
        });
      })
      .catch(fail);
    return () => {
      disposed = true;
      if (widget !== undefined) api?.reset(widget);
      mount.remove();
    };
  }, [siteKey, onVerify, size, theme]);

  return (
    <div ref={wrapper} style={{ width: "100%", minWidth: 0 }}>
      <div
        ref={container}
        style={{ minHeight: size === "normal" ? 78 : 144 }}
      />
      {failed && (
        <p role="alert">
          Verification is unavailable. Please reload or use the email link in
          the About section.
        </p>
      )}
    </div>
  );
}
