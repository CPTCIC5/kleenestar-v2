"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function TanstackProvider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    queryClient.setQueryData(["loggedIn"], false);
    queryClient.setQueryData(["hasWorkspace"], false);
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
