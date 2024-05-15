import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function NewChatDisplay() {
    return (
        <div className="w-full h-full flex flex-col justify-end items-center gap-[30px] pb-5">
            <span className="font-mainhead font-medium text-[15px]">
                How may I assist you today?
            </span>
            <div className="flex flex-wrap gap-[30px] justify-center items-end">
                <div className="flex flex-col gap-[30px]">
                    <Card className="max-w-[320px] h-[103px] w-full">
                        <CardHeader className="px-[22px] py-[20px]">
                            <CardTitle className="font-mainhead">
                                Actionable Recommendations
                            </CardTitle>
                            <CardDescription>
                                What can I do to improve my ads campaign ROI?
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="max-w-[320px] h-[103px] w-full">
                        <CardHeader>
                            <CardTitle className="font-mainhead">
                                Channel-Specific Insights
                            </CardTitle>
                            <CardDescription>
                                How is my Ads campaign performing this week?
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                <div className="flex flex-col gap-[30px]">
                    <Card className="max-w-[320px] h-[103px] w-full">
                        <CardHeader>
                            <CardTitle className="font-mainhead">Comparative Analysis</CardTitle>
                            <CardDescription>
                                Compare the ROI of my Google Ads and Facebook Ads for the last
                                quarter.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="max-w-[320px] h-[103px] w-full">
                        <CardHeader>
                            <CardTitle className="font-mainhead">Generate Marketing Copy</CardTitle>
                            <CardDescription>
                                Create LinkedIn ad copies for my new Black Friday discount campaign.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    );
}
