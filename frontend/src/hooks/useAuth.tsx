// hooks/useAuth.js
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { User } from "@/lib/types/interfaces";

type UserDetialsType = {
    id: number;
    name: string;
    users: User[];
};

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetialsType | null>(null);
    const [fetching, setFetching] = useState(true);
    const cookie = Cookies.get("logged_in");
    console.log(cookie);
    useEffect(() => {
        if (cookie === "no") {
            setIsLoggedIn(false);
            setFetching(false);
            return;
        }

        const fetchWorkspaceDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/workspaces/`,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRFToken": Cookies.get("csrftoken"),
                        },
                    },
                );
                setIsLoggedIn(true);
                setUserDetails(response.data);
            } catch (err) {
                console.error(err);
                setIsLoggedIn(false);
            }
            setFetching(false);
        };

        fetchWorkspaceDetails();
    }, [cookie]);

    return { isLoggedIn, userDetails, fetching };
};

export default useAuth;
