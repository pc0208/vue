webpackJsonp([16],{"1XXl":function(t,e){},"4Siu":function(t,e){},"991W":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"k"}},[e("router-view")],1)},staticRenderFns:[]};var a=n("VU/8")({},o,!1,function(t){n("PHic")},"data-v-4ee0e672",null).exports,i=n("/ocq"),s=n("xS6p"),c={data:function(){return{menus:[]}},computed:{curActive:function(){return this.$route.path}},created:function(){this.menus=s.a.get("menus"),console.log("菜单:",this.menus)}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"left-menu"},[t._m(0),t._v(" "),n("el-menu",{attrs:{"default-active":t.curActive,"active-text-color":"#1890FF",router:"","unique-opened":"","background-color":"#304156","text-color":"#fff"}},[t._l(t.menus,function(e){return[e.children&&1===e.children.length||"/order"===e.path?n("el-menu-item",{key:e.path,attrs:{index:e.path}},[n("i",{staticClass:"iconfont",class:e.meta.icon}),t._v(" "),n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.meta.title))])]):n("el-submenu",{key:e.path,attrs:{index:e.path}},[n("template",{slot:"title"},[n("i",{staticClass:"iconfont",class:e.meta.icon}),t._v(" "),n("span",[t._v(t._s(e.meta.title))])]),t._v(" "),t._l(e.children,function(e){return n("el-menu-item",{key:e.path,attrs:{index:e.path}},[t._v(t._s(e.meta.title))])})],2)]})],2)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"login-container"},[e("img",{attrs:{width:"50",height:"50",src:n("eudO")}}),this._v("\n    外卖商家中心\n  ")])}]};var l=n("VU/8")(c,u,!1,function(t){n("p5ni")},"data-v-7d24f734",null).exports,d=n("Xxa5"),m=n.n(d),p=n("exGp"),f=n.n(p),h=n("nv77"),v={data:function(){return{account:"",imgUrl:"",breadArr:[]}},methods:{fetchdata:function(){var t=this;return f()(m.a.mark(function e(){var n,r,o,a;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(h.g)();case 2:n=e.sent,r=n.accountInfo,o=r.account,a=r.imgUrl,s.a.set("account",r),t.account=o,t.imgUrl=a;case 8:case"end":return e.stop()}},e,t)}))()},handleCommand:function(t){"logout"===t?(s.a.clear(),this.$message({type:"success",message:"退出成功"}),this.$router.push("/login"),window.location.reload()):"personal"===t&&this.$router.push("/account/personal")},calcBreadArr:function(){var t=[{path:"/home",title:"首页"}];this.$route.matched.forEach(function(e){e.meta.title&&t.push({title:e.meta.title,path:e.path})}),this.breadArr=t}},created:function(){var t=this;this.fetchdata(),this.calcBreadArr(),this.$bus.$on("updateAvatar",function(){t.fetchdata()})},watch:{"$route.path":function(){this.calcBreadArr()}}},g={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"right-nav"},[n("el-row",[n("el-col",{attrs:{md:16,sm:12,span:12}},[n("el-breadcrumb",{attrs:{separator:"/"}},t._l(t.breadArr,function(e){return n("el-breadcrumb-item",{key:e.title,attrs:{to:{path:e.path}}},[t._v(t._s(e.title))])}),1)],1),t._v(" "),n("el-col",{staticClass:"menuavatar-container",attrs:{md:8,sm:12,span:12}},[n("el-dropdown",{on:{command:t.handleCommand}},[n("span",{staticClass:"el-dropdown-link"},[t._v("\n          欢迎你，"+t._s(t.account)+"\n          "),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{command:"personal"}},[t._v("个人中心")]),t._v(" "),n("el-dropdown-item",{attrs:{command:"logout"}},[t._v("退出系统")])],1)],1),t._v(" "),n("el-avatar",{attrs:{size:"large",src:t.imgUrl}})],1)],1)],1)},staticRenderFns:[]};var b={components:{RightNav:n("VU/8")(v,g,!1,function(t){n("h/dG")},"data-v-97f495d6",null).exports}},w={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"right"},[e("div",{staticClass:"right-nav"},[e("RightNav")],1),this._v(" "),e("div",{staticClass:"content"},[e("router-view")],1)])},staticRenderFns:[]};var _={components:{Left:l,Right:n("VU/8")(b,w,!1,function(t){n("U3Zq")},"data-v-2914d9fb",null).exports}},x={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"layout"},[e("Left"),this._v(" "),e("Right")],1)},staticRenderFns:[]};var k=n("VU/8")(_,x,!1,function(t){n("1XXl")},"data-v-427ac47b",null).exports,y={data:function(){return{ruleForm:{pass:"",name:""},rules:{pass:[{validator:function(t,e,n){""===e?n(new Error("请输入密码")):(0==/^[a-zA-Z0-9_-]{3,16}$/.test(e)&&n(new Error("输入格式错误")),n())},trigger:"blur"}],name:[{validator:function(t,e,n){""===e?n(new Error("请输入用户名")):0==/^[a-zA-Z0-9_-]{4,16}$/.test(e)?n(new Error("输入格式错误")):n()},trigger:"blur"}]},password:!1}},methods:{submitForm:function(){var t,e=this;this.$refs.ruleForm.validate((t=f()(m.a.mark(function t(n){var r,o,a,i;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!n){t.next=14;break}return t.next=3,Object(h.b)({account:e.ruleForm.name,password:e.ruleForm.pass});case 3:if(r=t.sent,o=r.code,r.msg,a=r.role,i=r.token,0!==o){t.next=12;break}s.a.set("role",a),E(),s.a.set("tok",i),e.$router.push("/home"),t.next=14;break;case 12:if(1!=o){t.next=14;break}return t.abrupt("return",!1);case 14:case"end":return t.stop()}},t,e)})),function(e){return t.apply(this,arguments)}))},changePwdVisible:function(t){t.target.className.includes("icon-yanjing")&&(this.password=!this.password)}}},F={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app"},[n("div",{staticClass:"bg"}),t._v(" "),n("div",{staticClass:"big"},[n("h2",[t._v("系统登录")]),t._v(" "),n("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.ruleForm,"status-icon":"",rules:t.rules,"label-width":"100px"}},[n("el-form-item",{attrs:{prop:"name"}},[n("el-input",{attrs:{"prefix-icon":"iconfont icon-zhanghao"},model:{value:t.ruleForm.name,callback:function(e){t.$set(t.ruleForm,"name",e)},expression:"ruleForm.name"}})],1),t._v(" "),n("el-form-item",{attrs:{prop:"pass"}},[n("el-input",{attrs:{type:t.password?"text":"password",autocomplete:"off","prefix-icon":"iconfont icon-mima","suffix-icon":t.password?"iconfont icon-yanjing1":"iconfont icon-yanjing"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitForm(e)},click:function(e){return t.changePwdVisible(e)}},model:{value:t.ruleForm.pass,callback:function(e){t.$set(t.ruleForm,"pass",e)},expression:"ruleForm.pass"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm()}}},[t._v("提交")])],1)],1)],1)])},staticRenderFns:[]};var P=n("VU/8")(y,F,!1,function(t){n("4Siu")},"data-v-da306864",null).exports,$=i.a.prototype.push;i.a.prototype.push=function(t){return $.call(this,t).catch(function(t){return t})},r.default.use(i.a);var C=[{path:"/login",component:P},{path:"/",component:k,redirect:"/home",meta:{title:"后台首页"},children:[{path:"/home",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"zKIK"))}}]}],R=new i.a({routes:C});R.beforeEach(function(t,e,n){!!s.a.get("tok")?n():"/login"===t.path?n():n("/login")});var A=[{path:"/login",component:P,meta:{isMenu:!1}},{path:"/home",component:k,meta:{title:"后台首页"},children:[{path:"/home",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"zKIK"))}}]},{path:"/order",component:k,meta:{title:"订单管理"},redirect:"/order/orderlist",children:[{path:"/order/orderlist",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"W+8A"))}},{path:"/order/order",component:function(){return Promise.all([n.e(0),n.e(13)]).then(n.bind(null,"Vg+r"))}}]},{path:"/goods",component:k,meta:{title:"商品管理",roles:["super","normal"]},redirect:"/goods/goods-list",children:[{path:"/goods/goods-list",component:function(){return Promise.all([n.e(0),n.e(14)]).then(n.bind(null,"8xMO"))},meta:{title:"商品列表"}},{path:"/goods/goods-add",component:function(){return Promise.all([n.e(0),n.e(10)]).then(n.bind(null,"RssL"))},meta:{title:"商品添加"}},{path:"/goods/goods-class",component:function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,"w2rq"))},meta:{title:"商品分类",roles:["super"]}}]},{path:"/store",component:k,meta:{title:"店铺管理",roles:["super"]},redirect:"/store",children:[{path:"/store",component:function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,"I654"))}}]},{path:"/account",component:k,meta:{title:"账号管理",roles:["super","normal"]},children:[{path:"/account/account-list",component:function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,"8kA4"))},meta:{title:"账号列表",roles:["super"]}},{path:"/account/account-add",component:function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"/eKB"))},meta:{title:"账号添加",roles:["super"]}},{path:"/account/account-modify",component:function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"/hS8"))},meta:{title:"修改密码"}},{path:"/account/personal",component:function(){return Promise.all([n.e(0),n.e(11)]).then(n.bind(null,"nrm+"))},meta:{title:"个人中心"}}]},{path:"/sales",component:k,meta:{title:"销售统计",roles:["super"]},children:[{path:"/sales/sales-goods",component:function(){return Promise.all([n.e(0),n.e(12)]).then(n.bind(null,"ZPet"))},meta:{title:"商品统计"}},{path:"/sales/sales-order",component:function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,"yyh5"))},meta:{title:"订单统计"}}]},{path:"/404",component:function(){return n.e(3).then(n.bind(null,"DkFb"))},meta:{isMenu:!1}},{path:"*",redirect:"/404",meta:{isMenu:!1}}];function E(){var t=s.a.get("role")||"";if(t){console.log("用户角色:",t);var e=function t(e,n){return e.filter(function(e){return!!function(t,e){return!t.meta||!t.meta.roles||t.meta.roles.includes(e)}(e,n)&&(e.children&&e.children.length&&(e.children=t(e.children,n)),!0)})}(A,t);R.addRoutes(e);var n=function(t){return t.filter(function(t){return!t.meta||!t.meta.hasOwnProperty("isMenu")})}(e);s.a.set("menus",n)}}E();var O=R,U=(n("991W"),n("muQq"),n("zL8q")),j=n.n(U);n("tvR6");r.default.use(j.a),r.default.config.productionTip=!1,r.default.prototype.$bus=new r.default,new r.default({router:O,render:function(t){return t(a)}}).$mount("#app")},PHic:function(t,e){},U3Zq:function(t,e){},eudO:function(t,e,n){t.exports=n.p+"static/img/touxiang.98df9b0.jpg"},"h/dG":function(t,e){},muQq:function(t,e){},nv77:function(t,e,n){"use strict";n.d(e,"b",function(){return o}),n.d(e,"f",function(){return a}),n.d(e,"a",function(){return i}),n.d(e,"h",function(){return s}),n.d(e,"d",function(){return c}),n.d(e,"i",function(){return u}),n.d(e,"c",function(){return l}),n.d(e,"e",function(){return d}),n.d(e,"g",function(){return m}),n.d(e,"j",function(){return p});var r=n("pTQH"),o=function(t){return r.a.post("/users/checkLogin",t)},a=function(t){return r.a.get("/users/list",t)},i=function(t){return r.a.post("/users/add",t)},s=function(t){return r.a.get("/users/del",t)},c=function(t){return r.a.post("/users/edit",t)},u=function(t){return r.a.get("/users/batchdel",t)},l=function(t){return r.a.get("/users/checkoldpwd",t)},d=function(t){return r.a.post("/users/editpwd",t)},m=function(){return r.a.get("/users/info")},p=function(t){return r.a.get("/users/avataredit",t)}},p5ni:function(t,e){},pTQH:function(t,e,n){"use strict";var r=n("//Fk"),o=n.n(r),a=n("mtWM"),i=n.n(a),s=n("mw3O"),c=n.n(s),u=n("zL8q"),l=(n.n(u),n("xS6p"));i.a.defaults.baseURL="http://127.0.0.1:5000",i.a.interceptors.request.use(function(t){var e=l.a.get("tok")||"";return e&&(t.headers.Authorization=e),t},function(t){o.a.reject(t)}),i.a.interceptors.response.use(function(t){var e=t&&t.data;if(e.hasOwnProperty("code")&&e.hasOwnProperty("msg")){var n=e.code,r=e.msg;0===n?Object(u.Message)({type:"success",message:r}):1===n&&u.Message.error(r)}return t},function(t){o.a.reject(t)});var d={get:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new o.a(function(n,r){i.a.get(t,{params:e}).then(function(t){n(t.data)}).catch(function(t){r(t)})})},post:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new o.a(function(n,r){i.a.post(t,c.a.stringify(e)).then(function(t){n(t.data)}).catch(function(t){r(t)})})}};e.a=d},tvR6:function(t,e){},xS6p:function(t,e,n){"use strict";var r=n("mvHQ"),o=n.n(r),a={get:function(t){return JSON.parse(window.localStorage.getItem(t))},set:function(t,e){window.localStorage.setItem(t,o()(e))},remove:function(t){Window.localStorage.removeItem(t)},clear:function(){window.localStorage.clear()}};e.a=a}},["NHnr"]);
//# sourceMappingURL=app.6533bb191d48e74d5e88.js.map