import { Icons } from "@/assets/icons";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import ChannelIcon from "./ChannelIcon";
import useRemoveChannel from "@/hooks/useRemoveChannel";
import React from "react";
import { set } from "react-hook-form";

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

interface ConnectChannelCardProps {
    channel: {
        type: number;
        key: string;
        name: string;
    };
    channelData: Channel;
    channelEnabled: boolean;
    setOpenShopifyModal?: (value: boolean) => void;
    OauthController: (channel: string) => void;
    isChannelLoading: boolean;
}

export default function ConnectChannelCard({
    channel,
    channelData,
    channelEnabled,
    OauthController,
    setOpenShopifyModal,
    isChannelLoading,
}: ConnectChannelCardProps) {
    const { mutate: mutateChannelRemove } = useRemoveChannel();

    return (
        <React.Fragment>
            <Card className="h-14 px-5 items-center justify-between flex w-full sm:max-w-96 md:w-80">
                <div className="flex gap-4 items-center">
                    <ChannelIcon
                        channelType={channel.type}
                        className="w-9 h-9 dark:fill-foreground"
                    />
                    <span className="font-medium">{channel.name}</span>
                </div>

                {isChannelLoading ? (
                    <Icons.spinner className="animate-spin text-muted-foreground" />
                ) : (
                    <Switch
                        onClick={() => {
                            if (channelEnabled) {
                                mutateChannelRemove(channelData.id);
                            } else {
                                if (channel.type === 7 && setOpenShopifyModal !== undefined) {
                                    setOpenShopifyModal(true);
                                } else {
                                    OauthController(channel.key);
                                }
                            }
                        }}
                        checked={channelEnabled}
                    />
                )}
            </Card>
        </React.Fragment>
    );
}
