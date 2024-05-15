"use client";

import { SettingsNotificationForm } from "@/components/custom/SettingsNotificationForm";
import { SettingsProfileForm } from "@/components/custom/SettingsProfileForm";
import { SettingsSecurityForm } from "@/components/custom/SettingsSecurityForm";
import { WorkspaceNotificationForm } from "@/components/custom/SettingsWorkspaceForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as React from "react";
import useUserStore from "@/lib/store/UserStore";
import { UserStoreState, User } from "@/lib/types/interfaces";
import axios from "axios";
import Cookies from "js-cookie";

export default function SettingsPage() {
    const setUser = useUserStore((state) => state.setUser);

    React.useEffect(() => {
        async function setUserData() {
            try {
                const response = await axios.get(
                    `/api/auth/users/me/`,
                    {
                        withCredentials: true,
                        headers: {
                            "ngrok-skip-browser-warning": "69420",
                            "Content-Type": "application/json",
                            "X-CSRFToken": Cookies.get("csrftoken"),
                        },
                    },
                );
                setUser(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        setUserData();
    }, []);

    return (
        <div className="w-full h-screen flex items-start justify-center flex-1 bg-muted/40 max-sm:pt-[65px] p-3 pt-[69px]">
            <div className="max-w-[662px] w-full flex flex-col">
                <div className="flex gap-2 items-center mb-[16px]">
                    <span className="font-mainhead font-bold text-[18px]">Settings</span>
                    <InfoCircledIcon className="h-[15px] w-[15px]" />
                </div>
                <Tabs defaultValue="profile" className="max-w-[662px] w-full">
                    <div className="w-full flex bg-muted rounded-lg max-ms:flex-col">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="profile">Account</TabsTrigger>
                            <TabsTrigger value="workspace">Workspace</TabsTrigger>
                        </TabsList>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="notifications">Notifications</TabsTrigger>
                            <TabsTrigger value="security">Security</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="profile">
                        <SettingsProfileForm />
                    </TabsContent>
                    <TabsContent value="workspace">
                        <WorkspaceNotificationForm />
                    </TabsContent>
                    <TabsContent value="notifications">
                        <SettingsNotificationForm />
                    </TabsContent>
                    <TabsContent value="security">
                        <SettingsSecurityForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
