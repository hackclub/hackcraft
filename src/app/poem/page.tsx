"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./page.css";

export default function Page() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [username, setUsername] = useState("Steve");

  useEffect(() => {
    if (userId) {
      const url = new URL('/api/getUser', window.location.origin);
      url.searchParams.append("id", userId);

      fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((res) => res.json()).then((data) => {
        setUsername(data.username);
      });
    }
  }, [userId]);

  gsap.registerPlugin(ScrollTrigger, useGSAP);

  useGSAP(() => {
    const tl = gsap.timeline();
    gsap.utils.toArray(".poem-text").forEach(e => tl.to(e, {
      opacity: 1,
      scrollTrigger: {
        trigger: e,
        markers: false,
        start: "top center",
        end: "+=24 center",
        scrub: 1,
        toggleActions: "play reverse play reset"
      }
    }));

    tl.to(".mc-ysws-logo", {
      opacity: 1,
      scrollTrigger: {
        trigger: "img",
        markers: true,
        start: "top center",
        end: "top top",
        scrub: 1,
        toggleActions: "play pause none none"
      }
    });

    setInterval(() => window.scrollBy(0, 1.5), 50)
  })

  return (
    <div id="poem">
      <div className="poem">
        <p className="poem-text player1">I see the game you mean.</p>
        <p className="poem-text player2">Minecraft?</p>
        <p className="poem-text player1">Yes. Take care. It has reached a higher level now. It can read our desires.</p>
        <p className="poem-text player2">You can do whatever you want. There's unlimited freedom.</p>
        <p className="poem-text player1">It reads our thoughts like they were code on a screen.</p>
        <p className="poem-text player2">Go out and make something cool</p>
        <img src="images/logo.png" className="mc-ysws-logo" />
      </div>
    </div>
  );
}
