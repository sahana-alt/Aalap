import {makeRequest, promiseRequest} from '@helpers/makeRequest';
import urlMap from '../../config/urls';
import loginHelper from './login';
import appendQuery from 'append-query';
var _ = require('underscore');
_ = _.mixin(require('../../helpers/utility/mixins'));

let getClients = function (params, cb) {
  loginHelper.login({}, (err, login) => {
    console.log('Login', login);
    var urlObj = {
      urlList: [
        {
          url: appendQuery(
            urlMap.baseUrl + urlMap.clients,
            _.extend(
              {
                limit: params.limit || 20 //if no limit is specified get     20
              },
              params
            )
          ),
          method: 'get'
        }
      ],
      source: 'client' //client to server request
    };
    makeRequest(urlObj, (err, res) => {
      cb(err, {
        clients: _.at(res, '0.data'), //0.data is accessing response of 1st object of urlObj
        login: login
      });
    });
  });
};

let postClient = function (params, cb) {
  loginHelper.login({}, (err, login) => {
    var urlObj = {
      urlList: [
        {
          url: appendQuery(urlMap.baseUrl + urlMap.clients, _.extend({}, params.query)),
          body: params.body,
          method: 'post'
        }
      ],
      source: 'client'
    };
    makeRequest(urlObj, (err, res) => {
      cb(err, {
        clients: _.at(res, '0.data'),
        login: login
      });
    });
  });
};

export {getClients, postClient};
