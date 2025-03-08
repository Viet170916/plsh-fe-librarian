import React, {memo} from "react";

interface IProps {
    children?: React.ReactNode;
}

function BorrowLayout(props: IProps) {
    return (
        <div style={{padding: 20, width: '100%', height: 'fit-content'}}>
            {props.children}
        </div>);
}

export default memo(BorrowLayout);