import React, { memo } from "react";

interface IProps{
  children?: React.ReactNode;
}

function Logo( props: IProps ){
  return (
    <div>
      LOGO
    </div> );
}
export default memo( Logo );