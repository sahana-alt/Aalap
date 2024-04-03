import "antd/es/menu/style";
import _Menu from "antd/es/menu";
import "antd/es/layout/style";
import _Layout from "antd/es/layout";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import classNames from 'classnames';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './index.less';
import BaseMenu from './BaseMenu';
import MenuCounter from './Counter';
var Sider = _Layout.Sider;
export var defaultRenderLogo = function defaultRenderLogo(logo) {
  if (typeof logo === 'string') {
    return React.createElement("img", {
      src: logo,
      alt: "logo"
    });
  }

  if (typeof logo === 'function') {
    return logo();
  }

  return logo;
};
export var defaultRenderLogoAndTitle = function defaultRenderLogoAndTitle(props) {
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
  var titleDom = React.createElement("h1", null, title);

  if (renderFunction) {
    // when collapsed, no render title
    return renderFunction(logoDom, props.collapsed ? null : titleDom, props);
  }

  if (layout === 'mix' && renderKey === 'menuHeaderRender') {
    return null;
  }

  return React.createElement("a", null, logoDom, props.collapsed ? null : titleDom);
};
export var defaultRenderCollapsedButton = function defaultRenderCollapsedButton(collapsed) {
  return collapsed ? React.createElement(MenuUnfoldOutlined, null) : React.createElement(MenuFoldOutlined, null);
};

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

  var _MenuCounter$useConta = MenuCounter.useContainer(),
      flatMenuKeys = _MenuCounter$useConta.flatMenuKeys;

  var siderClassName = classNames("".concat(baseClassName), (_classNames = {}, _defineProperty(_classNames, "".concat(baseClassName, "-fixed"), fixSiderbar), _defineProperty(_classNames, "".concat(baseClassName, "-layout-").concat(layout), layout && !isMobile), _defineProperty(_classNames, "".concat(baseClassName, "-light"), theme === 'light'), _classNames));
  var headerDom = defaultRenderLogoAndTitle(props);
  var extraDom = menuExtraRender && menuExtraRender(props);
  var menuDom = flatMenuKeys && React.createElement(BaseMenu, Object.assign({}, props, {
    mode: "inline",
    handleOpenChange: onOpenChange,
    style: {
      width: '100%'
    },
    className: "".concat(baseClassName, "-menu")
  }));
  return React.createElement(React.Fragment, null, fixSiderbar && React.createElement("div", {
    style: Object.assign({
      width: collapsed ? 48 : siderWidth,
      overflow: 'hidden'
    }, style)
  }), React.createElement(Sider, {
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
  }, headerDom && React.createElement("div", {
    className: "".concat(baseClassName, "-logo"),
    onClick: onMenuHeaderClick,
    id: "logo"
  }, headerDom), extraDom && React.createElement("div", {
    className: "".concat(baseClassName, "-extra ").concat(!headerDom && "".concat(baseClassName, "-extra-no-logo"))
  }, extraDom), React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden'
    }
  }, menuContentRender ? menuContentRender(props, menuDom) : menuDom), React.createElement("div", {
    className: "".concat(baseClassName, "-links")
  }, React.createElement(_Menu, {
    theme: theme,
    inlineIndent: 16,
    className: "".concat(baseClassName, "-link-menu"),
    selectedKeys: [],
    openKeys: [],
    mode: "inline"
  }, (links || []).map(function (node, index) {
    return (// eslint-disable-next-line react/no-array-index-key
      React.createElement(_Menu.Item, {
        className: "".concat(baseClassName, "-link"),
        key: index
      }, node)
    );
  }), collapsedButtonRender && !isMobile && React.createElement(_Menu.Item, {
    className: "".concat(baseClassName, "-collapsed-button"),
    title: false,
    onClick: function onClick() {
      if (_onCollapse) {
        _onCollapse(!collapsed);
      }
    }
  }, collapsedButtonRender(collapsed))))));
};

export default SiderMenu;