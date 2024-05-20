"use client"
import { Card } from "@/components/ui/card";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import google_ads from "@/assets/images/google-ads.png";
import meta from "@/assets/images/meta.png";
import twitter from "@/assets/images/twitter.png";
import linkedin from "@/assets/images/linkedin.png";
import tiktok from "@/assets/images/tiktok.png";
import bing from "@/assets/images/bing.png";
import pintrest from "@/assets/images/pintrest.png";
import snapchat from "@/assets/images/snapchat.png";
import redit from "@/assets/images/redit.png";
import google_analytics from "@/assets/images/google_analytics.png";
import shopify from "@/assets/images/shopify.png";
import { Switch } from "@/components/ui/switch";
import axios from 'axios'
import Cookies from 'js-cookie'

const channelDetails = [
    {   key: "google",
        name: "Google Adwords",
        icon: google_ads,
        enabled: true,
        available: true,
    },
    {
        key: 'facebook',
        name: "Meta",
        icon: meta,
        enabled: false,
        available: true,
    },
    {   key: 'twitter',
        name: "Twitter",
        icon: twitter,
        enabled: false,
        available: true,
    },
    {
        key: 'linkedin',
        name: "Linkedin",
        icon: linkedin,
        enabled: false,
        available: true,
    },
    {
        key: 'tiktok',
        name: "TikTok",
        icon: tiktok,
        enabled: false,
        available: true,
    },
    {
        key: 'bing',
        name: "Bing Ads",
        icon: bing,
        enabled: false,
    },
    {
        key: 'pinterest',
        name: "Pinterest",
        icon: pintrest,
        enabled: false,
        available: true,
    },
    {
        key: 'snapchat',
        name: "Snapchat",
        icon: snapchat,
        enabled: false,
    },
    {
        key: 'reddit',
        name: "Reddit",
        icon: redit,
        enabled: false,
        available: true,
    },
];

const webAnalytics = [
    {
        name: "Google Analytics",
        icon: google_analytics, 
        enabled: true,
    },
];

const OauthController = async(key: string) => {

    try{
        const response = await axios.get(`/api/oauth/${key}`,{
        withCredentials: true,
        headers: {
            'Content-Type': "application/json",
            'X-CSRFToken': Cookies.get('csrfToken')
        }
    })
    const url = response.data.url
    window.open(url,"_parent")
    }catch(err){
        console.log(err)
    }

}


export default function Connect_Channels() {
    return (
        <div className="mx-auto pt-[70.5px]  max-w-[692px] max-xl:w-[90%] max-xl:pb-20">
            <div className="gap-[15px] flex items-center">
                <p className="text-[18px] font-mainhead">Connect channels </p>
                <QuestionMarkCircledIcon />
            </div>
            <div className="pt-[20px] flex flex-wrap gap-x-[27px] gap-[25px]">
                {channelDetails.map((channel, index) => {
                    return (
                        <Card
                            key={index}
                            className="w-[321.46px] h-[50px] px-[18px] items-center justify-between flex"
                        >
                            <div className="flex gap-[16px] items-center">
                                <Image
                                    className={
                                        channel.name === "Twitter" || channel.name === "TikTok"
                                            ? "dark:filter dark:brightness-0 dark:invert p-[5px]"
                                            : "w-10 p-[5px] "
                                    }
                                    width={35}
                                    height={35}
                                    src={channel.icon}
                                    alt="icon"
                                ></Image>
                                <p className="text-[15px] font-medium ">{channel.name}</p>
                            </div>

                            <Switch onClick={()=>{
                                OauthController(channel.key)
                            }} checked={channel.enabled} />
                        </Card>
                    );
                })}
            </div>
            <div className="pt-[50px]">
                <p className="text-[14px] pb-[24.33px]">Web analytics</p>
                <div className="flex flex-wrap gap-[27px]">
                    {webAnalytics.map((channel, index) => {
                        return (
                            <Card
                                key={index}
                                className="w-[321.46px] h-[50px] px-[18px] items-center justify-between flex"
                            >
                                <div className="flex gap-[16px] items-center">
                                    <Image
                                        className="p-[5px]"
                                        width={35}
                                        height={35}
                                        src={channel.icon}
                                        alt="icon"
                                    ></Image>
                                    <p className="text-[15px] font-medium ">{channel.name}</p>
                                </div>

                                <Switch checked={channel.enabled} />
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
