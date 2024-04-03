import { makeRequest, promiseRequest } from '@helpers/makeRequest';
import urlMap from '../../config/urls'
import loginHelper from './login'
import appendQuery from 'append-query'
const limit = 100;
export default {
  getHotels : function(params,cb) {
    loginHelper.login({},(err,login)=>{
      console.log("\n\n wtcccccc--->",params,appendQuery(urlMap.baseUrl + urlMap.hotel,_.extend({ "limit": limit},_.omit(params,'code'))))
      var urlObj = {
        urlList: [{
          url: appendQuery(urlMap.baseUrl + urlMap.hotel,_.extend({ "limit": limit},_.omit(params,'code'))),
          method: 'get'
        }],
        source:"client"
      };
      makeRequest(urlObj, (err, res) => {
        let hotels;
        if(_.at(res,'0.data.data')){
          hotels = _.at(res,'0.data');
          _.each(_.at(hotels,'data'),(c,i)=>{
            c.index = i;
          });
        }
        cb(err,{
          hotels:_.at(res,'0.data'),
          login: login
        });
      })
    })
  },



}