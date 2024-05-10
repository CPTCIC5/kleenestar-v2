"use client";

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SettingsWorkspaceFormSchemaTypes } from "../../lib/types/types";
import { SettingsWorkspaceFormSchema } from "@/lib/zod/schemas/schema";
import useUserStore from "@/lib/store/UserStore";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

export function WorkspaceNotificationForm() {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    const form = useForm<SettingsWorkspaceFormSchemaTypes>({
        resolver: zodResolver(SettingsWorkspaceFormSchema),
    });

    async function onSubmit(data: SettingsWorkspaceFormSchemaTypes) {
        try {
            if (user === null) console.error("No user found");
            const response = await axios.patch(
                `http://127.0.0.1:8000/api/auth/users/${user?.id}/`,
                {
                    first_name: data.firstName,
                    last_name: data.lastName,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                },
            );
            toast.success("Name updated successfully");
            setUser(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Card className="relative">
            <Button className="absolute bottom-6 left-6 max-sm:px-2" variant={"secondary"}>
                Delete workspace
            </Button>
            <CardHeader className="pt-3 pb-5">
                <CardDescription>
                    Update your workspace settings. Set your preferred language and timezone.
                </CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <div className="space-y-2">
                            <div className="flex gap-3 w-full max-ms:flex-col">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    defaultValue={user?.first_name}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="First Name"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    defaultValue={user?.last_name}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <CardDescription>
                                This is the name that will be displayed on your workspace.
                            </CardDescription>
                        </div>

                        <FormField
                            control={form.control}
                            name="timezone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Timezone</FormLabel>
                                    <Select
                                        disabled={true}
                                        onValueChange={field.onChange}
                                        defaultValue={"ist"}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="max-w-[280px] w-full">
                                                <SelectValue placeholder="Select a timezone" />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>North America</SelectLabel>
                                                <SelectItem value="est">
                                                    Eastern Standard Time (EST)
                                                </SelectItem>
                                                <SelectItem value="cst">
                                                    Central Standard Time (CST)
                                                </SelectItem>
                                                <SelectItem value="mst">
                                                    Mountain Standard Time (MST)
                                                </SelectItem>
                                                <SelectItem value="pst">
                                                    Pacific Standard Time (PST)
                                                </SelectItem>
                                                <SelectItem value="akst">
                                                    Alaska Standard Time (AKST)
                                                </SelectItem>
                                                <SelectItem value="hst">
                                                    Hawaii Standard Time (HST)
                                                </SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Europe & Africa</SelectLabel>
                                                <SelectItem value="gmt">
                                                    Greenwich Mean Time (GMT)
                                                </SelectItem>
                                                <SelectItem value="cet">
                                                    Central European Time (CET)
                                                </SelectItem>
                                                <SelectItem value="eet">
                                                    Eastern European Time (EET)
                                                </SelectItem>
                                                <SelectItem value="west">
                                                    Western European Summer Time (WEST)
                                                </SelectItem>
                                                <SelectItem value="cat">
                                                    Central Africa Time (CAT)
                                                </SelectItem>
                                                <SelectItem value="eat">
                                                    East Africa Time (EAT)
                                                </SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Asia</SelectLabel>
                                                <SelectItem value="msk">
                                                    Moscow Time (MSK)
                                                </SelectItem>
                                                <SelectItem value="ist">
                                                    India Standard Time (IST)
                                                </SelectItem>
                                                <SelectItem value="cst_china">
                                                    China Standard Time (CST)
                                                </SelectItem>
                                                <SelectItem value="jst">
                                                    Japan Standard Time (JST)
                                                </SelectItem>
                                                <SelectItem value="kst">
                                                    Korea Standard Time (KST)
                                                </SelectItem>
                                                <SelectItem value="ist_indonesia">
                                                    Indonesia Central Standard Time (WITA)
                                                </SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Australia & Pacific</SelectLabel>
                                                <SelectItem value="awst">
                                                    Australian Western Standard Time (AWST)
                                                </SelectItem>
                                                <SelectItem value="acst">
                                                    Australian Central Standard Time (ACST)
                                                </SelectItem>
                                                <SelectItem value="aest">
                                                    Australian Eastern Standard Time (AEST)
                                                </SelectItem>
                                                <SelectItem value="nzst">
                                                    New Zealand Standard Time (NZST)
                                                </SelectItem>
                                                <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>South America</SelectLabel>
                                                <SelectItem value="art">
                                                    Argentina Time (ART)
                                                </SelectItem>
                                                <SelectItem value="bot">
                                                    Bolivia Time (BOT)
                                                </SelectItem>
                                                <SelectItem value="brt">
                                                    Brasilia Time (BRT)
                                                </SelectItem>
                                                <SelectItem value="clt">
                                                    Chile Standard Time (CLT)
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Your timezone is used to synchronize your data.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" className="max-sm:px-2">
                                Update workspace
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
