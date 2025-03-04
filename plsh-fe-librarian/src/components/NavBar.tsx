import Logo from "@/components/Logo";
import Container from "@/components/primary/Container";
import { navBarContainerStyle } from "@/style/container.style";
import React, { memo } from "react";

interface IProps{
  children?: React.ReactNode;
}

function NavBar( props: IProps ){
  console.log( props );
  return (
    <Container sx={ navBarContainerStyle } maxWidth="xl">
      <div>
        <Logo/>
      </div>


    </Container> );
}


export default memo( NavBar );