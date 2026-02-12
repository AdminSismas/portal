import { NextRequest, NextResponse } from "next/server";
import { isValidEnvironment } from "./src/config/api_urls";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  const [, firstSegment] = pathname.split("/");
  if (!isValidEnvironment(firstSegment)) {
    console.error(`Acceso inválido detectado: ${firstSegment}`);
    return;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
