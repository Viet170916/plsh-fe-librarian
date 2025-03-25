"use client";
import NavTabs from "@/components/primary/TabLink";
import appStrings from "@/helpers/appStrings";
import { TabItem } from "@/helpers/appType";
import { useParams } from "next/navigation";
import React, { JSX, memo } from "react";

const tabLinks: TabItem[] = [ {
				kind: "link",
				segment: "info",
				title: appStrings.member.BASE_INFO,
}, {
				kind: "link",
				segment: "card",
				title: appStrings.member.CARD,
}, {
				kind: "link",
				segment: "borrow-request",
				title: appStrings.member.BORROW_REQUEST,
}, {
				kind: "link",
				segment: "history",
				title: appStrings.member.HISTORY,
}, {
				kind: "link",
				segment: "reading",
				title: appStrings.member.READING,
}, {
				kind: "link",
				segment: "setting",
				title: appStrings.member.SETTING,
} ];
function TabLink(): JSX.Element{
				const params = useParams<{ id: string }>();
				const tabs = tabLinks.map( ( tab, index ) => {
								return { ...tab, segment: `/members/${ [ params.id ] }${ tab.kind === "link" && tab.segment ? `/${ tab.segment }` : undefined }` };
				} );
				console.log( "re" );
				return (
								<NavTabs tabs = { tabs } />
				);
}
export default memo( TabLink );

