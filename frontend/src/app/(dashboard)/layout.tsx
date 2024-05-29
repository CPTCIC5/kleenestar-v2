import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getUserData } from "@/app/actions/getUserData";
import { getWorkspaceData } from "@/app/actions/getWorkspaceData";

import Sidebar from "@/components/custom/Sidebar";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["workspaceData"],
        queryFn: getWorkspaceData,
    });

    await queryClient.prefetchQuery({
        queryKey: ["userData"],
        queryFn: getUserData,
    });

    // console.log("Prefetched workspaceData", queryClient.getQueryData(["workspaceData"]));
    // console.log("Prefetched userData", queryClient.getQueryData(["userData"]));

    return (
        <>
            <div className="flex min-h-screen bg-muted/40 w-full flex-col ">
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <Sidebar />
                    <div className="w-full h-full  sm:pl-[55.2px]">{children}</div>
                </HydrationBoundary>
            </div>
        </>
    );
}
