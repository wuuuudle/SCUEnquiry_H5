import axios from 'axios'

// web
//axios.defaults.baseURL = '/api';
// android
axios.defaults.baseURL = 'http://202.115.47.141/';
axios.defaults.timeout = 1000000000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
  fetchGet(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
