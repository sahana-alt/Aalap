export default
[
  {
    path: '/config',
    name: '配置中心',
    routes: [
      {
        path: 'product',
        name: '产品配置',
        indexRoute: {
          component: 'ConfigProduct/index',
        },
        routes: [
          {
            path: 'new',
            component: 'ConfigProduct/NewConfig',
          },
          {
            path: 'edit/:productKey',
            component: 'ConfigProduct/NewConfig',
          },
          {
            path: 'detail/:productKey',
            component: 'ConfigProduct/Detail',
          },
        ],
      },
      {
        path: 'productManage',
        name: '产品管理',
        indexRoute: {
          component: 'ConfigProductAll/index',
        },
        routes: [
          {
            path: 'detail/:productKey',
            component: 'ConfigProductAll/Detail',
          },
        ],
      },
      {
        path: 'template',
        name: '产品模板管理',
        indexRoute: {
          component: 'ConfigTemplate/index',
        },
        routes: [
          {
            path: 'new',
            component: 'ConfigTemplate/NewConfig',
          },
          {
            path: 'edit/:templateKey',
            component: 'ConfigTemplate/NewConfig',
          },
          {
            path: 'detail/:templateKey',
            component: 'ConfigTemplate/Detail',
          },
        ],
      },
      {
        path: 'configItem',
        name: '配置项模板管理',
        indexRoute: {
          component: 'ConfigItem/index',
        },
        routes: [
          {
            path: 'new',
            component: 'ConfigItem/NewConfig',
          },
          {
            path: 'edit/:productKey',
            component: 'ConfigItem/NewConfig',
          },
          {
            path: 'detail/:productKey',
            component: 'ConfigItem/Detail',
          },
        ],
      },
      {
        path: 'meta',
        name: '元数据管理',
        component: 'ConfigMeta',
      },
    ],
  },
  {
    path: 'asset',
    name: '资产',
    routes: [
      {
        path: 'query',
        name: '资产查询',
        component: 'Asset',
      },
      {
        path: 'collateral',
        name: '抵押查询',
        component: 'Collateral',
      },
    ],
  },
  {
    path: 'bill',
    name: '账单',
    routes: [
      {
        path: 'billNo',
        name: '账单编号',
        component: 'BillNo',
      },
      {
        path: 'bill',
        name: '账单查询',
        component: 'Bill',
      },
      {
        path: 'billItem',
        name: '账单条目',
        component: 'BillItem',
      },
    ],
  },
  {
    path: 'cif',
    name: 'CIF',
    routes: [
      {
        path: 'bankAccount',
        name: '绑卡信息',
        component: 'CifBankAccount',
      },
      {
        path: 'userGroup',
        name: '查询 Group',
        component: 'CifUserGroup',
      },
      {
        path: 'userId',
        name: '查询 ID',
        component: 'CifUserId',
      },
      {
        path: 'newInstitution',
        name: '新增机构',
        indexRoute: {
          component: 'CifNewInstitution/index',
        },
        routes: [
          {
            path: 'new',
            component: 'CifNewInstitution/ApplyNew',
          },
          {
            path: 'bind/:id',
            component: 'CifNewInstitution/BindAccount',
          },
        ],
      },
    ],
  },
  {
    path: 'tools',
    name: '小工具',
    routes: [
      {
        path: 'ttsql',
        name: 'MySQL转BlinkTT流表',
        component: 'ToolTT',
      },
    ],
  },
]
/*
[
  {
    path: '/home',
    name: '首页',
    locale: 'menu.home',
    children: [
      {
        path: '/home/overview',
        name: '概述',
        hideInMenu: true,
        locale: 'menu.home.overview',
        icon: 'icon-facebook'
      },
      {
        path: '/home/search',
        name: '搜索',
        hideInMenu: true,
        locale: 'menu.home.search',
      },
    ],
  },
  {
    path: '/data_hui',
    name: '汇总数据',
    locale: 'menu.data_hui',
    children: [
      {
        collapsed: true,
        menuName: '域买家维度交易',
        name: '域买家维度交易',
        children: [
          {
            id: 2,
            name: '_交易_买家_月表',
            path:
              '/data_hui?tableName=adm_rk_cr_tb_trd_byr_ms&tableSchema=alifin_odps_birisk',
          },
          {
            name: '_航旅交易_买家_日表',
            path:
              '/data_hui?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
          },
        ],
      },
      {
        name: '域买家维度交易2',
        path: '/',
        children: [
          {
            name: '_交易_买家_月表',
            path:
              '/data_hui?tableName=adm_rk_cr_tb_trd_byr_ms&tableSchema=alifin_odps_birisk',
          },
          {
            name: '_航旅交易_买家_日表',
            path:
              '/data_hui?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
          },
        ],
      },
      {
        name: '域买家维度交易3',
        path: '/',
        children: [
          {
            name: '_交易_买家_月表2',
            path:
              '/data_hui?tableName=adm_rk_cr_tb_trd_byr_ms&tableSchema=alifin_odps_birisk',
          },
          {
            name: '_航旅交易_买家_日表3',
            path:
              '/data_hui?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
          },
        ],
      },
    ],
  },
  {
    path: '/data_ming',
    name: '明细数据',
    locale: 'menu.data_ming',
    children: [
      {
        path: '/other/outLoadMenu',
        name: '菜单导出',
        locale: 'menu.other.outLoadMenu',
        hideInMenu: true,
      },
      {
        path: '/other/homeEdit',
        name: '概述导出',
        locale: 'menu.other.outHomeEdit',
      },
    ],
  },
  {
    path: '/other',
    name: '其他',
    locale: 'menu.other',
    children: [
      {
        path: '/other/upLoad',
        name: 'odps同步导入',
        locale: 'menu.other.upLoad',
      },
      {
        path: '/other/upLoadMenu',
        name: '菜单导入',
        locale: 'menu.other.upLoadMenu',
      },
      {
        path: '/other/homeEdit',
        name: '概述编辑',
        locale: 'menu.other.homeEdit',
        hideInMenu: true,
      },
    ],
  },
];*/
