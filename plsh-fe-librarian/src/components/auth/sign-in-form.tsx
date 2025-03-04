"use client";
import PrimaryTypography from "@/components/primary/typography";
import {
  ALREADY_HAVE_ACCOUNT,
  LOGIN, NEXT,
  PASS,
  RE_PASS,
  SIGN_IN_SUCCESSFULLY,
  REGISTER,
  SIGN_IN_WITH_GOOGLE,
  USE_AS_GUEST, HAVE_NO_ACCOUNT_FOUND
} from "@/helpers/appStrings";
import { VoidFunc } from "@/helpers/appType";
import { color } from "@/helpers/resources";
import { Button, Container, Link, TextField, createTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ThemeProvider } from "@mui/system";
import { signIn, SignInResponse } from "next-auth/react";
import React, { memo, useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbBrandGoogleFilled } from "react-icons/tb";
import { toast } from "sonner";

const theme = createTheme( {
  palette: {
    primary: {
      main: color.PRIMARY
    },
  },
} );
function SignInForm( props: IProps ): React.JSX.Element{
  useEffect( function(){
    // getServerSession( authOptions ).then( ( session: Session | null ) => {
    //   console.log( session?.user?.name );
    // } );
  }, [] );
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ISignInInformation>();
  const onSubmit: SubmitHandler<ISignInInformation> = useCallback( ( data: ISignInInformation ) => console.log( data ), [] );
  const GoogleSignInButtonClick: VoidFunc = useCallback( function(): void{
    signIn( "google", { redirect: false } )
      .then( ( response: SignInResponse | undefined ): void => {
        // console.log(response);
        if( response?.error ){
          toast.success( SIGN_IN_SUCCESSFULLY, {
            position: "top-center",
            duration: 5000,
          } );
        }else{
          toast.success( HAVE_NO_ACCOUNT_FOUND, {
            position: "top-center",
            duration: 5000,
          } );
        }
      } ).catch( errors => {
      console.log( errors );
      toast.error( "Error", {
        duration: 1500,
      } );
    } );
  }, [] );
  return (
    <Container sx={ signInFormContainerStyle }>
      <ThemeProvider theme={ theme }>

        <form onSubmit={ handleSubmit( onSubmit ) }>
          <Grid container spacing={ 2 }>
            <Grid size={ 12 }>
              <TextField
                fullWidth={ true }
                type={ "email" }
                id="email-field-sign-in-form"
                label="Email"
                variant="outlined" { ...register( "email" ) }
                required={ true }/>
            </Grid>
            <Grid size={ 12 }>
              <TextField
                fullWidth={ true }
                type={ "password" }
                id="password-field-sign-in-form"
                label={ PASS }
                variant="outlined" { ...register( "password" ) }
                required={ true }/>
            </Grid>
            <Grid size={ 12 }>
              <TextField
                fullWidth={ true }
                type={ "password" }
                id="re-enter-password-field-sign-in-form"
                label={ RE_PASS }
                variant="outlined" { ...register( "reEnterPassword" ) }
                required={ true }/>
            </Grid>

            <Grid size={ 12 } justifyContent="center" alignItems="center" container>
              <Button fullWidth={ true } autoCapitalize={ "none" } sx={ signInButtonStyle }
                      type="submit">{ NEXT }</Button>
            </Grid>
          </Grid>
        </form>
        <Grid container spacing={ 2 } marginTop={ 1 }>
          <Button
            fullWidth={ true }
            variant={ "outlined" }
            color="primary"
            sx={ { textTransform: "none" } }
            onClick={ GoogleSignInButtonClick }>
            <Grid container spacing={ 1 } justifyContent="center" alignItems="center">
              <PrimaryTypography textColor={ color.PRIMARY }>
                { SIGN_IN_WITH_GOOGLE }
              </PrimaryTypography>
              <TbBrandGoogleFilled
                color={ color.PRIMARY }/>
            </Grid>
          </Button>
          <Grid size={ 12 } container spacing={ 2 }>
            <Grid container spacing={ 1 } size={ 6 }>
              <PrimaryTypography>
                { ALREADY_HAVE_ACCOUNT }
              </PrimaryTypography>
              <Link href={ "/" } sx={ { color: color.DARK_TEXT } }>
                <PrimaryTypography>
                  { LOGIN }
                </PrimaryTypography>
              </Link>
            </Grid>
            <Grid size={ 6 }>
              <Link href={ "/" } sx={ { color: color.DARK_TEXT } } underline={ "hover" }>
                <PrimaryTypography>
                  { USE_AS_GUEST }
                </PrimaryTypography>
              </Link>
            </Grid>
          </Grid>

        </Grid>
      </ThemeProvider>
    </Container>
  );
}
export default memo( SignInForm );

interface IProps{
  children?: React.ReactNode;
}

interface ISignInInformation extends React.Component
  <IProps>{
  email: string;
  password: string;
  reEnterPassword: string;
}

const signInFormContainerStyle = {
  padding: "0 !important",
};
const signInButtonStyle = {
  backgroundColor: color.PRIMARY,
  color: color.BRIGHT_TEXT,
  textTransform: "none",
};