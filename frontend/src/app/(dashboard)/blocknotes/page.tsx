"use client"

import { SearchBox } from "@/components/custom/SearchBox"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
// import { blockNotes } from "@/constants/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import {
	DotsHorizontalIcon,
	InfoCircledIcon,
	PlusCircledIcon,
} from "@radix-ui/react-icons"
import Link from "next/link"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DateTimeFormatOptions } from "intl"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/assets/icons"
import useDebounce from "@/hooks/useDebounce"

interface BlockNoteTypes {
	id: number
	image: string
	created_at: string
    title: string
}

export default function BlockNotesPage() {
	const router = useRouter()
	const [blockNotes, setBlockNotes] = useState([])
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [loading, setLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState("")
	const [initalRender, setInitialRender] = useState(true)
	const debounceValue = useDebounce(searchQuery, 1000)
	const [userDetails, setUserDetails] = useState<{
		id: string
		profile: { country: string }
	}>({
		id: "",
		profile: {
			country: "",
		},
	})
    function convertDateTime(dateTimeStr: string) {
        const date = new Date(dateTimeStr)
        const options = {
            year: "numeric" as const,
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        }
        return new Intl.DateTimeFormat(
            "en-US",
            options as DateTimeFormatOptions
        ).format(date)
    }
	const fetchBlockNotes = async () => {
		try {
			const response = await axios.get(
				"http://127.0.0.1:8000/api/channels/blocknotes/",
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						"X-CSRFToken": Cookies.get("csrftoken"),
					},
				}
			)
			console.log(response.data)
			setBlockNotes(response.data)
		} catch (err) {
			console.log(err)
			toast.error("Failed to fetch block note details")
		}
		setLoading(false)
	}
	const deleteBlockNote = async(id: number) => {
		try {
			const response = await axios.delete(
				`http://127.0.0.1:8000/api/channels/blocknotes/${id}/`,
				{
					withCredentials: true,
					headers: {
						"X-CSRFToken": Cookies.get("csrftoken"),
					},
				}
			)
			console.log(response.data)
			toast.success("BlockNote Deleted Successfully!")
			await fetchBlockNotes()
		} catch (err) {
			console.log(err)
			toast.error("Failed to delete Block Note")
		}
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
    console.log(loading)

    useEffect(() => {
			if (!initalRender) {
				handleSearch()
			} else {
				setInitialRender(false)
			}
		}, [debounceValue])

	const handleSearch = async() => {
		if (searchQuery === "") {
			await fetchBlockNotes();
		} else {
			const filteredBlockNotes = blockNotes.filter((blocknotes: {
				title: string
			}) =>
				blocknotes.title.toLowerCase().includes(searchQuery.toLowerCase())
			)
			setBlockNotes(filteredBlockNotes)
		}
	}
	return (
		<div className="w-full h-screen flex items-start justify-center flex-1 bg-muted/40 max-sm:pt-[65px] pt-[99.5px] p-3">
			<div className="max-w-[912px] w-full flex flex-col">
				<div className="flex gap-2 items-center mb-[16px]">
					<span className="font-mainhead font-bold text-[18px]">
						BlockNotes
					</span>
					<InfoCircledIcon className="h-[15px] w-[15px]" />
				</div>
				<div className="flex items-center  max-xl:gap-8 justify-between pr-3">
					<SearchBox
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						type="text"
						placeholder="Search notebook, or note…"
						className="max-w-[420px] w-full bg-muted/60"
					/>
					<Link href={"/create-blocknotes"}>
						<Button>
							<div className="flex items-center justify-center gap-[6px]">
								<PlusCircledIcon className="h-[17px] w-[17px]" />
								<span className="text-[15px]">Create new</span>
							</div>
						</Button>
					</Link>
				</div>
				<div className="w-full flex max-xl:justify-center justify-start">
					{blockNotes?.length === 0 && !loading ? (
						<div className="flex items-center justify-center h-[150px]">
							<span className="text-[15px] flex justify-center max-w-[629px] w-full text-center text-muted-foreground">
								Create notes from your chat with AI and share them with your
								team members to promote productivity and collaboration.
							</span>
						</div>
					) : (
						<div className="flex flex-wrap justify-center gap-[27px] mt-[27px]">
							{loading ? (
								<div className="flex mx-auto gap-12 flex-wrap max-xl:pl-10  justify-between">
									<div className="flex-col space-y-3">
										<Skeleton className="h-[150px] w-[150px] rounded-xl" />
										<div className="space-y-2">
											<Skeleton className="h-4 w-[250px]" />
											<Skeleton className="h-4 w-[150px]" />
										</div>
									</div>
									<div className="flex-col space-y-3">
										<Skeleton className="h-[150px] w-[150px] rounded-xl" />
										<div className="space-y-2">
											<Skeleton className="h-4 w-[250px]" />
											<Skeleton className="h-4 w-[150px]" />
										</div>
									</div>
									<div className="flex-col space-y-3">
										<Skeleton className="h-[150px] w-[150px] rounded-xl" />
										<div className="space-y-2">
											<Skeleton className="h-4 w-[250px]" />
											<Skeleton className="h-4 w-[150px]" />
										</div>
									</div>
								</div>
							) : (
								blockNotes.map((note: BlockNoteTypes) => {
									return (
										<Card
											key={note.id}
											className="max-w-[206px] w-full">
											<CardHeader className="pb-2">
												<div className="flex items-center justify-between ">
													<Avatar className="w-[40.44px] h-[40.44px] relative rounded-full">
														<AvatarImage
															className="rounded-full border-2 border-muted"
															alt="blocknote-image"
															src={
																note.image
																	? `https://twemoji.maxcdn.com/v/latest/svg/${note.image}.svg`
																	: "https://github.com/shadcn.png"
															}
														/>
													</Avatar>

													<Button
														onClick={() => deleteBlockNote(note.id)}
														variant={"ghost"}
														className="p-1 rounded-full h-full">
														<Icons.bin className="w-[20px] h-[20px]" />
													</Button>
												</div>
											</CardHeader>
											<CardContent className="space-y-5">
												<CardTitle className="text-[15px]">
													{note.title}
												</CardTitle>
												<CardDescription className="text-[11px]">
													{`Last modified: ${convertDateTime(note.created_at)}`}
												</CardDescription>
											</CardContent>
										</Card>
									)
								})
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
