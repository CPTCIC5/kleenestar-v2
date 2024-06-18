"use client";

import { CardTitle } from "@/components/ui/card";

import axios from "axios";
import Cookies from "js-cookie";
import { Icons } from "@/assets/icons";
import { useChannelsData } from "@/hooks/useChannelsData";
import ConnectChannelCard from "@/components/custom/ConnectChannelCard";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

const OauthController = async (key: string) => {
    try {
        const response = await axios.get(`/api/oauth/${key}`, {
            withCredentials: true,
            headers: {
				"ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrfToken"),
            },
        });
        const url = response.data.url;
        window.open(url, "_parent");
    } catch (err) {
        console.log(err);
    }
};

export default function Connect_Channels() {
    const [openShopifyModal, setOpenShopifyModal] = useState<boolean>(false);
    const [shopifyShop, setShopifyShop] = useState<string>("")
    const {
        data: channelsData = [],
        isLoading: isChannelsLoading,
        isSuccess: isChannelsSuccess,
    } = useChannelsData();
    console.log(channelsData);

    const handleShopifyOauth = () => {
        OauthController(`shopify/?shop=${shopifyShop}`);
        setOpenShopifyModal(false)
    }

    const isChannelEnabled = (channel_type: number) => {
        for (const channel of channelsData) {
            if (channel.channel_type === channel_type) {
                return true;
            }
        }
        return false;
    };

    return (
			<div className="mx-auto pt-[70.5px] max-w-[692px] max-xl:w-[90%] max-xl:pb-20 space-y-6">
				<div className="gap-2 flex items-center">
					<CardTitle className="font-mainhead">Connect channels</CardTitle>
					<Icons.solarQuestionCircleLine className="h-4 w-4" />
				</div>
				<div className="flex flex-wrap gap-x-7 gap-6 max-md:justify-center w-full">
					<ConnectChannelCard
						channel={{ type: 1, key: "google/", name: "Google Adwords" }}
						channelEnabled={isChannelEnabled(1)}
						channelData={channelsData.find(
							(channel: Channel) => channel.channel_type === 1
						)}
						OauthController={OauthController}
						isChannelLoading={isChannelsLoading}
					/>
					<ConnectChannelCard
						channel={{ type: 2, key: "facebook/", name: "Meta" }}
						channelEnabled={isChannelEnabled(2)}
						channelData={channelsData.find(
							(channel: Channel) => channel.channel_type === 2
						)}
						OauthController={OauthController}
						isChannelLoading={isChannelsLoading}
					/>
					<ConnectChannelCard
						channel={{ type: 3, key: "twitter/", name: "Twitter" }}
						channelEnabled={isChannelEnabled(3)}
						channelData={channelsData.find(
							(channel: Channel) => channel.channel_type === 3
						)}
						OauthController={OauthController}
						isChannelLoading={isChannelsLoading}
					/>
					<ConnectChannelCard
						channel={{ type: 4, key: "linkedin/", name: "Linkedin" }}
						channelEnabled={isChannelEnabled(4)}
						channelData={channelsData.find(
							(channel: Channel) => channel.channel_type === 4
						)}
						OauthController={OauthController}
						isChannelLoading={isChannelsLoading}
					/>
					<ConnectChannelCard
						channel={{ type: 5, key: "tiktok/", name: "TikTok" }}
						channelEnabled={isChannelEnabled(5)}
						channelData={channelsData.find(
							(channel: Channel) => channel.channel_type === 5
						)}
						OauthController={OauthController}
						isChannelLoading={isChannelsLoading}
					/>
					<ConnectChannelCard
						channel={{ type: 6, key: "reddit/", name: "Reddit" }}
						channelEnabled={isChannelEnabled(6)}
						channelData={channelsData.find(
							(channel: Channel) => channel.channel_type === 6
						)}
						OauthController={OauthController}
						isChannelLoading={isChannelsLoading}
					/>
				</div>
				<div className="!mt-12 space-y-6">
					<div className="gap-2 flex items-center">
						<CardTitle className="font-mainhead">
							Connect web analytics
						</CardTitle>
						<Icons.solarQuestionCircleLine className="h-4 w-4" />
					</div>
					<div className="flex flex-wrap gap-x-7 gap-6 max-md:justify-center w-full">
						<ConnectChannelCard
							channel={{ type: 7, key: "shopify/", name: "Shopify" }}
							channelEnabled={isChannelEnabled(7)}
							channelData={channelsData.find(
								(channel: Channel) => channel.channel_type === 7
							)}
							setOpenShopifyModal={setOpenShopifyModal}
							OauthController={OauthController}
							isChannelLoading={isChannelsLoading}
						/>
						<ConnectChannelCard
							channel={{ type: 8, key: "google/", name: "Google Analytics" }}
							channelEnabled={isChannelEnabled(1)}
							channelData={channelsData.find(
								(channel: Channel) => channel.channel_type === 7
							)}
							OauthController={OauthController}
							isChannelLoading={isChannelsLoading}
						/>
					</div>
				</div>

				{openShopifyModal && (
					<Dialog
						open={openShopifyModal}
						onOpenChange={setOpenShopifyModal}>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle className="font-mainhead">
									Shopify shop name
								</DialogTitle>
								<DialogDescription>
									Enter the name of your Shopify shop to connect it to
									Kleenestar.
								</DialogDescription>
							</DialogHeader>
							<Input
								id="shopifyShopName"
								placeholder="shop name"
                                name="shop name"
                                value={shopifyShop}
                                onChange={(e) => setShopifyShop(e.target.value)}
							/>
							<DialogFooter className="flex items-center justify-end">
								<Button
                                    disabled={shopifyShop.length === 0}
									onClick={handleShopifyOauth}
									type="submit">
									Proceed
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				)}
			</div>
		)
}
