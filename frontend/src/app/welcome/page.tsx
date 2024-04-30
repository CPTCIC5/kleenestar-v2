import React from 'react'

export default function Welcome({
	children,
    get_started,
    choose_start
}: Readonly<{
	children: React.ReactNode,
    get_started: React.ReactNode,
    choose_start: React.ReactNode,
}>) {
	return <div>
        {/* {get_started} */}
        hi
    </div>
}