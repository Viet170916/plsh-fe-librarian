import CreateMemberForm from "@/app/(private)/(in-dash-board)/members/add-member/CreateMemberForm";
import ClientRender from "@/app/(private)/(in-dash-board)/members/ClientRender";
import Grid from "@mui/material/Grid2";
import React from "react";

interface IProps{
				children?: React.ReactNode;
}
function MemberPage(){
				return (
								<Grid container width = { "100%" } padding = { 5 }>
												<CreateMemberForm />
												<ClientRender />
								</Grid>
				);
}
export default MemberPage;
