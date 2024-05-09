"use client"
import { Icons } from "@/assets/icons"
import { Card } from "@/components/ui/card"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import campaign_image from "@/assets/images/campaign_image.jpg"

const getKnowledgeFiles = [
	{
		thumbnail: campaign_image,
		name: "https://sprtswear.shop",
		createdAt: "15/4/2024, 12:12:45 PM",
	},
	{
		thumbnail: campaign_image,
		name: "Art of advertizing control",
		createdAt: "15/4/2024, 12:12:45 PM",
	},
	{
		thumbnail: campaign_image,
		name: "https://sprtswear.shop",
		createdAt: "15/4/2024, 12:12:45 PM",
	},
	{
		thumbnail: campaign_image,
		name: "Art of advertizing control",
		createdAt: "15/4/2024, 12:12:45 PM",
	},
]

export default function Knowledge() {
    const handleDelete = () => {
        return null
    }
	return (
		<div className="mx-auto pt-[70.5px] max-w-[692px] max-xl:w-[90%] max-xl:pb-20">
			<div className="gap-[15px] flex items-center">
				<p className="text-[18px] font-mainhead">Knowledge </p>
				<QuestionMarkCircledIcon />
			</div>
			<div className="pt-[20px]  ">
				<Card className="h-[53.74px] flex items-center w-full">
					<div className="flex justify-between gap-[20px] w-full mx-auto px-[20px] max-xl:px-[10px]">
						<div className="flex gap-2 items-center">
							<p className="text-[15px] whitespace-nowrap  max-xl:text-[12px] font-mainhead">
								Drop a file:
							</p>
							<p className="text-[11px] max-xl:text-[10px] font-normal ">
								PDF, DOCX, CSV (max 25MB)
							</p>
						</div>
						<div className="flex items-center gap-2">
							<Card className="text-[16px] cursor-pointer max-xl:text-[14px] max-xl:px-[12px] max-xl:ml-2 h-[33.56px] px-[18px] gap-[12px] flex items-center">
								<Icons.circle_plus />
								<span className="pr-4 font-medium text-[13px]">Import</span>
							</Card>
						</div>
					</div>
				</Card>
			</div>
			<div className="pt-[25px] flex flex-wrap gap-[45px]">
				{getKnowledgeFiles.map((files) => {
					return (
						<Card className="max-w-[320.78px] w-full">
							<div className=" px-[24.77px] pb-[18.96px] pt-[22.87px]">
								{" "}
								<Image
									className="rounded-md "
									src={files.thumbnail}
									alt="thumbnail"></Image>
								<div className="flex justify-between items-center">
									<div>
										<p className="text-[15px] font-medium pt-[16px]">
											{files.name}
										</p>
										<p className="pt-[7px] text-[12px]">{files.createdAt}</p>
									</div>
									<div
										onClick={handleDelete}
										className="cursor-pointer">	<Icons.bin /></div>
								
								</div>
							</div>
						</Card>
					)
				})}
			</div>
		</div>
	)
}
