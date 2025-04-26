"use client"
import React, {JSX, memo} from "react";
import ClientRender from "@/app/(private)/(in-dash-board)/borrow/[code]/ClientRender";

type layoutProps = {
    children?: React.ReactNode;
}

function layout({children}: layoutProps): JSX.Element {
    return (
        <>
            <ClientRender/>
            {children}
        </>
    );
}

export default memo(layout);

