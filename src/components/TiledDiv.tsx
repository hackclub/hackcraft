"use client";

import { useEffect, useRef } from "react";

export default function TiledDiv(
  props: React.HTMLAttributes<HTMLDivElement> & { background: string },
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(
      entries =>
        (el.style.minHeight = `${
          Math.ceil(entries[0].contentRect.height / 25) * 25
        }px`),
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        backgroundImage: "url(/images/" + props.background + ".png)",
        backgroundSize: "400px",
        imageRendering: "pixelated",
        backgroundRepeat: "repeat",
      }}>
      <div {...props}></div>
    </div>
  );
}
