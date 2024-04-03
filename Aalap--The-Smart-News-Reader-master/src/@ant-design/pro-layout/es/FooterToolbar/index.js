import "antd/es/space/style";
import _Space from "antd/es/space";

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

import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import './index.less';
import { RouteContext } from '../index';

var FooterToolbar = function FooterToolbar(props) {
  var children = props.children,
      _props$prefixCls = props.prefixCls,
      prefixCls = _props$prefixCls === void 0 ? 'ant-pro' : _props$prefixCls,
      className = props.className,
      extra = props.extra,
      renderContent = props.renderContent,
      restProps = __rest(props, ["children", "prefixCls", "className", "extra", "renderContent"]);

  var baseClassName = "".concat(prefixCls, "-footer-bar");
  var value = useContext(RouteContext);
  var width = useMemo(function () {
    var hasSiderMenu = value.hasSiderMenu,
        isMobile = value.isMobile,
        siderWidth = value.siderWidth;

    if (!hasSiderMenu) {
      return undefined;
    } // 0 or undefined


    if (!siderWidth) {
      return '100%';
    }

    return isMobile ? '100%' : "calc(100% - ".concat(siderWidth, "px)");
  }, [value.collapsed, value.hasSiderMenu, value.isMobile, value.siderWidth]);
  var dom = React.createElement(React.Fragment, null, React.createElement("div", {
    className: "".concat(baseClassName, "-left")
  }, extra), React.createElement("div", {
    className: "".concat(baseClassName, "-right")
  }, React.createElement(_Space, null, children)));
  return React.createElement("div", Object.assign({
    className: classNames(className, "".concat(baseClassName)),
    style: {
      width: width
    }
  }, restProps), renderContent ? renderContent(Object.assign(Object.assign(Object.assign({}, props), value), {
    leftWidth: width
  }), dom) : dom);
};

export default FooterToolbar;