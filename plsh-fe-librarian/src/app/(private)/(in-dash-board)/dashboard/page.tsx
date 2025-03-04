import AnalysisComponent from "@/app/(private)/(in-dash-board)/dashboard/AnalysisComponent";
import BookQuantityAnalysisChartCpn from "@/app/(private)/(in-dash-board)/dashboard/BookQuantityAnalysisChartCpn";
import LoanSortByDayAnalysisChartCpn from "@/app/(private)/(in-dash-board)/dashboard/LoanSortByDayAnalysisChartCpn";
import LoanSortByCategoryAnalysisChartCpn from "@/app/(private)/(in-dash-board)/dashboard/LoanSortByCategoryAnalysisChartCpn";
import LoanAnalysisChartCpn from "@/app/(private)/(in-dash-board)/dashboard/LoanSortByCategoryAnalysisChartCpn";
import Typography from "@/components/primary/typography";
import WithClientOnly from "@/components/primary/WithClientOnly";
import appStrings from "@/helpers/appStrings";
import { titleTextStyle, titleTextStyle_2 } from "@/style/text.style";
import Grid from "@mui/material/Grid2";
import React from "react";

interface IProps{
  children?: React.ReactNode;
}

function DashBoardPage( ){
  return (
    <Grid container spacing={ 4 } sx={ { padding: "0 20px 50px" } }>
      <Typography sx={ titleTextStyle }>{ appStrings.DASHBOARD }</Typography>
      <Grid size={ 12 }>
        <AnalysisComponent/>
      </Grid>
      <Grid size={ 7.5 }>
        <Typography sx={ titleTextStyle_2 }>
          { appStrings.LOAN_RATE }
        </Typography>
        <WithClientOnly>
          <LoanSortByDayAnalysisChartCpn/>
        </WithClientOnly>
      </Grid>
      <Grid size={ 4.5 }>
        <WithClientOnly>
          <BookQuantityAnalysisChartCpn/>
        </WithClientOnly>
      </Grid>
      <Grid size={ 7.5 }>
        <Typography sx={ titleTextStyle_2 }>
          { appStrings.CATEGORY_ANALYZE_BY_LOAN }
        </Typography>
        <LoanSortByCategoryAnalysisChartCpn/>

      </Grid>

    </Grid>
  );
}
export default DashBoardPage;
