const http = require('vue-resource')

var _baseUrl = 'https://api.21cake.com'

// 获取首页数据
export function queryIndexData (param) {
  const url = _baseUrl + '/' + param
  return http.Http.jsonp(url).then(res => Promise.resolve(res.data))
}

// 获取分类数据
export function queryGallery (param) {
  const url = _baseUrl + '/' + param
  return http.Http.jsonp(url).then(res => Promise.resolve(res.data))
}
