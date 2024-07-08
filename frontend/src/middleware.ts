import { NextResponse, NextRequest } from "next/server";

async function fetchWorkspaceData(csrfToken: string, sessionId: string, baseUrl: string) {
    try {
        const response = await fetch(`${baseUrl}/api/workspaces/`, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
                Cookie: `sessionid=${sessionId}; csrftoken=${csrfToken}`,
            },
            credentials: "include",
        });
        const data = await response.json();
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error("Error fetching workspace data:", error);
        throw error;
    }
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Public routes
    const publicRoutes = [
        "/",
        "/get-started/",
        "/register-option/",
        "/forgot-password/",
        "/login/",
        "/invited-register/",
        "/register/",
    ];

    // Protected routes
    const protectedRoutes = [
        "/chat",
        "/blocknote",
        "/knowledge",
        "/channels",
        "/billing",
        "/team",
        "/feedback",
        "/settings",
    ];

    // Workspace routes
    const workspaceRoutes = ["/new-workspace/", "/select-subspace/"];

    // Get cookies
    const loggedIn = req.cookies.get("loggedIn");
    const csrfToken = req.cookies.get("csrftoken");
    const sessionId = req.cookies.get("sessionid");

    // Function to check if user is logged in
    const isLoggedIn = loggedIn?.value === "true" && csrfToken?.value && sessionId?.value;

    // Check if the route is public
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // Check if the route is protected
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", req.url));
        } else {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            if (!baseUrl) {
                console.error("Base URL is not defined in environment variables.");
                return NextResponse.error();
            }
            const workspaceData = await fetchWorkspaceData(
                csrfToken.value,
                sessionId.value,
                baseUrl,
            );

            if (!workspaceData && pathname !== "/new-workspace/") {
                return NextResponse.redirect(new URL("/new-workspace", req.url));
            }

            return NextResponse.next();
        }
    }

    if (isLoggedIn) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl) {
            console.error("Base URL is not defined in environment variables.");
            return NextResponse.error();
        }
        const workspaceData = await fetchWorkspaceData(csrfToken.value, sessionId.value, baseUrl);

        // Check workspace routes
        if (workspaceRoutes.includes(pathname)) {
            if (!workspaceData) {
                if (pathname === "/new-workspace/") {
                    return NextResponse.next();
                }
                return NextResponse.redirect(new URL("/new-workspace", req.url));
            }
            if (pathname === "/select-subspace/") {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL("/select-subspace", req.url));
        }
    }

    // Redirect all other requests to login if not logged in
    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

// Specify the routes to match
export const config = {
    matcher: [
        "/",
        "/get-started",
        "/register-option",
        "/login",
        "/register",
        "/invited-register",
        "/forgot-password",
        "/new-workspace",
        "/select-subspace",
        "/chat/:subspaceId/:path*",
        "/blocknote/:subspaceId/:path*",
        "/knowledge/:subspaceId/:path*",
        "/channels/:subspaceId/:path*",
        "/billing",
        "/team",
        "/feedback",
        "/settings",
    ],
};
