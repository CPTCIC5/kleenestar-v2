"use client";

import { Icons } from "@/assets/icons";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { BillingPageTable } from "@/components/custom/BillingPageTable";

export default function BillingsPage() {
    return (
        <div className="w-full h-full flex justify-center p-3">
            <div className="max-w-4xl w-full h-full space-y-5">
                <div>
                    <div className="w-full flex items-center space-x-2 font-mainhead text-xl">
                        <span>Plans and billings</span>
                        <InfoCircledIcon className="h-4 w-4" />
                    </div>
                    <CardDescription>Manage your plan and billing details.</CardDescription>
                </div>
                <Card className="shadow-none">
                    <CardHeader className="w-full flex-row justify-between items-center py-2 px-3">
                        <div className="flex flex-col gap-2">
                            <CardTitle>Scale plan</CardTitle>
                            <CardDescription className="text-xs">
                                Next billing: 4 Jan 2025, 12:12:45 PM
                            </CardDescription>
                        </div>

                        <Button
                            variant="outline"
                            className="h-11 flex items-center justify-center gap-2 primary-btn-gradient"
                        >
                            <Icons.solarCardLine className="h-4 w-4 bg-transparent" />
                            <span>Upgrade plan</span>
                        </Button>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <BillingPageTable />
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}
