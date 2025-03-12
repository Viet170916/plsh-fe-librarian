import {Navigation} from "@toolpad/core/AppProvider";
import {TbLayoutDashboardFilled} from "react-icons/tb";
import {color} from "@/helpers/resources";
import {FaBookBookmark} from "react-icons/fa6";
import {FaUsers} from "react-icons/fa";
import {ImBooks} from "react-icons/im";
import {IoLogOut, IoSettings} from "react-icons/io5";
import React from "react";
import {HiOutlineViewGridAdd} from "react-icons/hi";
import appStrings from "@/helpers/appStrings";
import {CiMap} from "react-icons/ci";

export const NAVIGATION: Navigation = [
        {
            kind: "header",
            title: " General",
        },
        {
            segment: "dashboard",
            title: " Dashboard",
            icon: <TbLayoutDashboardFilled color={color.PRIMARY} size={24}/>,
        },
        {
            segment: "borrow",
            title: " Mượn sách",
            icon: <FaBookBookmark color={color.PRIMARY} size={24}/>,

            children: [{
                segment: "add",
                title: "Tạo phiên mượn sách",
                icon: <HiOutlineViewGridAdd color={color.PRIMARY} size={24}/>,
            },]
        }
        ,
        {
            segment: "members",
            title: " Members",
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
            }]

        }
        ,
        {
            kind: "divider",
        }
        ,
        {
            kind: "header",
            title: "System",
        }
        ,
        {
            segment: "setting",
            title: " Setting",
            icon: <IoSettings color={color.PRIMARY} size={24}/>,
        }
        ,
        {
            segment: "logout",
            title: " Log out",
            icon: <IoLogOut color={color.PRIMARY} size={24}/>,
        }
        ,
    ]
;