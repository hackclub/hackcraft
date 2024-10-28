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
  const names = ['Steve', 'Alex', 'Zuri', 'Sunny', 'Noor', 'Makena', 'Kai', 'Efe', 'Ari']
  const [username, setUsername] = useState(names[Math.floor(Math.random() * names.length)]);

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
        markers: false,
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
        <p className="poem-text player1">I see the player you mean.</p>
        <p className="poem-text player2">{username}?</p>
        <p className="poem-text player1">Yes. Take care. It has reached another power level.</p>
        <p className="poem-text player2">Maybe it's ready for the next step. To modify the very fabric of the world it plays in.</p>
        <p className="poem-text player1">A new interface to plug into</p>
        <p className="poem-text player2">And we will love what it creates</p>
        <p className="poem-text player1">The joy of creation. The joy of bringing something new into the universe.</p>
        <img src="images/logo.png" className="mc-ysws-logo" />
      </div>
    </div>
  );
}
