"use client"
import React, {JSX, memo} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {TabItem} from "@/helpers/appType";

interface IProps {
    children?: React.ReactNode,
    tabs: TabItem[],
    defaultValue?: number,
}

// function TabBar(props: IProps) {

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    style?: React.CSSProperties;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `tab-${index}`,
        "aria-controls": `tabpanel-${index}`,
    };
}

function TabBar(props: IProps): JSX.Element {
    const [value, setValue] = React.useState(props.defaultValue ?? 0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: "100%"}}>
            <Tabs value={value}
                  onChange={handleChange}
                  aria-label="custom tabs"
                  indicatorColor={"primary"}
                  variant="fullWidth"
                  sx={{width: "100%"}}>
                {props.tabs.map((tab, index) => (
                    <Tab key={tab.title} label={tab.title} {...a11yProps(index)} />
                ))}
            </Tabs>
            {
                props.tabs.map((tab, index) => {
                    if (tab.kind === "normal")
                        return (<TabPanel style={{width: "100%"}} key={tab.title} value={value} index={index}>
                            {tab.content}
                        </TabPanel>)
                })
            }
        </Box>
    );
}


export default memo(TabBar);
