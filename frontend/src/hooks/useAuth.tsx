// hooks/useAuth.js
import { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"

const useAuth = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [userDetails, setUserDetails] = useState(null)
	const [fetching, setFetching] = useState(true)
	const cookie = Cookies.get("logged_in")
	console.log(cookie)
	useEffect(() => {
		if (cookie === "no") {
			setIsLoggedIn(false)
			setFetching(false)
			return
		}

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
				setIsLoggedIn(true)
				setUserDetails(response.data)
			} catch (err) {
				console.error(err)
				setIsLoggedIn(false)
			}
			setFetching(false)
		}

		fetchWorkspaceDetails()
	}, [cookie])

	return { isLoggedIn, userDetails, fetching }
}

export default useAuth
