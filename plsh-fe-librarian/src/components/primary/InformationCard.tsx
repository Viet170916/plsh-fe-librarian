import Typography from "@/components/primary/typography";
import { color } from "@/helpers/resources";
import { informationCardStyle } from "@/style/card.style";
import Grid from "@mui/material/Grid2";
import React, { memo, useCallback, useMemo } from "react";
import { IconBaseProps, IconType } from "react-icons";

interface IProps{
  children?: React.ReactNode,
  backgroundColor?: string,
  title: string,
  content: string,
  icon: IconType
}

function InformationCard( props: IProps ){
  const Icon = props.icon?.( { size: 29 } );
  return (
    <Grid container spacing={ 3 } sx={ {
      ...informationCardStyle,
      background: props.backgroundColor ?? color.PRIMARY,
    } }>

      <Grid size={ 5 } sx={ {
        background: color.WHITE,
        borderRadius: "10px",
        color: props.backgroundColor ?? color.PRIMARY,
        justifyItems: "center",
        alignContent: "center",
      } }>
        { Icon }
      </Grid>
      <Grid size={ 7 }>
        <Typography textColor={ color.LIGHT_TEXT }
                    sx={ { fontSize: 32, fontWeight: "bold", justifySelf: "center" } }>
          { props.content }
        </Typography>
      </Grid>
      <Grid size={ 12 }>
        <Typography textColor={ color.LIGHT_TEXT }
                    sx={ { fontSize: 25, justifySelf: "center" } }>
          { props.title }
        </Typography>

      </Grid>

    </Grid> )
    ;
}
export default memo( InformationCard );