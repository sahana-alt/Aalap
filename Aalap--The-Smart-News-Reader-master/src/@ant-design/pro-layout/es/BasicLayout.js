import "antd/es/layout/style";
import _Layout from "antd/es/layout";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import './BasicLayout.less';
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import useMergeValue from 'use-merge-value';
import { stringify } from 'use-json-comparison';
import useAntdMediaQuery from 'use-media-antd-query';
import Omit from 'omit.js';
import Header from './Header';
import { getPageTitleInfo } from './getPageTitle';
import defaultSettings from './defaultSettings';
import getLocales from './locales';
import Footer from './Footer';
import RouteContext from './RouteContext';
import SiderMenu from './SiderMenu';
import { getBreadcrumbProps } from './utils/getBreadcrumbProps';
import getMenuData from './utils/getMenuData';
import { isBrowser, useDeepCompareEffect } from './utils/utils';
import PageLoading from './PageLoading';
import MenuCounter from './SiderMenu/Counter';
import WrapContent from './WrapContent';
import { useDocumentTitle } from './utils/hooks';
import compatibleLayout from './utils/compatibleLayout';

var headerRender = function headerRender(props) {
  if (props.headerRender === false || props.pure) {
    return null;
  }

  return React.createElement(Header, Object.assign({}, props));
};

var footerRender = function footerRender(props) {
  if (props.footerRender === false || props.pure) {
    return null;
  }

  if (props.footerRender) {
    return props.footerRender(Object.assign({}, props), React.createElement(Footer, null));
  }

  return null;
};

var renderSiderMenu = function renderSiderMenu(props) {
  var layout = props.layout,
      isMobile = props.isMobile,
      menuRender = props.menuRender;

  if (props.menuRender === false || props.pure) {
    return null;
  }

  if (layout === 'top' && !isMobile) {
    return React.createElement(SiderMenu, Object.assign({}, props, {
      hide: true
    }));
  }

  if (menuRender) {
    return menuRender(props, React.createElement(SiderMenu, Object.assign({}, props)));
  }

  return React.createElement(SiderMenu, Object.assign({}, props));
};

var defaultPageTitleRender = function defaultPageTitleRender(pageProps, props) {
  var pageTitleRender = props.pageTitleRender;
  var pageTitleInfo = getPageTitleInfo(pageProps);

  if (pageTitleRender === false) {
    return {
      title: props.title || '',
      id: '',
      pageName: ''
    };
  }

  if (pageTitleRender) {
    var title = pageTitleRender(pageProps, pageTitleInfo.title, pageTitleInfo);

    if (typeof title === 'string') {
      return Object.assign(Object.assign({}, pageTitleInfo), {
        title: title
      });
    }

    warning(typeof title === 'string', 'pro-layout: renderPageTitle return value should be a string');
  }

  return pageTitleInfo;
};

var getPaddingLeft = function getPaddingLeft(hasLeftPadding, collapsed, siderWidth) {
  if (hasLeftPadding) {
    return collapsed ? 48 : siderWidth;
  }

  return 0;
};
/**
 * 🌃 Powerful and easy to use beautiful layout
 * 🏄‍ Support multiple topics and layout types
 * @param props
 */


var BasicLayout = function BasicLayout(props) {
  var _classNames, _classNames2;

  var children = props.children,
      propsOnCollapse = props.onCollapse,
      _props$location = props.location,
      location = _props$location === void 0 ? {
    pathname: '/'
  } : _props$location,
      fixSiderbar = props.fixSiderbar,
      navTheme = props.navTheme,
      contentStyle = props.contentStyle,
      _props$route = props.route,
      route = _props$route === void 0 ? {
    routes: []
  } : _props$route,
      defaultPropsLayout = props.layout,
      style = props.style,
      disableContentMargin = props.disableContentMargin,
      _props$siderWidth = props.siderWidth,
      siderWidth = _props$siderWidth === void 0 ? 208 : _props$siderWidth,
      menu = props.menu,
      propsIsChildrenLayout = props.isChildrenLayout,
      menuDataRender = props.menuDataRender,
      loading = props.loading,
      rest = __rest(props, ["children", "onCollapse", "location", "fixSiderbar", "navTheme", "contentStyle", "route", "layout", "style", "disableContentMargin", "siderWidth", "menu", "isChildrenLayout", "menuDataRender", "loading"]);

  var propsLayout = compatibleLayout(defaultPropsLayout);
  var prefixCls = rest.prefixCls;

  var formatMessage = function formatMessage(_a) {
    var id = _a.id,
        defaultMessage = _a.defaultMessage,
        restParams = __rest(_a, ["id", "defaultMessage"]);

    if (props.formatMessage) {
      return props.formatMessage(Object.assign({
        id: id,
        defaultMessage: defaultMessage
      }, restParams));
    }

    var locales = getLocales();

    if (locales[id]) {
      return locales[id];
    }

    if (defaultMessage) {
      return defaultMessage;
    }

    return id;
  };

  var colSize = useAntdMediaQuery();
  var _route$routes = route.routes,
      routes = _route$routes === void 0 ? [] : _route$routes;

  var _useMergeValue = useMergeValue(function () {
    return getMenuData(routes, menu, formatMessage, menuDataRender);
  }),
      _useMergeValue2 = _slicedToArray(_useMergeValue, 2),
      menuInfoData = _useMergeValue2[0],
      setMenuInfoData = _useMergeValue2[1];

  var renderMenuInfoData = {}; // 如果menuDataRender 存在，就应该每次都render一下，不然无法保证数据的同步

  if (menuDataRender) {
    renderMenuInfoData = getMenuData(routes, menu, formatMessage, menuDataRender);
  }

  var isMobile = (colSize === 'sm' || colSize === 'xs') && !props.disableMobile;

  var _ref = !menuDataRender ? menuInfoData : renderMenuInfoData,
      _ref$breadcrumb = _ref.breadcrumb,
      breadcrumb = _ref$breadcrumb === void 0 ? {} : _ref$breadcrumb,
      breadcrumbMap = _ref.breadcrumbMap,
      _ref$menuData = _ref.menuData,
      menuData = _ref$menuData === void 0 ? [] : _ref$menuData;
  /**
   *  如果 menuRender 不存在，可以做一下性能优化
   *  只要 routers 没有更新就不需要重新计算
   */


  useDeepCompareEffect(function () {
    if (!menuDataRender) {
      var infoData = getMenuData(routes, menu, formatMessage, menuDataRender); // 稍微慢一点 render，不然会造成性能问题，看起来像是菜单的卡顿

      var animationFrameId = requestAnimationFrame(function () {
        setMenuInfoData(infoData);
      });
      return function () {
        return window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
      };
    }

    return function () {
      return null;
    };
  }, [props.route, stringify(menu)]); // If it is a fix menu, calculate padding
  // don't need padding in phone mode

  var hasLeftPadding = propsLayout !== 'top' && !isMobile;

  var _useMergeValue3 = useMergeValue(false, {
    value: props.collapsed,
    onChange: propsOnCollapse
  }),
      _useMergeValue4 = _slicedToArray(_useMergeValue3, 2),
      collapsed = _useMergeValue4[0],
      onCollapse = _useMergeValue4[1]; // Splicing parameters, adding menuData and formatMessage in props


  var defaultProps = Omit(Object.assign(Object.assign({}, props), {
    formatMessage: formatMessage,
    breadcrumb: breadcrumb,
    layout: compatibleLayout(props.layout)
  }), ['className', 'style']); // gen page title

  var pageTitleInfo = defaultPageTitleRender(Object.assign(Object.assign({
    pathname: location.pathname
  }, defaultProps), {
    breadcrumbMap: breadcrumbMap
  }), props); // gen breadcrumbProps, parameter for pageHeader

  var breadcrumbProps = getBreadcrumbProps(Object.assign(Object.assign({}, defaultProps), {
    breadcrumbMap: breadcrumbMap
  })); // render sider dom

  var siderMenuDom = renderSiderMenu(Object.assign(Object.assign({}, defaultProps), {
    menuData: menuData,
    onCollapse: onCollapse,
    isMobile: isMobile,
    theme: (navTheme || 'dark').toLocaleLowerCase().includes('dark') ? 'dark' : 'light',
    collapsed: collapsed
  })); // render header dom

  var headerDom = headerRender(Object.assign(Object.assign({}, defaultProps), {
    hasSiderMenu: !!siderMenuDom,
    menuData: menuData,
    isMobile: isMobile,
    collapsed: collapsed,
    onCollapse: onCollapse,
    theme: (navTheme || 'dark').toLocaleLowerCase().includes('dark') ? 'dark' : 'light'
  })); // render footer dom

  var footerDom = footerRender(Object.assign({
    isMobile: isMobile,
    collapsed: collapsed
  }, defaultProps));

  var _useContext = useContext(RouteContext),
      contextIsChildrenLayout = _useContext.isChildrenLayout; // 如果 props 中定义，以 props 为准


  var isChildrenLayout = propsIsChildrenLayout !== undefined ? propsIsChildrenLayout : contextIsChildrenLayout;
  var baseClassName = "".concat(prefixCls, "-basicLayout"); // gen className

  var className = classNames(props.className, 'ant-design-pro', baseClassName, (_classNames = {}, _defineProperty(_classNames, "screen-".concat(colSize), colSize), _defineProperty(_classNames, "".concat(baseClassName, "-top-menu"), propsLayout === 'top'), _defineProperty(_classNames, "".concat(baseClassName, "-is-children"), isChildrenLayout), _defineProperty(_classNames, "".concat(baseClassName, "-fix-siderbar"), fixSiderbar), _defineProperty(_classNames, "".concat(baseClassName, "-mobile"), isMobile), _classNames));
  /**
   * 计算 slider 的宽度
   */

  var leftSiderWidth = getPaddingLeft(!!hasLeftPadding, collapsed, siderWidth); // siderMenuDom 为空的时候，不需要 padding

  var genLayoutStyle = {
    position: 'relative'
  }; // if is some layout children，don't need min height

  if (isChildrenLayout || contentStyle && contentStyle.minHeight) {
    genLayoutStyle.minHeight = 0;
  }

  var contentClassName = classNames("".concat(baseClassName, "-content"), (_classNames2 = {}, _defineProperty(_classNames2, "".concat(baseClassName, "-has-header"), headerDom), _defineProperty(_classNames2, "".concat(baseClassName, "-content-disable-margin"), disableContentMargin), _classNames2));
  /**
   * 页面切换的时候触发
   */

  useEffect(function () {
    var onPageChange = props.onPageChange;

    if (onPageChange) {
      onPageChange(props.location);
    }
  }, [stringify(props.location)]);
  useDocumentTitle(pageTitleInfo, props.title);
  return React.createElement(MenuCounter.Provider, null, React.createElement(RouteContext.Provider, {
    value: Object.assign(Object.assign({}, defaultProps), {
      breadcrumb: breadcrumbProps,
      menuData: menuData,
      isMobile: isMobile,
      collapsed: collapsed,
      isChildrenLayout: true,
      title: pageTitleInfo.pageName,
      hasSiderMenu: !!siderMenuDom,
      hasHeader: !!headerDom,
      siderWidth: leftSiderWidth,
      pageTitleInfo: pageTitleInfo
    })
  }, React.createElement("div", {
    className: className
  }, React.createElement(_Layout, {
    style: Object.assign({
      minHeight: '100%'
    }, style),
    hasSider: true
  }, siderMenuDom, React.createElement(_Layout, {
    style: genLayoutStyle
  }, headerDom, React.createElement(WrapContent, Object.assign({
    isChildrenLayout: isChildrenLayout
  }, rest, {
    className: contentClassName,
    style: contentStyle
  }), loading ? React.createElement(PageLoading, null) : children), footerDom)))));
};

BasicLayout.defaultProps = Object.assign(Object.assign({
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg'
}, defaultSettings), {
  prefixCls: 'ant-pro',
  siderWidth: 208,
  location: isBrowser() ? window.location : undefined
});
export default BasicLayout;