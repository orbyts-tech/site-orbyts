"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  onVisible?: () => void;
}

function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewHeight * 0.95 && rect.bottom > 0;
}

export function FadeUp({
  children,
  className = "",
  delay = 0,
  id,
  onVisible,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onVisibleRef = useRef(onVisible);
  onVisibleRef.current = onVisible;

  // Visível por padrão — conteúdo nunca fica em branco se JS falhar
  const [isVisible, setIsVisible] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reveal = () => {
      setIsVisible(true);
      onVisibleRef.current?.();
    };

    const inView = isElementInViewport(element);

    if (inView) {
      reveal();
      return;
    }

    setShouldAnimate(true);
    setIsVisible(false);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -2% 0px" },
    );

    observer.observe(element);

    const fallbackTimer = window.setTimeout(reveal, 600);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  const classes = [
    "fade-up",
    shouldAnimate && !isVisible ? "fade-up--hidden" : "",
    isVisible ? "visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      id={id}
      className={classes}
      style={delay && isVisible ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
