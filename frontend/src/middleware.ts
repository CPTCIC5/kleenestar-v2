import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const loggedIn = request.cookies.get("loggedIn");
    const csrfToken = request.cookies.get("csrftoken");
    const sessionId = request.cookies.get("sessionid");
    const url = new URL(request.url);

    const headers = {
        "ngrok-skip-browser-warning": "true",
    };

    if (!loggedIn || loggedIn.value !== "true" || !csrfToken || !sessionId) {
        console.log("Not logged in");
        console.log(url.pathname);
        if (
            url.pathname.startsWith("/chat/") ||
            url.pathname.startsWith("/blocknote/") ||
            url.pathname.startsWith("/knowledge/") ||
            url.pathname.startsWith("/channels/") ||
            url.pathname.startsWith("/settings/") ||
            url.pathname.startsWith("/billing/") ||
            url.pathname.startsWith("/team/") ||
            url.pathname.startsWith("/feedback/")
        ) {
            return NextResponse.redirect(new URL("/login", request.url), { headers });
        }
    } else {
        console.log("Logged in");
        if (
            url.pathname === "/login/" ||
            url.pathname === "/register/" ||
            url.pathname === "/get-started/" ||
            url.pathname === "/" ||
            url.pathname === "/workspace/"
        ) {
            return NextResponse.redirect(new URL("/chat", request.url));
        }
    }

    return NextResponse.next();
}

// Specify the paths that should be protected by this middleware
export const config = {
    matcher: [
        "/create-workspace/:path*/",
        "/chat/:path*/",
        "/blocknote/:path*/",
        "/knowledge/:path*/",
        "/channels/:path*/",
        "/billing/",
        "/team/",
        "/feedback/",
        "/settings/",
        "/login/",
        "/invited-register/",
        "/register/",
        "/workspace/",
        "/get-started/",
    ],
};
