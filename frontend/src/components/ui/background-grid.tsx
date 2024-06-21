import React from "react";

function GridBackground() {
    return (
        <div className="min-h-screen h-full w-full bg-inherit  dark:bg-grid-white/[0.1] bg-grid-black/[0.1] absolute flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
        </div>
    );
}

export default GridBackground;
