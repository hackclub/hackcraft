import { useEffect, useRef, useState } from "react";

export default function LazyVideo({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (src.includes("youtube.com/watch") || src.includes("youtu.be")) {
    const url = new URL(src);
    const videoId = url.searchParams.get("v") || url.pathname.split("/").pop();
    src = `https://www.youtube.com/embed/${videoId}`;
  }

  return (
    <div ref={ref}>
      {visible &&
        (src.includes("youtube") ? (
          <iframe
            width="560"
            height="315"
            src={src}
            title="YouTube video player"
            allowFullScreen></iframe>
        ) : src.endsWith(".gif") ? (
          <img src={src} alt="GIF" style={{ width: "40%" }} />
        ) : (
          <video controls src={src} style={{ width: "40%" }} />
        ))}
    </div>
  );
}
