import {makeRequest, promiseRequest} from '@helpers/makeRequest';
import urlMap from '../../config/urls';

export default {
  login: function (params, cb) {
    if (window.__trawish__ && window.__trawish__.login) {
      return cb(null, window.__trawish__.login);
    }
    var urlObj = {
      urlList: [
        {
          url: urlMap.baseUrl + urlMap.login,
          method: 'post',
          body: {
            email: 'user2@microsoft.com',
            password: '1234'
          }
        }
      ],
      source: 'client'
    };
    return makeRequest(urlObj, (err, res) => {
      if (err) {
        return cb(err, null);
      }
      window.__trawish__ = window.__trawish__ || {};
      window.__trawish__.login = _.at(res, '0.data');
      
      return cb(null, window.__trawish__.login);
    });
  },

  imgurLogin: function (cb) {
    if (window.__trawish__ && window.__trawish__.imageAuth) {
      return cb(null, window.__trawish__.imageAuth);
    }
    var urlObj = {
      urlList: [
        {
          url: urlMap.baseUrl + urlMap.imageAuth,
          method: 'get',
          ignoreDefaultHeds: true,
          headers: {
            Authorization: `Bearer ${window.__trawish__.login.access_token}`
          }
        }
      ],
      source: 'client'
    };
    return makeRequest(urlObj, (err, res) => {
      if (err) {
        return cb(err, null);
      }
      window.__trawish__ = window.__trawish__ || {};
      window.__trawish__.imageAuth = _.at(res, '0.data');
      return cb(null, window.__trawish__.imageAuth);
    });
  }
};
