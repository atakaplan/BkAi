import { useEffect, useState } from "react";
import { appImages } from "@/assets/images";
import { appCopy } from "../../content/appCopy";

/** Opacity geçişi ~450ms; kare değişimi biraz daha seyrek → daha yumuşak döngü. */
const FRAME_CYCLE_MS = 520;

const LOADING_FRAME_SRCS = appImages.loadingFrames;

function readPrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type AppGlobalLoadingProps = {
  /** Görünür başlık; verilmezse `appCopy.loadingDefaultTitle` kullanılır. */
  title?: string;
};

export function AppGlobalLoading({ title }: AppGlobalLoadingProps) {
  const [frame, setFrame] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(readPrefersReducedMotion);

  const resolvedTitle = title ?? appCopy.loadingDefaultTitle;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    for (const src of LOADING_FRAME_SRCS) {
      const img = new Image();
      img.src = src;
    }
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % LOADING_FRAME_SRCS.length);
    }, FRAME_CYCLE_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="app-global-loading flex min-h-full min-w-0 flex-1 flex-col">
      <div
        className="app-global-loading__inner flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-4 sm:pb-20"
        role="status"
        aria-busy="true"
        aria-label={resolvedTitle}
      >
        <div className="relative aspect-square w-[min(280px,58vw)] max-w-72 shrink-0">
          {LOADING_FRAME_SRCS.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              decoding="async"
              className={[
                "pointer-events-none absolute inset-0 h-full w-full select-none object-contain",
                "drop-shadow-[0_12px_40px_rgba(148,163,184,0.35)]",
                "transition-opacity duration-500 ease-in-out motion-reduce:transition-none",
                reduceMotion
                  ? i === 0
                    ? "opacity-100"
                    : "opacity-0"
                  : i === frame
                    ? "opacity-100"
                    : "opacity-0",
              ].join(" ")}
            />
          ))}
        </div>
        <p className="mt-6 text-center text-sm font-medium tracking-tight text-slate-500 sm:text-base">
          {resolvedTitle}
        </p>
      </div>
      <div className="app-global-loading__floor" aria-hidden />
    </div>
  );
}
