"use client";
import Container from "@/components/primary/Container";
import { LoanSortByCategoryAnalyticsData } from "@/helpers/appType";
import { generateOpacityGradient } from "@/helpers/generate";
import mock from "@/helpers/mockData";
import { color } from "@/helpers/resources";
import {
  useGetLoanSortByCategoryAnalyticsDataQuery,
} from "@/stores/slices/api/analysis.api.slice";
import React, { memo, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

interface IProps{
  children?: React.ReactNode;
}

function LoanSortByCategoryAnalysisChartCpn(){
  const { data, error, isLoading } = useGetLoanSortByCategoryAnalyticsDataQuery( {}, {} );
  const colors = useMemo( () => generateOpacityGradient( color.SIXTH, data?.analyticData?.length ?? mock.loanSortByCategoryAnalyticDataRes.analyticData.length ), [ data?.analyticData ] );
  const analyticData: ( LoanSortByCategoryAnalyticsData & {
    color?: string
  } )[] = useMemo( () => ( data?.analyticData ?? mock.loanSortByCategoryAnalyticDataRes.analyticData ).map( ( ( en, index ) => ( {
    ...en,
    color: colors.at( index )
  } ) ) ), [ data?.analyticData, colors ] );
  return (
    <Container
      sx={ { backgroundColor: color.PAGE_BACKGROUND, borderRadius: "10px", width: "100%", padding: "0!important" } }>

      <ResponsiveContainer width="100%" height={ 300 }>

        <BarChart
          height={ 300 }
          data={ analyticData }
          margin={ {
            top: 20,
            right: 30,
            left: -10,
            bottom: 5,
          } }
        >
          {/*<CartesianGrid strokeDasharray="3 3"/>*/ }
          <XAxis dataKey="genre" fontSize={ "10px" } tickLine={ false } axisLine={ false }/>
          <YAxis fontSize={ "10px" } tick={ true } axisLine={ false }/>
          <Bar dataKey="borrowCount" radius={ [ 10, 10, 10, 10 ] } label={ { position: "top" } }>
            { analyticData.map( ( entry, index ) => (
              <Cell key={ `cell-${ index }` } fill={ entry.color }/>
            ) ) }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}
export default memo( LoanSortByCategoryAnalysisChartCpn );



