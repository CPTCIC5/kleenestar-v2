import ClassicLoader from "@/components/ui/classic-loader";
import React from "react";

const RootChatPage: React.FC = () => {
    return (
        <div className="h-full w-full flex items-center justify-center ">
            <ClassicLoader />
        </div>
    );
};

export default RootChatPage;
