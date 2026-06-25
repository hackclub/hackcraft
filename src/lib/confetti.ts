"use client";

let container: HTMLDivElement;

function animate() {
  for (let i = container.children.length - 1; i >= 0; i--) {
    const p = container.children[i] as HTMLDivElement;

    const vx = Number(p.dataset.vx ?? 0) * 0.99;
    const vy = Number(p.dataset.vy ?? 0) + 0.02 * Number(p.dataset.size ?? 0);

    p.dataset.vx = String(vx);
    p.dataset.vy = String(vy);

    const x = Number(p.dataset.x ?? 0) + vx + Number(p.dataset.wobble ?? 0);
    const y = Number(p.dataset.y ?? 0) + vy;

    const rotate = Number(p.dataset.rotate ?? 0) + Number(p.dataset.vr ?? 0);

    p.dataset.x = String(x);
    p.dataset.y = String(y);
    p.dataset.rotate = String(rotate);

    p.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;

    if (y > window.innerHeight) p.remove();
  }

  if (container && container.children.length > 0)
    requestAnimationFrame(animate);
}

export function burstConfetti(originX: number, originY: number) {
  if (!container)
    container = document.body.appendChild(document.createElement("div"));

  if (container.children.length == 0) requestAnimationFrame(animate);
  for (let i = 0; i < 120; i++) {
    const el = document.createElement("div");

    const size = Math.random() * 8 + 2;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 14;

    el.dataset.vx = String(Math.cos(angle) * speed);
    el.dataset.vy = String(Math.sin(angle) * speed);
    el.dataset.vr = String((Math.random() - 0.5) * 24);
    el.dataset.wobble = String(Math.sin(Math.random() * Math.PI * 2) * 1.5);

    el.dataset.x = String(originX);
    el.dataset.y = String(originY);
    el.dataset.rotate = "0";
    el.dataset.size = String(size);

    Object.assign(el.style, {
      position: "fixed",
      width: `${size}px`,
      height: `${size}px`,
      background: `hsl(${Math.random() * 360}, 100%, 50%)`,
      borderRadius: Math.random() > 0.5 ? "50%" : "0",
      pointerEvents: "none",
      left: "0",
      top: "0",
      transform: `translate(${originX}px, ${originY}px)`,
    });

    container.appendChild(el);
  }
}
