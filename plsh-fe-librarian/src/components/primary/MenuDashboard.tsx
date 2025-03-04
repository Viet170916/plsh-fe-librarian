"use client"
import React, {JSX, memo, ReactNode, useCallback, useEffect} from "react";
import {
    Box, BoxProps, Collapse, CSSObject,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Theme,
} from "@mui/material";
import {ChevronLeft, ChevronRight, Inbox, Label, Mail, Menu, StarBorder} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import {BoxOwnProps} from "@mui/system";
import {Navigation} from "@toolpad/core/AppProvider";
import Typography from "@/components/primary/typography";
import {color, theme} from "@/helpers/resources";
import {usePathname} from "next/navigation";
import Link from 'next/link';
import {FaCaretDown, FaCaretUp} from "react-icons/fa6";


const openedMixin = (theme: Theme): CSSObject => ({
    width: 240,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface IProps {
    children?: React.ReactNode,
    items: Navigation,

}

interface DrawerProps extends BoxOwnProps {
    open?: boolean;
}

const Drawer = styled(Box, {shouldForwardProp: (prop) => prop !== 'open'})<DrawerProps>(
    ({theme}) => ({
        width: 240,
        position: 'relative',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({open}) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({open}) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

function MenuDashBoard(props: IProps) {
    const [open, setOpen] = React.useState(true);
    const pathname = usePathname();
    useEffect(() => {
        console.log(pathname);
    }, [pathname]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Drawer open={open}>
            <DrawerHeader>
                {!open ? <IconButton

                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {

                                marginRight: 5,
                                zIndex: theme.zIndex.drawer + 1,
                            },

                            open && {display: 'none'},
                        ]}
                    >
                        <Menu/>
                    </IconButton> :
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRight/> : <ChevronLeft/>}
                    </IconButton>
                }
            </DrawerHeader>
            <Divider/>
            <NavList items={props.items} open={open} pathname={pathname}/>
            <Divider/>

        </Drawer>
    );
}

// class Link extends React.Component<{
//     sx: { display: string; borderRadius: number; background: string | undefined },
//     href: string,
//     children: ReactNode
// }> {
//     render() {
//         return null;
//     }
// }

function NavList({items, open, pathname, segment}: {
    items: Navigation,
    open: boolean,
    pathname: string,
    segment?: string
}) {
    return (
        <List>
            {items.map((item, index) => {
                if (item.kind === "header") {
                    return <Typography key={`${item.title}-${item.kind}`}
                                       sx={{
                                           justifySelf: "start",
                                           fontSize: theme.typography.pxToRem(12),
                                           fontWeight: theme.typography.fontWeightBold,
                                           padding: "0 10px",
                                           color: color.DARK_LIGHTER_TEXT
                                       }}>{item.title}</Typography>
                } else if (item.kind === "divider") {
                    return <Divider key={`${index}-${item.kind}`}/>
                } else {
                    if (item.children) {


                        return (
                            <CollapseList icon={item.icon} segment={item.segment ?? ""}
                                          key={`${item.segment}-${item.kind}`}
                                          items={item.children} open={open}
                                          pathname={pathname}
                                          title={item.title ?? ""}
                            />
                        );
                    } else
                        return (
                            <ListItem key={`${item.segment}-${item.kind}`} disablePadding
                                      sx={{
                                          display: 'block',
                                          padding: 1,
                                      }}>
                                <Link style={{
                                    display: 'block',
                                    borderRadius: item.segment && pathname.includes(item.segment) ? 1 : 0,
                                    background: (item.segment && pathname.includes(item.segment)) ? color.PRIMARY_O10 : undefined,
                                }} href={`/${segment ? `${segment}/`:""}${item.segment}`}>
                                    <ListItemButton
                                        sx={[{
                                            minHeight: 48,
                                            px: 2.5,
                                        }, open ? {justifyContent: 'initial',} : {justifyContent: 'center'},]}
                                    >
                                        <ListItemIcon
                                            sx={[{
                                                minWidth: 0,
                                                justifyContent: 'center',
                                            }, open ? {mr: 3,} : {mr: 'auto',},]}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.title}
                                            sx={[open ? {opacity: 1,} : {opacity: 0,},]}
                                        />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        );
                }
            })}
        </List>
    )

}

const CollapseList = memo(function CollapseList({items, open, pathname, segment, icon, title}: {
        items: Navigation,
        open: boolean,
        pathname: string,
        segment: string,
        icon: React.ReactNode,
        title: string
    }) {

        const [isOpen, setOpen] = React.useState(false);
        const handleClick = useCallback(() => {
            setOpen((prev) => !prev);
        }, []);
        return (<>
            <ListItem disablePadding
                      onClick={handleClick}
                      sx={{
                          display: 'block',
                          padding: 1,
                      }}>
                <Link style={{
                    display: 'block',
                    borderRadius: segment && pathname.includes(segment) ? 1 : 0,
                    background: (segment && pathname.includes(segment)) ? color.PRIMARY_O10 : undefined,
                }} href={`/${segment}`}>
                    <ListItemButton
                        sx={[{
                            minHeight: 48,
                            px: 2.5,
                        }, open ? {justifyContent: 'initial',} : {justifyContent: 'center'},]}
                    >
                        <ListItemIcon
                            sx={[{
                                minWidth: 0,
                                justifyContent: 'center',
                            }, open ? {mr: 3,} : {mr: 'auto',},]}
                        >
                            {icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={title}
                            sx={[open ? {opacity: 1,} : {opacity: 0,},]}
                        />
                        {isOpen ?  <FaCaretUp/>:<FaCaretDown/> }
                    </ListItemButton>
                </Link>
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <NavList items={items} open={open} pathname={pathname} segment={segment}/>
            </Collapse>
        </>)
    }
)

export default memo(MenuDashBoard);