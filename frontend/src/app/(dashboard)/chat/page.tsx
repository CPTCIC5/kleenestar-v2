"use client";

import ClassicLoader from "@/components/ui/classic-loader";
import RippleLoader from "@/components/ui/ripple-loader";
import React from "react";

function ChatPageNew() {
    return (
        <div className="h-full w-full flex items-center justify-center ">
            <ClassicLoader />
        </div>
    );
}

export default ChatPageNew;
