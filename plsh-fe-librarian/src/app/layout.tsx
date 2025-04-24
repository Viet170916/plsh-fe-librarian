import "@/app/globals.css";
import {authOptions} from "@/app/api/auth/[...nextauth]/config";
import Providers from "@/components/provider/StoreProvider";
import appStrings from "@/helpers/appStrings";
import {SessionType} from "@/helpers/appType";
import {AppSession, initAppSession} from "@/stores/slices/session.slice";
import {getServerSession} from "next-auth";
import React from "react";
import {Toaster} from "sonner";
import ClientBackground from "@/app/ClientBackground";

export const metadata = {
    title: appStrings.APP_NAME,
    icons: {
        icon: "/images/logo.svg",
    },
};
export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session: SessionType = await getServerSession(authOptions);
    const sessionData: AppSession = initAppSession;
    // try{
    // 				const checkedResponse = await axios.get( "auth/check-token", {
    // 								baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL ?? "http://104.197.134.164/api/v1",
    // 								headers: { Authorization: `Bearer ${ session?.accessToken }` },
    // 				} ).catch( ( error: AxiosError ) => {
    // 				} );
    // 				if( session ){
    // 								sessionData = {
    // 												user: {
    // 																FullName: session?.user?.name ?? "",
    // 																Email: session?.user?.email ?? "",
    // 																isVerified: false,
    // 												}, accessToken: (session.accessToken),
    // 												isAuthenticated: false,
    // 								};
    // 				}
    // 				if( checkedResponse?.data && sessionData?.user ){
    // 								sessionData.isAuthenticated = true;
    // 								sessionData.user.isVerified = true;
    // 				}
    // }catch( e ){
    // }
    return (
        <html lang="en" data-toolpad-color-scheme="light">
        <body
            style={{
                // backgroundImage: `url("/images/bookhive-background.svg")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: "100vh", width: "100vw",
            }}
        >
        <Providers session={session} dataSession={sessionData}>
            <ClientBackground sx={{
                height: "100vh", width: "100vw",
                // backgroundImage: `url("/images/bookhive-background.svg")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // color: var(--foreground);
                // background: var(--background);
                fontFamily: " Arial, Helvetica, sans-serif",
            }}>
                {children}
            </ClientBackground>
            <Toaster richColors position="top-right"/>;
        </Providers>
        </body>
        </html>
    );
}

