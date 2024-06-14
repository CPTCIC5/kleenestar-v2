import { Icons } from "@/assets/icons";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import ChannelIcon from "./ChannelIcon";
import useRemoveChannel from "@/hooks/useRemoveChannel";

interface ConnectChannelCardProps {
    channel: {
        type: number;
        key: string;
        name: string;
    };
    channelEnabled: boolean;
    OauthController: (channel: string) => void;
    isChannelLoading: boolean;
}

export default function ConnectChannelCard({
    channel,
    channelEnabled,
    OauthController,
    isChannelLoading,
}: ConnectChannelCardProps) {
    const { mutate: mutateChannelRemove } = useRemoveChannel();

    return (
        <Card className="w-80 h-14 px-5 items-center justify-between flex">
            <div className="flex gap-4 items-center">
                <ChannelIcon channelType={channel.type} className="w-9 h-9" />
                <span className="font-medium">{channel.name}</span>
            </div>

            {isChannelLoading ? (
                <Icons.spinner className="animate-spin text-muted-foreground" />
            ) : (
                <Switch
                    onClick={() => {
                        if (channelEnabled) {
                            mutateChannelRemove(channel.type);
                        } else {
                            OauthController(channel.key);
                        }
                    }}
                    checked={channelEnabled}
                />
            )}
        </Card>
    );
}
