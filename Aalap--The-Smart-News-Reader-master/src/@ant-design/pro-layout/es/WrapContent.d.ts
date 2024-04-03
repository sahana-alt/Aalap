import React, { CSSProperties } from 'react';
declare class WrapContent extends React.Component<{
    isChildrenLayout?: boolean;
    className?: string;
    style?: CSSProperties;
    location?: any;
    prefixCls?: string;
    contentHeight?: number | string;
}> {
    ref: HTMLDivElement | null;
    render(): JSX.Element;
}
export default WrapContent;
