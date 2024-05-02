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

export function WorkspaceNotificationForm() {
    const form = useForm<SettingsWorkspaceFormSchemaTypes>({
        resolver: zodResolver(SettingsWorkspaceFormSchema),
        defaultValues: {
            name: "",
        },
    });

    function onSubmit(data: SettingsWorkspaceFormSchemaTypes) {
        console.log(data);
    }

    return (
        <Card>
            <CardHeader className="pt-3 pb-5">
                <CardDescription>
                    Update your workspace settings. Set your preferred language and timezone.
                </CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the name that will be displayed on your workspace.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="timezone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Timezone</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
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
                                                <SelectItem     value="pst">
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
                            <Button type="submit">Update workspace</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
