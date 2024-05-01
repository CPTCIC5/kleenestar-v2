import React from "react"
import { CheckCircledIcon } from "@radix-ui/react-icons"


interface FormSuccessType {
	message?: string
}

const FormSuccess: React.FC<FormSuccessType> = ({ message }) => {
	if (!message) return null

	return (
		<div className="w-full flex items-center gap-2 rounded-md p-2 bg-green-200 text-green-600">
			<CheckCircledIcon />
			{message}
		</div>
	)
}

export default FormSuccess
