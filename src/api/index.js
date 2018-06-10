const axios = require('axios')
// var _baseUrl = 'https://bird.ioliu.cn/v1?url=http://api.21cake.com'
var _baseUrl = ''

export function queryIndexInfo (param) {
  const url = _baseUrl + '/' + param
  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

export function test () {
  const url = 'query?type=yuantong&postid=11111111111'
  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}
