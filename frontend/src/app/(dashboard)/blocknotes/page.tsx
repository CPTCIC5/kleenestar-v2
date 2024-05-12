"use client";

import { SearchBox } from "@/components/custom/SearchBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { blockNotes } from "@/constants/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DotsHorizontalIcon, InfoCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import Cookies from "js-cookie"
import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'



export default function BlockNotesPage() {
    
    const router = useRouter()
    const [blockNotes, setBlockNotes] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userDetails, setUserDetails] = useState<{
        id: string
        profile: { country: string }
    }>({
        id: "",
        profile: {
            country: "",
        },
    })

    const fetchBlockNotes = async() => {
			try {
				const response = await axios.get(
					"http://127.0.0.1:8000/api/channels/blockNotes/",
					{
						withCredentials: true,
						headers: {
							"Content-Type": "application/json",
							"X-CSRFToken": Cookies.get("csrftoken"),
						},
					}
				)
				setBlockNotes(response.data)
			} catch (err) {
				console.log(err)
				toast.error("Failed to fetch block note details")
			}
            setLoading(false)
		}

    
    useEffect(() => {
				const fetchWorkspaceDetails = async () => {
					try {
						const response = await axios.get(
							"http://127.0.0.1:8000/api/workspaces/",
							{
								withCredentials: true,
								headers: {
									"Content-Type": "application/json",
									"X-CSRFToken": Cookies.get("csrftoken"),
								},
							}
						)
						console.log(response)
						setIsLoggedIn(true)
						console.log(isLoggedIn)
						setUserDetails(response.data[0].root_user)
					} catch (err) {
						console.error(err)
						router.push("/")
					}
				}
				fetchWorkspaceDetails()
			}, [])

    useEffect(() => {
        if (!isLoggedIn) return
        fetchBlockNotes()
    }, [isLoggedIn])

    return (
        <div className="w-full h-screen flex items-start justify-center flex-1 bg-muted/40 max-sm:pt-[65px] p-3">
            <div className="max-w-[950px] w-full flex flex-col">
                <div className="flex gap-2 items-center mb-[16px]">
                    <span className="font-mainhead font-bold text-[18px]">BlockNotes</span>
                    <InfoCircledIcon className="h-[15px] w-[15px]" />
                </div>
                <div className="flex items-center justify-between pr-3">
                    <SearchBox
                        type="text"
                        placeholder="Search notebook, or note…"
                        className="max-w-[420px] w-full bg-muted/60"
                    />
                    <Link href={"/create-blockNotes"}>
                        <Button>
                            <div className="flex items-center justify-center gap-[6px]">
                                <PlusCircledIcon className="h-[17px] w-[17px]" />
                                <span className="text-[15px]">Create new</span>
                            </div>
                        </Button>
                    </Link>
                </div>

                {blockNotes?.length === 0 ? (
                    <div className="flex items-center justify-center h-[200px]">
                        <span className="text-[15px] flex justify-center max-w-[629px] w-full text-center text-muted-foreground">
                            Create notes from your chat with AI and share them with your team
                            members to promote productivity and collaboration.
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-[27px] mt-[27px]">
                        {blockNotes.map((note) => {
                            return (
                                <Card key={note.id} className="max-w-[206px] w-full">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between ">
                                            <Avatar className="w-[30px] h-[30px] rounded-full ">
                                                <AvatarImage
                                                    className="rounded-full border-2 border-muted"
                                                    src="https://github.com/shadcn.png"
                                                    alt="@shadcn"
                                                />
                                                <AvatarFallback className="flex items-center justify-center">
                                                    N
                                                </AvatarFallback>
                                            </Avatar>
                                            <Button
                                                variant={"ghost"}
                                                className="p-1 rounded-full h-full"
                                            >
                                                <DotsHorizontalIcon className="h-[20px] w-[20px]" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-5">
                                        <CardTitle className="text-[15px]">{note.title}</CardTitle>
                                        <CardDescription className="text-[11px]">
                                            {`Last modified: ${note.last_modified}`}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
