"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

//require("@antd/lib/layout/style");

var _layout = _interopRequireDefault(require("antd/lib/layout"));

//require("./BasicLayout.less");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _warning = _interopRequireDefault(require("warning"));

var _useMergeValue5 = _interopRequireDefault(require("use-merge-value"));

var _useJsonComparison = require("use-json-comparison");

var _useMediaAntdQuery = _interopRequireDefault(require("use-media-antd-query"));

var _omit = _interopRequireDefault(require("omit.js"));

var _Header = _interopRequireDefault(require("./Header"));

var _getPageTitle = require("./getPageTitle");

var _defaultSettings = _interopRequireDefault(require("./defaultSettings"));

var _locales = _interopRequireDefault(require("./locales"));

var _Footer = _interopRequireDefault(require("./Footer"));

var _RouteContext = _interopRequireDefault(require("./RouteContext"));

var _SiderMenu = _interopRequireDefault(require("./SiderMenu"));

var _getBreadcrumbProps = require("./utils/getBreadcrumbProps");

var _getMenuData = _interopRequireDefault(require("./utils/getMenuData"));

var _utils = require("./utils/utils");

var _PageLoading = _interopRequireDefault(require("./PageLoading"));

var _Counter = _interopRequireDefault(require("./SiderMenu/Counter"));

var _WrapContent = _interopRequireDefault(require("./WrapContent"));

var _hooks = require("./utils/hooks");

var _compatibleLayout = _interopRequireDefault(require("./utils/compatibleLayout"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var headerRender = function headerRender(props) {
  if (props.headerRender === false || props.pure) {
    return null;
  }

  return _react.default.createElement(_Header.default, Object.assign({}, props));
};

var footerRender = function footerRender(props) {
  if (props.footerRender === false || props.pure) {
    return null;
  }

  if (props.footerRender) {
    return props.footerRender(Object.assign({}, props), _react.default.createElement(_Footer.default, null));
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
    return _react.default.createElement(_SiderMenu.default, Object.assign({}, props, {
      hide: true
    }));
  }

  if (menuRender) {
    return menuRender(props, _react.default.createElement(_SiderMenu.default, Object.assign({}, props)));
  }

  return _react.default.createElement(_SiderMenu.default, Object.assign({}, props));
};

var defaultPageTitleRender = function defaultPageTitleRender(pageProps, props) {
  var pageTitleRender = props.pageTitleRender;
  var pageTitleInfo = (0, _getPageTitle.getPageTitleInfo)(pageProps);

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

    (0, _warning.default)(typeof title === 'string', 'pro-layout: renderPageTitle return value should be a string');
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

  var propsLayout = (0, _compatibleLayout.default)(defaultPropsLayout);
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

    var locales = (0, _locales.default)();

    if (locales[id]) {
      return locales[id];
    }

    if (defaultMessage) {
      return defaultMessage;
    }

    return id;
  };

  var colSize = (0, _useMediaAntdQuery.default)();
  var _route$routes = route.routes,
      routes = _route$routes === void 0 ? [] : _route$routes;

  var _useMergeValue = (0, _useMergeValue5.default)(function () {
    return (0, _getMenuData.default)(routes, menu, formatMessage, menuDataRender);
  }),
      _useMergeValue2 = _slicedToArray(_useMergeValue, 2),
      menuInfoData = _useMergeValue2[0],
      setMenuInfoData = _useMergeValue2[1];

  var renderMenuInfoData = {}; // 如果menuDataRender 存在，就应该每次都render一下，不然无法保证数据的同步

  if (menuDataRender) {
    renderMenuInfoData = (0, _getMenuData.default)(routes, menu, formatMessage, menuDataRender);
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


  (0, _utils.useDeepCompareEffect)(function () {
    if (!menuDataRender) {
      var infoData = (0, _getMenuData.default)(routes, menu, formatMessage, menuDataRender); // 稍微慢一点 render，不然会造成性能问题，看起来像是菜单的卡顿

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
  }, [props.route, (0, _useJsonComparison.stringify)(menu)]); // If it is a fix menu, calculate padding
  // don't need padding in phone mode

  var hasLeftPadding = propsLayout !== 'top' && !isMobile;

  var _useMergeValue3 = (0, _useMergeValue5.default)(false, {
    value: props.collapsed,
    onChange: propsOnCollapse
  }),
      _useMergeValue4 = _slicedToArray(_useMergeValue3, 2),
      collapsed = _useMergeValue4[0],
      onCollapse = _useMergeValue4[1]; // Splicing parameters, adding menuData and formatMessage in props


  var defaultProps = (0, _omit.default)(Object.assign(Object.assign({}, props), {
    formatMessage: formatMessage,
    breadcrumb: breadcrumb,
    layout: (0, _compatibleLayout.default)(props.layout)
  }), ['className', 'style']); // gen page title

  var pageTitleInfo = defaultPageTitleRender(Object.assign(Object.assign({
    pathname: location.pathname
  }, defaultProps), {
    breadcrumbMap: breadcrumbMap
  }), props); // gen breadcrumbProps, parameter for pageHeader

  var breadcrumbProps = (0, _getBreadcrumbProps.getBreadcrumbProps)(Object.assign(Object.assign({}, defaultProps), {
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

  var _useContext = (0, _react.useContext)(_RouteContext.default),
      contextIsChildrenLayout = _useContext.isChildrenLayout; // 如果 props 中定义，以 props 为准


  var isChildrenLayout = propsIsChildrenLayout !== undefined ? propsIsChildrenLayout : contextIsChildrenLayout;
  var baseClassName = "".concat(prefixCls, "-basicLayout"); // gen className

  var className = (0, _classnames.default)(props.className, 'ant-design-pro', baseClassName, (_classNames = {}, _defineProperty(_classNames, "screen-".concat(colSize), colSize), _defineProperty(_classNames, "".concat(baseClassName, "-top-menu"), propsLayout === 'top'), _defineProperty(_classNames, "".concat(baseClassName, "-is-children"), isChildrenLayout), _defineProperty(_classNames, "".concat(baseClassName, "-fix-siderbar"), fixSiderbar), _defineProperty(_classNames, "".concat(baseClassName, "-mobile"), isMobile), _classNames));
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

  var contentClassName = (0, _classnames.default)("".concat(baseClassName, "-content"), (_classNames2 = {}, _defineProperty(_classNames2, "".concat(baseClassName, "-has-header"), headerDom), _defineProperty(_classNames2, "".concat(baseClassName, "-content-disable-margin"), disableContentMargin), _classNames2));
  /**
   * 页面切换的时候触发
   */

  (0, _react.useEffect)(function () {
    var onPageChange = props.onPageChange;

    if (onPageChange) {
      onPageChange(props.location);
    }
  }, [(0, _useJsonComparison.stringify)(props.location)]);
  (0, _hooks.useDocumentTitle)(pageTitleInfo, props.title);
  return _react.default.createElement(_Counter.default.Provider, null, _react.default.createElement(_RouteContext.default.Provider, {
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
  }, _react.default.createElement("div", {
    className: className
  }, _react.default.createElement(_layout.default, {
    style: Object.assign({
      minHeight: '100%'
    }, style),
    hasSider: true
  }, siderMenuDom, _react.default.createElement(_layout.default, {
    style: genLayoutStyle
  }, headerDom, _react.default.createElement(_WrapContent.default, Object.assign({
    isChildrenLayout: isChildrenLayout
  }, rest, {
    className: contentClassName,
    style: contentStyle
  }), loading ? _react.default.createElement(_PageLoading.default, null) : children), footerDom)))));
};

BasicLayout.defaultProps = Object.assign(Object.assign({
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg'
}, _defaultSettings.default), {
  prefixCls: 'ant-pro',
  siderWidth: 208,
  location: (0, _utils.isBrowser)() ? window.location : undefined
});
var _default = BasicLayout;
exports.default = _default;