"use client";

import useAuth from "@/hooks/useAuth";
import { JSX, useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    const WithAuthComponent = (props: any) => {
        const { isLoggedIn, fetching } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!fetching && !isLoggedIn) {
                router.push("/login");
            }
        }, [fetching, isLoggedIn, router]);

        return <WrappedComponent {...props} />;
    };

    WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

    return WithAuthComponent;
};

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
