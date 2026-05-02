import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export function usePageAnimation() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.from('h1, p', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return ref;
}
