import { NextRequest, NextResponse } from "next/server";

const AUTH_PREFIX = "/auth";
const SIGN_IN_PATH = "/auth/signin";
const AUTHENTICATED_HOME = "/dashboard";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const hasToken = Boolean(request.cookies.get("accessToken")?.value);
    const isAuthRoute = pathname.startsWith(AUTH_PREFIX);

    if (!hasToken && !isAuthRoute) {
        return NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
    }

    if (hasToken && isAuthRoute) {
        return NextResponse.redirect(new URL(AUTHENTICATED_HOME, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
