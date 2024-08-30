"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pause, Trash, UserPlus } from "@phosphor-icons/react/dist/ssr";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useFetchWorkspace } from "@/hooks/workspace/useFetchWorkspace";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useInviteTeamMember } from "@/hooks/team/useInviteTeamMember";

export default function TeamPage() {
    const { data: workspace } = useFetchWorkspace();
    const [memberEmail, setMemberEmail] = React.useState<string>("");
    const [isAddMemberSectionOpen, setIsAddMemberSectionOpen] = React.useState<boolean>(false);
    const { mutate, isPending } = useInviteTeamMember();

    const handleInviteTeamMember = () => {
        const data = { workspaceId: workspace?.id, memberEmail: memberEmail };
        mutate(data);
        setMemberEmail("");
        setIsAddMemberSectionOpen(false);
    };

    return (
        <div className="flex flex-col items-center min-h-screen h-full w-full p-4 space-y-4">
            <nav className="w-full flex items-center gap-2">
                <h1 className="text-2xl font-bricolage font-extrabold">Team members</h1>
            </nav>

            <div className="flex flex-col items-center flex-[1] h-full w-full max-w-2xl space-y-5">
                {isAddMemberSectionOpen ? (
                    <div className="w-full flex items-center justify-between gap-3">
                        <Input
                            id="inviteMemberInput"
                            name="inviteMemberInput"
                            type="email"
                            placeholder="Enter email address to invite team member"
                            value={memberEmail}
                            onChange={(e) => setMemberEmail(e.target.value)}
                            disabled={isPending}
                            className="w-full"
                        />
                        <Button
                            variant="secondary"
                            onClick={handleInviteTeamMember}
                            disabled={isPending || !memberEmail}
                        >
                            send code
                        </Button>
                    </div>
                ) : (
                    <Button
                        onClick={() => setIsAddMemberSectionOpen(!isAddMemberSectionOpen)}
                        className="gap-1 items-center w-full"
                    >
                        <UserPlus weight="duotone" className="h-5 w-5" />
                        Invite member
                    </Button>
                )}

                <div className="relative w-2/3">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t " />
                    </div>
                    <div className="relative flex justify-center uppercase">
                        <span className=" w-fit   text-muted-foreground">
                            <div className=" w-full px-2 text-xs bg-background">Team members</div>
                        </span>
                    </div>
                </div>

                {workspace?.users.length > 0 ? (
                    <ScrollArea className="w-full h-full">
                        <ScrollBar orientation="vertical" />
                        <section className="w-full rounded-md pr-2  max-h-[calc(100vh-246px)] h-full flex flex-wrap items-center justify-center gap-3">
                            {workspace?.users.map((user: User) => {
                                return (
                                    <Card key={user.id} className="w-52 h-fit">
                                        <CardHeader className="w-full h-full space-y-3 items-center">
                                            <Avatar className="size-28 rounded-full border-2 border-muted">
                                                <AvatarImage
                                                    src={user?.profile?.avatar}
                                                    alt="profile-picture"
                                                />
                                                <AvatarFallback className="flex items-center justify-center">
                                                    {user?.first_name?.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>

                                            <section className="w-full flex flex-col items-center overflow-hidden">
                                                {(user.first_name || user.last_name) && (
                                                    <CardTitle className="w-full text-center text-base text-muted-foreground font-bricolage font-semibold text-ellipsis overflow-hidden whitespace-nowrap">{`${user.first_name} ${user.last_name}`}</CardTitle>
                                                )}
                                                {user.email && (
                                                    <CardDescription className="w-full text-xs  text-center font-bricolage font-thin text-ellipsis overflow-hidden whitespace-nowrap">
                                                        {user.email}
                                                    </CardDescription>
                                                )}
                                            </section>

                                            <div className="w-full flex items-center justify-center space-x-3">
                                                <Button
                                                    variant="secondary"
                                                    size="icon"
                                                    className="size-9"
                                                >
                                                    <Pause weight="duotone" className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    size="icon"
                                                    className="size-9 flex items-center justify-center text-destructive bg-destructive/10 hover:bg-destructive/20"
                                                >
                                                    <Trash weight="duotone" className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                );
                            })}
                        </section>
                    </ScrollArea>
                ) : (
                    <div className="flex flex-col items-center justify-center p-10 bg-secondary rounded-md ">
                        <span className="text-sm text-muted-foreground">
                            No team member found. Click the button above to send a invite code to
                            team member
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
