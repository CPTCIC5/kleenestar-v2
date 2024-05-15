"use client";
import { Icons } from "@/assets/icons";
import { Card, CardContent } from "@/components/ui/card";
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
import { dummyBillingDetails } from "@/constants/constants";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Check } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
];

export default function Billings() {
    const rowsPerPage = 7;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);

        if (startIndex !== 0) setStartIndex(startIndex - 7);

        if (endIndex !== 7) setEndIndex(endIndex - 7);
    };

    const handleNext = () => {
        if (currentPage < dummyBillingDetails.length / 7) setCurrentPage(currentPage + 1);

        if (startIndex + 7 < dummyBillingDetails.length - 1) {
            setStartIndex(startIndex + 7);
            setEndIndex(endIndex + 7);
        }
    };
    console.log(startIndex, endIndex + " c:" + currentPage);
    return (
        <div className="w-full max-xl:w-[90%] max-xl:mx-auto flex justify-center mt-[70px]  max-xl:mb-[70px] max-xl:mt-[70px] ">
            <div className="flex-col max-w-[905.87px] w-full">
                <div className="text-[18px]  pb-[20px] flex gap-[15px] items-center font-mainhead font-bold">
                    Plans and billings
                    <div>
                        <QuestionMarkCircledIcon />
                    </div>
                </div>
                <Card className=" flex items-center mb-[25px]  h-[75px]">
                    <CardContent className="pl-[24.84px] w-full flex justify-between pr-[30px] py-[15px]">
                        <div className="flex-col">
                            <div className="text-[15px] max-xl:text-[13px] font-medium font-mainhead">
                                Scale plan
                            </div>
                            <div className="text-[11px]">Next billing: 1/4/2024, 12:12:45 PM</div>
                        </div>
                        <div>
                            <Card className="px-[18px] items-center flex py-[9px] max-xl:py-[5px] max-xl:px-[10px] gap-[15px]">
                                <div>
                                    <Icons.plan className="max-xl:w-[10px] max-xl:h-[10px]" />
                                </div>
                                <div className="font-mainhead text-[13px] max-xl:text-[10px] whitespace-nowrap">
                                    Manage plan
                                </div>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
                <div className=" bg-background w-full xl:px-[20px] rounded-2xl">
                    <Table className="max-w-[905.87px] w-full table-auto mq750:hidden text-[15px]  font-[400] bg-background rounded-2xl ">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    <div className="py-4 ">
                                        <input
                                            style={{
                                                width: "30px",
                                                height: "13px",
                                                marginLeft: "17px",
                                            }}
                                            type="checkbox"
                                            name=""
                                            id=""
                                        />
                                        Invoice
                                    </div>
                                </TableHead>
                                <TableHead className="">
                                    <div className="py-4">Amount</div>
                                </TableHead>
                                <TableHead>
                                    <div className="py-4">Status</div>
                                </TableHead>
                                <TableHead>
                                    <div className="py-4">Users</div>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dummyBillingDetails
                                .slice(startIndex, endIndex)
                                .map((invoice, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium pl-8 flex items-center gap-4  w-[45%]">
                                            <input
                                                style={{ width: "50px", height: "20px" }}
                                                type="checkbox"
                                                name=""
                                                id=""
                                            />
                                            <div className="py-2 whitespace-nowrap ">
                                                {invoice.Invoice}
                                            </div>
                                        </TableCell>
                                        <TableCell className="w-[25%]">
                                            <div className="py-2">USD {invoice.Amount}</div>
                                        </TableCell>
                                        <TableCell className="w-[25%]">
                                            {invoice.Status == "paid" ? (
                                                <span className="px-4 py-1 border-solid border flex items-center gap-2 w-fit rounded-md">
                                                    <Check className="w-4" /> Paid
                                                </span>
                                            ) : (
                                                <span className="px-4 py-2 border-solid border border-primary-300 rounded-md">
                                                    Pending
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="w-[25%]">
                                            <div className="flex justify-evenly">
                                                <Image
                                                    width={40}
                                                    height={40}
                                                    src="https://github.com/shadcn.png"
                                                    className="w-10 relative  h-10 rounded-full"
                                                    alt=""
                                                />
                                                <Image
                                                    width={40}
                                                    height={40}
                                                    src="https://github.com/shadcn.png"
                                                    className="w-10 relative right-[20px] h-10 rounded-full"
                                                    alt=""
                                                />
                                                <Image
                                                    width={40}
                                                    height={40}
                                                    src="https://github.com/shadcn.png"
                                                    className="w-10 relative right-[40px] h-10 rounded-full"
                                                    alt=""
                                                />
                                                <Image
                                                    width={40}
                                                    height={40}
                                                    src="https://github.com/shadcn.png"
                                                    className="w-10 relative right-[60px] h-10 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
                <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className="cursor-pointer"
                                onClick={handlePrevious}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink isActive>{currentPage}</PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationNext className="cursor-pointer" onClick={handleNext} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
