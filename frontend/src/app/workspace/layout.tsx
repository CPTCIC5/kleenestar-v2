import React from 'react'

export default function WorkspaceLayout(
    {
        children,
    }: Readonly<{ children: React.ReactNode;
         }>
){
    return (
        <div>
            {children}
        </div>
    )
}