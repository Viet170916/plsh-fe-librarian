"use client";
import InformationCard from "@/components/primary/InformationCard";
import appStrings from "@/helpers/appStrings";
import { AnalyticsData } from "@/helpers/appType";
import { toastError } from "@/helpers/error";
import mock from "@/helpers/mockData";
import { color } from "@/helpers/resources";
import { formatNumberWithCommas } from "@/helpers/text";
import { useGetAnalyticsQuery } from "@/stores/slices/api/analysis.api.slice";
import Grid from "@mui/material/Grid2";
import React, { memo, useEffect, useMemo } from "react";
import { TbDirectionSignFilled } from "react-icons/tb";

interface IProps{
  children?: React.ReactNode;
}

function AnalysisComponent( props: IProps ){
  const { data, error, isLoading } = useGetAnalyticsQuery( {}, {
    refetchOnReconnect: true,
    refetchOnFocus: true,
  } );
  useEffect( () => {
    if( error ){
      toastError( error, { FETCH_ERROR_MESSAGE: appStrings.CANT_LOAD_COUNT_ANALYSIS_DATA } );
    }
  } );
  const analyticData: AnalyticsData = useMemo( () => data ?? mock.analyticsData, [ data ] );
  return (
    <Grid container spacing={ 4 } size={ 12 }>
      <Grid size={ 3 }>
        <InformationCard
          backgroundColor={ color.PRIMARY }
          icon={ TbDirectionSignFilled }
          title={ appStrings.TOTAL_BOOK }
          content={ formatNumberWithCommas( analyticData.bookCount ) }
        />
      </Grid>
      <Grid size={ 3 }>
        <InformationCard
          backgroundColor={ color.SIXTH }
          icon={ TbDirectionSignFilled }
          title={ appStrings.BORROWED_BOOK }
          content={ formatNumberWithCommas( analyticData.borrowedBookCount ) }/>
      </Grid>
      <Grid size={ 3 }>
        <InformationCard
          backgroundColor={ color.DARK }
          icon={ TbDirectionSignFilled }
          title={ appStrings.OVERDUE }
          content={ formatNumberWithCommas( analyticData.overdueBookCount ) }/>
      </Grid>
      <Grid size={ 3 }>
        <InformationCard
          backgroundColor={ color.DARK_BUT_LIGHTER }
          icon={ TbDirectionSignFilled }
          title={ appStrings.MEMBERS }
          content={ formatNumberWithCommas( analyticData.memberCount ) }/>
      </Grid>
    </Grid> );
}
export default memo( AnalysisComponent );
