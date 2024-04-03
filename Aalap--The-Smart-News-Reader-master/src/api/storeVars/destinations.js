import {makeRequest, promiseRequest} from '@helpers/makeRequest';
import urlMap from '../../config/urls';
import loginHelper from './login';
import appendQuery from 'append-query';
const limit = 100;
export default {
  getDestinations: function (params, cb) {
    loginHelper.login({}, (err, login) => {
      var urlObj = {
        urlList: [
          {
            url: appendQuery(
              urlMap.baseUrl + urlMap.allDestinations,
              _.extend({limit: limit, country_code: params.code}, _.omit(params, 'code'))
            ),
            method: 'get'
          }
        ],
        source: 'client'
      };
      makeRequest(urlObj, (err, res) => {
        let countryDestinations;
        if (_.at(res, '0.data.data')) {
          countryDestinations = _.at(res, '0.data');
          _.each(_.at(countryDestinations, 'data'), (c, i) => {
            c.index = i;
          });
        }
        cb(err, {
          countryDestinations: _.at(res, '0.data'),
          login: login
        });
      });
    });
  },

  updateDestinationDet: function (params, cb) {
    var urlObj = {
      urlList: [
        {
          url: urlMap.baseUrl + urlMap[params.type],
          method: _.at(params, 'body.newAddition') ? 'post' : 'put',
          body: _.omit(params.body, 'newAddition')
        }
      ],
      source: 'client'
    };
    makeRequest(urlObj, (err, res) => {
      cb(err, {
        country: _.at(res, '0.data')
      });
    });
  }
};
