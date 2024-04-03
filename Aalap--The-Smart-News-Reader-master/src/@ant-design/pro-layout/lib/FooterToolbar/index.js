"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/space/style");

var _space = _interopRequireDefault(require("antd/lib/space"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./index.less");

var _index2 = require("../index");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var FooterToolbar = function FooterToolbar(props) {
  var children = props.children,
      _props$prefixCls = props.prefixCls,
      prefixCls = _props$prefixCls === void 0 ? 'ant-pro' : _props$prefixCls,
      className = props.className,
      extra = props.extra,
      renderContent = props.renderContent,
      restProps = __rest(props, ["children", "prefixCls", "className", "extra", "renderContent"]);

  var baseClassName = "".concat(prefixCls, "-footer-bar");
  var value = (0, _react.useContext)(_index2.RouteContext);
  var width = (0, _react.useMemo)(function () {
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

  var dom = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "".concat(baseClassName, "-left")
  }, extra), _react.default.createElement("div", {
    className: "".concat(baseClassName, "-right")
  }, _react.default.createElement(_space.default, null, children)));

  return _react.default.createElement("div", Object.assign({
    className: (0, _classnames.default)(className, "".concat(baseClassName)),
    style: {
      width: width
    }
  }, restProps), renderContent ? renderContent(Object.assign(Object.assign(Object.assign({}, props), value), {
    leftWidth: width
  }), dom) : dom);
};

var _default = FooterToolbar;
exports.default = _default;