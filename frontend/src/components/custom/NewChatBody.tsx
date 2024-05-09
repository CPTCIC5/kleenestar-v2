"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { defaultPrompts } from "@/constants/constants"
import {useEffect, useState} from 'react'


export default function NewChatBody() {
    
const [windowSize, setWindowSize] = useState("")

useEffect(() => {
	const handleResize = () => {
		setWindowSize(window.innerWidth < 600 ? "smaller" : "large")
	}
	handleResize()
	window.addEventListener("resize", handleResize)
	return () => {
		window.removeEventListener("resize", handleResize)
	}
}, [])

	return (
		<div>
			<div className=" text-center text-[15px] font-medium">
				How may I assist you today? 😊
			</div>
			<div className="w-full flex justify-center ">
				<div className="max-w-[672.58px] pt-[30px] gap-[32px] flex-wrap w-full flex">
                    {
                        windowSize === "smaller" ? (
                            defaultPrompts.slice(0,2).map((value, index) => {
						return (
							<Card
								key={index}
								className="max-w-[320px] mx-auto w-full h-[103px] dark:text-</div>foreground">
								<div className="py-[15px] w-full">
									<CardContent className="text-[13</div>px]">
										<div className="text-[15px] pb-[8px] font-medium whitespace-nowrap">
											{value.heading}
										</div>
										{value.content}
									</CardContent>
								</div>
							</Card>
						)
					})
                        )
                    :
                        (
                            defaultPrompts.map((value, index) => {
						return (
							<Card
								key={index}
								className="max-w-[320px] mx-auto w-full h-[114px]  dark:text-foreground">
								<div className="py-[15px] w-full">
									<CardContent className="text-[13</div>px]">
										<div className="text-[15px] pb-[8px] font-medium whitespace-nowrap">
											{value.heading}
										</div>
										{value.content}
									</CardContent>
								</div>
							</Card>
						)
					})
                        )
                    }

				</div>
			</div>
		</div>
	)
}