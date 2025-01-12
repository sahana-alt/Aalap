"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

require("./index.less");

var _icons = _interopRequireWildcard(require("@ant-design/icons"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _useMergeValue5 = _interopRequireDefault(require("use-merge-value"));

var _defaultSettings = _interopRequireDefault(require("../defaultSettings"));

var _SiderMenuUtils = require("./SiderMenuUtils");

var _utils = require("../utils/utils");

var _Counter = _interopRequireDefault(require("./Counter"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SubMenu = _menu.default.SubMenu;
var IconFont = (0, _icons.createFromIconfontCN)({
  scriptUrl: _defaultSettings.default.iconfontUrl
}); // Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,

var getIcon = function getIcon(icon) {
  if (typeof icon === 'string' && icon !== '') {
    if ((0, _utils.isUrl)(icon)) {
      return _react.default.createElement(_icons.default, {
        component: function component() {
          return _react.default.createElement("img", {
            src: icon,
            alt: "icon",
            className: "ant-pro-sider-menu-icon"
          });
        }
      });
    }

    if (icon.startsWith('icon-')) {
      return _react.default.createElement(IconFont, {
        type: icon
      });
    }
  }

  return icon;
};

var MenuUtil = function MenuUtil(props) {
  var _this = this;

  _classCallCheck(this, MenuUtil);

  this.getNavMenuItems = function () {
    var menusData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var isChildren = arguments.length > 1 ? arguments[1] : undefined;
    return menusData.filter(function (item) {
      return item.name && !item.hideInMenu;
    }).map(function (item) {
      return _this.getSubMenuOrItem(item, isChildren);
    }).filter(function (item) {
      return item;
    });
  };
  /**
   * get SubMenu or Item
   */


  this.getSubMenuOrItem = function (item, isChildren) {
    if (Array.isArray(item.children) && !item.hideChildrenInMenu && item.children.some(function (child) {
      return child && !!child.name && !child.hideInMenu;
    })) {
      var name = _this.getIntlName(item);

      var subMenuItemRender = _this.props.subMenuItemRender; //  get defaultTitle by menuItemRender

      var defaultTitle = item.icon ? _react.default.createElement("span", null, !isChildren && getIcon(item.icon), _react.default.createElement("span", null, name)) : name; // subMenu only title render

      var title = subMenuItemRender ? subMenuItemRender(Object.assign(Object.assign({}, item), {
        isUrl: false
      }), defaultTitle) : defaultTitle;
      return _react.default.createElement(SubMenu, {
        title: title,
        key: item.key || item.path,
        onTitleClick: item.onTitleClick
      }, _this.getNavMenuItems(item.children, true));
    }

    return _react.default.createElement(_menu.default.Item, {
      key: item.key || item.path
    }, _this.getMenuItemPath(item, isChildren));
  };

  this.getIntlName = function (item) {
    var name = item.name,
        locale = item.locale;
    var _this$props = _this.props,
        _this$props$menu = _this$props.menu,
        menu = _this$props$menu === void 0 ? {
      locale: false
    } : _this$props$menu,
        formatMessage = _this$props.formatMessage;

    if (locale && menu.locale !== false && formatMessage) {
      return formatMessage({
        id: locale,
        defaultMessage: name
      });
    }

    return name;
  };
  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */


  this.getMenuItemPath = function (item, isChildren) {
    var itemPath = _this.conversionPath(item.path || '/');

    var _this$props2 = _this.props,
        _this$props2$location = _this$props2.location,
        location = _this$props2$location === void 0 ? {
      pathname: '/'
    } : _this$props2$location,
        isMobile = _this$props2.isMobile,
        onCollapse = _this$props2.onCollapse,
        menuItemRender = _this$props2.menuItemRender;
    var target = item.target; // if local is true formatMessage all name。

    var name = _this.getIntlName(item);

    var icon = isChildren ? null : getIcon(item.icon);

    var defaultItem = _react.default.createElement(_react.default.Fragment, null, icon, _react.default.createElement("span", {
      className: "antd-menu-item-title"
    }, name));

    var isHttpUrl = (0, _utils.isUrl)(itemPath); // Is it a http link

    if (isHttpUrl) {
      defaultItem = _react.default.createElement("a", {
        href: itemPath,
        target: target
      }, icon, _react.default.createElement("span", null, name));
    }

    if (menuItemRender) {
      return menuItemRender(Object.assign(Object.assign({}, item), {
        isUrl: isHttpUrl,
        itemPath: itemPath,
        isMobile: isMobile,
        replace: itemPath === location.pathname,
        onClick: function onClick() {
          return onCollapse && onCollapse(true);
        }
      }), defaultItem);
    }

    return defaultItem;
  };

  this.conversionPath = function (path) {
    if (path && path.indexOf('http') === 0) {
      return path;
    }

    return "/".concat(path || '').replace(/\/+/g, '/');
  };

  this.props = props;
};
/**
 * 生成openKeys 的对象，因为设置了openKeys 就会变成受控，所以需要一个空对象
 * @param BaseMenuProps
 */


var getOpenKeysProps = function getOpenKeysProps() {
  var openKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      layout = _ref.layout,
      collapsed = _ref.collapsed;

  var openKeysProps = {};

  if (openKeys && !collapsed && ['side', 'mix'].includes(layout || 'mix')) {
    openKeysProps = {
      openKeys: openKeys
    };
  }

  return openKeysProps;
};

var BaseMenu = function BaseMenu(props) {
  var theme = props.theme,
      mode = props.mode,
      _props$location = props.location,
      location = _props$location === void 0 ? {
    pathname: '/'
  } : _props$location,
      className = props.className,
      handleOpenChange = props.handleOpenChange,
      style = props.style,
      menuData = props.menuData,
      _props$menu = props.menu,
      menu = _props$menu === void 0 ? {
    locale: true
  } : _props$menu,
      iconfontUrl = props.iconfontUrl,
      splitMenus = props.splitMenus,
      propsSelectedKeys = props.selectedKeys,
      onSelect = props.onSelect,
      propsOpenKeys = props.openKeys;
  var openKeysRef = (0, _react.useRef)([]); // 用于减少 defaultOpenKeys 计算的组件

  var defaultOpenKeysRef = (0, _react.useRef)([]);

  var _useState = (0, _react.useState)(function () {
    return menuData;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      postMenuData = _useState2[0],
      setPostMenuData = _useState2[1];

  var pathname = location.pathname;

  var _MenuCounter$useConta = _Counter.default.useContainer(),
      flatMenuKeys = _MenuCounter$useConta.flatMenuKeys;

  var _useState3 = (0, _react.useState)(menu.defaultOpenAll),
      _useState4 = _slicedToArray(_useState3, 2),
      defaultOpenAll = _useState4[0],
      setDefaultOpenAll = _useState4[1];

  var _useMergeValue = (0, _useMergeValue5.default)(function () {
    if (menu.defaultOpenAll) {
      return (0, _utils.getOpenKeysFromMenuData)(menuData) || [];
    }

    if (propsOpenKeys === false) {
      return false;
    }

    return [];
  }, {
    value: propsOpenKeys === false ? undefined : propsOpenKeys,
    onChange: handleOpenChange
  }),
      _useMergeValue2 = _slicedToArray(_useMergeValue, 2),
      openKeys = _useMergeValue2[0],
      setOpenKeys = _useMergeValue2[1];

  var _useMergeValue3 = (0, _useMergeValue5.default)([], {
    value: propsSelectedKeys,
    onChange: onSelect ? function (keys) {
      if (onSelect && keys) {
        onSelect(keys);
      }
    } : undefined
  }),
      _useMergeValue4 = _slicedToArray(_useMergeValue3, 2),
      selectedKeys = _useMergeValue4[0],
      setSelectedKeys = _useMergeValue4[1];

  (0, _react.useEffect)(function () {
    if (menu.defaultOpenAll || propsOpenKeys === false || flatMenuKeys.length) {
      return;
    }

    var keys = (0, _SiderMenuUtils.getSelectedMenuKeys)(location.pathname || '/', menuData || []);

    if (keys) {
      openKeysRef.current = keys;
      setOpenKeys(keys);
      setSelectedKeys(keys);
    }
  }, [flatMenuKeys.join('-')]);
  (0, _react.useEffect)(function () {
    // reset IconFont
    if (iconfontUrl) {
      IconFont = (0, _icons.createFromIconfontCN)({
        scriptUrl: iconfontUrl
      });
    }
  }, [iconfontUrl]);
  (0, _react.useEffect)(function () {
    // if pathname can't match, use the nearest parent's key
    var keys = (0, _SiderMenuUtils.getSelectedMenuKeys)(location.pathname || '/', menuData || []);
    var animationFrameId = requestAnimationFrame(function () {
      if (keys.join('-') !== (selectedKeys || []).join('-')) {
        setSelectedKeys(keys);
      }

      if (!defaultOpenAll && propsOpenKeys !== false && keys.join('-') !== (openKeysRef.current || []).join('-')) {
        setOpenKeys(keys);
        openKeysRef.current = keys;
      } else if (flatMenuKeys.length > 0) {
        setDefaultOpenAll(false);
      }
    });
    return function () {
      return window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
    };
  }, [pathname]);
  var openKeysProps = (0, _react.useMemo)(function () {
    return getOpenKeysProps(openKeys, props);
  }, [openKeys, props.layout, props.collapsed]);
  var cls = (0, _classnames.default)(className, {
    'top-nav-menu': mode === 'horizontal'
  });

  var _useState5 = (0, _react.useState)(function () {
    return new MenuUtil(props);
  }),
      _useState6 = _slicedToArray(_useState5, 1),
      menuUtils = _useState6[0];

  (0, _react.useEffect)(function () {
    var _a;

    if (splitMenus && openKeys) {
      var key = _toConsumableArray(openKeys).shift();

      if (key) {
        var postData = ((_a = menuData === null || menuData === void 0 ? void 0 : menuData.find(function (item) {
          return item.key === key;
        })) === null || _a === void 0 ? void 0 : _a.children) || [];
        setPostMenuData(postData);
        return;
      }
    }

    if (!splitMenus) {
      setPostMenuData(menuData);
    }
  }, [(openKeys || []).join('-'), splitMenus]); // 这次 openKeys === false 的时候的情况，这种情况下帮用户选中一次
  // 第二次以后不再关系，所以用了 defaultOpenKeys

  if (props.openKeys === false && !props.handleOpenChange) {
    var keys = (0, _SiderMenuUtils.getSelectedMenuKeys)(location.pathname || '/', menuData || []);
    defaultOpenKeysRef.current = keys;

    if (keys.length < 1) {
      return null;
    }
  }

  return _react.default.createElement(_menu.default, Object.assign({}, openKeysProps, {
    key: "Menu",
    mode: mode,
    defaultOpenKeys: defaultOpenKeysRef.current,
    theme: theme,
    inlineIndent: 16,
    selectedKeys: selectedKeys,
    style: style,
    className: cls,
    onOpenChange: setOpenKeys
  }, props.menuProps), menuUtils.getNavMenuItems(props.postMenuData ? props.postMenuData(postMenuData) : postMenuData, false));
};

BaseMenu.defaultProps = {
  postMenuData: function postMenuData(data) {
    return data || [];
  }
};
var _default = BaseMenu;
exports.default = _default;