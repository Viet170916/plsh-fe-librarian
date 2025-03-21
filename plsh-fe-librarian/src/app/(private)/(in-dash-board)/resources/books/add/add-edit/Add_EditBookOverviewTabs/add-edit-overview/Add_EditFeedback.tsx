import { color } from "@/helpers/resources";
import { Box, Chip, Link, Stack, Typography } from "@mui/material";
import React, { memo } from "react";

interface IProps{
  children?: React.ReactNode;
}
function Add_EditFeedback( props: IProps ){
  return (
    <Box
      sx = { {
        width: "100%",
        height: "fit-content",
        bgcolor: color.WHITE,
        border: 1,
        borderColor: color.SHADOW,
        borderRadius: 1,
        p: 2,
      } }
    >
      <Box sx = { { display: "flex", justifyContent: "space-between" } }>
        <Typography variant = "h6" fontWeight = "bold" color = "textSecondary">
          Community Reviews
        </Typography>
        <Link href = "#" underline = "hover" color = "primary">
          Feedback?
        </Link>
      </Box>
      <Stack spacing = { 1 } sx = { { mt: 2 } }>
        <Box sx = { { display: "flex", alignItems: "center" } }>
          <Typography
            variant = "body2"
            fontWeight = "bold"
            color = "textSecondary"
          >
            PACE
          </Typography>
          <Chip
            label = "Meandering 100%"
            variant = "outlined"
            sx = { { ml: 1, borderColor: "#cccccc" } }
          />
        </Box>
        <Box sx = { { display: "flex", alignItems: "center" } }>
          <Typography
            variant = "body2"
            fontWeight = "bold"
            color = "textSecondary"
          >
            ENJOYABILITY
          </Typography>
          <Chip
            label = "Interesting 100%"
            variant = "outlined"
            sx = { { ml: 1, borderColor: "#cccccc" } }
          />
        </Box>
        <Box sx = { { display: "flex", alignItems: "center" } }>
          <Typography
            variant = "body2"
            fontWeight = "bold"
            color = "textSecondary"
          >
            DIFFICULTY
          </Typography>
          <Chip
            label = "Advanced 100%"
            variant = "outlined"
            sx = { { ml: 1, borderColor: "#cccccc" } }
          />
        </Box>
        <Box sx = { { display: "flex", alignItems: "center" } }>
          <Typography
            variant = "body2"
            fontWeight = "bold"
            color = "textSecondary"
          >
            GENRES
          </Typography>
          <Chip
            label = "Horror 66%"
            variant = "outlined"
            sx = { { ml: 1, borderColor: "#cccccc" } }
          />
          <Chip
            label = "Mystery 33%"
            variant = "outlined"
            sx = { { ml: 1, borderColor: "#cccccc" } }
          />
        </Box>
        <Box sx = { { display: "flex", alignItems: "center" } }>
          <Typography
            variant = "body2"
            fontWeight = "bold"
            color = "textSecondary"
          >
            MOOD
          </Typography>
          <Chip
            label = "Ominous 25%"
            variant = "outlined"
            sx = { { ml: 1, borderColor: "#cccccc" } }
          />
          <Chip
            label = "Scientific 25%"
            variant = "outlined"
            sx = { { ml: 1, borderColor: "#cccccc" } }
          />
        </Box>
        <Box sx = { { display: "flex", alignItems: "center" } }>
          <Typography
            variant = "body2"
            fontWeight = "bold"
            color = "textSecondary"
          >
            IMPRESSIONS
          </Typography>
          <Chip
            label = "Overhyped 50%"
            variant = "outlined"
            sx = { { ml: 1, borderColor: "#cccccc" } }
          />
          <Chip
            label = "Forgettable 50%"
            variant = "outlined"
            sx = { { ml: 1, borderColor: "#cccccc" } }
          />
        </Box>
        <Box sx = { { display: "flex", alignItems: "center" } }>
          <Typography
            variant = "body2"
            fontWeight = "bold"
            color = "textSecondary"
          >
            LENGTH
          </Typography>
          <Chip
            label = "Short 100%"
            variant = "outlined"
            sx = { { ml: 1, borderColor: "#cccccc" } }
          />
        </Box>
      </Stack>
      <Link href = "#" underline = "hover" color = "primary" sx = { { mt: 2 } }>
        Add your community review
      </Link>
    </Box>);
}
export default memo( Add_EditFeedback );
