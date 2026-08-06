"use client";

const PRIZES = [
  {
    title: "Minecraft License",
    description: "Block game 4 free!",
    image: "minecraft",
  },
  {
    title: "Nest Hosting (3 months)",
    description: "2 virtual cores, 4gb ram, 64gb storage",
    image: "nest1",
  },
  {
    title: "Nest Hosting (2 months)",
    description: "4 virtual cores, 8gb ram, 128gb storage",
    image: "nest2",
  },
  {
    title: "Grant for Servers (30$)",
    description: "find your own server!",
    image: "server",
  },
  {
    title: "Hytale",
    description: "Other block game??",
    image: "hytale",
  },
  {
    title: "800$ Computer Grant",
    description: "Only available if you did the previous events!",
    image: "computah",
  },
  {
    title: "none",
    description: "You will recieve: nothing",
    image: "404",
  },
];

export default function PrizePicker({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (title: string) => void;
}) {
  return (
    <div style={{ width: "100%", display: "contents" }}>
      <span className="header">Prize</span>
      <div
        style={{
          overflowX: "auto",
          display: "flex",
          gap: "1rem",
          padding: "0.5rem",
          width: "100%",
        }}>
        {PRIZES.map(prize => {
          const isSelected = prize.title === selected;
          return (
            <button
              type="button"
              key={prize.title}
              className="card"
              onClick={() => onSelect(prize.title)}
              style={{
                width: "15rem",
                flexShrink: 0,
                textAlign: "left",
                padding: "20px",
                background: isSelected ? "#1c1c1c" : "#171717",
                border: isSelected ? "1px solid #fff" : "2px solid #2c2c2c",
                transform: isSelected ? "translateY(0px) scale(0.98)" : "",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                transition: "transform .12s ease, border-color .12s ease, background .12s ease",
              }}>
              <img
                className="muted"
                style={{
                  paddingBottom: "10px",
                  border: "none",
                  borderBottom: "1px solid #262626",
                  height: "7.5rem",
                  objectFit: "cover",
                }}
                src={`/images/${prize.image}.webp`}
                alt={prize.image}
              />

              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                }}>
                {prize.title}
              </div>

              <div
                className="muted"
                style={{
                  lineHeight: 1.4,
                }}>
                {prize.description}
              </div>
            </button>
          );
        })}
      </div>
      <input name="prize" value={selected} hidden readOnly />
    </div>
  );
}
