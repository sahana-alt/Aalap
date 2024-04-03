import {makeRequest, promiseRequest} from '@helpers/makeRequest';
import urlMap from '../../config/urls';
import loginHelper from './login';
import appendQuery from 'append-query';
var _ = require('underscore');
_ = _.mixin(require('../../helpers/utility/mixins'));

let getIndividualClients = function (params, cb) {
  loginHelper.login({}, (err, login) => {
    var urlObj = {
      urlList: [
        {
          url: appendQuery(
            urlMap.baseUrl + urlMap.clients + '/' + params.client_id,
            _.extend(
              {
                limit: params.limit || 20 //if no limit is specified get     20
              },
              params
            )
          ),
          method: 'get'
        },
        {
          url: appendQuery(
            urlMap.baseUrl + urlMap.queries,
            _.extend(
              {
                limit: params.limit
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
        individualclients: _.at(res, '0.data'), //0.data is accessing response of 1st object of urlObj
        individualqueries: _.at(res, '1.data'),
        login: login
      });
    });
  });
};

let updateClient = function (params, cb) {
  loginHelper.login({}, (err, login) => {
    var urlObj = {
      urlList: [
        {
          url: appendQuery(urlMap.baseUrl + urlMap.clients + '/' + params.query.client_id),
          body: params.body,
          method: 'put'
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

export {getIndividualClients, updateClient};
