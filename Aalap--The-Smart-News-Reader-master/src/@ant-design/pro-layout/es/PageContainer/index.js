import "antd/es/page-header/style";
import _PageHeader from "antd/es/page-header";
import "antd/es/tabs/style";
import _Tabs from "antd/es/tabs";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

import React, { useContext } from 'react';
import classNames from 'classnames';
import './index.less';
import RouteContext from '../RouteContext';
import GridContent from '../GridContent';
import FooterToolbar from '../FooterToolbar';
/**
 * render Footer tabList
 * In order to be compatible with the old version of the PageHeader
 * basically all the functions are implemented.
 */

var renderFooter = function renderFooter(_ref) {
  var tabList = _ref.tabList,
      tabActiveKey = _ref.tabActiveKey,
      onTabChange = _ref.onTabChange,
      tabBarExtraContent = _ref.tabBarExtraContent,
      tabProps = _ref.tabProps,
      prefixedClassName = _ref.prefixedClassName;

  if (tabList && tabList.length) {
    return React.createElement(_Tabs, Object.assign({
      className: "".concat(prefixedClassName, "-tabs"),
      activeKey: tabActiveKey,
      onChange: function onChange(key) {
        if (onTabChange) {
          onTabChange(key);
        }
      },
      tabBarExtraContent: tabBarExtraContent
    }, tabProps), tabList.map(function (item, index) {
      return (// eslint-disable-next-line react/no-array-index-key
        React.createElement(_Tabs.TabPane, Object.assign({}, item, {
          tab: item.tab,
          key: item.key || index
        }))
      );
    }));
  }

  return null;
};

var renderPageHeader = function renderPageHeader(content, extraContent, prefixedClassName) {
  if (!content && !extraContent) {
    return null;
  }

  return React.createElement("div", {
    className: "".concat(prefixedClassName, "-detail")
  }, React.createElement("div", {
    className: "".concat(prefixedClassName, "-main")
  }, React.createElement("div", {
    className: "".concat(prefixedClassName, "-row")
  }, content && React.createElement("div", {
    className: "".concat(prefixedClassName, "-content")
  }, content), extraContent && React.createElement("div", {
    className: "".concat(prefixedClassName, "-extraContent")
  }, extraContent))));
};

var defaultPageHeaderRender = function defaultPageHeaderRender(props, value) {
  var title = props.title,
      content = props.content,
      subTitle = props.subTitle,
      pageHeaderRender = props.pageHeaderRender,
      extraContent = props.extraContent,
      style = props.style,
      prefixCls = props.prefixCls,
      restProps = __rest(props, ["title", "content", "subTitle", "pageHeaderRender", "extraContent", "style", "prefixCls"]);

  if (pageHeaderRender) {
    return pageHeaderRender(Object.assign(Object.assign({}, props), value));
  }

  var pageHeaderTitle = title;

  if (!title && title !== false) {
    pageHeaderTitle = value.title;
  }

  return React.createElement(_PageHeader, Object.assign({}, value, {
    title: pageHeaderTitle
  }, restProps, {
    footer: renderFooter(Object.assign(Object.assign({}, restProps), {
      prefixedClassName: value.prefixedClassName
    })),
    prefixCls: prefixCls
  }), renderPageHeader(content, extraContent, value.prefixedClassName));
};

var PageContainer = function PageContainer(props) {
  var children = props.children,
      style = props.style,
      footer = props.footer,
      ghost = props.ghost,
      _props$prefixCls = props.prefixCls,
      prefixCls = _props$prefixCls === void 0 ? 'ant-pro' : _props$prefixCls;
  var value = useContext(RouteContext);
  var prefixedClassName = "".concat(prefixCls, "-page-container");
  var className = classNames(prefixedClassName, props.className, _defineProperty({}, "".concat(prefixCls, "-page-container-ghost"), ghost));
  return React.createElement("div", {
    style: style,
    className: className
  }, React.createElement("div", {
    className: "".concat(prefixedClassName, "-warp")
  }, defaultPageHeaderRender(props, Object.assign(Object.assign({}, value), {
    prefixCls: undefined,
    prefixedClassName: prefixedClassName
  }))), React.createElement(GridContent, null, children ? React.createElement("div", null, React.createElement("div", {
    className: "".concat(prefixedClassName, "-children-content")
  }, children), footer && React.createElement("div", {
    style: {
      height: 48,
      marginTop: 24
    }
  })) : null), footer && React.createElement(FooterToolbar, null, footer));
};

export default PageContainer;