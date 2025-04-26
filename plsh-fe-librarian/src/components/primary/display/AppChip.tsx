'use client'

import {Chip, Theme} from '@mui/material'
import {styled} from '@mui/material/styles'

const getColorByVariant = (theme: Theme, variant: "filled" | "outlined" = "outlined", color: string = theme.palette.primary.main,) => {
    switch (variant) {
        case "filled":
            return {
                borderColor: "unset",
                color: theme.palette.background.default,
                bgcolor: color
            }
        case "outlined":
            return {
                color: color,
                borderColor: color,
                bgcolor: theme.palette.background.default
            }
    }
}
const getColor = (theme: Theme, variant?: "filled" | "outlined", color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" = "primary") => {
    switch (color) {
        case "default":
            return getColorByVariant(theme, variant, theme.palette.primary.main,);
        case "primary":
            return getColorByVariant(theme, variant, theme.palette.primary.main,);
        case "success":
            return getColorByVariant(theme, variant, theme.palette.success.main,);
        case "error":
            return getColorByVariant(theme, variant, theme.palette.error.main,);
        case "warning":
            return getColorByVariant(theme, variant, theme.palette.warning.main,);
    }
    return {}

}

const StyledChip = styled(Chip)(({variant, color, theme}) => ({
    ...getColor(theme, variant, color,),
    fontSize: '0.7rem',
    height: 20,
    borderRadius: 24,
    padding: '0 2px',
    '.MuiChip-label': {
        // padding: '0 2px',
    },
}))

export default StyledChip
