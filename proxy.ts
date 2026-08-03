import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "@/lib/api/serverApi";
import { parseSetCookie } from "cookie";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-up", "/sign-in"];

function applyParsedCookies(
  response: NextResponse,
  setCookie: string | string[]
) {
  const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

  for (const cookieString of cookieArray) {
    const parsed = parseSetCookie(cookieString);

    if (parsed.value) {
      response.cookies.set(parsed.name, parsed.value, {
        expires: parsed.expires ? new Date(parsed.expires) : undefined,
        path: parsed.path,
        maxAge: parsed.maxAge,
        httpOnly: parsed.httpOnly,
        secure: parsed.secure,
        sameSite: parsed.sameSite as "lax" | "strict" | "none" | undefined,
      });
    }
  }
}
export async function proxy(request: NextRequest) {

  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isPrivateRoute && !isPublicRoute) {
    return NextResponse.next();
  }

  if (!accessToken) {
    if (refreshToken) {
      try {
        const data = await checkSession();
        const setCookie = data.headers["set-cookie"];

        if (setCookie) {
          if (isPublicRoute) {
            const response = NextResponse.redirect(new URL("/", request.url));
            applyParsedCookies(response, setCookie);
            return response;
          }
           const response = NextResponse.redirect(new URL(request.url));
          applyParsedCookies(response, setCookie);
          return response;
        }
      } catch {
        // Session refresh failed — fall through to unauthenticated handling
      }
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};