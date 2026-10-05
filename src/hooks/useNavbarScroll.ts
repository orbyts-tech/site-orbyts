"use client";

import { useEffect, useState } from "react";

const SCROLLED_THRESHOLD_PX = 12;
const HIDE_AFTER_PX = 160;
const DIRECTION_TOLERANCE_PX = 8;

interface NavbarScrollState {
  isScrolled: boolean;
  isHidden: boolean;
}

/** Esconde a navbar ao rolar para baixo e a revela ao rolar para cima. `isPinned` impede esconder. */
export function useNavbarScroll(isPinned: boolean): NavbarScrollState {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > SCROLLED_THRESHOLD_PX);

      if (scrollY < HIDE_AFTER_PX) {
        setIsHidden(false);
        lastScrollY = scrollY;
        return;
      }

      const delta = scrollY - lastScrollY;
      if (Math.abs(delta) < DIRECTION_TOLERANCE_PX) return;

      setIsHidden(delta > 0);
      lastScrollY = scrollY;
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return { isScrolled, isHidden: isHidden && !isPinned };
}
