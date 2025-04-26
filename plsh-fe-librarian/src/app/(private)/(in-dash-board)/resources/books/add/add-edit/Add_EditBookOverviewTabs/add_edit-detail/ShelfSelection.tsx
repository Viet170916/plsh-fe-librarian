"use client";
import {Shelf} from "@/app/(private)/(in-dash-board)/resources/library-room/RoomMap";
import appStrings from "@/helpers/appStrings";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useGetShelvesQuery} from "@/stores/slices/api/library-room.api.slice";
import {setLibRoom_g} from "@/stores/slices/global.slice";
import {setShelves} from "@/stores/slices/lib-room-state/lib-room.slice";
import {RowShelf} from "@/stores/slices/lib-room-state/shelf.slice";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Box from '@mui/material/Box';
import {styled, useTheme} from '@mui/material/styles';
import {SvgIconProps} from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import {SimpleTreeView} from '@mui/x-tree-view/SimpleTreeView';
import {
    TreeItem2Content,
    TreeItem2GroupTransition,
    TreeItem2IconContainer,
    TreeItem2Root
} from '@mui/x-tree-view/TreeItem2';
import {TreeItem2Icon} from '@mui/x-tree-view/TreeItem2Icon';
import {TreeItem2Provider} from '@mui/x-tree-view/TreeItem2Provider';
import {useTreeItem2, UseTreeItem2Parameters} from '@mui/x-tree-view/useTreeItem2';
import clsx from 'clsx';
import React, {JSX, memo, useEffect} from "react";
import {IoFileTrayStackedOutline} from "react-icons/io5";
import {RiBookShelfLine} from "react-icons/ri";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import {LinearProgress, SxProps, Theme} from "@mui/material";
import {color} from "@/helpers/resources";
import Grid from "@mui/material/Grid2";

type ShelfSelectionProps = {
    onSelect?: (value: string | null) => void
}
const ShelfTreeView = memo(({shelf, onSelect}: { shelf: Shelf, onSelect?: (value: RowShelf) => void }) => {
    if (shelf.rowShelves && shelf.rowShelves.length > 0) {
        const bookInstanceSelections = shelf.rowShelves.map(row => {
            return (<CustomTreeItem
                key={row.id}
                bgColor={color.FOUR_20}
                color={color.FOUR}
                // boxShadow={NEUMORPHIC_SHADOW.INNER_SHADOW()}
                labelInfo={`${row.count ?? 0} ${appStrings.unit.BOOK}`}
                itemId={`${shelf.id}-${row.id}-row`}
                label={`${row.name ?? ""} (${appStrings.unit.ROW}: ${row.position})`}
                labelIcon={IoFileTrayStackedOutline}
            />);
        });
        return (
            <CustomTreeItem
                bgColor={color.PRIMARY_20}
                color={color.PRIMARY}
                itemId={`shelf-${shelf.id}`}
                label={shelf.name}
                labelIcon={RiBookShelfLine}
            >
                {bookInstanceSelections}
            </CustomTreeItem>
        );
    }
    return (<CustomTreeItem itemId={`shelf-${shelf.id}`} label={shelf.name} labelIcon={RiBookShelfLine}/>);
});

function ShelfSelection({onSelect}: ShelfSelectionProps): JSX.Element {
    const dispatch = useAppDispatch();
    const {data: rowShelves, isFetching} = useGetShelvesQuery({});
    const rowShelfSelections = rowShelves?.map((shelf) => (<ShelfTreeView key={shelf.id} shelf={shelf}/>));
    useEffect(() => {
        dispatch(setShelves(rowShelves ?? []));
        dispatch(setLibRoom_g(rowShelves ?? []));
    }, [rowShelves, dispatch]);
    return (
        <Grid>
            {isFetching && <LinearProgress/>}
            <SimpleTreeView
                aria-label="gmail"
                onSelectedItemsChange={(_, value) => {
                    onSelect?.(value);
                }}
                // defaultExpandedItems = { [ '3' ] }
                // defaultSelectedItems = "5"
                slots={{
                    expandIcon: ArrowRightIcon,
                    collapseIcon: ArrowDropDownIcon,
                    endIcon: EndIcon,
                }}
                sx={{flexGrow: 1, maxWidth: 400}}
            >
                {rowShelfSelections}
            </SimpleTreeView>
        </Grid>

    );
}

export default memo(ShelfSelection);
declare module 'react' {
    interface CSSProperties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

interface StyledTreeItemProps
    extends Omit<UseTreeItem2Parameters, 'rootRef'>,
        React.HTMLAttributes<HTMLLIElement> {
    bgColor?: string;
    bgColorForDarkMode?: string;
    color?: string;
    colorForDarkMode?: string;
    labelIcon: React.ElementType<SvgIconProps>;
    labelInfo?: string;
    sx?: SxProps<Theme>,
}

const CustomTreeItemRoot = styled(TreeItem2Root)(({theme}) => ({
    color: theme.palette.text.primary,
}));
const CustomTreeItemContent = styled(TreeItem2Content)(({theme}) => ({
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    borderRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    boxShadow: NEUMORPHIC_SHADOW.SHADOW(),
    '&.expanded': {
        fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&.focused, &.selected, &.selected.focused': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
        boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
        color: 'var(--tree-view-color)',
    },
}));
const CustomTreeItemIconContainer = styled(TreeItem2IconContainer)(({theme}) => ({
    marginRight: theme.spacing(1),
}));
const CustomTreeItemGroupTransition = styled(TreeItem2GroupTransition)(
    ({theme}) => ({
        marginLeft: 0,
        boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
        padding: theme.spacing(.5),
        borderRadius: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        [`& .content`]: {
            boxShadow: "none",
            marginTop: theme.spacing(.5),
            paddingLeft: theme.spacing(2),
            marginBottom: theme.spacing(.5),
        },
    }),
);
const CustomTreeItem = memo(React.forwardRef(function CustomTreeItem(
    props: StyledTreeItemProps,
    ref: React.Ref<HTMLLIElement>,
) {
    const theme = useTheme();
    const {
        id,
        itemId,
        label,
        disabled,
        children,
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        colorForDarkMode,
        bgColorForDarkMode,
        ...other
    } = props;
    const {
        getRootProps,
        getContentProps,
        getIconContainerProps,
        getLabelProps,
        getGroupTransitionProps,
        status,
    } = useTreeItem2({id, itemId, children, label, disabled, rootRef: ref});
    const style = {
        '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
        '--tree-view-bg-color':
            theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,

    };
    return (
        <TreeItem2Provider itemId={itemId}>
            <CustomTreeItemRoot {...getRootProps({...other, style})}>
                <CustomTreeItemContent
                    {...getContentProps({
                        className: clsx('content', {
                            expanded: status.expanded,
                            selected: status.selected,
                            focused: status.focused,
                        }),
                    })}
                >
                    <CustomTreeItemIconContainer {...getIconContainerProps()}>
                        <TreeItem2Icon status={status}/>
                    </CustomTreeItemIconContainer>
                    <Box
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                            alignItems: 'center',
                            p: 0.5,
                            pr: 0,
                        }}
                    >
                        <Box component={LabelIcon} color="inherit" sx={{mr: 1}}/>
                        <Typography
                            {...getLabelProps({
                                variant: 'body2',
                                sx: {display: 'flex', fontWeight: 'inherit', flexGrow: 1},
                            })}
                        />
                        <Typography variant="caption" color="inherit">
                            {labelInfo}
                        </Typography>
                    </Box>
                </CustomTreeItemContent>
                {children && (
                    <CustomTreeItemGroupTransition {...getGroupTransitionProps()} />
                )}
            </CustomTreeItemRoot>
        </TreeItem2Provider>
    );
}));

function EndIcon() {
    return <div style={{width: 24}}/>;
}
