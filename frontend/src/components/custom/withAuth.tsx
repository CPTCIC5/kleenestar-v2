"use client"
import { useRouter } from "next/navigation"
import useAuth from "@/hooks/useAuth"
import { JSX, useEffect } from "react"

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    return (props: JSX.IntrinsicAttributes) => {
        const { isLoggedIn, fetching } = useAuth()
		const router = useRouter()

		useEffect(() => {
			if (!fetching && !isLoggedIn) {
				router.push("/login")
			}
		}, [fetching, isLoggedIn])

		if (fetching) {
			return null
		}

		if (isLoggedIn) {
			return <WrappedComponent {...props} />
		}

		return null
	}
}

export default withAuth
