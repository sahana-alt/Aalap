import { makeRequest, promiseRequest } from '@helpers/makeRequest';
import urlMap from '../../config/urls'
import loginHelper from './login'
import appendQuery from 'append-query'
var _ = require('underscore');
_ = _.mixin(require('../../helpers/utility/mixins'));

export default {
  getTours: function(params,cb) {
    loginHelper.login({},(err,login)=>{
      var urlObj = {
        urlList: [{
          url: appendQuery(urlMap.baseUrl + urlMap.tours,_.extend({
            limit: 30,
            page:params.page || 1
          },params)),
          method: 'get'
        }],
        source:"client"
      };
      makeRequest(urlObj, (err, res) => {
        cb(err,{
          tours:_.at(res,'0.data'),
          login: login
        });
      })
    })
  },

  addUpdateItinerary: function(params,cb) {
    loginHelper.login({},(err,login)=>{
      var urlObj = {
        urlList: [{
          url: appendQuery(urlMap.baseUrl + urlMap.itinerary,_.extend({},params.query)),
          body: params.body,
          method: 'post'
        }],
        source:"client"
      };
      makeRequest(urlObj, (err, res) => {
        cb(err,{
          tours:_.at(res,'0.data'),
          login: login
        });
      })
    })
  },

  getHightlights: function(params,cb) {
    loginHelper.login({},(err,login)=>{
      var urlObj = {
        urlList: [{
          url: appendQuery(urlMap.baseUrl + urlMap.itineraryHighlights,_.extend({},params.query)),
          method: 'get'
        }],
        source:"client"
      };
      makeRequest(urlObj, (err, res) => {
        cb(err,{
          tours:_.at(res,'0.data'),
          login: login
        });
      })
    })
  }

}