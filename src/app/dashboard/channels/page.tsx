"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import Cookies from "js-cookie";
import React, { Suspense, useState } from "react";
import { useFetchChannels } from "@/hooks/channel/useFetchChannels";
import { ChannelConnectCard } from "@/components/custom/cards/ChannelConnectCard";
import { ChannelShopifyStoreDialog } from "@/components/custom/dialogs/ChannelShopifyStoreDialog";
import { ChannelErrorDialog } from "@/components/custom/dialogs/ChannelErrorDialog";

interface Credentials {
    key_1: string;
    key_2: string;
    key_3: string;
    key_4: string;
    key_5: string;
}

interface Channel {
    id: number;
    channel_type: number;
    credentials: Credentials;
    created_at: string; // ISO 8601 date string
}

async function OauthController(key: string) {
    const subspaceId = Cookies.get("subspaceId");

    if (!subspaceId) {
        console.error("Subspace ID not found");
        return;
    }

    try {
        const response = await axios.get(`/api/oauth/${key}subspace_id=${subspaceId}`, {
            withCredentials: true,
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrfToken"),
            },
        });
        const url = response.data.url;
        window.open(url, "_parent");
    } catch (err) {
        console.log(err);
    }
}

export default function ChannelPage() {
    const [shopifyStoreDialogOpen, setShopifyStoreDialogOpen] = useState<boolean>(false);
    const [shopifyStoreName, setShopifyStoreName] = useState<string>("");
    const {
        data: channels = [],
        isLoading: fetchChannelLoading,
        isSuccess: fetchChannelSuccess,
    } = useFetchChannels();
    console.log(channels);

    const handleShopifyOauth = () => {
        OauthController(`shopify?shop=${shopifyStoreName}&`);
        setShopifyStoreDialogOpen(false);
    };

    const isChannelEnabled = (channel_type: number) => {
        for (const channel of channels) {
            if (channel.channel_type === channel_type) {
                return true;
            }
        }
        return false;
    };

    return (
        <React.Fragment>
            <div className="flex flex-col min-h-screen h-full w-full p-4">
                <nav className="w-full flex pb-4 items-center gap-2">
                    <h1 className="text-2xl font-bricolage font-extrabold">Channels</h1>
                </nav>
                <div className="h-full w-full flex flex-col flex-[1] items-center gap-4">
                    <Card className="bg-secondary/30">
                        <CardHeader className="space-y-0">
                            <CardTitle className="text-lg font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-foreground/60 to-foreground/95">
                                Popular Platforms
                            </CardTitle>
                        </CardHeader>
                        <div className="p-6 pt-0 grid grid-cols-1  md:grid-cols-2   xl:grid-cols-3 gap-4 w-full">
                            <ChannelConnectCard
                                channel={{ type: 1, key: "google/?", name: "Google Adwords" }}
                                channelEnabled={isChannelEnabled(1)}
                                channelData={channels.find(
                                    (channel: Channel) => channel.channel_type === 1,
                                )}
                                OauthController={OauthController}
                            />
                            <ChannelConnectCard
                                channel={{ type: 2, key: "facebook/?", name: "Meta" }}
                                channelEnabled={isChannelEnabled(2)}
                                channelData={channels.find(
                                    (channel: Channel) => channel.channel_type === 2,
                                )}
                                OauthController={OauthController}
                            />
                            <ChannelConnectCard
                                channel={{ type: 3, key: "twitter/?", name: "Twitter" }}
                                channelEnabled={isChannelEnabled(3)}
                                channelData={channels.find(
                                    (channel: Channel) => channel.channel_type === 3,
                                )}
                                OauthController={OauthController}
                            />
                            <ChannelConnectCard
                                channel={{ type: 4, key: "linkedin/?", name: "Linkedin" }}
                                channelEnabled={isChannelEnabled(4)}
                                channelData={channels.find(
                                    (channel: Channel) => channel.channel_type === 4,
                                )}
                                OauthController={OauthController}
                            />
                            <ChannelConnectCard
                                channel={{ type: 5, key: "tiktok/?", name: "TikTok" }}
                                channelEnabled={isChannelEnabled(5)}
                                channelData={channels.find(
                                    (channel: Channel) => channel.channel_type === 5,
                                )}
                                OauthController={OauthController}
                            />
                            <ChannelConnectCard
                                channel={{ type: 6, key: "reddit/?", name: "Reddit" }}
                                channelEnabled={isChannelEnabled(6)}
                                channelData={channels.find(
                                    (channel: Channel) => channel.channel_type === 6,
                                )}
                                OauthController={OauthController}
                            />
                            <ChannelConnectCard
                                channel={{ type: 10, key: "bing/?", name: "Bing" }}
                                channelEnabled={isChannelEnabled(10)}
                                channelData={channels.find(
                                    (channel: Channel) => channel.channel_type === 10,
                                )}
                                OauthController={OauthController}
                            />
                        </div>
                    </Card>
                    <Card className="bg-secondary/30">
                        <CardHeader className="space-y-0">
                            <CardTitle className="text-lg font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-foreground/60 to-foreground/95">
                                Web Analytics
                            </CardTitle>
                        </CardHeader>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-0 gap-3 w-full">
                            <ChannelConnectCard
                                channel={{ type: 7, key: "shopify/", name: "Shopify" }}
                                channelEnabled={isChannelEnabled(7)}
                                channelData={channels.find(
                                    (channel: Channel) => channel.channel_type === 7,
                                )}
                                setShopifyStoreDialogOpen={setShopifyStoreDialogOpen}
                                OauthController={OauthController}
                            />
                            <ChannelConnectCard
                                channel={{
                                    type: 8,
                                    key: "google-analytics/?",
                                    name: "Google Analytics",
                                }}
                                channelEnabled={isChannelEnabled(8)}
                                channelData={channels.find(
                                    (channel: Channel) => channel.channel_type === 8,
                                )}
                                OauthController={OauthController}
                            />
                        </div>
                    </Card>
                    <Card className="bg-secondary/30">
                        <CardHeader className="space-y-0">
                            <CardTitle className="text-lg font-bricolage font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-foreground/60 to-foreground/95">
                                Email Analytics
                            </CardTitle>
                        </CardHeader>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-0 gap-3 w-full">
                            <ChannelConnectCard
                                channel={{
                                    type: 9,
                                    key: "mailchimp/?",
                                    name: "Mailchimp",
                                }}
                                channelEnabled={isChannelEnabled(9)}
                                channelData={channels.find(
                                    (channel: Channel) => channel.channel_type === 9,
                                )}
                                OauthController={OauthController}
                            />
                        </div>
                    </Card>
                </div>
            </div>
            <ChannelShopifyStoreDialog
                shopifyStoreDialogOpen={shopifyStoreDialogOpen}
                setShopifyStoreDialogOpen={setShopifyStoreDialogOpen}
                shopifyStoreName={shopifyStoreName}
                setShopifyStoreName={setShopifyStoreName}
                handleShopifyOauth={handleShopifyOauth}
            />
            <Suspense>
                <ChannelErrorDialog />
            </Suspense>
        </React.Fragment>
    );
}
