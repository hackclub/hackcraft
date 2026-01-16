"use client";

import LazyVideo from "~/components/LazyVideo";
import { useRef } from "react";

interface GalleryEntryProps {
  info: Record<string, string>;
}

export default function GalleryEntry({ info }: GalleryEntryProps) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const moveTooltip = e => {
    if (!tooltipRef.current) return;
    const x = e.clientX + 12;
    const y = e.clientY + 12;
    tooltipRef.current.style.left = `${x}px`;
    tooltipRef.current.style.top = `${y}px`;
  };

  const showTooltip = e => {
    if (!info["Description"] || !info["Short Description"]) return;
    if (!tooltipRef.current) {
      const el = document.createElement("div");
      el.id = "minetip-tooltip";
      el.textContent = info["Description"] ?? "";
      document.body.appendChild(el);

      tooltipRef.current = el;
    }
    moveTooltip(e);
  };

  const hideTooltip = () => {
    tooltipRef.current?.parentNode?.removeChild(tooltipRef.current);
    tooltipRef.current = null;
  };

  return (
    <div>
      <p
        onMouseEnter={showTooltip}
        onMouseMove={moveTooltip}
        onMouseLeave={hideTooltip}>
        {info["Short Description"] || info["Description"]}
      </p>
      <LazyVideo src={info["Demo video"]} />
      <br />
      <a href={info["Code link"]} target="_blank" rel="noopener noreferrer">
        Code
      </a>{" "}
      <a href={info["Play link"]} target="_blank" rel="noopener noreferrer">
        Play
      </a>{" "}
      <hr />
    </div>
  );
}
