import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(containerRef, ready = true) {
  useEffect(() => {
    if (!ready) return;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('section', container);
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 48,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            once: true,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, ready]);
}
