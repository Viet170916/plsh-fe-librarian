"use client";
import Container from "@/components/primary/Container";
import Typography from "@/components/primary/typography";
import appStrings from "@/helpers/appStrings";
import { PieChartData } from "@/helpers/appType";
import { toastError } from "@/helpers/error";
import mock from "@/helpers/mockData";
import { color } from "@/helpers/resources";
import { useGetBookQuantityAnalyticsDataQuery } from "@/stores/slices/api/analysis.api.slice";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { memo, useEffect, useMemo } from "react";
import { IoLibrary } from "react-icons/io5";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface IProps{
  children?: React.ReactNode;
}

function BookQuantityAnalysisChartCpn( props: IProps ){
  const { data, error, isLoading } = useGetBookQuantityAnalyticsDataQuery( {}, {} );
  useEffect( () => {
    if( error ){
      toastError( error, { FETCH_ERROR_MESSAGE: appStrings.CANT_LOAD_BOOK_QUANTITY_ANALYSIS_DATA } );
    }
  }, [error] );
  const bookQuantityData: PieChartData[] = useMemo( () => {
    const term: PieChartData[] = [];
    term.push( {
      name: appStrings.NORMAL_BOOK,
      value: data?.normalBookCount ?? mock.bookQuantityAnalyticsData.normalBookCount
    } );
    term.push( {
      name: appStrings.NEW_BOOK,
      value: data?.newBookCount ?? mock.bookQuantityAnalyticsData.newBookCount
    } );
    term.push( {
      name: appStrings.DAMAGED_BOOK,
      value: data?.damageBookCount ?? mock.bookQuantityAnalyticsData.damageBookCount
    } );
    return term;
  }, [ data ] );
  return (
    <Container sx={ { height: "100%" } }>

      <Grid container spacing={ 4 } aria-rowcount={ 2 } height={ "100%" }>
        <Grid size={ 12 }>
          <ResponsiveContainer width="100%" height={ 250 }>
            <PieChart width={ 300 } height={ 300 }>
              <Pie
                data={ bookQuantityData }
                cx="50%"
                cy="50%"
                innerRadius={ 70 }
                outerRadius={ 120 }
                paddingAngle={ 5 }
                dataKey="value"
                stroke="white"
                strokeWidth={ 3 }
                cornerRadius={ 10 }
                label
              >
                <Cell fill={ color.PRIMARY }/>
                <Cell fill={ color.DARK_TEXT }/>
                <Cell fill={ color.SHADOW }/>
              </Pie>
              <Tooltip/>
            </PieChart>

          </ResponsiveContainer>
        </Grid>
        <Grid size={ 12 } height={ 50 }>
          <Grid container sx={ {
            backgroundColor: color.PRIMARY,
            borderRadius: "10px",
            width: "fit-content",
            padding: "0 10px",
            height: "100%",
          } } justifySelf={ "center" } alignItems={ "center" } columns={ 2 } spacing={1}>
            <IoLibrary color={ color.WHITE }/>
            <Typography fontWeight={ "bold" } textColor={ color.LIGHT_TEXT } fontSize={ 14 }
                        justifySelf={ "center" } textAlign={ "center" }>
              { `${ appStrings.TOTAL_BOOK }: ${ data?.totalBookCount ?? 0 }` }
            </Typography>
          </Grid>
        </Grid>

      </Grid>

    </Container>
  );
}
export default memo( BookQuantityAnalysisChartCpn );