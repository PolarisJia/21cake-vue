webpackJsonp([2],{"/f0/":function(t,e){},NpIQ:function(t,e){e.f={}.propertyIsEnumerable},"SmJ/":function(t,e){},TmV0:function(t,e,s){s("fZOM"),t.exports=s("FeBl").Object.values},YOyO:function(t,e,s){"use strict";var a={data:function(){return{clientHeight:0,searchVal:"",searchIng:!1,openCity:!1,currentCity:"上海",locationCity:"定位中",historyCity:"",hotCity:["北京","杭州","深圳"],cityList:["上海","北京","天津","杭州","无锡","苏州","广州","深圳"]}},props:{location:{type:Boolean,default:!1},searchResult:{type:Array,default:function(){}}},methods:{search:function(t){this.searchIng=!this.searchIng,document.body.style.overflow="hidden",document.body.style.position="relative",document.querySelector(".search-header").addEventListener("touchmove",this.noScroll)},noScroll:function(t){t.preventDefault()},searchCancel:function(){this.searchIng=!this.searchIng,document.body.style.overflow="visible",document.body.style.position="static",document.querySelector(".search-header").removeEventListener("touchmove",this.noScroll)}},created:function(){this.clientHeight=document.documentElement.clientHeight}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"search-container"},[s("div",{staticClass:"search-header"},[t.location?s("a",{staticClass:"location",attrs:{href:"javascript:;"},on:{click:function(e){t.openCity=!t.openCity}}},[s("van-icon",{attrs:{name:"location"}}),s("span",[t._v(t._s(t.currentCity))])],1):t._e(),t._v(" "),s("div",{staticClass:"box",class:{ml:!t.location}},[s("form",{staticClass:"input",attrs:{action:"#"}},[s("van-icon",{staticClass:"icon",attrs:{name:"search"}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.searchVal,expression:"searchVal",modifiers:{trim:!0}}],attrs:{type:"search",autocomplete:"off",placeholder:"请输入名称",autofocus:""},domProps:{value:t.searchVal},on:{input:function(e){e.target.composing||(t.searchVal=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),s("van-icon",{staticClass:"icon",attrs:{name:"close"},on:{click:function(e){t.searchVal=""}}})],1),t._v(" "),s("a",{staticClass:"cancel",attrs:{href:"javascript:;"},on:{click:t.searchCancel}},[t._v("取消")]),t._v(" "),t.searchIng?t._e():s("div",{staticClass:"input-false",on:{click:function(e){t.search(e)}}},[s("van-icon",{staticClass:"icon",attrs:{name:"search"}}),t._v("黑森林\n      ")],1)])]),t._v(" "),s("div",{staticClass:"search-content",class:{open:t.searchIng},style:{height:t.clientHeight+"px"},on:{touchmove:function(e){t.noScroll(e)}}},[s("ul",t._l(t.searchResult,function(e,a){return s("li",{key:a},[t._v(t._s(e))])}))]),t._v(" "),s("transition",{attrs:{name:"open"}},[t.openCity?s("div",{staticClass:"select-city",style:{height:t.clientHeight+"px"},on:{touchmove:function(t){return t.preventDefault(),!1}}},[s("p",[s("a",{staticClass:"close l",attrs:{href:"javascript:;"},on:{click:function(e){t.openCity=!t.openCity}}},[t._v("×")]),t._v("选择城市")]),t._v(" "),s("div",{staticClass:"city-list"},[s("p",[t._v("定位/最近访问")]),t._v(" "),s("div",[s("a",{staticClass:"current-city",attrs:{href:"javascript:;"},on:{click:function(e){t.currentCity=t.locationCity,t.openCity=!t.openCity}}},[s("van-icon",{attrs:{name:"location"}}),s("span",[t._v(t._s(t.locationCity))]),s("span",{staticClass:"no-open"},[t._v("暂未开通")])],1),t._v(" "),s("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.historyCity))])]),t._v(" "),s("p",[t._v("热门城市")]),t._v(" "),s("div",t._l(t.hotCity,function(e,a){return s("a",{key:a,attrs:{href:"javascript:;"},on:{click:function(s){t.currentCity=e,t.openCity=!t.openCity}}},[t._v(t._s(e))])})),t._v(" "),s("p",[t._v("城市列表")])]),t._v(" "),s("ul",t._l(t.cityList,function(e,a){return s("li",{key:a,on:{click:function(s){t.currentCity=e,t.openCity=!t.openCity}}},[t._v(t._s(e))])}))]):t._e()])],1)},staticRenderFns:[]};var o=s("VU/8")(a,i,!1,function(t){s("/f0/")},"data-v-30281568",null);e.a=o.exports},fZOM:function(t,e,s){var a=s("kM2E"),i=s("mbce")(!1);a(a.S,"Object",{values:function(t){return i(t)}})},gRE1:function(t,e,s){t.exports={default:s("TmV0"),__esModule:!0}},mbce:function(t,e,s){var a=s("lktj"),i=s("TcQ7"),o=s("NpIQ").f;t.exports=function(t){return function(e){for(var s,n=i(e),c=a(n),r=c.length,l=0,d=[];r>l;)o.call(n,s=c[l++])&&d.push(t?[s,n[s]]:n[s]);return d}}},sbvP:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("gRE1"),i=s.n(a),o=s("+JW9"),n=s("YOyO"),c=s("L6lE"),r={data:function(){return{host:{static:"https://static.21cake.com/"},active:0,tabs:[{title:"蛋糕",value:6},{title:"冰淇淋",value:23},{title:"咖啡下午茶",value:8},{title:"常温蛋糕",value:24},{title:"设计师礼品",value:21}],goods:[],goodsCache:[],loading:!1,finished:!1,startIndex:0,endIndex:10,addCart:!1,goodsCurrentSize:0,goodsSizes:[{price:0,size:"",suite_amount:"",cutlery_content:"",booking_hour_limited:"",img_url:""}],goodsSaleTime:{},currentGoods:{}}},methods:{_queryGallery:function(){var t=this;Object(c.a)("?method=Gallery.goodsList&v=1.0&catId="+this.tabs[this.active].value+"&cityId=2&channel=wap&_="+ +new Date).then(function(e){0===e.code&&(t.goodsCache=e.data.goodsArr[1].goods)})},loadGoods:function(){var t=this,e=setTimeout(function(s){t.goods=t.goods.concat(t.goodsCache.slice(t.startIndex,t.endIndex)),t.startIndex+=10,t.endIndex+=10,t.loading=!1,t.startIndex>t.goodsCache.length&&(t.finished=!0),clearTimeout(e)},1200)},getGoodsSize:function(t){var e=this;this.currentGoods=t,Object(c.c)("?method=Goods.goodsDetail&v=1.0&cityId=2&channel=wap&goodsId="+t.cake_goods_id+"&_="+ +new Date).then(function(t){if(0!==t.code)e.$toast({message:t.message?t.message:"获取商品规格失败",type:"fail"});else{if("normal"===t.data.type){var s=i()(t.data.productsArr),a=s.findIndex(function(t){return"true"===t.is_default});if(!(s.length>1))return!1;e.goodsSizes=s,e.goodsSaleTime=t.data.saleTime,e.goodsCurrentSize=a}else"multiply"===t.data.type&&(e.goodsSizes=i()(t.data.productsArr[0].productsArr),e.goodsSaleTime=t.data.productsArr.saleTime);e.addCart=!0}})},clearGoodsInfo:function(){this.goodsSizes=[{price:0,size:"",suite_amount:"",cutlery_content:"",booking_hour_limited:"",img_url:""}],this.goodsSaleTime={},this.goodsCurrentSize=0},addGoodsToCart:function(){var t=this,e={en_name:this.currentGoods.en_name,cn_name:this.currentGoods.name,spec:this.goodsSizes[this.goodsCurrentSize].spec,price:this.goodsSizes[this.goodsCurrentSize].price,cutlery_content:this.goodsSizes[this.goodsCurrentSize].cutlery_content,img_url:this.currentGoods.img_url,num:1,goods_id:this.currentGoods.cake_goods_id};this.$db.find({goods_id:this.currentGoods.cake_goods_id},function(s,a){if(a.length&&a[0].spec===t.goodsSizes[t.goodsCurrentSize].spec){var o=a[0].num;o++,t.$db.update({goods_id:t.currentGoods.cake_goods_id},{$set:{num:o}},{},function(e,s){s?(t.addCart=!1,t.$toast({message:"加入成功",type:"success"})):console.log(e)})}else t.$db.insert(e,function(e,s){i()(s).length?(t.addCart=!1,t.$toast({message:"加入成功",type:"success"})):console.log(e)});console.log(s)})}},created:function(){this._queryGallery()},components:{Contain:o.a,Search:n.a}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("Contain",[s("Search"),t._v(" "),s("div",{staticClass:"container"},[s("div",{staticClass:"title fixed"},t._l(t.tabs,function(e,a){return s("a",{key:a,class:{active:t.active===a},attrs:{href:"javascript:;"},on:{click:function(e){t.active=a}}},[t._v(t._s(e.title))])})),t._v(" "),s("div",{staticClass:"filter fixed"},[s("ul",[s("li",[s("a",{attrs:{href:"javascript:;"}},[t._v("默认")])]),t._v(" "),s("li",[s("a",{attrs:{href:"javascritp:;"}},[t._v("价格")])]),t._v(" "),s("li",[s("a",{staticClass:"fa fa-filter",attrs:{href:"javascritp:;"}},[t._v(" 筛选")])])])]),t._v(" "),s("div",{staticClass:"goods"},[s("van-list",{attrs:{finished:t.finished},on:{load:t.loadGoods},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.goods,function(e,a){return s("div",{key:a,staticClass:"good"},[s("div",{staticClass:"imgs"},[e.label&&e.label.length?s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.host.static+e.label[0].icon,expression:"host.static + g.label[0].icon"}],staticClass:"img-responsive tag",attrs:{alt:e.label[0].name}}):t._e(),t._v(" "),s("router-link",{attrs:{to:"/goods?id="+e.cake_goods_id}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.host.static+e.img_url,expression:"host.static + g.img_url"}],staticClass:"img-responsive",attrs:{alt:e.name}})])],1),t._v(" "),s("p",{staticClass:"en-nam substring"},[t._v(t._s(e.en_name))]),t._v(" "),s("p",{staticClass:"name substring"},[t._v(t._s(e.name))]),t._v(" "),s("div",{staticClass:"opera"},[s("span",{staticClass:"l substring"},[s("output",[t._v("￥"+t._s(e.price))]),t._v("/"+t._s(e.spec))]),s("a",{staticClass:"r add-cart fa fa-cart-plus",attrs:{href:"javascript:;"},on:{click:function(s){t.getGoodsSize(e)}}})])])}))],1)]),t._v(" "),s("van-popup",{on:{"click-overlay":t.clearGoodsInfo},model:{value:t.addCart,callback:function(e){t.addCart=e},expression:"addCart"}},[s("div",{staticClass:"size-box"},[s("p",[s("span",{staticClass:"price"},[t._v("￥"+t._s(t.goodsSizes[t.goodsCurrentSize].price))]),s("a",{staticClass:"r close",attrs:{href:"javascript:;"},on:{click:function(e){t.addCart=!1}}},[t._v("×")])]),t._v(" "),s("ul",[s("li",[s("i",{staticClass:"fa fa-arrows-alt"}),t._v(t._s(t.goodsSizes[t.goodsCurrentSize].size))]),t._v(" "),s("li",[s("i",{staticClass:"fa fa-users"}),t._v(t._s(t.goodsSizes[t.goodsCurrentSize].suite_amount))]),t._v(" "),s("li",[s("i",{staticClass:"fa fa-cutlery"}),t._v(t._s(t.goodsSizes[t.goodsCurrentSize].cutlery_content))]),t._v(" "),s("li",[s("i",{staticClass:"fa fa-clock-o"}),t._v("须提前"+t._s(t.goodsSizes[t.goodsCurrentSize].booking_hour_limited)+"小时预订")])]),t._v(" "),t.goodsSizes[0].price?s("img",{staticClass:"img-responsive",attrs:{src:t.host.static+t.goodsSizes[t.goodsCurrentSize].img_url,alt:t.goodsSizes[t.goodsCurrentSize].size}}):t._e(),t._v(" "),s("p",[t._v("商品规格")]),t._v(" "),s("p",{staticClass:"select-size"},t._l(t.goodsSizes,function(e,a){return t.goodsSizes[0].price?s("button",{key:a,class:{select:t.goodsCurrentSize===a},attrs:{type:"button"},on:{click:function(e){t.goodsCurrentSize=a}}},[t._v(t._s(e.spec))]):t._e()})),t._v(" "),s("a",{staticClass:"add-cart-size",attrs:{href:"javascript:;"},on:{click:t.addGoodsToCart}},[t._v("加入购物车（￥"+t._s(t.goodsSizes[t.goodsCurrentSize].price)+"）")])])])],1)},staticRenderFns:[]};var d=s("VU/8")(r,l,!1,function(t){s("SmJ/")},"data-v-4058785c",null);e.default=d.exports}});