"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"
import campaign_image from "../../../../assets/images/campaign_image.jpg"
import { Icons } from "@/assets/icons"
import React from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
	Dialog,
	DialogTrigger,
} from "@/components/ui/dialog"
import MakeNotes from "@/components/custom/MakeNotes"
import { dummyMarkdownNote } from "@/constants/constants"
import ChatFeedbackForm from "@/components/custom/ChatFeedbackForm"
import avatar from '@/assets/images/avatar.jpg'

export default function Create() {

	return (
		<div className="w-full max-xl:w-[90%] ms:px-[30px] max-w-[672.08px] max-xl:top-20 h-[78vh] absolute top-8 overflow-auto scrollbar-hide">
			{/* The input query card */}
			<Card
				className={cn(
					"max-w-[672.08px] w-full bg-transparent shadow-none outline-none border-none "
				)}>
				<CardContent className="px-[0px] flex justify-start">
					<div className="flex justify-between gap-[33.21px]">
						<div className="">
							<div className="w-fit h-fit rounded-full bg-red-100 border-gray-600 border-2">
								<Image
									width={45}
									className="rounded-full"
									height={45}
									loading="lazy"
									src={avatar}
									alt="avatar"></Image>
							</div>
						</div>
						<div className="flex-col">
							{/* Image */}
							<Image
								className="rounded-[15px]"
								src={campaign_image}
								alt="image_input"></Image>
							{/* Text */}
							<div className="pt-[20px] text-foreground text-[15px]">
								What do you think about this graphic for our next campaigns?
							</div>
						</div>
					</div>
					<div></div>
				</CardContent>
			</Card>
			{/* The kleenstar output card */}
			<Card
				className={cn(
					"max-w-[672.08px] mb-20  dark:bg-primary-foreground bg-gray-200  text-[15px] pt-[29.26px] w-full  shadow-none outline-none border-none "
				)}>
				<CardContent className="px-[27px] flex justify-start">
					{/* Response */}
					<div className="flex gap-[23.68px]">
						<div className="block max-xl:hidden">
							<Icons.logoDark className="w-[30px] h-[30px]" />
						</div>
						<div className=" prose">
							<Markdown remarkPlugins={[remarkGfm]}>
								{
									"Good morning! Let’s dive into your campaign performances: - Google Ads: The average CPC has decreased by 10% over the past month, while the CTR has increased by 3%. Your “Running Shoes” campaign is performing exceptionally with a conversion rate that’s 5% higher than the previous period. - Meta: Your eco-friendly sportswear videos have seen a 12% increase in engagement rates since last month. However, the conversion rate is 2% below the target. - TikTok: The interactive hashtag challenge launched last week has significantly boosted engagement, with a 25% increase in views. However, the share-to-like ratio suggests that targeting could be optimized to improve conversions. Would you like to explore any of these campaigns in more detail?"
								}
							</Markdown>
						</div>
					</div>
					{/* Response Image */}
					<div></div>
				</CardContent>
				<CardFooter>
					<div className="w-full flex pl-[56px] max-xl:pl-0 max-xl:gap-2 gap-4">
						<Dialog>
							<DialogTrigger asChild>
								<div className="cursor-pointer">
									<Icons.clipboard />
								</div>
							</DialogTrigger>
							<MakeNotes note={dummyMarkdownNote} />
						</Dialog>
						<Dialog>
							<DialogTrigger asChild>
								<div className="cursor-pointer">
									<Icons.feedback />
								</div>
							</DialogTrigger>
							<ChatFeedbackForm />
						</Dialog>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
