import ProfileSettingsForm from "@/app/(private)/(in-dash-board)/members/[id]/info/EditForm";
import SaveToStore from "@/app/(private)/(in-dash-board)/members/[id]/info/SaveToStore";
import { Box } from "@mui/material";
import React from "react";

interface IProps{
				params: Promise<{ id: number }>;
}
const ProfileSettings = async( props: IProps ) => {
				// const [tabIndex, setTabIndex] = useState(0);
				const params = await props.params;
				return (
								<Box minHeight = { "100%" }>
												<SaveToStore memberId = { params.id } />
												<ProfileSettingsForm />
								</Box>
				);
};
export default ProfileSettings;
