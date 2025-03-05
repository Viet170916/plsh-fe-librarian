"use client"
import React, {memo, useEffect, useRef, useState} from "react";
import {
    Icon,
    MinimalButton,
    Plugin,
    Position,
    RenderViewer,
    ScrollMode,
    SpecialZoomLevel,
    Tooltip,
    Viewer,
    ViewMode,
    Worker
} from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {pageNavigationPlugin, RenderGoToPageProps} from '@react-pdf-viewer/page-navigation';

import {scrollModePlugin} from '@react-pdf-viewer/scroll-mode';

interface IProps {
    children?: React.ReactNode;
    pdfUrl?: string;
}

function PDFPreview(props: IProps) {
    const [aspectRatio] = useState<number>(210 / 297);
    const disableScrollPluginInstance = disableScrollPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const {GoToPreviousPage, GoToNextPage} = pageNavigationPluginInstance;
    const scrollModePluginInstance = scrollModePlugin();
    scrollModePluginInstance.switchScrollMode(ScrollMode.Horizontal);
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
                className="rpv-core__viewer"
                style={{
                    width: "100%",
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    height: '100%',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        left: 0,
                        position: 'absolute',
                        top: '50%',
                        transform: 'translate(24px, -50%)',
                        zIndex: 1,
                    }}
                >
                    <GoToPreviousPage>
                        {(props: RenderGoToPageProps) => (
                            <Tooltip
                                position={Position.BottomCenter}
                                target={
                                    <MinimalButton onClick={props.onClick}>
                                        <Icon size={16}>
                                            <path d="M18.4.5,5.825,11.626a.5.5,0,0,0,0,.748L18.4,23.5"/>
                                        </Icon>
                                    </MinimalButton>
                                }
                                content={() => 'Previous page'}
                                offset={{left: 0, top: 8}}
                            />
                        )}
                    </GoToPreviousPage>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translate(-24px, -50%)',
                        zIndex: 1,
                    }}
                >
                    <GoToNextPage>
                        {(props: RenderGoToPageProps) => (
                            <Tooltip
                                position={Position.BottomCenter}
                                target={
                                    <MinimalButton onClick={props.onClick}>
                                        <Icon size={16}>
                                            <path
                                                d="M5.651,23.5,18.227,12.374a.5.5,0,0,0,0-.748L5.651.5"/>
                                        </Icon>
                                    </MinimalButton>
                                }
                                content={() => 'Next page'}
                                offset={{left: 0, top: 8}}
                            />
                        )}
                    </GoToNextPage>
                </div>

                <Viewer
                    fileUrl={props.pdfUrl ?? ""}
                    plugins={[disableScrollPluginInstance, pageNavigationPluginInstance]}
                    defaultScale={SpecialZoomLevel.PageFit}
                    scrollMode={ScrollMode.Horizontal}
                />
            </div>


        </Worker>);
}

const disableScrollPlugin = (): Plugin => {
    const renderViewer = (props: RenderViewer) => {
        const {slot} = props;

        if (slot.subSlot && slot.subSlot.attrs && slot.subSlot.attrs.style) {
            slot.subSlot.attrs.style = Object.assign({}, slot.subSlot.attrs.style, {
                // Disable scrolling in the pages container
                overflow: 'hidden',
            });
        }

        return slot;
    };

    return {
        renderViewer,
    };
};
export default memo(PDFPreview);