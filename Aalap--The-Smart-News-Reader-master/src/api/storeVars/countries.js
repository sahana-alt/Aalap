import { makeRequest, promiseRequest } from '@helpers/makeRequest';
import urlMap from '../../config/urls'
import loginHelper from './login'
import appendQuery from 'append-query'
var _ = require('underscore');
_ = _.mixin(require('../../helpers/utility/mixins'));

let getCountries =  function(params,cb) {
    loginHelper.login({},(err,login)=>{
      var urlObj = {
        urlList: [{
          url: appendQuery(urlMap.baseUrl + urlMap.countries,_.extend({
            limit: 30
          },params)),
          method: 'get'
        }],
        source:"client"
      };
      makeRequest(urlObj, (err, res) => {
        cb(err,{
          countries:_.at(res,'0.data'),
          login: login
        });
      })
    })
  }

let  getCountryDet =  function(params,cb) {
    loginHelper.login({},(err,login)=>{
      var urlObj = {
        urlList: [{
          url: urlMap.baseUrl + urlMap.countries + '/'+ params.code,
          method: 'get'
        }],
        source:"client"
      };
      makeRequest(urlObj, (err, res) => {
        cb(err,{
          selectedCountry:_.at(res,'0.data'),
          login: login
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
  getCountries,
  getCountryDet,
  updateCountryDet
}