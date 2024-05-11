"use client"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import add_image from '../../../assets/images/add_image.png'
import FeedbackForm from "@/components/custom/FeedbackForm"
import { useRef, ChangeEvent, useState } from "react"

export default function Feedback(){
	const addRef = useRef<HTMLInputElement | null>(null)
	const [file, setFile] = useState("")
	const [formData, setFormData] = useState<FormData | null>(null)
	const handleAddImage = () => {
		if (addRef.current) {
			addRef.current.click()
		}
	}
	const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if(file)
		setFile(file.name)
		if (!file) {
			return
		} else {
			const formData = new FormData()
			formData.append("attachment", file)
			setFormData(formData)
		}
	}
	return (
		<div className="mx-auto pt-[70.5px] max-w-[692px] max-xl:w-[90%] max-xl:pb-20">
			<div className="gap-[15px] flex items-center">
				<p className="text-[18px] font-mainhead">Support and feedback </p>
				<QuestionMarkCircledIcon />
			</div>
			<div className="pt-[20px]  ">
				<Card className="h-[53.74px] flex items-center w-full">
					<div className="flex justify-between gap-[20px] w-full mx-auto px-[20px] max-xl:px-[10px]">
						<div className="flex gap-2 items-center">
							<p className="text-[15px]  max-xl:text-[12px] font-mainhead">
								Attachment:
							</p>
							<p className="text-[11px] max-xl:text-[10px] font-normal ">
								A screenshot will help a lot.
							</p>
						</div>
						<div className="flex items-center gap-2">
							<div className="text-[10px]">{file}</div>
							<Card
								onClick={handleAddImage}
								className="text-[16px] cursor-pointer max-xl:text-[14px] max-xl:px-[12px] max-xl:ml-2 h-[33.56px] px-[18px] gap-[12px] flex items-center">
								<input
									ref={addRef}
									className="hidden"
									type="file"
									name="files"
									accept="image/jpeg, image/png, image/jpg"
									onChange={handleImageUpload}
								/>
								<Image
									className="w-[20px] dark:filter dark:brightness-0 dark:invert h-[20px] max-xl:w-[15px] max-xl:h-[15px]"
									src={add_image}
									alt={"add_image"}
								/>
								<span className="pr-4">Add</span>
							</Card>
						</div>
					</div>
				</Card>
			</div>
			<FeedbackForm formData={formData as FormData} />
		</div>
	)
}