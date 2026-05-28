"use client";

import { act, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Carrousel(props: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(props.initialIndex);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") props.onClose();
      if (event.key === "ArrowLeft")
        setActiveIndex(index => Math.max(0, index - 1));
      if (event.key === "ArrowRight")
        setActiveIndex(index => Math.min(props.images.length - 1, index + 1));
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [props]);

  return createPortal(
    <div
      onClick={props.onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.88)",
        backdropFilter: "blur(6px)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <img
        src={props.images[activeIndex]}
        alt="Project screenshot"
        style={{
          width: "100%",
          height: "80vh",
          objectFit: "contain",
        }}
      />
      {activeIndex > 0 && (
        <div
          onClick={e => {
            e.stopPropagation();
            setActiveIndex(index => Math.max(0, index - 1));
          }}
          className="carrousel-button"
          style={{ left: "1rem" }}>
          &lt;
        </div>
      )}
      {props.images.length > 1 && (
        <span
          style={{
            position: "absolute",
            bottom: "1rem",
          }}>
          {activeIndex + 1} / {props.images.length}
        </span>
      )}
      {activeIndex < props.images.length - 1 && (
        <div
          onClick={e => {
            e.stopPropagation();
            setActiveIndex(index =>
              Math.min(props.images.length - 1, index + 1),
            );
          }}
          className="carrousel-button"
          style={{ right: "1rem" }}>
          &gt;
        </div>
      )}
    </div>,
    document.body,
  );
}
