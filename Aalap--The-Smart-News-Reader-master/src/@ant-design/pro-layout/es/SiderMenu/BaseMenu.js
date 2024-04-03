import "antd/es/menu/style";
import _Menu from "antd/es/menu";

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

import './index.less';
import Icon, { createFromIconfontCN } from '@ant-design/icons';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import classNames from 'classnames';
import useMergeValue from 'use-merge-value';
import defaultSettings from '../defaultSettings';
import { getSelectedMenuKeys } from './SiderMenuUtils';
import { isUrl, getOpenKeysFromMenuData } from '../utils/utils';
import MenuCounter from './Counter';
var SubMenu = _Menu.SubMenu;
var IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl
}); // Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,

var getIcon = function getIcon(icon) {
  if (typeof icon === 'string' && icon !== '') {
    if (isUrl(icon)) {
      return React.createElement(Icon, {
        component: function component() {
          return React.createElement("img", {
            src: icon,
            alt: "icon",
            className: "ant-pro-sider-menu-icon"
          });
        }
      });
    }

    if (icon.startsWith('icon-')) {
      return React.createElement(IconFont, {
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

      var defaultTitle = item.icon ? React.createElement("span", null, !isChildren && getIcon(item.icon), React.createElement("span", null, name)) : name; // subMenu only title render

      var title = subMenuItemRender ? subMenuItemRender(Object.assign(Object.assign({}, item), {
        isUrl: false
      }), defaultTitle) : defaultTitle;
      return React.createElement(SubMenu, {
        title: title,
        key: item.key || item.path,
        onTitleClick: item.onTitleClick
      }, _this.getNavMenuItems(item.children, true));
    }

    return React.createElement(_Menu.Item, {
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
    var defaultItem = React.createElement(React.Fragment, null, icon, React.createElement("span", {
      className: "antd-menu-item-title"
    }, name));
    var isHttpUrl = isUrl(itemPath); // Is it a http link

    if (isHttpUrl) {
      defaultItem = React.createElement("a", {
        href: itemPath,
        target: target
      }, icon, React.createElement("span", null, name));
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
  var openKeysRef = useRef([]); // 用于减少 defaultOpenKeys 计算的组件

  var defaultOpenKeysRef = useRef([]);

  var _useState = useState(function () {
    return menuData;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      postMenuData = _useState2[0],
      setPostMenuData = _useState2[1];

  var pathname = location.pathname;

  var _MenuCounter$useConta = MenuCounter.useContainer(),
      flatMenuKeys = _MenuCounter$useConta.flatMenuKeys;

  var _useState3 = useState(menu.defaultOpenAll),
      _useState4 = _slicedToArray(_useState3, 2),
      defaultOpenAll = _useState4[0],
      setDefaultOpenAll = _useState4[1];

  var _useMergeValue = useMergeValue(function () {
    if (menu.defaultOpenAll) {
      return getOpenKeysFromMenuData(menuData) || [];
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

  var _useMergeValue3 = useMergeValue([], {
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

  useEffect(function () {
    if (menu.defaultOpenAll || propsOpenKeys === false || flatMenuKeys.length) {
      return;
    }

    var keys = getSelectedMenuKeys(location.pathname || '/', menuData || []);

    if (keys) {
      openKeysRef.current = keys;
      setOpenKeys(keys);
      setSelectedKeys(keys);
    }
  }, [flatMenuKeys.join('-')]);
  useEffect(function () {
    // reset IconFont
    if (iconfontUrl) {
      IconFont = createFromIconfontCN({
        scriptUrl: iconfontUrl
      });
    }
  }, [iconfontUrl]);
  useEffect(function () {
    // if pathname can't match, use the nearest parent's key
    var keys = getSelectedMenuKeys(location.pathname || '/', menuData || []);
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
  var openKeysProps = useMemo(function () {
    return getOpenKeysProps(openKeys, props);
  }, [openKeys, props.layout, props.collapsed]);
  var cls = classNames(className, {
    'top-nav-menu': mode === 'horizontal'
  });

  var _useState5 = useState(function () {
    return new MenuUtil(props);
  }),
      _useState6 = _slicedToArray(_useState5, 1),
      menuUtils = _useState6[0];

  useEffect(function () {
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
    var keys = getSelectedMenuKeys(location.pathname || '/', menuData || []);
    defaultOpenKeysRef.current = keys;

    if (keys.length < 1) {
      return null;
    }
  }

  return React.createElement(_Menu, Object.assign({}, openKeysProps, {
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
export default BaseMenu;