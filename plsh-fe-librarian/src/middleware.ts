import { authOptions, IJWT } from "@/app/api/auth/[...nextauth]/config";
import { SessionType } from "@/helpers/appType";
import { getServerSession } from "next-auth";
import { getToken, JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware( req: NextRequest ){
  const { pathname } = req.nextUrl;
  console.log( 13, pathname?.startsWith( "/auth/register" ) );
  if( pathname?.startsWith( "/auth/register" ) ){
    console.log( 14326236 );
    const token: JWT & { accessToken?: string; isUserExist?: boolean } | null = await getToken( {
      req,
      secret: process.env.NEXTAUTH_SECRET
    } );
    console.log( "middleware", token );
      if( !( !token?.isUserExist && token?.email && token?.sub ) ){
        return NextResponse.redirect( new URL( "/", req.nextUrl.origin ) );
      }
  }
  return NextResponse.next();
}
export const config = {
  matcher: [ "/auth/:path*" ],
};
