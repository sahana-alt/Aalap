"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _FileUnknownFilled = _interopRequireDefault(require("@ant-design/icons-svg/lib/asn/FileUnknownFilled"));

var _AntdIcon = _interopRequireDefault(require("../components/AntdIcon"));

// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY
var FileUnknownFilled = function FileUnknownFilled(props, ref) {
  return React.createElement(_AntdIcon.default, Object.assign({}, props, {
    ref: ref,
    icon: _FileUnknownFilled.default
  }));
};

FileUnknownFilled.displayName = 'FileUnknownFilled';

var _default = React.forwardRef(FileUnknownFilled);

exports.default = _default;