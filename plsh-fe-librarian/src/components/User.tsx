"use client";
import { SessionProvider, useSession } from "next-auth/react";
import React, { memo, useEffect } from "react";

interface IProps{
  children?: React.ReactNode;
}

function UserCom( props: IProps ){
  return ( <>
    <SessionProvider>
      <DEMO/>
    </SessionProvider>
  </> );
}
export default memo( UserCom );
function DEMO( props: IProps ){
  const session = useSession();

  return ( <div>
    user
  </div> );
}
