"use client";

import { SearchInput } from "@/components/custom/inputs/SearchInput";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { HashStraight, SignOut, Trash, UserCirclePlus } from "@phosphor-icons/react";
import { use, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { useFetchWorkspace } from "@/hooks/workspace/useFetchWorkspace";
import { useFetchSubspaces } from "@/hooks/subspace/useFetchSubspaces";
import { useLogoutUser } from "@/hooks/auth/useLogoutUser";
import { useDebouncedCallback } from "use-debounce";
import { SortSubspaceDropdown } from "@/components/custom/dropdowns/SortSubspaceDropdown";
import { toast } from "sonner";
import { useAddSubspace } from "@/hooks/subspace/useAddSubspace";
import { useDeleteSubspace } from "@/hooks/subspace/useDeleteSubspace";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function SubspacesPage() {
    const router = useRouter();
    const { data: workspace } = useFetchWorkspace();
    const { mutate: logoutMutate } = useLogoutUser();
    const { data: subspaces, isSuccess: fetchSubspacesSuccess } = useFetchSubspaces();
    const {
        mutate: addSubspaceMutate,
        isPending: addSubspacePending,
        isSuccess: addSubspaceSuccess,
    } = useAddSubspace();
    const { mutate: deleteSubspaceMutate } = useDeleteSubspace();

    const [isAddClientSectionOpen, setIsAddClientSectionOpen] = useState<boolean>(false);
    const [addClientNameInput, setAddClientNameInput] = useState<string>("");

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortKey, setSortKey] = useState<"id" | "name" | null>(null);
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        if (!fetchSubspacesSuccess) return;
        const filteredAndSortedClients = sortClients(searchClients(subspaces, searchTerm), sortKey);
        setClients(filteredAndSortedClients);
    }, [subspaces, fetchSubspacesSuccess, searchTerm, sortKey]);

    const handleSearchTermChange = useDebouncedCallback((newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
    }, 300);

    const searchClients = (data: Client[] | null | undefined, searchTerm: string): Client[] => {
        if (!data) return data || [];
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();

        if (!normalizedSearchTerm) return data;

        const filteredData = data.filter((client: Client) =>
            client.name.toLowerCase().includes(normalizedSearchTerm),
        );

        return filteredData;
    };

    const sortClients = (data: Client[], sortKey: "id" | "name" | null) => {
        if (sortKey === null) return data;

        return [...data].sort((a: Client, b: Client) => {
            if (sortKey === "id") {
                return a.id - b.id;
            } else {
                return a.name.localeCompare(b.name);
            }
        });
    };

    const handleAddClientToWorkspace = () => {
        if (!addClientNameInput) {
            toast.error("Client name is required");
            return;
        }
        if (addClientNameInput.length < 3) {
            toast.error("Client name must be at least 3 characters long");
            return;
        }

        const data = {
            workspace_id: workspace.id,
            name: addClientNameInput,
        };
        addSubspaceMutate(data);
        setAddClientNameInput("");
        setIsAddClientSectionOpen(false);
    };

    return (
        <div className="w-full h-full p-2 flex flex-1 items-center justify-center">
            <Button
                onClick={() => logoutMutate()}
                variant="destructive"
                className="absolute right-4 top-8 md:right-8 gap-1"
            >
                Logout
                <SignOut weight="duotone" className="size-5" />
            </Button>
            <div className="max-w-xl w-full z-10 rounded-3xl drop-shadow-xl p-6 space-y-4 bg-background">
                <section className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bricolage font-bold">
                            {workspace ? workspace.business_name : "Subspaces"}
                        </h2>
                        <p className="text-sm text-muted-foreground max-xs:hidden">
                            Select the client you want to manage
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddClientSectionOpen(!isAddClientSectionOpen)}
                        className="gap-1 items-center"
                    >
                        <UserCirclePlus weight="duotone" className="h-5 w-5" />
                        client
                    </Button>
                </section>

                <AnimatePresence>
                    <motion.section
                        initial={false}
                        animate={{
                            height: isAddClientSectionOpen ? "134px" : "0px",
                            opacity: isAddClientSectionOpen ? 1 : 0,
                            padding: isAddClientSectionOpen ? "1rem" : "0",
                            zIndex: isAddClientSectionOpen ? 10 : -10,
                        }}
                        transition={{
                            opacity: { duration: 0.2 },
                            padding: { duration: 0.6 },
                        }}
                        className="rounded-md space-y-3 border w-full min-[399px]:max-h-28"
                    >
                        {isAddClientSectionOpen && (
                            <>
                                <Label
                                    htmlFor="addClientInput"
                                    className="text-sm font-bricolage text-primary"
                                >
                                    Enter client details to add them to workspace
                                </Label>
                                <div className="flex items-center justify-between gap-3">
                                    <Input
                                        id="addClientInput"
                                        name="addClientInput"
                                        type="text"
                                        placeholder="client name"
                                        value={addClientNameInput}
                                        onChange={(e) => setAddClientNameInput(e.target.value)}
                                        disabled={addSubspacePending}
                                    />
                                    <Button
                                        variant="secondary"
                                        onClick={handleAddClientToWorkspace}
                                        disabled={addSubspacePending || !addClientNameInput}
                                    >
                                        save
                                    </Button>
                                </div>
                            </>
                        )}
                    </motion.section>
                </AnimatePresence>

                <section className="flex items-center justify-between gap-3">
                    <SearchInput
                        name="subspaceSearch"
                        type="text"
                        placeholder="search client"
                        onChange={(e) => handleSearchTermChange(e.target.value)}
                    />
                    <SortSubspaceDropdown setSortKey={setSortKey} />
                </section>

                <section className="rounded-md p-2 bg-secondary space-y-1 max-h-96 overflow-auto">
                    {clients?.length > 0 ? (
                        clients?.map((client: Client) => (
                            <div
                                onClick={() => {
                                    Cookies.set("subspaceId", `${client.id}`, { expires: 30 });
                                    router.push("/dashboard/chat");
                                }}
                                key={client.id}
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "lg" }),
                                    "w-full flex items-center gap-3 justify-start hover:bg-primary/50 active:bg-primary py-6 px-3 cursor-pointer group",
                                )}
                            >
                                <div className="flex items-center">
                                    <HashStraight weight="duotone" className="h-4 w-4" />
                                    <code>{client.id}</code>
                                </div>
                                <p className="text-foreground flex-1 text-center">{client.name}</p>
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const subspaceId = Cookies.get("subspaceId");
                                        deleteSubspaceMutate(client.id);
                                        if (subspaceId && parseInt(subspaceId) === client.id) {
                                            Cookies.remove("subspaceId");
                                        }
                                    }}
                                    variant="secondary"
                                    size="icon"
                                    className="size-7 hover:!bg-destructive/10 group-hover:bg-primary/25"
                                >
                                    <Trash weight="duotone" className="h-5 w-5 text-destructive" />
                                </Button>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center p-8">
                            <span className="text-sm text-muted-foreground">
                                No client found. Click the button above to add a new client
                            </span>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
