"use client";

import { useEffect, useRef, useState } from "react";
import {
  applyProximity,
  buildDotGrid,
  DOT_GRID_PARAMETERS,
  type DotGridCircle,
  resetDotGrowth,
  resizeCanvas,
} from "./dot-grid-background";
import styles from "./DotGridBackground.module.css";

const IDLE_MS = 1600;
const SETTLE_EPSILON = 0.04;

function needsAnimation(circles: DotGridCircle[]): boolean {
  for (const circle of circles) {
    if (circle.growthValue > SETTLE_EPSILON) return true;
    const target = circle.baseRadius + circle.growthValue;
    if (Math.abs(circle.radius - target) > SETTLE_EPSILON) return true;
  }
  return false;
}

function paintFrame(
  context: CanvasRenderingContext2D,
  circles: DotGridCircle[],
  ease: number,
  growth: number,
  animateGrowth: boolean,
): void {
  const width = window.innerWidth;
  const height = window.innerHeight;
  context.clearRect(0, 0, width, height);

  if (!animateGrowth) {
    for (const circle of circles) {
      circle.draw(context, 1, growth);
    }
    return;
  }

  for (const circle of circles) {
    circle.draw(context, ease, growth);
  }
}

/** Canvas só no desktop — no mobile economiza CPU/bateria e JS. */
export function DotGridBackground() {
  const [isEnabled, setIsEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circlesRef = useRef<DotGridCircle[]>([]);
  const frameRef = useRef(0);
  const idleTimerRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setIsEnabled(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const parameters = DOT_GRID_PARAMETERS;

    let context = resizeCanvas(canvas);
    if (!context) return;

    let isLooping = false;
    let isHidden = document.hidden;

    const rebuild = () => {
      context = resizeCanvas(canvas) ?? context;
      circlesRef.current = buildDotGrid(window.innerWidth, window.innerHeight, parameters);
      if (context) {
        paintFrame(context, circlesRef.current, 1, parameters.growth, false);
      }
    };

    rebuild();

    const stopLoop = () => {
      isLooping = false;
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };

    const animate = () => {
      if (!context || !isLooping || isHidden) {
        stopLoop();
        return;
      }

      paintFrame(context, circlesRef.current, parameters.ease, parameters.growth, true);

      if (needsAnimation(circlesRef.current)) {
        frameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      stopLoop();
    };

    const startLoop = () => {
      if (isHidden || isLooping) return;
      isLooping = true;
      frameRef.current = window.requestAnimationFrame(animate);
    };

    const scheduleIdleStop = () => {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        resetDotGrowth(circlesRef.current);
        startLoop();
      }, IDLE_MS);
    };

    const handlePointer = (clientX: number, clientY: number) => {
      if (isHidden) return;
      applyProximity(circlesRef.current, clientX, clientY, parameters);
      startLoop();
      scheduleIdleStop();
    };

    const onMouseMove = (event: MouseEvent) => {
      handlePointer(event.clientX, event.clientY);
    };

    const onPointerLeave = () => {
      resetDotGrowth(circlesRef.current);
      startLoop();
      window.clearTimeout(idleTimerRef.current);
    };

    const onResize = () => {
      rebuild();
    };

    const onVisibilityChange = () => {
      isHidden = document.hidden;
      if (isHidden) {
        window.clearTimeout(idleTimerRef.current);
        stopLoop();
        return;
      }
      if (context) {
        paintFrame(context, circlesRef.current, 1, parameters.growth, false);
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseout", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopLoop();
      window.clearTimeout(idleTimerRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
