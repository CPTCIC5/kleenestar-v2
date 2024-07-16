import React from "react";
import { Card, CardDescription } from "../ui/card";

export function NewChatDisplay() {
    const chatOptions = [
        "What can I do to improve my ads campaign ROI?",
        "How is my Ads campaign performing this week?",
        "Compare the ROI of my Google Ads and Facebook Ads for the last quarter.",
        "Create LinkedIn ad copies for my new Black Friday discount campaign.",
    ];

    return (
        <div className="w-full h-full flex flex-col justify-end items-center gap-8 pb-5">
            <span className="font-mainhead text-primary">How may I assist you today?</span>
            <div className="flex flex-wrap gap-4 justify-center items-end">
                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4">
                    {chatOptions.map((option, index) => (
                        <Card
                            key={index}
                            className="max-w-56 w-full bg-background px-4 py-3 rounded-xl space-y-2 shadow-none"
                        >
                            <CardDescription>{option}</CardDescription>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
