import React from "react"

function GridBackground() {
	return (
		<div className="h-screen min-h-full -z-20 w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] absolute flex items-center justify-center">
			<div className="absolute pointer-events-none inset-0 flex items-center justify-cente [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
		</div>
	)
}

export default GridBackground