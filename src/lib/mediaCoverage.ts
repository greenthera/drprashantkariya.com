import rawData from "../data/media-coverage.json";

// Vite bundles every file matched here (eager + import: "default" resolves
// each straight to its built asset URL) so the JSON manifest can stay plain
// data — no per-image import statements to maintain as clippings are added.
const images = import.meta.glob("../assets/media-coverage/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// Small (480px-wide) variants used only by the home page teaser, which
// displays these at thumbnail size — shipping the full-size scan there was
// pure waste. Falls back to the full-size src if a thumb hasn't been
// generated yet for a given file, so adding a new clipping never breaks.
const thumbs = import.meta.glob("../assets/media-coverage-thumb/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function resolveFrom(map: Record<string, string>, file: string): string | undefined {
  const key = Object.keys(map).find((path) => path.endsWith(`/${file}`));
  return key ? map[key] : undefined;
}

function resolveSrc(file: string): string {
  const src = resolveFrom(images, file);
  if (!src) throw new Error(`Media coverage image not found in bundle: ${file}`);
  return src;
}

export type MediaCoverageItem = {
  file: string;
  publication: string | null;
  width: number;
  height: number;
  src: string;
  thumbSrc: string;
};

function coverageSequence(file: string): number {
  const match = file.match(/-(\d+)\.webp$/);
  return match ? Number(match[1]) : 0;
}

export const mediaCoverage: MediaCoverageItem[] = [
  ...(rawData as Omit<MediaCoverageItem, "src" | "thumbSrc">[]),
]
  .sort((a, b) => coverageSequence(b.file) - coverageSequence(a.file))
  .map((item) => {
    const src = resolveSrc(item.file);
    return { ...item, src, thumbSrc: resolveFrom(thumbs, item.file) ?? src };
  });
