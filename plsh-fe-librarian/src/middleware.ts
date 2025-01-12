import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes: string[] = [ "/user" ];
export function middleware( req: NextRequest ){
  const { pathname } = req.nextUrl;
  privateRoutes.forEach( route => {
    if( pathname.startsWith( route ) ){
      console.log( "middleware", pathname );
      const token = req.cookies.get( "token" );
      console.log( token );
      if( !token ){
        return NextResponse.redirect( new URL( "/login", req.url ) );
      }
    }
  } );
  return NextResponse.next();
}
export const config = {
  matcher: [ "/user/:path*" ],
};