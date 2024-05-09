"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import workspace from '../../../assets/images/workspace.jpg'
import person from '../../../assets/images/person.jpg'
import Image from "next/image"
import Link from 'next/link'
import { Icons } from "@/assets/icons"
import { useRouter } from "next/navigation"

export default function ChooseStart(){
    const router = useRouter()

    return (
			<div className="relative animate-fade-in-up  max-xl:pt-10 pt-[5%]">
				<div className="absolute  left-[30px]">
					<div
						onClick={() => {
							router.back()
						}}
						className="rounded-full hover:bg-slate-100 p-1 flex justify-start w-fit ">
						<Icons.left_arrow className="w-[17px] h-[17px]" />
					</div>
				</div>

				<div className="animate-fade-in-up font-inter max-xl:px-10">
					<div>
						<Icons.logoDark className=" w-[50px] h-[50px] mx-auto max-xl:w-[50px] max-xl:h-[50px]" />
					</div>
					<div className="text-[30px] text-center font-bold text-background dark:text-foreground font-mainhead pt-4">
						{"Let's get started"}
					</div>
					<div className="w-[45%] max-xl:w-[90%] mx-auto pt-4 font-inter text-gray-700">
						<div className="text-center text-background dark:text-foreground  text-lg w-fit">
							Join a Workspace to collaborate with your team by entering your
							workspace code or accepting an invite, or Create a Workspace to
							set up your own and begin organizing and analyzing your marketing
							data across multiple platforms.
						</div>
					</div>
					<div className="flex mx-auto gap-[5%] w-fit pt-10 max-xl:flex-col pb-10">
						<Link href="/login">
							<Card className={cn("h-[310px] w-[300px]")}>
								<CardContent
									className={cn("p-0 h-[260px] pt-4 w-[90%] mx-auto")}>
									<Image
										className="w-full h-full rounded-2xl "
										src={workspace}
										alt={"workspace"}></Image>
								</CardContent>
								<p className="text-center w-full mt-2">I have a workspace</p>
							</Card>
						</Link>
						<Link href="/welcome/workspace">
							<Card className={cn("h-[310px] w-[300px]")}>
								<CardContent
									className={cn("p-0 h-[260px] pt-4 w-[90%] mx-auto")}>
									<Image
										className="w-full h-full rounded-2xl "
										src={person}
										alt={"person"}></Image>
								</CardContent>
								<p className="text-center w-full mt-2">
									I {"don't"} have a workspace
								</p>
							</Card>
						</Link>
					</div>
				</div>
			</div>
		)
}