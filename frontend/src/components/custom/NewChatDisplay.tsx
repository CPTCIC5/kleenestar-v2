import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function NewChatDisplay() {
    return (
        <div className="w-full h-full flex flex-col justify-end items-center gap-[30px] pb-5">
            <span className="font-mainhead text-primary ">How may I assist you today?</span>
            <div className="flex flex-wrap gap-4 justify-center items-end">
                <div className="grid grid-cols-1 ms:grid-cols-2  grid-rows-2 gap-4">
                    <div className="max-w-[213px] w-full bg-background px-4 py-3 rounded-xl space-y-2">
                        <CardDescription>
                            What can I do to improve my ads campaign ROI?
                        </CardDescription>
                    </div>
                    <div className="max-w-[213px] w-full bg-background px-4 py-3 rounded-xl space-y-2">
                        <CardDescription>
                            How is my Ads campaign performing this week?
                        </CardDescription>
                    </div>

                    <div className="max-w-[213px] w-full bg-background px-4 py-3 rounded-xl space-y-2">
                        <CardDescription>
                            Compare the ROI of my Google Ads and Facebook Ads for the last quarter.
                        </CardDescription>
                    </div>
                    <div className="max-w-[213px] w-full bg-background px-4 py-3 rounded-xl space-y-2">
                        <CardDescription>
                            Create LinkedIn ad copies for my new Black Friday discount campaign.
                        </CardDescription>
                    </div>
                </div>
            </div>
        </div>
    );
}
