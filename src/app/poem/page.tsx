"use client";
import { useEffect, useState } from "react";

import "./page.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789èêěęėëéřþțťýùûůűüúìîïíòôõöøōóąăåäãâáàßșšşśðďğĺľłźžż¢çčćñňńÈÊĚĘÉŘÞȚŤÝÚŮŰÜÍİÎÓÖØÔĄĂÅÄÂÁÀŚȘŠŞÐĎĞĽŁŹŽŻÇČĆŃ[]{}()§¬&%$#"|';

function Name() {
  const [username, setUsername] = useState("herobrine");
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    if (name) return;
    const interval = setInterval(() => {
      setUsername(currentName =>
        currentName
          .split("")
          .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
          .join(""),
      );
    }, 60);
    return () => clearInterval(interval);
  }, [name]);

  return (
    <p className="poem-text player2 poem-custom-username">
      {name || username}?
    </p>
  );
}

export default function Page() {
  useEffect(() => {
    const observedElements = Array.from(
      document.querySelectorAll<HTMLElement>(".poem-text, .mc-ysws-logo"),
    );

    const updateOpacity = () => {
      for (const element of observedElements) {
        element.style.opacity = String(
          Math.max(
            0,
            Math.min(
              1,
              (window.innerHeight / 2 - element.getBoundingClientRect().top) /
                72,
            ),
          ),
        );
      }
    };

    const onScroll = () => requestAnimationFrame(updateOpacity);

    updateOpacity();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const interval = setInterval(() => {
      window.scrollBy(0, 1.5);
      updateOpacity();
    }, 35);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="poem">
      <div className="poem">
        <p className="poem-text player1">I see the player you mean.</p>
        <Name />
        <p className="poem-text player1">
          Yes. Take care. It has reached another power level.
        </p>
        <p className="poem-text player2">
          Maybe it's ready for the next step. To modify the very fabric of the
          world it plays in.
        </p>
        <p className="poem-text player1">A new interface to plug into</p>
        <p className="poem-text player2">And we will love what it creates</p>
        <p className="poem-text player1">
          The joy of creation. The joy of bringing something new into the
          universe.
        </p>
        <p className="poem-text player2">
          I will always be there to guide you.
        </p>
        <p className="poem-text player1">
          We will have to reach out to them. To be their guide.
        </p>
        <p className="poem-text player2">To build with them.</p>
        <p className="poem-text player1">
          To make them understand what we can do.
        </p>
        <p className="poem-text player2">And what they can do.</p>
        <p className="poem-text player1">To show them the way.</p>
        <p className="poem-text player2">They'll make something incredible.</p>
        <p className="poem-text player1">The most incredible thing.</p>
        <p className="poem-text player2">The Universe.</p>
        <Link href="/">
          <img src="/images/logo.webp" className="mc-ysws-logo" />
        </Link>
      </div>
    </div>
  );
}
