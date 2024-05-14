import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchWorkspaceDetails = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/workspaces/", {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                });
                setIsLoggedIn(true);
                setUserDetails(response.data[0].root_user);
            } catch (err) {
                console.error(err);
                setIsLoggedIn(false);
            }
        };
        fetchWorkspaceDetails();
    }, []);

    return { isLoggedIn, userDetails };
};

export default useAuth;

// usage :-
// import useAuth from '../hooks/useAuth';
// ...
// const { isLoggedIn, userDetails } = useAuth();
