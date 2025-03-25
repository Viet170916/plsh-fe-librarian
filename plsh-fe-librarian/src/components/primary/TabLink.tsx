"use client";
import { TabItem } from "@/helpers/appType";
import { color } from "@/helpers/resources";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { usePathname, useRouter } from "next/navigation";
import React, { memo, useState } from "react";

interface IProps{
				children?: React.ReactNode;
}
type NavTabsProps = {
				tabs: TabItem[];
}
interface LinkTabProps{
				label?: string;
				href?: string;
				selected?: boolean;
}
function samePageLinkNavigation(
				event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
){
				return !(event.defaultPrevented ||
								event.button !== 0 || // ignore everything but left-click
								event.metaKey ||
								event.ctrlKey ||
								event.altKey ||
								event.shiftKey);
}
function LinkTab( props: LinkTabProps ){
				const router = useRouter();
				const pathname = usePathname();
				return (
								<Grid>
												<Tab
																sx = { {
																				'& .MuiTab-root': {
																								color: `${ color.DARK_TEXT }!important`,
																								backgroundColor: props.selected ? color.PRIMARY : 'transparent!important',
																				},
																				'& .MuiTabs-indicator': {
																								backgroundColor: props.selected ? color.PRIMARY : 'transparent!important',
																								color: `${ color.DARK_TEXT }!important`,
																				},
																} }
																component = "a"
																onClick = { ( event: React.MouseEvent<HTMLAnchorElement, MouseEvent> ) => {
																				// Routing libraries handle this, you can remove the onClick handle when using them.
																				if( samePageLinkNavigation( event ) ){
																								event.preventDefault();
																								if( props.href ){
																												router.push( props.href );
																								}
																				}
																} }
																aria-current = { props.selected && 'page' }
																{ ...props }
												/>
												<Grid size = { 12 } sx = { { height: "1px", background: pathname === props.href ? color.PRIMARY : 'transparent!important' } }></Grid>
								</Grid>
				);
}
const NavTabs = ( { tabs }: NavTabsProps ) => {
				const [ value, setValue ] = useState<number>( 0 );
				const pathname = usePathname();
				const router = useRouter();
				// Lấy segment cuối của route
				const currentSegment = pathname.split( "/" ).filter( Boolean ).pop() || "";
				// Tìm index của segment hiện tại trong danh sách tab
				const currentIndex = tabs.findIndex( tab => tab.kind === "link" && tab.segment === currentSegment );
				const handleChange = ( _: React.SyntheticEvent, newValue: number ) => {
								setValue( newValue );
								const newSegment = tabs[newValue].kind === "link" ? tabs[newValue].segment : undefined;
								router.push( `/${ newSegment }` ); // Chuyển route khi đổi tab
				};
				return (
								<Box sx = { { width: '100%', mb: 3 } }>
												<Tabs
																value = { currentIndex >= 0 ? currentIndex : 0 } onChange = { handleChange }
																sx = { {
																				width: "100%",
																				color: `${ color.DARK_TEXT }!important`,
																				'& .MuiTab-root': {
																								color: `${ color.DARK_TEXT }!important`,
																				},
																				'& .MuiTabs-indicator': {
																								backgroundColor: 'transparent!important',
																								color: `${ color.DARK_TEXT }!important`,
																				},
																} }
												>
																{ tabs.map( ( tab, index ) => {
																				if( tab.kind === "link" ){
																								return <LinkTab
																												selected = { index === 2 }
																												key = { tab.title }
																												label = { tab.title }
																												href = { tab.segment }
																								/>;
																								// <Tab key={index} label={tab.title}/>}
																				}
																} ) }
												</Tabs>
								</Box>
				);
};
export default memo( NavTabs );
