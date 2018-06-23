const axios = require('axios')

// var _baseUrl = 'https://bird.ioliu.cn/v1?url=https://api.21cake.com'

var _baseUrl = '/api'

export function queryIndexInfo (param) {
  const url = _baseUrl + '/' + param
  return axios.get(url).then(res => Promise.resolve(res.data))
}
