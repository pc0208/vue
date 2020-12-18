<template>
  <div class="left-menu">
    <!-- logo -->
    <div class="login-container">
      <img width="50" height="50" src="@/assets/imgs/touxiang.jpg" />
      外卖商家中心
    </div>
    <!-- 左侧导航 -->
    <el-menu
      :default-active="curActive"
      active-text-color="#1890FF"
      router
      unique-opened
      background-color="#304156"
      text-color="#fff"
    >
      <template v-for="menu in menus">
        <!-- 没有子 -->
        <el-menu-item
          v-if="menu.children && menu.children.length === 1 || menu.path === '/order'"
          :index="menu.path"
          :key="menu.path"
        >
          <i class="iconfont" :class="menu.meta.icon"></i>
          <span slot="title">{{ menu.meta.title }}</span>
        </el-menu-item>

        <!-- 有子 -->
        <el-submenu v-else :index="menu.path" :key="menu.path">
          <template slot="title">
            <i class="iconfont" :class="menu.meta.icon"></i>
            <span>{{ menu.meta.title }}</span>
          </template>

          <el-menu-item
            v-for="subMenu in menu.children"
            :key="subMenu.path"
            :index="subMenu.path"
          >{{ subMenu.meta.title }}</el-menu-item>
        </el-submenu>
      </template>
      <!-- 后台首页 -->
      <!-- <el-menu-item index="/home">
        <i class="iconfont icon-yemian-copy-copy"></i>
        <span slot="title">后台首页</span>  
      </el-menu-item>-->
      <!-- 订单管理 -->
      <!-- <el-menu-item index="/order">
        <i class="iconfont icon-dingdan"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>-->
      <!-- 商品管理 -->
      <!-- <el-submenu index="/goods">
        <template slot="title">
          <i class="iconfont icon-shangpin1"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/goods/goods-list">商品列表</el-menu-item>
          <el-menu-item index="/goods/goods-add">商品添加</el-menu-item>
          <el-menu-item index="/goods/goods-class">商品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>-->
      <!-- 店铺管理 -->
      <!-- <el-menu-item index="/store">
        <i class="iconfont icon--dianpu"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>-->
      <!-- 账号管理 -->
      <!-- <el-submenu index="/account">
        <template slot="title">
          <i class="iconfont icon-zhanghao"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/account/account-list">账号列表</el-menu-item>
          <el-menu-item index="/account/account-add">添加账号</el-menu-item>
          <el-menu-item index="/account/account-modify">修改密码</el-menu-item>
          <el-menu-item index="/account/personal">个人中心</el-menu-item>
        </el-menu-item-group>
      </el-submenu>-->
      <!-- 销售统计 -->
      <!-- <el-submenu index="/sales">
        <template slot="title">
          <i class="iconfont icon-tongji"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/sales/sales-goods">商品统计</el-menu-item>
          <el-menu-item index="/sales/sales-order">订单统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>-->
    </el-menu>
  </div>
</template>

<script>
import local from "@/utils/local";
export default {
  data() {
    return {
      menus: []
    };
  },
  computed: {
    curActive() {
      return this.$route.path;
    }
  },
  created() {
    this.menus = local.get("menus");
    console.log("菜单:", this.menus);
  }
};
</script>

<style lang="less" scoped>
.left-menu {
  flex: 0 0 200px;
  background-color: #304156;
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    color: #fff;
    font-weight: 700;
    img {
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .el-menu {
    border-right: 0px;
    .el-menu-item {
      .iconfont {
        margin-right: 8px;
        font-size: 18px;
      }
    }
    .el-submenu {
      color: red;
      .el-submenu__title {
        .iconfont {
          margin-right: 8px;
          font-size: 18px;
        }
      }
      .el-menu-item {
        background-color: #000c17 !important;
        &:hover {
          background-color: rgba(0, 0, 0, 0.2) !important;
        }
      }
    }
  }
  /deep/.el-menu {
    border: 0;
    .el-menu-item-group {
      .el-menu-item-group__title {
        padding: 0 !important;
      }
    }
  }
}
</style>