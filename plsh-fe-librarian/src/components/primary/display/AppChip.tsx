'use client'

import {Chip, ChipProps} from '@mui/material'
import {styled} from '@mui/material/styles'

const StyledChip = styled((props: ChipProps) => <Chip {...props} />)(({theme}) => ({
    fontSize: '0.7rem',
    height: 20,
    borderRadius: 24,
    padding: '0 2px',
    '.MuiChip-label': {
        // padding: '0 2px',
    },
}))

export default StyledChip
