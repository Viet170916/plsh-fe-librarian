import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware( req: NextRequest ){
				// const { pathname } = req.nextUrl;
				// if( pathname?.startsWith( "/auth/register" ) ){
				//   const token: JWT & { accessToken?: string; isUserExist?: boolean } | null = await getToken( {
				//     req,
				//     secret: process.env.NEXTAUTH_SECRET
				//   } );
				//     if( !( !token?.isUserExist && token?.email && token?.sub ) ){
				//       return NextResponse.redirect( new URL( "/", req.nextUrl.origin ) );
				//     }
				// }
				return NextResponse.next();
}
export const config = {
				matcher: [ "/auth/:path*" ],
};
