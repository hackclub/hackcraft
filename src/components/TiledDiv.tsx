"use client";

import { useEffect, useRef } from "react";

export default function TiledDiv(
  props: React.HTMLAttributes<HTMLDivElement> & { background: string },
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(entries => {
      el.style.minHeight =
        (props.background != "bedrock" ||
        el.getBoundingClientRect().bottom > window.innerHeight
          ? Math.ceil(el.clientHeight / 25) * 25
          : window.innerHeight - el.getBoundingClientRect().top) + "px";
    });

    observer.observe(el);
    const resize = () => (el.style.minHeight = "");
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
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
