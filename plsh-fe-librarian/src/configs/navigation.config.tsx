import appStrings from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import {Navigation} from "@toolpad/core/AppProvider";
import React from "react";
import {CiMap} from "react-icons/ci";
import {FaUsers} from "react-icons/fa";
import {FaBookBookmark} from "react-icons/fa6";
import {HiOutlineViewGridAdd} from "react-icons/hi";
import {ImBooks} from "react-icons/im";
import {IoLogOut, IoSettings} from "react-icons/io5";
import {TbClipboardList, TbLayoutDashboardFilled} from "react-icons/tb";

export const NAVIGATION: Navigation = [
        {
            kind: "header",
            title: appStrings.GENERAL,
        },
        {
            segment: "dashboard",
            title: appStrings.DASHBOARD,
            icon: <TbLayoutDashboardFilled color={color.PRIMARY} size={24}/>,
        },
        {
            segment: "borrow",
            title: appStrings.BORROW,
            icon: <FaBookBookmark color={color.PRIMARY} size={24}/>,
            children: [{
                segment: "",
                title: appStrings.borrow.LIST,
                icon: <TbClipboardList color={color.PRIMARY} size={24}/>,
            }, {
                segment: "add",
                title: appStrings.borrow.CREATE_BORROWING,
                icon: <HiOutlineViewGridAdd color={color.PRIMARY} size={24}/>,
            }],
        }
        ,
        {
            segment: "members",
            title: appStrings.MEMBER,
            icon: <FaUsers color={color.PRIMARY} size={24}/>,
        }
        ,
        {
            segment: "resources/books",
            title: appStrings.RESOURCE,
            icon: <ImBooks color={color.PRIMARY} size={24}/>,
            children: [{
                segment: "add",
                title: appStrings.book.ADD_BOOK,
                icon: <HiOutlineViewGridAdd color={color.PRIMARY} size={24}/>,
            }, {
                segment: "../library-room",
                title: appStrings.LIBRARY_ROOM,
                icon: <CiMap color={color.PRIMARY} size={24}/>,
            }],
        }
        ,
        {
            kind: "divider",
        }
        ,
        {
            kind: "header",
            title: appStrings.SYSTEM,
        }
        ,
        {
            segment: "setting",
            title: appStrings.SETTING,
            icon: <IoSettings color={color.PRIMARY} size={24}/>,
        }
        ,
        {
            segment: "logout",
            title: appStrings.LOGOUT,
            icon: <IoLogOut color={color.PRIMARY} size={24}/>,
        }
        ,
    ]
;
