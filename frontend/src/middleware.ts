import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const loggedIn = request.cookies.get("loggedIn");

    if (!loggedIn || loggedIn.value !== "true") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

// Specify the paths that should be protected by this middleware
export const config = {
    matcher: [
        "/create-workspace/:path*",
        "/chat/:path*",
        "/blocknotes/:path*",
        "/create-blocknotes/:path*",
        "/individual-blocknote/:path*",
        "/knowledge/:path*",
        "/channels/:path*",
        "/billing/:path*",
        "/team/:path*",
        "/feedback/:path*",
        "/settings/:path*",
    ],
};
