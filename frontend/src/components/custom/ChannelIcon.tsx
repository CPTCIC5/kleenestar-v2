import React from "react";
import { Icons } from "@/assets/icons";
import { useTheme } from "next-themes";

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
};

const ChannelIcon: React.FC<ChannelIconProps> = (props) => {
    const { channelType, className, ...rest } = props;
    const IconComponent = CHANNEL_ICONS[channelType];
    const theme = useTheme();

    // Determine which version of the icon to render based on theme
    const getIcon = () => {
        if (channelType === 3) {
            // For Twitter icon
            return theme.theme === "dark" ? Icons.logoTwitterWhite : Icons.logoTwitter;
        }
        return IconComponent;
    };

    const SelectedIcon = getIcon();

    return SelectedIcon ? <SelectedIcon className={className} {...rest} /> : null;
};

export default ChannelIcon;
