"use client";
import Container from "@/components/primary/Container";
import appStrings from "@/helpers/appStrings";
import { AnyObject, BorrowedBookInDay } from "@/helpers/appType";
import { toastError } from "@/helpers/error";
import mock from "@/helpers/mockData";
import { color } from "@/helpers/resources";
import { getPreviousDaysNames } from "@/helpers/time";
import { useGetLoanAnalyticsDataQuery } from "@/stores/slices/api/analysis.api.slice";
import { axisClasses, HighlightItemData, HighlightScope } from "@mui/x-charts";
import React, { memo, useEffect, useMemo } from "react";
import { CartesianGrid, Line, Tooltip, XAxis, YAxis, LineChart, ResponsiveContainer } from "recharts";

interface IProps{
  children?: React.ReactNode;
}

function LoanSortByDayAnalysisChartCpn(){
  const { data, error, isLoading } = useGetLoanAnalyticsDataQuery( {}, {} );
  useEffect( () => {
    if( error ){
      toastError( error, { FETCH_ERROR_MESSAGE: appStrings.CANT_LOAD_LOAN_ANALYSIS_DATA } );
    }
  }, [ error, data ] );
  const tenDaysPrevious: string[] = useMemo( () => ( data?.labels ?? getPreviousDaysNames() ), [ data?.labels ] );
  const borrowedRateData: BorrowedBookInDay[] = useMemo( () => ( data?.rateData ?? mock.borrowedRate.rateData ), [ data?.rateData ] );
  const lastData: HighlightItemData = useMemo( () => ( {
    seriesId: "LOAN_RATE",
    dataIndex: ( data?.highlightedItemIndex ?? borrowedRateData.length - 1 ),
  } ), [ data?.highlightedItemIndex, borrowedRateData.length ] );
  return (
    <Container
      sx={ { backgroundColor: color.PAGE_BACKGROUND, borderRadius: "10px", width: "100%", padding: "0!important" } }>
      <ResponsiveContainer width="100%" height={ 300 }>
        <LineChart
          width={ 500 }
          height={ 300 }
          data={ mock.borrowedRate.rateData }
          margin={ {
            top: 20,
            right: 30,
            left: -10,
            bottom: 5,
          } }>
          <CartesianGrid vertical={ false }/>
          <XAxis dataKey="day" fontSize={ "10px" } tickLine={ false } axisLine={ false }/>
          <YAxis fontSize={ "10px" } axisLine={ false }/>
          <Tooltip/>

          <Line
            type="monotone"
            dataKey="borrowedBookCount"
            stroke={ color.PRIMARY }
            strokeWidth={ 3 }
            strokeLinecap="round"
            dot={ { r: 8, strokeWidth: 4, fill: color.PRIMARY } }
          />
        </LineChart>

      </ResponsiveContainer>
    </Container>
  );
}
export default memo( LoanSortByDayAnalysisChartCpn );