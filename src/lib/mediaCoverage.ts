import rawData from "../data/media-coverage.json";

// Vite bundles every file matched here (eager + import: "default" resolves
// each straight to its built asset URL) so the JSON manifest can stay plain
// data — no per-image import statements to maintain as clippings are added.
const images = import.meta.glob("../assets/media-coverage/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function resolveSrc(file: string): string {
  const key = Object.keys(images).find((path) => path.endsWith(`/${file}`));
  if (!key) throw new Error(`Media coverage image not found in bundle: ${file}`);
  return images[key];
}

export type MediaCoverageItem = {
  file: string;
  publication: string | null;
  width: number;
  height: number;
  src: string;
};

export const mediaCoverage: MediaCoverageItem[] = (
  rawData as Omit<MediaCoverageItem, "src">[]
).map((item) => ({ ...item, src: resolveSrc(item.file) }));
