"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _rcTree = _interopRequireWildcard(require("rc-tree"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DirectoryTree = _interopRequireDefault(require("./DirectoryTree"));

var _configProvider = require("../config-provider");

var _motion = _interopRequireDefault(require("../_util/motion"));

var _iconUtil = _interopRequireDefault(require("./utils/iconUtil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Tree = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _classNames;

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction,
      virtual = _React$useContext.virtual;

  var customizePrefixCls = props.prefixCls,
      className = props.className,
      showIcon = props.showIcon,
      showLine = props.showLine,
      _switcherIcon = props.switcherIcon,
      blockNode = props.blockNode,
      children = props.children,
      checkable = props.checkable;

  var newProps = _extends(_extends({}, props), {
    showLine: Boolean(showLine)
  });

  var prefixCls = getPrefixCls('tree', customizePrefixCls);
  return /*#__PURE__*/React.createElement(_rcTree["default"], _extends({
    itemHeight: 20,
    ref: ref,
    virtual: virtual
  }, newProps, {
    prefixCls: prefixCls,
    className: (0, _classnames["default"])(className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-icon-hide"), !showIcon), _defineProperty(_classNames, "".concat(prefixCls, "-block-node"), blockNode), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames)),
    checkable: checkable ? /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-checkbox-inner")
    }) : checkable,
    switcherIcon: function switcherIcon(nodeProps) {
      return (0, _iconUtil["default"])(prefixCls, _switcherIcon, showLine, nodeProps);
    }
  }), children);
});
Tree.TreeNode = _rcTree.TreeNode;
Tree.DirectoryTree = _DirectoryTree["default"];
Tree.defaultProps = {
  checkable: false,
  showIcon: false,
  motion: _extends(_extends({}, _motion["default"]), {
    motionAppear: false
  }),
  blockNode: false
};
var _default = Tree;
exports["default"] = _default;