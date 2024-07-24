"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/assets/icons";
import { useLogout } from "@/hooks/useLogout";
import { useSubspaceData } from "@/hooks/useSubspaceData";
import { useWorkspaceData } from "@/hooks/useWorkspaceData";
import { SearchBox } from "@/components/custom/SearchBox";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";
import { Button, buttonVariants } from "@/components/ui/button";
import { CreateSubspaceDialog } from "@/components/custom/CreateSubspaceDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ClassicLoader from "@/components/ui/classic-loader";

interface Client {
    id: number;
    name: string;
    industry: string;
}

const SelectSubspacePage: React.FC = () => {
    const rowsPerPage = 10;
    const [startIndex, setStartIndex] = useState(0);
    const [clientData, setClientData] = useState<Client[]>([]);
    const { workspaceData, isWorkspaceSuccess } = useWorkspaceData();
    const {
        data: subspaceData,
        isSuccess: isSubspaceSuccess,
        isLoading: isSubspaceLoading,
    } = useSubspaceData();
    const mutation = useLogout();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const debounceValue = useDebounce(searchQuery, 1000);

    console.log("triggered");

    useEffect(() => {
        if (isWorkspaceSuccess && isSubspaceSuccess) {
            setClientData(subspaceData || []);
        }
    }, [isWorkspaceSuccess, isSubspaceSuccess, subspaceData]);

    useEffect(() => {
        const handleSearch = () => {
            const filteredClientData = subspaceData?.filter((client: Client) =>
                client.name.toLowerCase().includes(debounceValue.toLowerCase()),
            );
            setClientData(filteredClientData || []);
        };

        handleSearch();
    }, [debounceValue, subspaceData]);

    const sortClientsById = () => {
        const sortedData = [...clientData].sort((a, b) => a.id - b.id);
        setClientData(sortedData);
    };

    const paginatedData = useMemo(
        () => clientData.slice(startIndex, startIndex + rowsPerPage),
        [clientData, startIndex, rowsPerPage],
    );

    return (
        <div className="w-full h-full flex items-center justify-center flex-1 p-2 mt-[69px]">
            <Button
                onClick={() => mutation.mutate()}
                variant="secondary"
                className="absolute right-4 top-[34px] md:right-8 max-xs:top-[30px]"
            >
                Logout
            </Button>

            <Card className="mx-auto max-w-6xl w-full z-10 rounded-3xl drop-shadow-xl outline-none border-none bg-card/90">
                <CardHeader className="flex-row justify-between items-center gap-4">
                    <div>
                        <CardTitle className="text-2xl font-mainhead">
                            <span className="text-pop-blue">
                                {workspaceData ? workspaceData.business_name : "Workspace"}
                            </span>
                            ’s Clients
                        </CardTitle>
                        <CardDescription className="font-medium hidden xs:block">
                            Pick a client from the list below and jump right into their workspace
                            for more insights!
                        </CardDescription>
                    </div>
                    <CreateSubspaceDialog />
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                        <SearchBox
                            type="text"
                            placeholder="Search a client…"
                            className="max-w-sm w-full rounded-xl bg-background"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button
                            onClick={sortClientsById}
                            variant="secondary"
                            className="flex items-center justify-center gap-1 px-5"
                        >
                            <span>Sort</span>
                            <Icons.solarSortZeroOneLine className="w-3 h-3" />
                        </Button>
                    </div>
                    <div className="border border-border rounded-xl h-[582px]">
                        {paginatedData.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted">
                                        <TableHead className="pl-4 sm:pl-8  text-center  py-4  rounded-tl-xl">
                                            Id
                                        </TableHead>
                                        <TableHead className="text-center w-full py-4">
                                            Name
                                        </TableHead>
                                        <TableHead className="text-center  pr-4 sm:pr-8  py-4">
                                            Industry
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedData.map((client: Client) => (
                                        <TableRow
                                            onClick={() => router.push(`/chat/${client.id}/`)}
                                            key={client.id}
                                            className="hover:bg-pop-blue/20 cursor-pointer active:bg-pop-blue/40"
                                        >
                                            <TableCell className="pl-4 sm:pl-8  font-medium  text-center py-4">
                                                {client.id}
                                            </TableCell>
                                            <TableCell className="text-center w-full py-4">
                                                {client.name}
                                            </TableCell>
                                            <TableCell className="text-center  py-4 pr-4 sm:pr-8 ">
                                                {client.industry}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : isSubspaceLoading ? (
                            <div className="w-full h-full flex justify-center items-center p-4">
                                <ClassicLoader />
                            </div>
                        ) : (
                            <div className="w-full h-full flex justify-center items-center p-4">
                                <CardDescription className="text-center">
                                    There are no clients to show. Add a client using the button
                                    above to get started.
                                </CardDescription>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center flex-col gap-3 xs:flex-row justify-between w-full px-2">
                        <CardDescription>
                            Showing{" "}
                            <span className="text-pop-blue font-bold">
                                {startIndex + 1}-
                                {Math.min(startIndex + rowsPerPage, clientData.length)}
                            </span>{" "}
                            of {clientData.length} Clients
                        </CardDescription>

                        <Pagination className="mx-0 w-fit">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        className={cn(
                                            buttonVariants({ variant: "outline" }),
                                            startIndex === 0
                                                ? "pointer-events-none opacity-50"
                                                : undefined,
                                            "w-28 cursor-pointer",
                                        )}
                                        onClick={() => {
                                            if (startIndex > 0) {
                                                setStartIndex(startIndex - rowsPerPage);
                                            }
                                        }}
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        className={cn(
                                            buttonVariants({ variant: "outline" }),
                                            startIndex + rowsPerPage >= clientData.length
                                                ? "pointer-events-none opacity-50"
                                                : undefined,
                                            "w-28 cursor-pointer",
                                        )}
                                        onClick={() => {
                                            if (startIndex + rowsPerPage < clientData.length) {
                                                setStartIndex(startIndex + rowsPerPage);
                                            }
                                        }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SelectSubspacePage;
