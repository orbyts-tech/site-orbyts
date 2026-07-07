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

export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circlesRef = useRef<DotGridCircle[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parameters = DOT_GRID_PARAMETERS;

    let context = resizeCanvas(canvas);
    if (!context) return;

    const rebuild = () => {
      context = resizeCanvas(canvas) ?? context;
      circlesRef.current = buildDotGrid(window.innerWidth, window.innerHeight, parameters);
    };

    rebuild();

    const handlePointer = (clientX: number, clientY: number) => {
      if (prefersReducedMotion) return;
      applyProximity(circlesRef.current, clientX, clientY, parameters);
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
    };

    const onResize = () => {
      rebuild();
    };

    const animate = () => {
      if (!context) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        for (const circle of circlesRef.current) {
          circle.draw(context, parameters.ease, parameters.growth);
        }
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseout", onPointerLeave);
    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseout", onPointerLeave);
    };
  }, []);

  return (
    <div className={styles.root} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
