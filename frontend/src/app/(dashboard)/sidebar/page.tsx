"use client";

import { ChatSheet } from "@/components/custom/ChatSidebar";
import { SettingsNotificationForm } from "@/components/custom/SettingsNotificationForm";
import { SettingsProfileForm } from "@/components/custom/SettingsProfileForm";
import { SettingsSecurityForm } from "@/components/custom/SettingsSecurityForm";
import { WorkspaceNotificationForm } from "@/components/custom/SettingsWorkspaceForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function Sidebar() {
    return (
        <div className="w-full h-screen flex items-start justify-center flex-1 bg-muted/40 max-sm:pt-[56px]">
            <ChatSheet />
            <div className=" flex-1 w-full h-full "></div>
        </div>
    );
}
