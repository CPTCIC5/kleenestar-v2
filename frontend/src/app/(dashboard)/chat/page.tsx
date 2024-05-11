"use client";

import { ChatDisplay } from "@/components/custom/ChatDisplay";
import { ChatSidebar } from "@/components/custom/ChatSidebar";
import useChatStore from "@/lib/store/ConvoStore";
import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Chat() {
    const convos = useChatStore((state) => state.convos);
    const addConvos = useChatStore((state) => state.addConvos);
    const [currentConvoId, setCurrentConvoId] = React.useState<number>(convos[0]?.id);
    const [deleteId, setDeleteId] = React.useState<number>(-1);
    const navigate = useRouter();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userDetails, setUserDetails] = React.useState<{
        id: string;
        profile: { country: string };
    }>({
        id: "",
        profile: {
            country: "",
        },
    });

    React.useEffect(() => {
        const fetchWorkspaceDetails = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/workspaces/", {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                });
                console.log(response);
                setIsLoggedIn(true);
                console.log(isLoggedIn);
                setUserDetails(response.data[0].root_user);
            } catch (err) {
                console.error(err);
                navigate.push("/");
            }
        };
        fetchWorkspaceDetails();
    }, []);

    const fetchConvos = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/workspaces/", {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
            });
            console.log(response);

            addConvos(response.data.results);
            setCurrentConvoId(response.data.results[0].id);
        } catch (error) {
            console.error("Error fetching convos:", error);
        }
    };

    React.useEffect(() => {
        if (!isLoggedIn) return;
        fetchConvos();
    }, [isLoggedIn]);

    return (
        <div className="w-full h-screen flex items-start justify-center flex-1 bg-muted/40 max-sm:pt-[56px]">
            <ChatSidebar
                currentConvoId={currentConvoId}
                setCurrentConvoId={setCurrentConvoId}
                setDeleteId={setDeleteId}
            />
            <div className=" flex-1 w-full h-full ">
                <ChatDisplay currentConvoId={currentConvoId} />
            </div>
        </div>
    );
}
