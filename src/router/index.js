import Vue from 'vue'
import Router from 'vue-router'

// 解决自己跳转自己警告信息
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

//引入组件
import Index from '@/views/index'
import Login from '@/views/login/login.vue'
//引入本地储存
import local from "@/utils/local.js";
//【默认路由】
const routes = [
  // 系统登录
  {
    path: '/login',
    component: Login,
  },
  // 后台首页
  {
    path: '/',
    component: Index,
    redirect: '/home',
    meta: { title: '后台首页' },
    children: [
      {
        path: '/home',
        component: () => import("@/views/home/home.vue")
      }
    ]
  },
]

//动态实例化
const router = new Router({
  routes
})

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  // console.log('to', to) // 你到哪里去 [你要去的目标路由对象]
  // console.log('from', from) // 你从哪里来 【你离开的路由对象】
  // console.log('next', next) // 一个函数 如果调用 就相当于 放行
  // next()

  let isLogin = local.get('tok') ? true : false // 判断是否登录过

  if (isLogin) {
    next() // 如果登录过 直接放行
  } else {

    // 如果去的是登录
    if (to.path === '/login') {
      next() // 放行
    } else {
      // 否则就是去别的页面 直接重置到登录
      next('/login')
    }

  }
})

//【动态路由】
const dynimicRoute = [
  // 系统登录
  {
    path: '/login',
    component: Login,
    meta: { isMenu: false }
  },
  // 后台首页
  {
    path: '/home',
    component: Index,
    meta: { title: '后台首页' },
    children: [
      {
        path: '/home',
        component: () => import("@/views/home/home.vue")
      }
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: Index,
    meta: { title: '订单管理' },
    redirect: '/order/orderlist', // 重定向
    children: [
      {
        path: '/order/orderlist',
        component: () => import("@/views/order/orderlist.vue")
      },
      {
        path: '/order/order',
        component: () => import("@/views/order/order.vue")
      }
    ]
  },
  // 商品管理
  {
    path: '/goods',
    component: Index,
    meta: { title: '商品管理', roles: ['super', 'normal'] },
    redirect: '/goods/goods-list', // 重定向
    children: [
      {
        path: '/goods/goods-list',
        component: () => import("@/views/goods/goodslist.vue"),
        meta: { title: '商品列表' },

      },
      {
        path: '/goods/goods-add',
        component: () => import("@/views/goods/goodsadd.vue"),
        meta: { title: '商品添加' },

      },
      {
        path: '/goods/goods-class',
        component: () => import("@/views/goods/goodsclass.vue"),
        meta: { title: '商品分类', roles: ['super'] },

      },
    ]
  },
  // 店铺管理
  {
    path: '/store',
    component: Index,
    meta: { title: '店铺管理', roles: ['super'] },
    redirect: '/store',
    children: [
      {
        path: '/store',
        component: () => import("@/views/store/store.vue")
      }
    ]
  },
  // 账号管理
  {
    path: '/account',
    component: Index,
    meta: { title: '账号管理', roles: ['super', 'normal'] },
    children: [
      {
        path: '/account/account-list',
        component: () => import("@/views/account/accountlist.vue"),
        meta: { title: '账号列表', roles: ['super'] },
      },
      {
        path: '/account/account-add',
        component: () => import("@/views/account/accountadd.vue"),
        meta: { title: '账号添加', roles: ['super'] },
      },
      {
        path: '/account/account-modify',
        component: () => import("@/views/account/accountmodify.vue"),
        meta: { title: '修改密码' },
      },
      {
        path: '/account/personal',
        component: () => import("@/views/account/personal.vue"),
        meta: { title: '个人中心' },
      },
    ]
  },
  // 销售统计
  {
    path: '/sales',
    component: Index,
    meta: { title: '销售统计', roles: ['super'] },
    children: [
      {
        path: '/sales/sales-goods',
        component: () => import("@/views/sales/salesgoods.vue"),
        meta: { title: '商品统计' },
      },
      {
        path: '/sales/sales-order',
        component: () => import("@/views/sales/salesorder.vue"),
        meta: { title: '订单统计' },
      },
    ]
  },
  // 404实现
  {
    path: '/404',
    component: () => import('@/views/error404/error404.vue'),
    meta: { isMenu: false }
  },
  {
    path: '*',
    redirect: '/404',
    meta: { isMenu: false }
  }
]

/**
 * 判断是有当前角色 对 当前单个路由对象 有权限访问
 * @param {当前路由对象} route 
 * @param {当前角色}  role 
 * @return { true 或 false }  如果有权限访问 就返回true 否则 就返回false
 */
function hasPermission(route, role) {
  if (route.meta && route.meta.roles) { // 如果配置了
    return route.meta.roles.includes(role)
  } else {
    return true   // 如果没有配置meta中的roles 证明这个模块不需要做权限 都可以访问
  }
}

/**
 * 计算动态路由
 * 参数1:完整的动态路由
 * 参数2：当前用户角色
 * 返回值：算出可以访问的路由
 */
function calcRoutes(dynimicRoute, role) {
  let accessRoutes = dynimicRoute.filter(route => {
    // console.log(route);
    if (hasPermission(route, role)) {
      // 递归过滤
      if (route.children && route.children.length) {
        route.children = calcRoutes(route.children, role)
      }
      return true
    } else {
      return false
    }
  })
  // console.log('结果',accessRoutes);
  return accessRoutes
}

/**
 * 创建动态路由的函数
 */
export function createDynimicRoute() {
  let role = local.get('role') || ''
  if (!role) return
  console.log("用户角色:", role);

  //把可以访问的动态路由计算出来
  let accessRoutes = calcRoutes(dynimicRoute, role)
  // 动态添加路由【这些被动态添加进去的路由 就可以被访问了】
  router.addRoutes(accessRoutes)

  // 计算权限菜单
  let menus = calcMenus(accessRoutes)
  local.set('menus', menus) // 存入本地
}
createDynimicRoute()//初始化

/**
 * 计算权限菜单
 * 参数1：权限路由
 */
function calcMenus(accessRoutes) {
  let menus = accessRoutes.filter(route => {
    if (route.meta && route.meta.hasOwnProperty('isMenu')) {
      return false
    } else {
      return true
    }
  })
  return menus;
}

export default router