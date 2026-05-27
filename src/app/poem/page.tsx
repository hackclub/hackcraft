"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./page.css";
import Link from "next/link";

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789èêěęėëéřþțťýùûůűüúìîïíòôõöøōóąăåäãâáàßșšşśðďğĺľłźžż¢çčćñňńÈÊĚĘÉŘÞȚŤÝÚŮŰÜÍİÎÓÖØÔĄĂÅÄÂÁÀŚȘŠŞÐĎĞĽŁŹŽŻÇČĆŃ[]{}()§¬&%$#"|';

export default function Page() {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  const tl = gsap.timeline();

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".poem-text").forEach(e =>
      tl.to(e, {
        opacity: 1,
        scrollTrigger: {
          trigger: e,
          markers: false,
          start: "top center",
          end: "+=24 center",
          scrub: 1,
          toggleActions: "play reverse play reset",
        },
      }),
    );

    tl.to(".mc-ysws-logo", {
      opacity: 1,
      scrollTrigger: {
        trigger: "img",
        markers: false,
        start: "top center",
        end: "top top",
        scrub: 1,
        toggleActions: "play pause none none",
      },
    });

    const interval = setInterval(() => {
      window.scrollBy(0, 1.5);
      setUsername(
        username
          ?.split("")
          .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
          .join(""),
      );
    }, 35);
    return () => clearInterval(interval);
  });

  const [username, setUsername] = useState("herobrine");
  const searchParams = useSearchParams();

  return (
    <div id="poem">
      <div className="poem">
        <p className="poem-text player1">I see the player you mean.</p>
        <p className="poem-text player2 poem-custom-username">
          {searchParams.get("name") || username}?
        </p>
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
          <img src="/images/logo.png" className="mc-ysws-logo" />
        </Link>
      </div>
    </div>
  );
}
