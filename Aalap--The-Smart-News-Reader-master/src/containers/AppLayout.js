import React from 'react';
import Loadable from 'react-loadable';
import {Route, Switch, withRouter, Link} from 'react-router-dom';
import NotFound from '../containers/NotFound';
import { Button, Drawer } from '@antd';
import Routes from '../routes';

import {PageContainer, DefaultFooter, BasicLayout} from '../@ant-design/pro-layout/lib/index.js';
let ProLayout = BasicLayout;
import {Layout} from '@antd';
const {Header, Content, Sider} = Layout;
import { UserOutlined, TeamOutlined, PayCircleOutlined,HomeOutlined, FileUnknownOutlined, UserSwitchOutlined, PlusCircleOutlined, TableOutlined, QrcodeOutlined, CalendarOutlined } from '../@ant-design/icons/lib/icons';

const l = console.log;
var _ = require('underscore');

import complexMenu from './ComplexMenu';
import Breadcrumb from '../antd/es/breadcrumb/Breadcrumb';
import Space from '../antd/es/space';
import Spin from '../antd/es/spin';

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} Trawish`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true
      },
      {
        key: 'github',
        title: 'Githug',
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true
      }
    ]}
  />
);

const Loader = (
  <Space size="middle">
    <Spin size="large" />
  </Space>
);


const Home = Loadable({
  loader: () => import('@components/Home' /* webpackChunkName: 'ClientQueriesTable' */), // isBrowser ? import('@components/NewRoute' /* webpackChunkName: 'NewRoute' */) : import('@components/Dummy' /* webpackChunkName: 'Dummy' */) ,
  loading: () => Loader
});


@withRouter
class AppLayout extends React.Component {
  // static propTypes = {
  //   loading: PropTypes.bool.isRequired
  // };
  constructor(props) {
    super(props);
    this.store = this.props.appStore;
    this.state = {
      learnMoredialog: false,
      getStartedDialog: false,
      visible: false
    };

    Routes.map((r) => {
      switch (r.iconName) {
        case "HomeOutlined":
          r.icon = (<HomeOutlined />)
          break;
      }
    });
  }

  renderPage(pathname, compToRender) {
    return (
      <PageContainer>
        <Layout className="site-layout">
          <Content style={{ overflow: 'initial' }}>
            <div className="site-layout-background" >
              
              {/*`${pathname}`*/}

              {compToRender}
            </div>
          </Content>
        </Layout>
      </PageContainer>
    );
  }

  renderRouteContent = (pathname, match) => {
    let component; 
    l('\nthis.props.match.path0----->', this.props.match.path, pathname, match);
    switch (pathname) {
      case "/home":
        component = this.renderPage(pathname, <Home {...this.props} />)
        break;
      default:
        component = <div> Default </div>;
    }
    return component;
  };

  render() {
    return (
      <div>
          {this.renderRouteContent(this.props.match.path, this.props.match)}
      </div>
    );
  }
}

export default AppLayout;