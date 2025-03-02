import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decodeJwt } from 'jose'
import { verifyToken } from "./features/auth/actions/verify-token";

const publicRoutes = [
  { path: "/", whenAuthenticated: "redirect" },
  { path: "/form/[key]", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/";

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === pathName);
  const authToken = request.cookies.get("token")?.value;

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && pathName.startsWith("/workspace")) {
    const searchParams = new URLSearchParams(request.nextUrl.search);
    const token = searchParams.get("token") ?? "";

    const userPayload = await verifyToken(token);

    if (userPayload?.id) {
      const response = NextResponse.next();
      response.cookies.set("token", token, { httpOnly: true });
      response.cookies.set("user", JSON.stringify(userPayload), { httpOnly: true });
      return response;
    } 

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    return NextResponse.next();
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    const searchParams = new URLSearchParams(request.nextUrl.search);
    const token = searchParams.get("token") ?? "";

    const decodedToken = decodeJwt(authToken);
    const expirationTime = decodedToken.exp ? decodedToken.exp * 1000 : 0;

    if (token === 'expired' || Date.now() > expirationTime) {
      const response = NextResponse.next();

      response.cookies.delete("token");
      response.cookies.delete("user");

      return response;
    }

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/workspace/work";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.svg$).*)',
  ],
}