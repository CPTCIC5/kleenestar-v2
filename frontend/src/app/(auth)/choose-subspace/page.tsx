"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchBox } from "@/components/custom/SearchBox";
import { Icons } from "@/assets/icons";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { ClientDatabase } from "@/constants/constants";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";
import AddClientDialog from "@/components/custom/AddClientDialog";

interface Client {
    id: number;
    name: string;
    industry: string;
    country: string;
}

const ChooseSubspacePage: React.FC = () => {
    const rowsPerPage = 10;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(rowsPerPage);
    const [clientData, setClientData] = useState(ClientDatabase || []);

    const [searchQuery, setSearchQuery] = useState("");
    const debounceValue = useDebounce(searchQuery, 1000);

    const handleSearch = () => {
        const filteredClientData = clientData?.filter((client: Client) =>
            client.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setClientData(filteredClientData || []);
    };

    useEffect(() => {
        handleSearch();
    }, [debounceValue]);

    const sortClientsById = () => {
        const sortedData = [...clientData].sort((a, b) => a.id - b.id);
        setClientData(sortedData);
    };

    return (
        <div className=" w-full h-full flex items-center justify-center flex-1 p-2">
            <Button
                variant="secondary"
                className="absolute right-4 top-[34px] md:right-8 max-xs:top-[30px]"
            >
                Logout
            </Button>

            <Card className="mx-auto max-w-6xl w-full z-10 rounded-3xl drop-shadow-xl outline-none border-none bg-card/90">
                <CardHeader className="flex-row justify-between items-center gap-4">
                    <div>
                        <CardTitle className="text-2xl font-mainhead">
                            Harsh Yadav’s Clients
                        </CardTitle>
                        <CardDescription className="font-medium">
                            Pick a client from the list below and jump right into their workspace
                            for more insights!
                        </CardDescription>
                    </div>
                    <AddClientDialog />
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
                        {clientData.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="pl-2 w-[100px] text-center py-4">
                                            Id
                                        </TableHead>
                                        <TableHead className=" text-center py-4">Name</TableHead>
                                        <TableHead className=" text-center py-4">
                                            Industry
                                        </TableHead>
                                        <TableHead className="pr-2  text-center py-4">
                                            Country
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {clientData
                                        .slice(startIndex, endIndex)
                                        .map((client: Client) => (
                                            <TableRow
                                                key={client.id}
                                                className="hover:bg-pop-blue/20 cursor-pointer active:bg-pop-blue/40"
                                            >
                                                <TableCell className="pl-2 font-medium text-center py-4">
                                                    {client.id}
                                                </TableCell>
                                                <TableCell className=" text-center py-4">
                                                    {client.name}
                                                </TableCell>
                                                <TableCell className=" text-center py-4">
                                                    {client.industry}
                                                </TableCell>
                                                <TableCell className="pr-2  text-center py-4">
                                                    {client.country}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="w-full h-full flex justify-center items-center">
                                <CardDescription className="text-center">
                                    There are no clients to show. Add a client using the button
                                    above to get started.
                                </CardDescription>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between w-full px-2">
                        <CardDescription>
                            Showing{" "}
                            <span className="text-pop-blue font-bold">
                                {startIndex}-{endIndex}
                            </span>{" "}
                            of 25 Clients
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
                                                setEndIndex(endIndex - rowsPerPage);
                                            }
                                        }}
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        className={cn(
                                            buttonVariants({ variant: "outline" }),
                                            endIndex >= clientData.length
                                                ? "pointer-events-none opacity-50"
                                                : undefined,
                                            "w-28 cursor-pointer",
                                        )}
                                        onClick={() => {
                                            if (endIndex < clientData.length) {
                                                setStartIndex(startIndex + rowsPerPage);
                                                setEndIndex(endIndex + rowsPerPage);
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

export default ChooseSubspacePage;
