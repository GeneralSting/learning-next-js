import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL("/", request.url));
  const themeMiddlewareStorage = "theme-middleware";
  const response = NextResponse.next();
  const themePreference = request.cookies.get(themeMiddlewareStorage);
  if (!themePreference) {
    response.cookies.set(themeMiddlewareStorage, "middleware-value");
  }

  response.headers.set("custom-header", "custom-value");

  return response;
}

// export const config = {
//   matcher: "/middleware",
// };
