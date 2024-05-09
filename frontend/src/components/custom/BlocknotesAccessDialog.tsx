import { blocknotes, workspacePeople } from "@/constants/constants";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FormSchema = z.object({
    access: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
});

export function BlocknotesAccessDialog() {
    const note = blocknotes[2];
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Give access</Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Access and permission</DialogTitle>
                            <DialogDescription>
                                Give access and permission to your team members.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center space-y-2 w-full my-6">
                            {workspacePeople.map((person) => {
                                return (
                                    <Card key={person.id} className="w-full">
                                        <CardHeader className="p-2">
                                            <div className="flex items-center space-x-2">
                                                <Avatar className="w-[23.44px] h-[23.44px]  rounded-full ">
                                                    <AvatarImage
                                                        className="rounded-full border-2 border-muted"
                                                        src="https://github.com/shadcn.png"
                                                        alt="@shadcn"
                                                    />
                                                    <AvatarFallback className="flex items-center justify-center">
                                                        N
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 items-center">
                                                    <CardTitle className="text-[13px]">
                                                        {person.name}
                                                    </CardTitle>
                                                </div>
                                                <FormField
                                                    control={form.control}
                                                    name="access"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="no access" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="can edit">
                                                                        can edit
                                                                    </SelectItem>
                                                                    <SelectItem value="can view">
                                                                        can view
                                                                    </SelectItem>
                                                                    <SelectItem value="no access">
                                                                        no access
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </CardHeader>
                                    </Card>
                                );
                            })}
                        </div>
                        <DialogFooter>
                            <div className="flex justify-between items-end w-full">
                                <div className="flex-1">
                                    <DialogTitle className="text-[15px]">{note.title}</DialogTitle>
                                    <DialogDescription className="text-[11px]">
                                        {`Last modified: ${note.last_modified}`}
                                    </DialogDescription>
                                </div>
                                <DialogClose asChild>
                                    <Button type="button" variant="default">
                                        Save permission
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
