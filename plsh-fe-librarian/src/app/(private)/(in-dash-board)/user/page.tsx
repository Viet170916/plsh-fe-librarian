import User from "@/components/User";
import React from "react";

export default async function Element(): Promise<React.JSX.Element>{
  return ( <div>
      <User/>
  </div> );
}
// export default memo( Element );
