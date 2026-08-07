import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Hostinger CDN was pinning HTML with s-maxage=31536000 while /_next/static
 * rotated on each deploy — browsers got documents pointing at deleted chunks
 * (unstyled / broken site). Keep documents short-lived; hashed assets immutable.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next/static/")) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable",
    );
    return response;
  }

  const isStaticAsset =
    /\.(?:ico|png|jpe?g|webp|avif|svg|gif|woff2?|txt|xml|webmanifest|map)$/i.test(
      pathname,
    );

  if (!isStaticAsset && !pathname.startsWith("/_next/")) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!api/|_next/image|_next/data).*)"],
};
