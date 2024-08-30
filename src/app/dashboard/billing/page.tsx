"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendUp } from "@phosphor-icons/react/dist/ssr";
import { BillingPageTable } from "@/components/custom/table/BillingPageTable";

export default function BillingsPage() {
    return (
        <div className="flex flex-col min-h-screen h-full w-full p-4">
            <nav className="w-full flex pb-4 items-center gap-2">
                <h1 className="text-2xl font-bricolage font-extrabold">Billing</h1>
            </nav>
            <div className="h-full w-full flex flex-[1] justify-center">
                <Card className="h-fit w-full max-w-3xl bg-secondary/30">
                    <CardHeader className="w-full flex-row justify-between items-center">
                        <div className="flex flex-col gap-2">
                            <CardTitle className="text-lg font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-foreground/60 to-foreground/95">
                                Scale plan
                            </CardTitle>
                            <CardDescription className="text-muted-foreground text-xs">
                                Next billing: 4 Jan 2025, 12:12:45 PM
                            </CardDescription>
                        </div>

                        <Button variant="default" className="gap-1 items-center">
                            <TrendUp weight="duotone" className="h-4 w-4 bg-transparent" />
                            <span>Upgrade plan</span>
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4 w-full">
                        <BillingPageTable />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
