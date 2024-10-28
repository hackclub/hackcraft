'use client';
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./page.css";

function UsernameText({ randomName, tl }: { randomName: string, tl: gsap.core.Timeline }) {
  const [username, setUsername] = useState(randomName);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id") || "";
  
  useGSAP(() => {
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

    tl.to(".poem-custom-username", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".poem-custom-username",
        markers: false,
        start: "top center",
        end: "+=24 center",
        scrub: 1,
        toggleActions: "play reverse play reset"
      }
    });
  }, [userId]);

  return (
    <p className="poem-text player2 poem-custom-username">{username}</p>
  );
}

export default function Page() {
  const names = ['Steve', 'Alex', 'Zuri', 'Sunny', 'Noor', 'Makena', 'Kai', 'Efe', 'Ari']
  const randomName = names[Math.floor(Math.random() * names.length)];

  gsap.registerPlugin(ScrollTrigger, useGSAP);
  const tl = gsap.timeline();

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".poem-text").forEach(e => tl.to(e, {
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

    setInterval(() => window.scrollBy(0, 1.5), 35)
  })

  return (
    <div id="poem">
      <div className="poem">
        <p className="poem-text player1">I see the player you mean.</p>
        <Suspense fallback={<p className="poem-text player2">{randomName}</p>}>
          <UsernameText randomName={randomName} tl={tl} />
        </Suspense>
        <p className="poem-text player1">Yes. Take care. It has reached another power level.</p>
        <p className="poem-text player2">Maybe it's ready for the next step. To modify the very fabric of the world it plays in.</p>
        <p className="poem-text player1">A new interface to plug into</p>
        <p className="poem-text player2">And we will love what it creates</p>
        <p className="poem-text player1">The joy of creation. The joy of bringing something new into the universe.</p>
        <p className="poem-text player2">I will always be there to guide you.</p>
        <p className="poem-text player1">We will have to reach out to them. To be their guide.</p>
        <p className="poem-text player2">To build with them.</p>
        <p className="poem-text player1">To make them understand what we can do.</p>
        <p className="poem-text player2">And what they can do.</p>
        <p className="poem-text player1">To show them the way.</p>
        <p className="poem-text player2">They'll make something incredible.</p>
        <p className="poem-text player1">The most incredible thing.</p>
        <p className="poem-text player2">The Universe.</p>
        <img src="images/logo.png" className="mc-ysws-logo" />
      </div>
    </div>
  );
}
