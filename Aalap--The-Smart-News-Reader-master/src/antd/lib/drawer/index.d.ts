import * as React from 'react';
declare type EventType = React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;
declare type getContainerFunc = () => HTMLElement;
declare const PlacementTypes: ["top", "right", "bottom", "left"];
declare type placementType = typeof PlacementTypes[number];
export interface DrawerProps {
    closable?: boolean;
    closeIcon?: React.ReactNode;
    destroyOnClose?: boolean;
    forceRender?: boolean;
    getContainer?: string | HTMLElement | getContainerFunc | false;
    maskClosable?: boolean;
    mask?: boolean;
    maskStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    /** wrapper dom node style of header and body */
    drawerStyle?: React.CSSProperties;
    headerStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    title?: React.ReactNode;
    visible?: boolean;
    width?: number | string;
    height?: number | string;
    zIndex?: number;
    prefixCls?: string;
    push?: boolean;
    placement?: placementType;
    onClose?: (e: EventType) => void;
    afterVisibleChange?: (visible: boolean) => void;
    className?: string;
    handler?: React.ReactNode;
    keyboard?: boolean;
    footer?: React.ReactNode;
    footerStyle?: React.CSSProperties;
}
export interface IDrawerState {
    push?: boolean;
}
declare const _default: React.FC<DrawerProps>;
export default _default;
