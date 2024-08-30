import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const isAuthenticated = () => {
    const cookieStore = cookies();
    const csrftoken = cookieStore.get("csrftoken")?.value;
    const sessionid = cookieStore.get("sessionid")?.value;

    console.log(`csrftoken : ${csrftoken} , sessionid : ${sessionid}`);

    if (csrftoken && sessionid) {
        return true;
    }
    return false;
};

const haveWorkspace = async () => {
    const dev = process.env.NEXT_PUBLIC_ENV === "development";
    const baseUrl = dev ? process.env.NEXT_PUBLIC_DEV_URL : process.env.NEXT_PUBLIC_PROD_URL;

    const cookieStore = cookies();
    const csrftoken = cookieStore.get("csrftoken")?.value;
    const sessionid = cookieStore.get("sessionid")?.value;

    if (!csrftoken || !sessionid || !baseUrl) {
        throw new Error(
            `missing either csrftoken, sessionid or baseUrl. Please check your cookie settings...  csrftoken : ${csrftoken} , sessionid : ${sessionid} , baseUrl : ${baseUrl}`,
        );
    }

    try {
        const response = await fetch(`${baseUrl}/api/workspaces/`, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
                Cookie: `sessionid=${sessionid}; csrftoken=${csrftoken}`,
            },
            credentials: "include",
        });

        const data = await response.json();
        console.log("workspace details ...", data);

        if (data.length > 0 && data[0].id) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("error fetching workspace ...", error);
        throw error;
    }
};

const haveSubspace = async () => {
    const cookieStore = cookies();
    const subspaceId = cookieStore.get("subspaceId")?.value;

    if (subspaceId) {
        return true;
    }
    return false;
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const publicRoutes = [
        "/",
        "/get-started/",
        "/signup-options/",
        "/forgot-password/",
        "/login/",
        "/invited-signup/",
        "/signup/",
    ];
    const onboardingRoutes = ["/create-workspace/", "/subspaces/"];
    const protectedRoutes = [
        "/dashboard/chat",
        "/dashboard/blocknotes",
        "/dashboard/knowledge-base",
        "/dashboard/channels",
        "/dashboard/billing",
        "/dashboard/team",
        "/dashboard/feedback",
        "/dashboard/settings",
    ];

    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
    const isPublicRoute = publicRoutes.includes(path);
    const isOnboardingRoute = onboardingRoutes.includes(path);

    //  public routes handing

    if (isPublicRoute && isAuthenticated()) {
        return NextResponse.redirect(new URL("/dashboard/chat", request.url));
    }

    // onboarding routes handling

    if (isOnboardingRoute && !isAuthenticated()) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
        isOnboardingRoute &&
        isAuthenticated() &&
        !(await haveWorkspace()) &&
        path !== "/create-workspace/"
    ) {
        return NextResponse.redirect(new URL("/create-workspace", request.url));
    }

    if (
        isOnboardingRoute &&
        isAuthenticated() &&
        (await haveWorkspace()) &&
        path !== "/subspaces/"
    ) {
        return NextResponse.redirect(new URL("/subspaces", request.url));
    }

    // protected routes handling

    if (isProtectedRoute && !isAuthenticated()) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isProtectedRoute && isAuthenticated() && !(await haveWorkspace())) {
        return NextResponse.redirect(new URL("/create-workspace", request.url));
    }

    if (
        isProtectedRoute &&
        isAuthenticated() &&
        (await haveWorkspace()) &&
        !(await haveSubspace())
    ) {
        return NextResponse.redirect(new URL("/subspaces", request.url));
    }

    // take care of /dashboard route , remove it in future and put all complete dashboard routes in protectedRoutes

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
