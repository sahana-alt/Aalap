import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import Routers from './router';
import { withAuthentication } from './components/Session';
import ReactLoading from "react-loading";
global._ = require('underscore');
global._ = global._.mixin(require('./helpers/utility/mixins'));
global.l = console.log;
import styled from "styled-components";

const Section = styled('div')`
flex flex-wrap content-center justify-center w-100 h-100 bg-blue`;

const Article = styled('div')`
w-25 ma2 h4 items-center justify-center flex flex-column flex-wrap`;

class App extends Component {
  constructor(props) {
    super(props);
  }
  state={
      load:false,
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ load: true });
    }, 5000);
  }

  render() {
    return (
        <div>
          {this.state.load?
            <Routers/>
          :
          <div className="slider">
            
            <div className="slide-left">
              <p className="app-name">Aalap</p>
          </div>
          <div className="slide-left1">
          <p className="app-desc">The Smart News Reader</p>
          </div>
            <Section className="loader">
              <Article key="bubbles">
                <ReactLoading type="bubbles" color="#fff" />
              </Article>
            </Section>
          </div>}
        </div>
    );
  }
}

export default hot(module)(App);