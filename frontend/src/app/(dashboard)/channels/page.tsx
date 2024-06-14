"use client";

import { CardTitle } from "@/components/ui/card";

import axios from "axios";
import Cookies from "js-cookie";
import { Icons } from "@/assets/icons";
import { useChannelsData } from "@/hooks/useChannelsData";
import ConnectChannelCard from "@/components/custom/ConnectChannelCard";

interface Credentials {
    key_1: string;
    key_2: string;
    key_3: string;
    key_4: string;
    key_5: string;
}

interface Channel {
    channel_type: number;
    credentials: Credentials;
    created_at: string; // ISO 8601 date string
}

const OauthController = async (key: string) => {
    try {
        const response = await axios.get(`/api/oauth/${key}`, {
            withCredentials: true,
            headers: {
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
    const {
        data: channelsData = [],
        isLoading: isChannelsLoading,
        isSuccess: isChannelsSuccess,
    } = useChannelsData();
    console.log(channelsData);

    const isChannelEnabled = (channel_type: number) => {
        if (channelsData.channel_type === channel_type) {
            const { key_1, key_2, key_3, key_4, key_5 } = channelsData.credentials;
            if (key_1 !== "" || key_2 !== "" || key_3 !== "" || key_4 !== "" || key_5 !== "") {
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
                    channel={{ type: 1, key: "google", name: "Google Adwords" }}
                    channelEnabled={isChannelEnabled(1)}
                    OauthController={OauthController}
                    isChannelLoading={isChannelsLoading}
                />
                <ConnectChannelCard
                    channel={{ type: 2, key: "facebook", name: "Meta" }}
                    channelEnabled={isChannelEnabled(2)}
                    OauthController={OauthController}
                    isChannelLoading={isChannelsLoading}
                />
                <ConnectChannelCard
                    channel={{ type: 3, key: "twitter", name: "Twitter" }}
                    channelEnabled={isChannelEnabled(3)}
                    OauthController={OauthController}
                    isChannelLoading={isChannelsLoading}
                />
                <ConnectChannelCard
                    channel={{ type: 4, key: "linkedin", name: "Linkedin" }}
                    channelEnabled={isChannelEnabled(4)}
                    OauthController={OauthController}
                    isChannelLoading={isChannelsLoading}
                />
                <ConnectChannelCard
                    channel={{ type: 4, key: "tiktok", name: "TikTok" }}
                    channelEnabled={isChannelEnabled(5)}
                    OauthController={OauthController}
                    isChannelLoading={isChannelsLoading}
                />
                <ConnectChannelCard
                    channel={{ type: 6, key: "reddit", name: "Reddit" }}
                    channelEnabled={isChannelEnabled(6)}
                    OauthController={OauthController}
                    isChannelLoading={isChannelsLoading}
                />
            </div>
            <div className="!mt-12 space-y-6">
                <div className="gap-2 flex items-center">
                    <CardTitle className="font-mainhead">Connect web analytics</CardTitle>
                    <Icons.solarQuestionCircleLine className="h-4 w-4" />
                </div>
                <div className="flex flex-wrap gap-x-7 gap-6 max-md:justify-center w-full">
                    <ConnectChannelCard
                        channel={{ type: 7, key: "shopify", name: "Shopify" }}
                        channelEnabled={isChannelEnabled(7)}
                        OauthController={OauthController}
                        isChannelLoading={isChannelsLoading}
                    />
                    <ConnectChannelCard
                        channel={{ type: 8, key: "facebook", name: "Google Analytics" }}
                        channelEnabled={false}
                        OauthController={OauthController}
                        isChannelLoading={isChannelsLoading}
                    />
                </div>
            </div>
        </div>
    );
}
