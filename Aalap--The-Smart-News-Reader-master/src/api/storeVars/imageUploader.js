import { makeRequest, promiseRequest } from '@helpers/makeRequest';
import axios from 'axios';
import urlMap from '../../config/urls'
import LoginAPI from './login';

export default {
  createAlbum: function(params,cb) {
    if(!(window.__trawish__ && window.__trawish__.imageAuth)){
      return cb("Missing imageAuth",null);
    }
    const formData = new FormData();
    formData.append('title',params.title);
    formData.append('description',params.description);
    axios({
      method: 'post',
      url: urlMap.albumCreate,
      data: formData,
      headers:{ Authorization: `Bearer ${window.__trawish__.imageAuth.access_token}`},
    }).then(response => {
      cb(null,response);
    }).catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } else {
        // handle error
        cb(thrown,null);
      }
    });
  },

  deleteImg:function(hash,cb){
    LoginAPI.imgurLogin((lError,lRes)=>{
      if(lError){
        return cb(lError,null);
      }
      var urlObj = {
        urlList: [{
          url: urlMap.uploadImage  + "/" + hash,
          method: 'delete',
          ignoreDefaultHeds: true,
          headers: {
            Authorization: `Bearer ${window.__trawish__.imageAuth.access_token}`
          }

        }],
        source:"client"
      };
      return makeRequest(urlObj, (err, res) => {
        if(err){
          return cb(err,null);
        }
        return cb(null,_.at(res,'0.data'))
      })

    })
  },

  getAlbum:function(params,cb) {
    var urlObj = {
      urlList: [{
        url: urlMap.albumCreate  + "/" + params.id,
        method: 'get',
        ignoreDefaultHeds: true,
        headers: {
          Authorization: `Bearer ${window.__trawish__.imageAuth.access_token}`
        }

      }],
      source:"client"
    };
    return makeRequest(urlObj, (err, res) => {
      if(err){
        return cb(err,null);
      }
      return cb(null,_.at(res,'0.data'))
    })
  }

}