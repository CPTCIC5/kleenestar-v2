import React, { Suspense } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export function KleenestarSplineLogo() {
    return (
        <div className="h-72 opacity-80 w-full flex justify-center items-center">
            <Spline
                className="dark:hidden"
                scene="https://prod.spline.design/ecypVgD7JeyQUdGF/scene.splinecode"
            />
            <Spline
                className="dark:block hidden"
                scene="https://prod.spline.design/yeoLHMuzkpljmaA0/scene.splinecode"
            />
        </div>
    );
}
