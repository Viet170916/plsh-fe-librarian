import { color } from "@/helpers/resources";
import { Typography, TypographyOwnProps } from "@mui/material";
import React, { memo } from "react";

export type IPrimaryTypography = TypographyOwnProps & {
  textColor?: string;
}
function PrimaryTypography( { textColor, ...props }: IPrimaryTypography ): React.JSX.Element{
  return (
    <Typography margin={ 0 }
                sx={ { color: textColor ?? color.DARK_TEXT, justifySelf: "end" } }
                variant="body2"
                gutterBottom { ...props }>
      { props.children }
    </Typography>
  );
}
export default memo( PrimaryTypography );