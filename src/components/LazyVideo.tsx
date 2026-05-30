import { useEffect, useRef, useState } from "react";

export default function LazyVideo({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [link, setLink] = useState(false);

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

  if (!link)
    try {
      const url = new URL(src);
      if (
        (url.hostname === "youtube.com" && url.pathname === "/watch") ||
        url.hostname === "youtu.be"
      ) {
        const videoId =
          url.searchParams.get("v") || url.pathname.split("/").pop();
        src = `https://www.youtube.com/embed/${videoId}`;
      } else if (url.hostname == "hc-cdn.hel1.your-objectstorage.com")
        src = "https://cdn.hackclub.com/rescue?url=" + src;
    } catch {
      setLink(true);
    }

  return (
    <div ref={ref}>
      {visible &&
        (link ? (
          <a href={src}>Video</a>
        ) : src.includes("youtube.com") ? (
          <iframe
            style={{ width: "75%", aspectRatio: "16/9", border: "none" }}
            src={src}
            title="YouTube video player"
            allowFullScreen></iframe>
        ) : src.endsWith(".gif") ? (
          <img src={src} alt="GIF" style={{ width: "75%" }} />
        ) : (
          <video
            controls
            src={src}
            style={{ width: "75%" }}
            onError={() => setLink(true)}
          />
        ))}
    </div>
  );
}
