"use client";

import { ChatDisplay } from "@/components/custom/ChatDisplay";
import { ChatSidebar } from "@/components/custom/ChatSidebar";
import useChatStore from "@/lib/store/ConvoStore";
import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import NoteSheet from "@/components/custom/NoteSheet";

function Chat() {
    // const convos = useChatStore((state) => state.convos);
    // const addConvos = useChatStore((state) => state.addConvos);
    // const [currentConvoId, setCurrentConvoId] = React.useState<number>(convos[0]?.id);
    // const [deleteId, setDeleteId] = React.useState<number>(-1);
    // const navigate = useRouter();

    // const fetchConvos = async () => {
    //     try {
    //         const response = await axios.get(`/api/channels/convos/`, {
    //             withCredentials: true,
    //             headers: {
    //                 "ngrok-skip-browser-warning": "69420",
    //                 "Content-Type": "application/json",
    //                 "X-CSRFToken": Cookies.get("csrftoken"),
    //             },
    //         });
    //         console.log(response);

    //         addConvos(response.data.results);
    //         setCurrentConvoId(response.data.results[0].id);
    //     } catch (error) {
    //         console.error("Error fetching convos:", error);
    //     }
    // };

    // React.useEffect(() => {
    //     fetchConvos();
    // }, []);

    return (
        <div className="w-full h-screen flex items-start justify-center flex-1 bg-muted/40 max-sm:pt-[56px]">
            {/* <ChatSidebar
                currentConvoId={currentConvoId}
                setCurrentConvoId={setCurrentConvoId}
                setDeleteId={setDeleteId}
            />
            <div className=" flex-1 w-full h-full ">
                <ChatDisplay currentConvoId={currentConvoId} />
                <NoteSheet />
            </div> */}
        </div>
    );
}

export default Chat;
