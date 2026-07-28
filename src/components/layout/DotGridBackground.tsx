"use client";

import { useEffect, useRef } from "react";
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

export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circlesRef = useRef<DotGridCircle[]>([]);
  const frameRef = useRef(0);
  const idleTimerRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

      paintFrame(context, circlesRef.current, parameters.ease, parameters.growth, !prefersReducedMotion);

      if (!prefersReducedMotion && needsAnimation(circlesRef.current)) {
        frameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      stopLoop();
    };

    const startLoop = () => {
      if (prefersReducedMotion || isHidden || isLooping) return;
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
      if (prefersReducedMotion || isHidden) return;
      applyProximity(circlesRef.current, clientX, clientY, parameters);
      startLoop();
      scheduleIdleStop();
    };

    const onMouseMove = (event: MouseEvent) => {
      handlePointer(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      handlePointer(touch.clientX, touch.clientY);
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
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseout", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopLoop();
      window.clearTimeout(idleTimerRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseout", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div className={styles.root} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
