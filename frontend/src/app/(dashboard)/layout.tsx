"use client";

import Sidebar from "@/components/custom/Sidebar";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const QueryClient = useQueryClient();

    // const loggedIn = QueryClient.getQueryData<boolean>(["loggedIn"]);
    // if (!loggedIn) {
    //     router.push("/login");
    // }

    const { data: workspaceData } = useQuery({
        queryKey: ["workspaceData"],
        queryFn: async () => {
            try {
                const response = await axios.get(`/api/workspaces/`, {
                    withCredentials: true,
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                });
                if (response.data.length > 0) return response.data[0];
                else {
                    router.push("/create-workspace");
                }
            } catch (error) {
                throw error;
            }
        },
        // enabled: !!loggedIn,
    });

    const { data: userData } = useQuery({
        queryKey: ["userData"],
        queryFn: async () => {
            try {
                const response = await axios.get(`/api/auth/users/me/`, {
                    withCredentials: true,
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        enabled: !!workspaceData?.id,
    });

    return (
        <>
            <div className="flex min-h-screen bg-muted/40 h-full w-full flex-col ">
                <Sidebar />

                <div className="w-full h-full  sm:pl-[55.2px]">{children}</div>
            </div>
        </>
    );
}
