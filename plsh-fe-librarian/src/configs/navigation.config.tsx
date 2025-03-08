import {Navigation} from "@toolpad/core/AppProvider";
import {TbLayoutDashboardFilled} from "react-icons/tb";
import {color} from "@/helpers/resources";
import {FaBookBookmark} from "react-icons/fa6";
import {FaUsers} from "react-icons/fa";
import {ImBooks} from "react-icons/im";
import {IoLogOut, IoSettings} from "react-icons/io5";
import React from "react";
import {HiOutlineViewGridAdd} from "react-icons/hi";

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
                title: "Tạo phiên giao dịch",
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
            title: " Resources",
            icon: <ImBooks color={color.PRIMARY} size={24}/>,
            children: [{
                segment: "add",
                title: "Add Book",
                icon: <HiOutlineViewGridAdd color={color.PRIMARY} size={24}/>,
            }, {
                segment: "manage",
                title: "Manage Book",
                icon: <ImBooks color={color.PRIMARY} size={24}/>,
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