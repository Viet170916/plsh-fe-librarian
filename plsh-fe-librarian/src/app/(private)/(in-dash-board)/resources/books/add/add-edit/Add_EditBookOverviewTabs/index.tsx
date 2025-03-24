"use client";
import AddEditOverview from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add-edit-overview";
import AddEditDetail from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add_edit-detail";
import TabBar from "@/components/primary/TabBar";
import appStrings from "@/helpers/appStrings";
import { TabItem } from "@/helpers/appType";
import { Box } from "@mui/material";
import React, { memo } from "react";

interface IProps{
				bookId?: number;
}
const BookOverviewTabs = ( { bookId }: IProps ) => {
				const tabs: TabItem[] = [
								{
												kind: "normal",
												title: appStrings.book.OVERVIEW,
												content: <AddEditOverview />,
								},
								{
												kind: "normal",
												title: appStrings.book.DETAIL,
												content:
																bookId ? <AddEditDetail bookId = { bookId } /> : <>Hãy hoàn tất tạo mới sách</>,
								},
				];
				return (
								<Box sx = { { width: "100%", height: 381, position: "relative" } }>
												< TabBar tabs = { tabs } />
								</Box>
				);
};
export default memo( BookOverviewTabs );
