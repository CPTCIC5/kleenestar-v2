"use client";

import { CardDescription } from "@/components/ui/card";
import RippleLoader from "@/components/ui/ripple-loader";
import React from "react";

function NewBlocknotesPage() {
    return (
        <div className="h-full w-full flex items-center justify-center ">
            <CardDescription>
                Select a blocknote from the sidebar to view all your related notes and insights.
            </CardDescription>
        </div>
    );
}

export default NewBlocknotesPage;
