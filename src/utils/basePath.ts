const BASE = import.meta.env.BASE_URL;

export function asset(path: string): string {
  // "/concepts/w01.png" -> "/godojo/concepts/w01.png" (prod)
  // "/concepts/w01.png" -> "/concepts/w01.png" (dev)
  if (path.startsWith("/")) {
    return BASE + path.slice(1);
  }
  return BASE + path;
}
