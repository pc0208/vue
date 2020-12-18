<template>
  <div class="app">
    <div class="bg"></div>
    <div class="big">
      <h2>系统登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 用户名 -->
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" prefix-icon="iconfont icon-zhanghao"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pass">
          <el-input
            @keyup.native.enter="submitForm"
            @click.native="changePwdVisible"
            :type="password ? 'text' : 'password'"
            v-model="ruleForm.pass"
            autocomplete="off"
            prefix-icon="iconfont icon-mima"
            :suffix-icon="password ? 'iconfont icon-yanjing1' : 'iconfont icon-yanjing'"
          ></el-input>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//引入接口
import { checkLogin } from "@/api/account";
//引入本地储存
import local from "@/utils/local.js";
//引入创建动态路由的函数
import { createDynimicRoute } from "@/router";
export default {
  data() {
    var name = (rule, value, callback) => {
      var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (uPattern.test(value) == false) {
        callback(new Error("输入格式错误"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      var pPattern = /^[a-zA-Z0-9_-]{3,16}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (pPattern.test(value) == false) {
          callback(new Error("输入格式错误"));
        }
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        name: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        name: [{ validator: name, trigger: "blur" }]
      },
      // 控制密码的显示和隐藏
      password: false
    };
  },
  methods: {
    //提交表单
    submitForm() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let box = await checkLogin({
            account: this.ruleForm.name,
            password: this.ruleForm.pass
          });
          let { code, msg, role, token } = box;
          // console.log(token)
          //判断
          if (code === 0) {
            local.set("role", role); //存入本地
            createDynimicRoute(); //登录成功调用1次，创建动态路由
            local.set("tok", token); //存入本地
            this.$router.push("/home"); //跳转到后端首页
          } else if (code == 1) {
            //弹出失败提示
            return false;
          }
        }
      });
    },
    // 修改密码的显示状态
    changePwdVisible(event) {
      if (event.target.className.includes("icon-yanjing")) {
        this.password = !this.password;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.app {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #2d3a4b;

  .bg {
    background-image: url("../../assets/imgs/login.jpg");
    background-size: cover;
    width: 100%;
    height: 100%;
    filter: blur(3px);
  }
  .big {
    position: absolute;
    text-align: center;
    z-index: 999;
    width: 400px;
    margin-left: 300px;
    h2 {
      margin-bottom: 50px;
      color: #eeeeee;
    }
    .el-form-item__content {
      margin-left: 0;
    }
    .el-button {
      width: 400px;
    }
    /deep/.el-input__inner {
      background: #2d3a4b !important;
    }
    /deep/.el-form-item__content,
    .el-input__inner {
      margin-left: 0px !important;
    }
  }
}
</style>