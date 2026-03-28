import type { GopherMood } from "../data/types";
import { asset } from "../utils/basePath";

const v = "?v=3";
const MOOD_IMAGES: Record<GopherMood, string> = {
  idle: asset("gophers/idle.png") + v,
  thinking: asset("gophers/thinking.png") + v,
  celebrating: asset("gophers/celebrating.png") + v,
  encouraging: asset("gophers/encouraging.png") + v,
  meditating: asset("gophers/meditating.png") + v,
  "belt-ceremony": asset("gophers/sensei.png") + v,
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
