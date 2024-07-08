import Sidebar from "@/components/custom/Sidebar";
import { getUserData } from "@/lib/services/getUserData";
import { getWorkspaceData } from "@/lib/services/getWorkspaceData";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";

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

    return (
        <div className="min-h-screen h-full bg-muted/40 w-full">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Sidebar />
                <div className="w-full min-h-screen h-full pt-14 sm:pl-[4.5rem] sm:pt-0">
                    {children}
                </div>
            </HydrationBoundary>
        </div>
    );
}
