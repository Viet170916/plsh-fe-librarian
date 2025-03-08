"use client";
import {color, theme} from "@/helpers/resources";
import {AppSession, setSession} from "@/stores/slices/session.slice";
import {store} from "@/stores/store";

import {LinearProgress} from "@mui/material";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";

import {Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import React, {Suspense, useEffect} from "react";

import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/system";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'

interface IProps {
    children?: React.ReactNode;
    session: Session | null | undefined;
    dataSession: AppSession;
}


export function Providers({children, session, dataSession}: IProps) {
    useEffect(() => {
        store.dispatch(setSession(dataSession));
    }, [dataSession]);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
            <AppRouterCacheProvider options={{enableCssLayer: false}}>
                <Suspense fallback={<LinearProgress/>}>
                    <ThemeProvider theme={theme}>
                        {/*<NextAppProvider navigation={NAVIGATION} theme={theme}*/}
                        {/*                 branding={{logo: <LogoDev/>, title: "title", homeUrl: "/"}}>*/}
                        <SessionProvider session={session}>
                            <Provider store={store}>
                                {children}
                            </Provider>
                        </SessionProvider>
                        {/*</NextAppProvider>*/}
                    </ThemeProvider>
                </Suspense>
            </AppRouterCacheProvider>
        </LocalizationProvider>
    );
}

export default Providers;