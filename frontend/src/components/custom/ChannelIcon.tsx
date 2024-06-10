import React from "react";
import { Icons } from "@/assets/icons";

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
};

const ChannelIcon: React.FC<ChannelIconProps> = (props) => {
    const { channelType, ...rest } = props;
    const IconComponent = CHANNEL_ICONS[channelType];
    return IconComponent ? <IconComponent {...rest} /> : null;
};

export default ChannelIcon;
