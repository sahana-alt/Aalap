import { makeRequest, promiseRequest } from '@helpers/makeRequest';
import appendQuery from 'append-query'
import urlMap from '../../config/urls'
import loginHelper from './login'
var _ = require('underscore');
_ = _.mixin(require('../../helpers/utility/mixins'));


export default {
  getEvents: function(params,cb) {
    loginHelper.login({},(err,login)=>{
      var urlObj = {
        urlList: [{
          url: appendQuery(urlMap.baseUrl + urlMap.poi ,{
            limit: params.limit || 50,
            page: params.page || 1,
            term: params.term,
            country_code: params.country_code,
            section: params.section,
            destination_id: params.destination_id
          }),
          method: 'get'
        }],
        source:"client"
      };
      makeRequest(urlObj, (err, res) => {
        cb(err,{
          events:_.at(res,'0.data'),
          login: login
        });
      })
    })
  },
}