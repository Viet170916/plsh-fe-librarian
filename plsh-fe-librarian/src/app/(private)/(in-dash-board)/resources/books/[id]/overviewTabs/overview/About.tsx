import appStrings from "@/helpers/appStrings";
import {BookData} from "@/helpers/appType";
import {color} from "@/helpers/resources";
import {Box, Skeleton, Typography} from "@mui/material";
import React, {memo} from "react";

interface IProps {
    book: BookData;
}

const Text = memo(({children}: { children: React.ReactNode }) => {
    return (
        <Typography variant="body2" fontWeight="bold" color="textSecondary">
            {children}
        </Typography>
    );
});

function About({book}: IProps) {
    return (
        <Box
            sx={{
                width: "100%",
                height: "fit-content",
                bgcolor: color.WHITE,
                border: 1,
                borderColor: color.SHADOW,
                borderRadius: 1,
                p: 2,
            }}
        >
            <Typography variant="h6" fontWeight="bold" color="textSecondary">
                {appStrings.book.DETAIL}
            </Typography>
            <Box
                sx={{mt: 2, gap: 2}}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    {appStrings.book.PUBLISHER}
                </Typography>
                <Box>
                    <Text>{book.publisher}</Text>
                </Box>
            </Box>
            <Box
                sx={{mt: 2, gap: 2}}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    {appStrings.book.SERIES}
                </Typography>
                <Box>
                    <Text>{book.id}</Text>
                </Box>
            </Box>
            <Box
                sx={{mt: 2, gap: 2}}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    {appStrings.book.PRICE}
                </Typography>
                <Box>
                    <Text>{book.price}</Text>
                </Box>
            </Box>
            <Box
                sx={{mt: 2, gap: 2}}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    {appStrings.book.PAGE_COUNT}
                </Typography>
                <Box>
                    <Text>{book.pageCount}</Text>
                </Box>
            </Box>
            <Box
                sx={{mt: 2, gap: 2}}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    {appStrings.book.ISBN10}
                </Typography>
                <Box>
                    <Text>{book.isbnNumber10}</Text>
                </Box>
            </Box>
            <Box
                sx={{mt: 2, gap: 2}}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    {appStrings.book.ISBN13}
                </Typography>
                <Box>
                    <Text>{book.isbnNumber13}</Text>
                </Box>
            </Box>
            <Box
                sx={{mt: 2, gap: 2}}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    {appStrings.book.OTHER_IDENTIFIER}
                </Typography>
                <Box>
                    <Text>{book.otherIdentifier}</Text>
                </Box>
            </Box>
            <Box
                sx={{mt: 2, gap: 2}}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    {appStrings.book.LIBRARY_CODE}
                </Typography>
                <Text>{book.libraryCode}</Text>
            </Box>
            <Typography variant="h6" fontWeight="bold" color="textSecondary">
                {appStrings.book.PHYSIC_DESCRIPTION}
            </Typography>
            <Box
                sx={{mt: 2, gap: 2}}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    {appStrings.book.HEIGHT}
                </Typography>
                <Box>
                    <Text>{book.height}</Text>
                </Box>
            </Box>
            <Box
                sx={{mt: 2, gap: 2}}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    {appStrings.book.WIDTH}
                </Typography>
                <Box>
                    <Text>{book.weight}</Text>
                </Box>
            </Box>
            <Box
                sx={{mt: 2, gap: 2}}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    {appStrings.book.THICKNESS}
                </Typography>
                <Box>
                    <Text>{book.thickness}</Text>
                </Box>
            </Box>
            <Box
                sx={{mt: 2, gap: 2}}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    {appStrings.book.WEIGHT}
                </Typography>
                <Box>
                    <Text>{book.weight}</Text>
                </Box>
            </Box>
        </Box>
    );
}

export const AboutSkeleton = memo(() => (
    <Box
        sx={{
            width: "100%",
            height: "fit-content",
            bgcolor: color.WHITE,
            border: 1,
            borderColor: color.SHADOW,
            borderRadius: 1,
            p: 2,
        }}
    >
        <Typography variant="h6" fontWeight="bold" color="textSecondary">
            <Skeleton
                variant="text"
                width={70}
                sx={{backgroundColor: color.PAGE_BACKGROUND}}
            />
        </Typography>
        {/* Publisher */}
        <Box
            sx={{mt: 2, gap: 2}}
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                <Skeleton
                    variant="text"
                    width={70}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Typography>
            <Box>
                <Skeleton
                    variant="text"
                    width={100}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Box>
        </Box>
        {/* Series */}
        <Box
            sx={{mt: 2, gap: 2}}
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                <Skeleton
                    variant="text"
                    width={70}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Typography>
            <Box>
                <Skeleton
                    variant="text"
                    width={100}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Box>
        </Box>
        {/* Price */}
        <Box
            sx={{mt: 2, gap: 2}}
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                <Skeleton
                    variant="text"
                    width={70}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Typography>
            <Box>
                <Skeleton
                    variant="text"
                    width={100}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Box>
        </Box>
        {/* Page Count */}
        <Box
            sx={{mt: 2, gap: 2}}
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                <Skeleton
                    variant="text"
                    width={70}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Typography>
            <Box>
                <Skeleton
                    variant="text"
                    width={100}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Box>
        </Box>
        {/* ISBN10 */}
        <Box
            sx={{mt: 2, gap: 2}}
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                <Skeleton
                    variant="text"
                    width={70}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Typography>
            <Box>
                <Skeleton
                    variant="text"
                    width={100}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Box>
        </Box>
        {/* ISBN13 */}
        <Box
            sx={{mt: 2, gap: 2}}
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                <Skeleton
                    variant="text"
                    width={70}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Typography>
            <Box>
                <Skeleton
                    variant="text"
                    width={100}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Box>
        </Box>
        {/* Other Identifier */}
        <Box
            sx={{mt: 2, gap: 2}}
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                <Skeleton
                    variant="text"
                    width={70}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Typography>
            <Box>
                <Skeleton
                    variant="text"
                    width={100}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Box>
        </Box>
        {/* Library Code */}
        <Box
            sx={{mt: 2, gap: 2}}
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                <Skeleton
                    variant="text"
                    width={70}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Typography>
            <Skeleton
                variant="text"
                width={100}
                sx={{backgroundColor: color.PAGE_BACKGROUND}}
            />
        </Box>
        <Typography variant="h6" fontWeight="bold" color="textSecondary">
            <Skeleton
                variant="text"
                width={70}
                sx={{backgroundColor: color.PAGE_BACKGROUND}}
            />
        </Typography>
        {/* Height */}
        <Box
            sx={{mt: 2, gap: 2}}
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                <Skeleton
                    variant="text"
                    width={70}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Typography>
            <Box>
                <Skeleton
                    variant="text"
                    width={100}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Box>
        </Box>
        {/* Width */}
        <Box
            sx={{mt: 2, gap: 2}}
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                <Skeleton
                    variant="text"
                    width={70}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Typography>
            <Box>
                <Skeleton
                    variant="text"
                    width={100}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Box>
        </Box>
        {/* Thickness */}
        <Box
            sx={{mt: 2, gap: 2}}
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                <Skeleton
                    variant="text"
                    width={70}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Typography>
            <Box>
                <Skeleton
                    variant="text"
                    width={100}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Box>
        </Box>
        {/* Weight */}
        <Box
            sx={{mt: 2, gap: 2}}
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                <Skeleton
                    variant="text"
                    width={70}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Typography>
            <Box>
                <Skeleton
                    variant="text"
                    width={100}
                    sx={{backgroundColor: color.PAGE_BACKGROUND}}
                />
            </Box>
        </Box>
    </Box>
));
export default memo(About);
