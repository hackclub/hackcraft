"use client";

import { useEffect, useRef } from "react";

const BACKGROUNDS = {
  grass:
    "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAeFBMVEV5VTqWbEq5hVyHh4dwsEZoqD5iojhsrEJhoTdpqT9npz1goDZXly1QkCZzs0l2tkyKuVp+vlRqqkCDslOBsFFmpjyQv2CSwWKTwmN/v1WXxmdvr0VkpDqcy2xrq0GNvF11tUttrUN0tEpfnzVxsUd0WERsbGxZPSmGrpghAAAAjElEQVR42gXBB0LCAAAEwd2LGkAFG3ZqIPf/HzLDebPebv+m8XXztlounk8cx5eP994/TN+f68W42nPo7n/Zu55/vn779Fg6t5e2U0+lBTEV2s5YoIptoUAIMEBCgggkClZBEUSKAgUstAAkCJIQm1QHEDQ4K5VCRQMAJCBcUZoSRRpKEwRFogwoKL0BxA0LD3lN79UAAAAASUVORK5CYII=",
  dirt: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEV5VTq5hVyHh4eWbEpsbGx0WERZPSk6VlZqAAAAa0lEQVR42gXBwQnDQAxFwSd+0FnLgs8+5SyjsA2kgZQgY9j+S8gMM61oM9R6W85NeBDs4BPLSpbk9bBeary02zGC02JIMIpVFCm5kkbtDUPIYt5HnaQuffNxPCuAgfiVH1bk7T5EkTPPovwPGbIOYwnMHcMAAAAASUVORK5CYII=",
  cobblestone:
    "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEW1tbWmpqaIh4hubW1hYWFSUlLm8qFQAAAAcUlEQVR42gVAARGDMAz8MAMjh4CSLwIWIgDSIGAD/1p2iPk5pTfFOW3QLR3nGrrGQxSLTL1wp2TJ3PF6W/yaOjSV9eEB2y3a4omQPSerG4f6biMXkP0a8X2DMdpytQkuIWuY49CuziJmclhoIcsjUvgH41gVHD61kt4AAAAASUVORK5CYII=",
  deepslate:
    "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEVkZGR5eXlRUVE9PUMvLzdi5EnwAAAAYUlEQVR42gXBAQHEIAwEweUUgIM0qYHPoaDgX9PPMDONKqlrR7pg6r1nm1Y5FuKkm0GxIj8ig6nX6dvIHtRJqvxIbnwzsvdB6tonF9RYVT2RH+QG74861yxq/xSDJb0PyR+e6w/hsG/r7QAAAABJRU5ErkJggg==",
  bedrock:
    "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAbUlEQVR42gXBgQAAMBDEsLG8QmEKcFDVXfIGYDNBfGytRe2Qx8EBoeaebZ4pAL4jAGG18VBROIXj1VzN1eKeigoHMt9K0NWqnnCITKC9LVYc1eCdCq7c6p7AhAWAby1P4HD1NkFwJfg4uBruwH1D0lUfTgxevgAAAABJRU5ErkJggg==",
};

export default function TiledDiv(
  props: React.HTMLAttributes<HTMLDivElement> & { background: string },
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(entries => {
      el.style.minHeight =
        (props.background != "bedrock" ||
        el.getBoundingClientRect().bottom > window.innerHeight
          ? Math.ceil(el.clientHeight / 25) * 25
          : window.innerHeight - el.getBoundingClientRect().top) + "px";
    });

    observer.observe(el);
    const resize = () => (el.style.minHeight = "");
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        backgroundImage: `url(data:image/png;base64,${BACKGROUNDS[props.background]})`,
        backgroundSize: "400px",
        imageRendering: "pixelated",
        backgroundRepeat: "repeat",
      }}>
      <div {...props}></div>
    </div>
  );
}
