const isBrowser = typeof window !== 'undefined';

import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import * as ROUTES from './config/routes';
import Routes from './routes';
var _ = require('underscore');
import Loadable from 'react-loadable';
import AppLayout from './containers/AppLayout';

class Routers extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.appStore;
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => {
              return <Redirect to={'/home'} />;
            }}
          />
          {_.map(Routes, (r, i) => {
            return <Route path={r.path} exact name="layout" component={AppLayout} />;
          })}

        </Switch>
      </div>
    );
  }
}

export default Routers;
