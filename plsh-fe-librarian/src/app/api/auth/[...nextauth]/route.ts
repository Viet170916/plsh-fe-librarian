import { authOptions } from "@/app/api/auth/[...nextauth]/config";
import NextAuth from "next-auth";

export const GET = NextAuth( authOptions );
export const POST = NextAuth( authOptions );

