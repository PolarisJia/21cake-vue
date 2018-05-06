const axios = require('axios')
var _baseUrl = 'https://bird.ioliu.cn/v1?url=http://api.21cake.com'

export function queryIndexInfo (param) {
  const url = _baseUrl + '/' + param
  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}
