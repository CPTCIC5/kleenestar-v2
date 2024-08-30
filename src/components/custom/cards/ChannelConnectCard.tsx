import { useRemoveChannel } from "@/hooks/channel/useRemoveChannel";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Icons } from "@/assets/icons";

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

interface ChannelConnectCardProps {
    channel: {
        type: number;
        key: string;
        name: string;
    };
    channelData: Channel;
    channelEnabled: boolean;
    setShopifyStoreDialogOpen?: (value: boolean) => void;
    OauthController: (channel: string) => void;
}

interface ChannelIconProps {
    channelType: number;
    className?: string;
}

const CHANNEL_ICONS: { [key: number]: React.ComponentType<any> } = {
    1: Icons.logoGoogleAds,
    2: Icons.logoMeta,
    3: Icons.logoTwitter,
    4: Icons.logoLinkedin,
    5: Icons.logoTiktok,
    6: Icons.logoReddit,
    7: Icons.logoShopify,
    8: Icons.logoGoogleAnalytics,
    9: Icons.logoMailchimp,
    10: Icons.logoBing,
};

export function ChannelConnectCard({
    channel,
    channelData,
    channelEnabled,
    OauthController,
    setShopifyStoreDialogOpen,
}: ChannelConnectCardProps) {
    const IconComponent = CHANNEL_ICONS[channel.type];
    const { mutate: mutateChannelRemove } = useRemoveChannel();

    return (
        <div className="p-4 flex items-center justify-between w-72 gap-3 rounded-xl border border-border bg-background">
            <IconComponent className="size-9 dark:fill-foreground" />
            <span className="font-medium w-full flex-[1]">{channel.name}</span>

            <Switch
                onClick={() => {
                    if (channelEnabled) {
                        mutateChannelRemove(channelData.id);
                    } else {
                        if (channel.type === 7 && setShopifyStoreDialogOpen !== undefined) {
                            setShopifyStoreDialogOpen(true);
                        } else {
                            OauthController(channel.key);
                        }
                    }
                }}
                checked={channelEnabled}
            />
        </div>
    );
}
