import CreateMemberForm from "@/app/(private)/(in-dash-board)/members/add-member/CreateMemberForm";
import ClientRender from "@/app/(private)/(in-dash-board)/members/ClientRender";
import Grid from "@mui/material/Grid2";
import React from "react";

interface IProps{
				children?: React.ReactNode;
}
function MemberPage(){
				return (
								<Grid container direction = { "column" } width = { "100%" } minHeight = { "100%" } padding = { 5 } spacing = { 2 }>
												<CreateMemberForm />
												<Grid size = { "grow" }>
																<ClientRender />
												</Grid>
								</Grid>
				);
}
export default MemberPage;
