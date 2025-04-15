import axios, { AxiosError, AxiosResponse } from "axios";
import { Account, NextAuthOptions, Profile, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import { CredentialInput } from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider( {
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    } ),
  ],
  callbacks: {
    async jwt( { token, account, trigger }: IJWT ){
      const jwt = account?.access_token;
      if( jwt ){
        const res: AxiosResponse<ISignIn200Response> | void =
          await axios.post( "auth/sign-in",
            { googleToken: jwt },
            {
              baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL??"https://book-hive-api.space/api/v1",
              headers: {
                "Content-Type": "application/json",
              },
            } )
            .catch( ( err: AxiosError<ISignIn404Response> ) => {
              console.error( "err", JSON.parse( err.response?.config.data ) );
              //handle register here
            } );
        if( typeof res === "object" && res.data.statusCode === 200 && res.data?.data.isAuthenticated ){
          token.accessToken = res.data?.data.accessToken;
          token.email = res.data?.data.account.Email;
          token.name = res.data?.data.account.FullName;
          token.sub = account?.userId;
          token.isUserExist = true;
          return token;
        }
        token.isUserExist = false;
        token.accessToken = "unauthorized";
      }
      return token;
    },
    async session( { session, token }: ISession ){
      if( session.user ){
        session.accessToken = token.accessToken ?? "";
        session.isUserExist = token.isUserExist;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async signIn( ggResponse ){
      // const serverResponse: AxiosResponse<ISignIn200Response> | void = await axios.post( process.env.NEXT_PUBLIC_SERVER_API_URL + "/api/v1/login",
      //   { googleToken: ggResponse.account?.access_token },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   } )
      //   .catch( ( err: AxiosError<ISignIn404Response> ) => {
      //     console.error( "err", JSON.parse( err.response?.config.data ) );
      //     //handle register here
      //   } );
      // return !!( typeof serverResponse === "object" && serverResponse.data?.statusCode === 200 && serverResponse?.data.data.isAuthenticated );
      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export { authOptions };
export type ISignIn404Response = {
  "statusCode": number;
  status: string;
  "message": string,
  data: {
    "isAuthorized": boolean,
    "account": {
      Id: number,
      Email: string,
      FullName: string,
      isVerified: boolean,
      CardMemberNumber: number,
    }
  }
}
export type ISignIn200Response = {
  message: string;
  "statusCode": number;
  status: string;
  data: {
    isAuthenticated: boolean;
    account: IUser;
    accessToken: string,
  }
}
export type IUser = {
  Id?: number,
  Email: string,
  FullName: string,
  isVerified: boolean,
  CardMemberNumber?: number,
}
export type IGoogleResponse = {
  user: User | AdapterUser
  account: Account | null
  profile?: Profile | undefined
  email?: { verificationRequest?: boolean }
  credentials?: Record<string, CredentialInput>
}
export type ISession = ( {
  session: Session & { accessToken?: string; isUserExist?: boolean; };
  token: JWT & { accessToken?: string; isUserExist?: boolean; };
  user: AdapterUser;
} );
export type IJWT = {
  token: JWT & { accessToken?: string; isUserExist?: boolean };
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
  trigger?: "signIn" | "signUp" | "update";
  isNewUser?: boolean;
  // session?: any
}
