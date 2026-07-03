"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  onVisible?: () => void;
}

export function FadeUp({
  children,
  className = "",
  delay = 0,
  id,
  onVisible,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            onVisible?.();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <div
      ref={ref}
      id={id}
      className={`fade-up ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
