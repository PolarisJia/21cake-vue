const http = require('vue-resource').Http

var _baseUrl = 'https://api.21cake.com'

// 获取首页数据
export function queryIndexData (param) {
  const url = _baseUrl + '/' + param
  return http.jsonp(url).then(res => Promise.resolve(res.data))
}

// 获取分类数据
export function queryGallery (param) {
  const url = _baseUrl + '/' + param
  return http.jsonp(url).then(res => Promise.resolve(res.data))
}

// 获取商品规格
export function queryGoodsSize (param) {
  const url = _baseUrl + '/' + param
  return http.jsonp(url).then(res => Promise.resolve(res.data))
}

// 获取商品详情
export function queryGoodsDetails (id) {
  const url = `https://bird.ioliu.cn/v1?url=http://m.21cake.com/goods-${id}.html`
  return http.jsonp(url).then(res => Promise.resolve(res.data))
}
