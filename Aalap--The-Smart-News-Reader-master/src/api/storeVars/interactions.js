import { makeRequest, promiseRequest } from '@helpers/makeRequest';
import urlMap from '../../config/urls'
import loginHelper from './login'
import appendQuery from 'append-query'
var _ = require('underscore');
_ = _.mixin(require('../../helpers/utility/mixins'));

let getInteractions =  function(params,cb) {
    loginHelper.login({},(err,login)=>{
      var urlObj = {
        urlList: [{
            url: appendQuery(urlMap.baseUrl + urlMap.queries,_.extend({
              limit: params.limit
            },params)),
            method: 'get'
          },
          {
            url: appendQuery(urlMap.baseUrl + urlMap.users,_.extend({
              limit: params.limit
            },params)),
            method: 'get'
          }],
        source:"client"
      };
      makeRequest(urlObj, (err, res) => {
        cb(err,{
          queries:_.at(res,'0.data'),
          users:_.at(res,'1.data'),
          login: login
        });
      })
    })
  }

  let postInteractions = function (params, cb) {
    loginHelper.login({}, (err, login) => {
      var urlObj = {
        urlList: [{
          url: appendQuery(urlMap.baseUrl + urlMap.interactions, _.extend({}, params.query)),
          body:params.body,
          method: 'post'
        }],
        source: "client"
      };
      makeRequest(urlObj, (err, res) => {
        cb(err, {
          interactions: _.at(res, '0.data'), 
          login: login
        });
      })
    })
  }

export {
  getInteractions,
  postInteractions
}