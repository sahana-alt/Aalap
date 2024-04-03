"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultRenderCollapsedButton = exports.defaultRenderLogoAndTitle = exports.defaultRenderLogo = void 0;

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

require("antd/lib/layout/style");

var _layout = _interopRequireDefault(require("antd/lib/layout"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@ant-design/icons");

require("./index.less");

var _BaseMenu = _interopRequireDefault(require("./BaseMenu"));

var _Counter = _interopRequireDefault(require("./Counter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Sider = _layout.default.Sider;

var defaultRenderLogo = function defaultRenderLogo(logo) {
  if (typeof logo === 'string') {
    return _react.default.createElement("img", {
      src: logo,
      alt: "logo"
    });
  }

  if (typeof logo === 'function') {
    return logo();
  }

  return logo;
};

exports.defaultRenderLogo = defaultRenderLogo;

var defaultRenderLogoAndTitle = function defaultRenderLogoAndTitle(props) {
  var renderKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'menuHeaderRender';
  var _props$logo = props.logo,
      logo = _props$logo === void 0 ? 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg' : _props$logo,
      title = props.title,
      layout = props.layout;
  var renderFunction = props[renderKey || ''];

  if (renderFunction === false) {
    return null;
  }

  var logoDom = defaultRenderLogo(logo);

  var titleDom = _react.default.createElement("h1", null, title);

  if (renderFunction) {
    // when collapsed, no render title
    return renderFunction(logoDom, props.collapsed ? null : titleDom, props);
  }

  if (layout === 'mix' && renderKey === 'menuHeaderRender') {
    return null;
  }

  return _react.default.createElement("a", null, logoDom, props.collapsed ? null : titleDom);
};

exports.defaultRenderLogoAndTitle = defaultRenderLogoAndTitle;

var defaultRenderCollapsedButton = function defaultRenderCollapsedButton(collapsed) {
  return collapsed ? _react.default.createElement(_icons.MenuUnfoldOutlined, null) : _react.default.createElement(_icons.MenuFoldOutlined, null);
};

exports.defaultRenderCollapsedButton = defaultRenderCollapsedButton;

var SiderMenu = function SiderMenu(props) {
  var _classNames;

  var collapsed = props.collapsed,
      fixSiderbar = props.fixSiderbar,
      _onCollapse = props.onCollapse,
      theme = props.theme,
      _props$siderWidth = props.siderWidth,
      siderWidth = _props$siderWidth === void 0 ? 208 : _props$siderWidth,
      isMobile = props.isMobile,
      onMenuHeaderClick = props.onMenuHeaderClick,
      _props$breakpoint = props.breakpoint,
      breakpoint = _props$breakpoint === void 0 ? 'lg' : _props$breakpoint,
      style = props.style,
      layout = props.layout,
      _props$menuExtraRende = props.menuExtraRender,
      menuExtraRender = _props$menuExtraRende === void 0 ? false : _props$menuExtraRende,
      _props$collapsedButto = props.collapsedButtonRender,
      collapsedButtonRender = _props$collapsedButto === void 0 ? defaultRenderCollapsedButton : _props$collapsedButto,
      links = props.links,
      menuContentRender = props.menuContentRender,
      _props$prefixCls = props.prefixCls,
      prefixCls = _props$prefixCls === void 0 ? 'ant-pro' : _props$prefixCls,
      onOpenChange = props.onOpenChange;
  var baseClassName = "".concat(prefixCls, "-sider");

  var _MenuCounter$useConta = _Counter.default.useContainer(),
      flatMenuKeys = _MenuCounter$useConta.flatMenuKeys;

  var siderClassName = (0, _classnames.default)("".concat(baseClassName), (_classNames = {}, _defineProperty(_classNames, "".concat(baseClassName, "-fixed"), fixSiderbar), _defineProperty(_classNames, "".concat(baseClassName, "-layout-").concat(layout), layout && !isMobile), _defineProperty(_classNames, "".concat(baseClassName, "-light"), theme === 'light'), _classNames));
  var headerDom = defaultRenderLogoAndTitle(props);
  var extraDom = menuExtraRender && menuExtraRender(props);

  var menuDom = flatMenuKeys && _react.default.createElement(_BaseMenu.default, Object.assign({}, props, {
    mode: "inline",
    handleOpenChange: onOpenChange,
    style: {
      width: '100%'
    },
    className: "".concat(baseClassName, "-menu")
  }));

  return _react.default.createElement(_react.default.Fragment, null, fixSiderbar && _react.default.createElement("div", {
    style: Object.assign({
      width: collapsed ? 48 : siderWidth,
      overflow: 'hidden'
    }, style)
  }), _react.default.createElement(Sider, {
    collapsible: true,
    trigger: null,
    collapsed: collapsed,
    breakpoint: breakpoint === false ? undefined : breakpoint,
    onCollapse: function onCollapse(collapse) {
      if (!isMobile) {
        if (_onCollapse) {
          _onCollapse(collapse);
        }
      }
    },
    collapsedWidth: 48,
    style: Object.assign({
      overflow: 'hidden'
    }, style),
    width: siderWidth,
    theme: theme,
    className: siderClassName
  }, headerDom && _react.default.createElement("div", {
    className: "".concat(baseClassName, "-logo"),
    onClick: onMenuHeaderClick,
    id: "logo"
  }, headerDom), extraDom && _react.default.createElement("div", {
    className: "".concat(baseClassName, "-extra ").concat(!headerDom && "".concat(baseClassName, "-extra-no-logo"))
  }, extraDom), _react.default.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden'
    }
  }, menuContentRender ? menuContentRender(props, menuDom) : menuDom), _react.default.createElement("div", {
    className: "".concat(baseClassName, "-links")
  }, _react.default.createElement(_menu.default, {
    theme: theme,
    inlineIndent: 16,
    className: "".concat(baseClassName, "-link-menu"),
    selectedKeys: [],
    openKeys: [],
    mode: "inline"
  }, (links || []).map(function (node, index) {
    return (// eslint-disable-next-line react/no-array-index-key
      _react.default.createElement(_menu.default.Item, {
        className: "".concat(baseClassName, "-link"),
        key: index
      }, node)
    );
  }), collapsedButtonRender && !isMobile && _react.default.createElement(_menu.default.Item, {
    className: "".concat(baseClassName, "-collapsed-button"),
    title: false,
    onClick: function onClick() {
      if (_onCollapse) {
        _onCollapse(!collapsed);
      }
    }
  }, collapsedButtonRender(collapsed))))));
};

var _default = SiderMenu;
exports.default = _default;