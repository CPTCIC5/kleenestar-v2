import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const loggedIn = request.cookies.get("loggedIn");
    const csrfToken = request.cookies.get("csrftoken");
    const sessionId = request.cookies.get("sessionid");
    const url = new URL(request.url);

    if (!loggedIn || loggedIn.value !== "true" || !csrfToken || !sessionId) {
        if (url.pathname !== "/login/") {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } else {
        if (
            url.pathname === "/login/" ||
            url.pathname === "/register/" ||
            url.pathname === "/get-started/" ||
            url.pathname === "/" ||
            url.pathname === "/workspace/" ||
            url.pathname === "/create-workspace/"
        ) {
            return NextResponse.redirect(new URL("/chat", request.url));
        }
    }

    return NextResponse.next();
}

// Specify the paths that should be protected by this middleware
export const config = {
    matcher: [
        "/create-workspace/:path*",
        "/chat/:path*",
        "/blocknote/:path*",
        "/knowledge/:path*",
        "/channels/:path*",
        "/billing/:path*",
        "/team/:path*",
        "/feedback/:path*",
        "/settings/:path*",
        "/login/:path*",
        "/register/:path*",
        "/workspace/:path*",
        "/get-started/:path*",
    ],
};
