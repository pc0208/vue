<template>
  <div class="right-nav">
    <!-- 栅格组件 -->
    <el-row>
      <el-col :md="16" :sm="12" :span="12">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <!-- 循环渲染 -->
          <el-breadcrumb-item
            v-for="item in breadArr"
            :key="item.title"
            :to="{ path: item.path }"
          >{{ item.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <el-col class="menuavatar-container" :md="8" :sm="12" :span="12">
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎你，{{ account }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 头像 -->
        <el-avatar size="large" :src="imgUrl"></el-avatar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//引入ajsx函数
import { upload, info } from "@/api/account";
//引入本地储存
import local from "@/utils/local.js";
export default {
  data() {
    return {
      account: "",
      imgUrl: "",
      breadArr: [
        //面包屑
      ]
    };
  },
  methods: {
    async fetchdata() {
      let { accountInfo } = await info();
      let { account, imgUrl } = accountInfo;

      local.set("account", accountInfo); //存入本地

      //渲染
      this.account = account;
      this.imgUrl = imgUrl;
    },
    // 点击下拉框菜单项
    handleCommand(command) {
      if (command === "logout") {
        local.clear(); // 清除本地
        this.$message({ type: "success", message: "退出成功" }); //弹出提示
        this.$router.push("/login"); // 跳转到登录
        //刷新页面【初始化路由】
        window.location.reload();
      } else if (command === "personal") {
        this.$router.push("/account/personal");
      }
    },
    //计算面包屑
    calcBreadArr() {
      let ret = [{ path: "/home", title: "首页" }]; // 默认有个首页 好看一点

      // 循环计算面包屑
      this.$route.matched.forEach(item => {
        // 如果meta中配置了 title属性
        if (item.meta.title) {
          ret.push({
            title: item.meta.title,
            path: item.path
          });
        }
      });
      this.breadArr = ret; // 把计算结果赋值渲染
    }
  },
  created() {
    this.fetchdata();
    this.calcBreadArr(); //刷新计算面包屑

    // 接收个人中心的通知
    this.$bus.$on("updateAvatar", () => {
      this.fetchdata(); // 获取当前账号信息
    });
  },
  //侦听器
  watch: {
    "$route.path"() {
      this.calcBreadArr();
    }
  }
};
</script>

<style lang="less" scoped>
.right-nav {
  flex: 0 0 60px;
  background-color: #fff;
  box-shadow: 6px 1px 6px #ccc;
  overflow: hidden;
  padding: 0 20px;
  .el-row {
    .el-col {
      display: flex;
      align-items: center;
      height: 60px;
      &.menuavatar-container {
        justify-content: flex-end;
        .el-avatar {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>