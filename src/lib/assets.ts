/** Prefix public asset paths when deployed under a subpath (e.g. /InsideFactory). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

/** Full URL for metadata / JSON-LD (site URL already includes basePath when set). */
export function absoluteAssetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const origin = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://insidefactory.ma"
  ).replace(/\/$/, "");
  return `${origin}${normalized}`;
}
