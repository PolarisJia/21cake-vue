const http = require('vue-resource')

var _baseUrl = 'https://api.21cake.com'

export function queryIndexData (param) {
  const url = _baseUrl + '/' + param
  return http.Http.jsonp(url).then(res => Promise.resolve(res.data))
}
