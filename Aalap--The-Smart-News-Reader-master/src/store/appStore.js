const isBrowser = typeof window !== 'undefined';

import {observable, action, extendObservable, computed} from 'mobx';
import routeUrlMap from '../config/routeAPIMap';
import {makeRequest} from '@helpers/makeRequest';
var _ = require('underscore');
_ = _.mixin(require('../helpers/utility/mixins'));
const l = console.log;

export default class AppStore {
  @observable name = 'solo8969';
  @observable day = '2096';
  @observable details = undefined;
  @observable expenseCategories = undefined;
  @observable expenses = undefined;

  //user data
  @observable authUser = undefined;

  //Country data
  @observable countries = undefined;
  //Queries data
  @observable queries = undefined;

  //Client data
  @observable clients = undefined;

  //Query data
  @observable queries = undefined;
  @computed get totalQueries() {
    if (!this.queries) return 0;
    return this.queries.data.length;
  }

  @observable individualclients = undefined;

  @observable individualqueries = undefined;

  @observable navbarQueries = undefined;

  @observable interactionQueries = undefined;

  //Interactions data
  @observable interactions = undefined;

  @observable users = undefined;

  @action.bound
  log() {
    // console.log('mobx');
  }

  constructor(state) {
    let context = this;
    state =
      !state || (state && _.isEmpty(state))
        ? isBrowser
          ? _.at(window, '__INITIAL_STATE__.appStore') || {}
          : {}
        : state;
    if (_.isString(state)) {
      state = JSON.parse(state);
    }
    if (state) {
      //extendObservable(this, state);
      _.extend(this, state);
    }
  }

  @action clearData(name) {
    let context = this;
    _.isArray(name)
      ? _.map(name, (eachName) => {
          context[eachName] = undefined;
        })
      : (this[name] = undefined);
  }

  @action updateData(objArr) {
    let context = this;
    _.isObject(objArr) &&
      _.each(objArr, (val, key) => {
        context[key] = val;
      });
  }

  //For a given pattern or url, fetch all the required data and update the state
  @action fetchData(url, pattern, params) {
    var context = this;
    let ignoreInit =
      _.at(params, 'query.ignoreInit') &&
      _.bool(_.at(params, 'query.ignoreInit')) &&
      !!_.at(this, 'topicsList.0.data.data');
    _.extend(params, context);

    // Fetch in an array all the calls that need to be fired with its params and method
    routeUrlMap(params, _.extend({}, params, context), function (dataToFetch) {
      l('\ndatttttttt-->', dataToFetch, url, pattern, params);
      if (!dataToFetch || _.isEmpty(dataToFetch.urlList) || ignoreInit) {
        /*
                let fetchCallback1 = context.fetchDataCallbackMap.get(context.activeNavIndex);
                fetchCallback1 && fetchCallback1(200);
                context.fetchDataStatusCode = 200;
                context.fetchDataDetailsStatusCode = 200;
                if (url.indexOf('all-topics') !== -1) {
                  context.fetchDataAllTopicsStatusCode = 200;
                }
        */
        return context[dataToFetch.updateFunction](null, url, params, {dataToFetch: dataToFetch});
      }
      dataToFetch.source = 'client';
      dataToFetch.store = context;
      if (url.indexOf('all-topics') !== -1) {
        context.fetchDataAllTopicsStatusCode = -2;
      }
      makeRequest(dataToFetch, (error, results) => {
        /*let fetchCallback = context.fetchDataCallbackMap.get(context.activeNavIndex);
        if (error) {
          context.fetchDataStatusCode = context.getErrorStatusCode(error);
          context.fetchDataDetailsStatusCode = context.getErrorStatusCode(error);
          if (url.indexOf('all-topics') !== -1) {
            context.fetchDataAllTopicsStatusCode = context.getErrorStatusCode(error);
          }
          fetchCallback && fetchCallback(context.getErrorStatusCode(error));
        }
        else {
          fetchCallback && fetchCallback(200);
          context.fetchDataStatusCode = 200;
          context.fetchDataDetailsStatusCode = 200;
          if (url.indexOf('all-topics') !== -1) {
            context.fetchDataAllTopicsStatusCode = 200;
          }
        }*/

        let headers = [];
        let resp =
          results &&
          results.map((r) => {
            //!window.__dhpwa__.enableClientLogs && (r.headers.enablelogs === "true") && (window.__dhpwa__.enableClientLogs = true);
            _.at(r, 'headers') && headers.push(r.headers);
            return _.at(r, 'data') && r.data;
          });

        context[dataToFetch.updateFunction](resp || null, url, params, {dataToFetch, headers});
      });
    });
  }

  @action updateDetailsById(resp, url, params, dataToFetch, thisContext) {
    if (resp && resp[0]) {
      this.details = resp[0];
    }
    if (thisContext) {
      return this;
    }
  }

  @action updateCountries(countries, login) {
    if (countries) {
      let countriesList = _.at(countries, 'data');
      if (countriesList) {
        countriesList.map((c, ind) => {
          c.index = ind;
        });
        this.countries = _.extend({data: countriesList}, _.omit(countries, 'data'));
      }
    }
    login && (this.login = login);
  }
  @action updateClients(clients, login) {
    if (clients) {
      let clientList = _.at(clients, 'data');
      if (clientList) {
        clientList.map((c, ind) => {
          c.index = ind;
        });
        this.clients = _.extend({data: clientList}, _.omit(clients, 'data'));
      }
    }
    login && (this.login = login);
  }
  @action updateQueries(queries, login) {
    if (queries) {
      let queryList = _.at(queries, 'data');
      if (queryList) {
        queryList.map((c, ind) => {
          c.index = ind;
        });
        this.queries = _.extend({data: queryList}, _.omit(queries, 'data'));
      }
    }
    login && (this.login = login);
  }

  @action updateInteractions(interactions, login) {
    if (interactions) {
      let interactionsList = _.at(interactions, 'data');
      if (interactionsList) {
        interactionsList.map((c, ind) => {
          c.index = ind;
        });
        this.interactions = _.extend({data: interactionsList}, _.omit(interactions, 'data'));
      }
    }
    login && (this.login = login);
  }

  @action updateIndividualClients(individualclients, login) {
    if (individualclients) {
      this.individualclients = individualclients;
    }
    login && (this.login = login);
  }

  @action updateIndividualQueries(individualqueries, login) {
    if (individualqueries) {
      let individualqueryList = _.at(individualqueries, 'data');
      if (individualqueryList) {
        individualqueryList.map((c, ind) => {
          c.index = ind;
        });
        this.individualqueries = _.extend({data: individualqueryList}, _.omit(individualqueries, 'data'));
      }
    }
    login && (this.login = login);
  }

  @action updateUsers(users, login) {
    if (users) {
      let usersList = _.at(users, 'data');
      if (usersList) {
        usersList.map((c, ind) => {
          c.index = ind;
        });
        console.log('Users', usersList);
        this.users = _.extend({data: usersList}, _.omit(users, 'data'));
      }
    }
    login && (this.login = login);
  }

  @action updateNavbarQueries(individualqueries, login) {
    if (individualqueries) {
      let individualqueryList = _.at(individualqueries, 'data');
      if (individualqueryList) {
        individualqueryList.map((c, ind) => {
          c.index = ind;
        });
        this.navbarQueries = _.extend({data: individualqueryList}, _.omit(individualqueries, 'data'));
      }
    }
    login && (this.login = login);
  }

  @action updateInteractionQueries(individualqueries, login) {
    if (individualqueries) {
      let individualqueryList = _.at(individualqueries, 'data');
      if (individualqueryList) {
        individualqueryList.map((c, ind) => {
          c.index = ind;
        });
        this.interactionQueries = _.extend({data: individualqueryList}, _.omit(individualqueries, 'data'));
      }
    }
    login && (this.login = login);
  }
  @action setAuthUser = (authUser) => {
    if (!this.authUser && authUser) this.authUser = authUser;
  };
}

//export default new AppStore();
