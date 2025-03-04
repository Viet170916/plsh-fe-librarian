import "@/app/globals.css";
import { authOptions } from "@/app/api/auth/[...nextauth]/config";
import Providers from "@/components/provider/StoreProvider";
import { SessionType } from "@/helpers/appType";
import { AppSession, initAppSession } from "@/stores/slices/session.slice";
import axios, { AxiosError } from "axios";
import { getServerSession, Session } from "next-auth";
import React from "react";
import { Toaster } from "sonner";

export const metadata = {
  title: "My App",
  description: "This is my app",
};
export default async function RootLayout( {
  children,
}: Readonly<{ children: React.ReactNode }> ){
  const session: SessionType = await getServerSession( authOptions );
  let sessionData: AppSession = initAppSession;
  try{
    const checkedResponse = await axios.get( "auth/check-token", {
      baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
      headers: { Authorization: `Bearer ${ session?.accessToken }` },
    } ).catch( ( error: AxiosError ) => {
      console.log( error.message );
    } );
    if( session ){
      sessionData = {
        user: {
          FullName: session?.user?.name ?? "",
          Email: session?.user?.email ?? "",
          isVerified: false,
        }, accessToken: ( session.accessToken ),
        isAuthenticated: false
      };
    }
    console.log( sessionData );
    if( checkedResponse?.data && sessionData?.user ){
      sessionData.isAuthenticated = true;
      sessionData.user.isVerified = true;
    }
  }catch( e ){
    console.log( e );
  }
  return (
    <html lang="en" data-toolpad-color-scheme="light">
    <body>
    <Providers session={ session } dataSession={ sessionData }>
      { children }
      <Toaster richColors position="top-right"/>;
    </Providers>
    </body>

    </html>
  );
}

