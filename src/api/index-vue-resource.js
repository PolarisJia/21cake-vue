const http = require('vue-resource')

var _baseUrl = 'http://api.21cake.com'

export function queryIndexInfo (param) {
  const url = _baseUrl + '/' + param
  return http.Http.jsonp(url).then(res => Promise.resolve(res.data))
}
