"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GearSix } from "@phosphor-icons/react/dist/ssr";
import { SettingsProfileForm } from "@/components/custom/forms/settings/SettingsProfileForm";
import { SettingsSecurityForm } from "@/components/custom/forms/settings/SettingsSecurityForm";
import { SettingsWorkspaceForm } from "@/components/custom/forms/settings/SettingsWorkspaceForm";
import { SettingsNotificationForm } from "@/components/custom/forms/settings/SettingsNotificationForm";

export default function SettingsPage() {
    const [selectedComponent, setSelectedComponent] = useState("Profile");

    const settingsSidebarItems = [
        { label: "Profile", component: <SettingsProfileForm className="w-full max-w-6xl" /> },
        { label: "Workspace", component: <SettingsWorkspaceForm className="w-full max-w-6xl" /> },
        {
            label: "Notification",
            component: <SettingsNotificationForm className="w-full max-w-6xl" />,
        },
        { label: "Security", component: <SettingsSecurityForm className="w-full max-w-6xl" /> },
    ];

    const renderComponent = (label: string) => {
        const item = settingsSidebarItems.find((item) => item.label === label);
        return item?.component;
    };

    return (
        <div className="flex flex-col h-full w-full p-4">
            <nav className="w-full flex pb-4 items-center gap-2">
                <h1 className="text-2xl font-bricolage font-extrabold ">Settings</h1>
            </nav>
            <div className="h-full flex flex-col md:flex-row">
                <aside className="md:h-full w-full md:max-w-56 flex flex-col md:items-start py-4 md:p-4 md:gap-2">
                    {settingsSidebarItems.map((item) => (
                        <Button
                            variant="ghost"
                            key={item.label}
                            onClick={() => setSelectedComponent(item.label)}
                            className={cn(
                                "flex justify-start w-full",
                                item.label === selectedComponent
                                    ? "text-foreground"
                                    : "text-muted-foreground",
                            )}
                        >
                            {item.label}
                        </Button>
                    ))}
                </aside>
                <section className="h-full w-full flex flex-col items-center justify-start md:p-4">
                    {renderComponent(selectedComponent)}
                </section>
            </div>
        </div>
    );
}
