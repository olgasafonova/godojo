import type { GopherMood } from "../data/types";

const MOOD_IMAGES: Record<GopherMood, string> = {
  idle: "/gophers/idle.png",
  thinking: "/gophers/thinking.png",
  celebrating: "/gophers/celebrating.png",
  encouraging: "/gophers/encouraging.png",
  meditating: "/gophers/meditating.png",
  "belt-ceremony": "/gophers/sensei.png",
};

interface GopherProps {
  mood: GopherMood;
  size?: number;
}

export const Gopher: React.FC<GopherProps> = ({ mood, size = 200 }) => {
  return (
    <img
      src={MOOD_IMAGES[mood]}
      alt={`Gopher ${mood}`}
      width={size}
      height={size}
      style={{
        objectFit: "contain",
        flexShrink: 0,
      }}
    />
  );
};
