"use client";
import { color } from "@/helpers/resources";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Grid from "@mui/material/Grid2";
import { extendTheme, styled } from "@mui/material/styles";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import React, { memo, useEffect } from "react";
import { IoBarChart } from "react-icons/io5";
import {AnyObject} from "@/helpers/appType";

interface IProps{
  children?: React.ReactNode;
  window?: AnyObject;
}

function useDemoRouter( initialPath: string ): Router{
  const [ pathname, setPathname ] = React.useState( initialPath );
  const router = React.useMemo( () => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: ( path: string | URL ) => setPathname( String( path ) ),
    };
  }, [ pathname ] );
  return router;
}
export const theme = extendTheme( {
  // colorSchemes: { light: true, dark: false },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
} );
function DashboardLayoutBasic( props: IProps ){
  const router = useDemoRouter( "/dashboard" );
  return (
    <DashboardLayout sx={ { color: color.DARK_TEXT, width: "100%", height: "100%" } }>
      <PageContainer/>
    </DashboardLayout>
  );
}
export default memo( DashboardLayoutBasic );