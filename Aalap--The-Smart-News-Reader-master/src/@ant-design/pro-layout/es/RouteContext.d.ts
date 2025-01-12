/// <reference types="react" />
import { BreadcrumbListReturn } from './utils/getBreadcrumbProps';
import { PureSettings } from './defaultSettings';
import { MenuDataItem } from './typings';
export interface RouteContextType extends Partial<PureSettings> {
    breadcrumb?: BreadcrumbListReturn;
    menuData?: MenuDataItem[];
    isMobile?: boolean;
    prefixCls?: string;
    collapsed?: boolean;
    hasSiderMenu?: boolean;
    hasHeader?: boolean;
    siderWidth?: number;
    isChildrenLayout?: boolean;
    pageTitleInfo?: {
        title: string;
        id: string;
        pageName: string;
    };
}
declare const routeContext: React.Context<RouteContextType>;
export default routeContext;
