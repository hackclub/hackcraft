"use client";

import type { ReactNode } from "react";

export default function Modal({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "3rem 1rem",
        overflowY: "auto",
      }}>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          cursor: "default",
          background: "rgba(0, 0, 0, 0.88)",
          backdropFilter: "blur(6px)",
        }}
      />
      <div className="section" style={{ position: "relative" }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-0.75rem",
            right: "-0.75rem",
            padding: "0.1rem 0.25rem 0.25rem 0.5rem",
          }}>
          x
        </button>
        {children}
      </div>
    </div>
  );
}
