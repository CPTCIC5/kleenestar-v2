"use client";

import { SettingsNotificationForm } from "@/components/custom/SettingsNotificationForm";
import { SettingsProfileForm } from "@/components/custom/SettingsProfileForm";
import { SettingsSecurityForm } from "@/components/custom/SettingsSecurityForm";
import { WorkspaceNotificationForm } from "@/components/custom/SettingsWorkspaceForm";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="w-full flex items-start justify-center flex-1  p-3 ">
            <div className="max-w-2xl w-full flex flex-col space-y-6">
                <div>
                    <div className="w-full flex items-center space-x-2 font-mainhead text-xl">
                        <span>Settings</span>
                        <InfoCircledIcon className="h-4 w-4" />
                    </div>
                    <CardDescription>Manage your account settings.</CardDescription>
                </div>
                <Tabs defaultValue="profile" className="w-full">
                    <div className="w-full flex bg-muted rounded-sm max-ms:flex-col h-full">
                        <TabsList className="grid w-full grid-cols-2 h-12">
                            <TabsTrigger className="rounded-sm py-2" value="profile">
                                Account
                            </TabsTrigger>
                            <TabsTrigger className="rounded-sm py-2" value="workspace">
                                Workspace
                            </TabsTrigger>
                        </TabsList>
                        <TabsList className="grid w-full grid-cols-2 h-12">
                            <TabsTrigger className="rounded-sm py-2" value="notifications">
                                Notifications
                            </TabsTrigger>
                            <TabsTrigger className="rounded-sm py-2" value="security">
                                Security
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent
                        value="profile"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                        <SettingsProfileForm />
                    </TabsContent>
                    <TabsContent
                        value="workspace"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                        <WorkspaceNotificationForm />
                    </TabsContent>
                    <TabsContent
                        value="notifications"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                        <SettingsNotificationForm />
                    </TabsContent>
                    <TabsContent
                        value="security"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                        <SettingsSecurityForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
