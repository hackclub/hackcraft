"use client";

import { useEffect, useRef, useState } from "react";
import Carrousel from "~/components/Carrousel";

export default function ImageUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  async function addFromTransfer(
    transfer: DataTransfer | HTMLInputElement | null,
  ) {
    if (!transfer) return;

    onChange(
      [
        ...value,
        ...((
          transfer["getData"]?.("text") || transfer["getData"]?.("text/plain")
        ).match(/https?:\/\/\S+/g) || []),
        ...(await Promise.all(
          Array.from(transfer.files || [])
            .filter(file => file.type.startsWith("image/"))
            .map(
              file =>
                new Promise<string>((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve(String(reader.result));
                  reader.onerror = () => reject(reader.error);
                  reader.readAsDataURL(file);
                }),
            ),
        )),
      ]
        .map(link => link.trim())
        .filter((v, i, a) => v && a.indexOf(v) === i),
    );
  }

  useEffect(() => {
    function onPaste(event: ClipboardEvent) {
      const links =
        event.clipboardData?.getData("text")?.match(/https:\/\/\S+/g)?.length ||
        0;

      if (
        (event.clipboardData?.files.length === 0 && links === 0) ||
        (links > 0 &&
          event.target &&
          ((event.target as HTMLElement).isContentEditable ||
            !!(event.target as HTMLElement).closest(
              "input, textarea, [contenteditable='true']",
            )))
      )
        return;

      event.preventDefault();
      addFromTransfer(event.clipboardData ?? null);
    }

    function onDragOver(event: DragEvent) {
      if (!Array.from(event.dataTransfer?.types ?? []).includes("Files"))
        return;
      event.preventDefault();
    }

    function onDrop(event: DragEvent) {
      if (!Array.from(event.dataTransfer?.types ?? []).includes("Files"))
        return;
      event.preventDefault();
      addFromTransfer(event.dataTransfer ?? null);
    }

    window.addEventListener("paste", onPaste);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("drop", onDrop);

    return () => {
      window.removeEventListener("paste", onPaste);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("drop", onDrop);
    };
  });

  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        padding: "1rem",
        border: "2px dashed rgba(255, 255, 255, 0.2)",
        background: "rgba(0, 0, 0, 0.2)",
      }}
      onDragOver={event => event.preventDefault()}
      onDrop={event => {
        event.preventDefault();
        addFromTransfer(event.dataTransfer);
      }}>
      {openIndex !== null && (
        <Carrousel
          images={value}
          initialIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={e => {
          if (e.target.files?.length) addFromTransfer(e.target);
          e.target.value = "";
        }}
      />
      <button type="button" onClick={() => fileInput.current?.click()}>
        Upload file
      </button>
      <p className="muted" style={{ marginTop: 0 }}>
        Paste or drop images here.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
        }}>
        {value.map((url, i) => (
          <div
            key={url}
            style={{
              position: "relative",
              height: "8rem",
            }}>
            <img
              src={url}
              alt="Screenshot"
              height="100%"
              onError={() => onChange(value.filter(img => img != url))}
              onClick={() => setOpenIndex(i)}
            />
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "8px",
                cursor: "pointer",
              }}
              onClick={() => onChange(value.filter(item => item !== url))}>
              x
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
