webpackJsonp([12],{ZPet:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),r=a.n(n),s=a("mvHQ"),o=a.n(s),c=a("exGp"),i=a.n(c),d=a("n68v"),l=a("BIfl"),u=a("FWz8"),f=a("PJh5"),p=a.n(f),m=(a("XLwt"),{components:{Card:d.a,AsCharts:l.a},data:function(){return{date:[],options:{}}},methods:{search:function(){this.fetchData()},reset:function(){this.date=[],this.fetchData()},fetchData:function(){var t=this;return i()(r.a.mark(function e(){var a,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.a)({date:null===t.date?o()([]):o()(t.date)});case 2:a=e.sent,(n=a.data).forEach(function(t){t.orderTime=p()(t.orderTime).format("YYYY-MM-DD HH:mm:ss")}),t.options={title:"订单统计",legend:"金额",xData:n.map(function(t){return t.orderTime}),series:[{name:"金额",type:"bar",data:n.map(function(t){return t.orderAmount})}]};case 6:case"end":return e.stop()}},e,t)}))()}},created:function(){this.fetchData()}}),h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sales-goods"},[a("card",[a("span",{attrs:{slot:"header"},slot:"header"},[t._v("商品统计")]),t._v(" "),a("div",{attrs:{slot:"content"},slot:"content"},[a("el-form",{attrs:{size:"small",inline:!0}},[a("el-form-item",[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"success"},on:{click:t.reset}},[t._v("重置")])],1)],1),t._v(" "),a("as-charts",{attrs:{options:t.options}})],1)])],1)},staticRenderFns:[]};var v=a("VU/8")(m,h,!1,function(t){a("pLRy")},"data-v-388cf3a5",null);e.default=v.exports},pLRy:function(t,e){}});
//# sourceMappingURL=12.4c6e9a87e59b66a61436.js.map