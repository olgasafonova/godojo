import type { GopherMood } from "../data/types";
import { asset } from "../utils/basePath";

const MOOD_IMAGES: Record<GopherMood, string> = {
  idle: asset("gophers/idle.png"),
  thinking: asset("gophers/thinking.png"),
  celebrating: asset("gophers/celebrating.png"),
  encouraging: asset("gophers/encouraging.png"),
  meditating: asset("gophers/meditating.png"),
  "belt-ceremony": asset("gophers/sensei.png"),
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
