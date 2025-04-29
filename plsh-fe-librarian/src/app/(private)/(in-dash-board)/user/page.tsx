import React from "react";
import {redirect} from "next/navigation";

export default async function Element(): Promise<React.JSX.Element> {
    return redirect(`/user/info`);
}
// export default memo( Element );
