import { makeRequest, promiseRequest } from '@helpers/makeRequest';
import urlMap from '../../config/urls'
import loginHelper from './login'
import appendQuery from 'append-query'
var _ = require('underscore');
_ = _.mixin(require('../../helpers/utility/mixins'));
let l = console.log
let getPages =  function(params,cb) {
    params = params || {};
    loginHelper.login({},(err,login)=>{
      var urlObj = {
        urlList: [{
          url: appendQuery(urlMap.baseUrl + urlMap.pages,_.extend({
            limit: params.limit || 10,
            page: params.page || 1,
            term: params.term || 'home'
          },params)),
          method: 'get'
        }],
        source:"client"
      };
      makeRequest(urlObj, (err, res) => {
        cb(err,{
          pages:_.at(res,'0.data'),
          login: login,
          params: params
        });
      })
    })
  }


let updateCountryDet =  function(params,cb) {
    var urlObj = {
      urlList: [{
        url: urlMap.baseUrl + urlMap.editCountry,
        method: _.at(params,'body.newAddition') ? "post" : 'put',
        body: _.omit(params.body,"newAddition")
      }],
      source:"client"
    };
    makeRequest(urlObj, (err, res) => {
      cb(err,{
        country:_.at(res,'0.data')
      });
    })
  }


export {
  getPages,
}