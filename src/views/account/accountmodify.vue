<template>
  <div class="account-modify">
    <card>
      <!-- 标题 -->
      <div slot="header">修改密码</div>
      <!-- 内容 -->
      <div slot="content">
        <!-- 表单 -->
        <el-form
          :model="accModifyForm"
          status-icon
          :rules="rules"
          ref="accAddForm"
          label-width="100px"
          class="account-modify-form"
        >
          <!-- 原密码 -->
          <el-form-item label="原密码" prop="oldPass">
            <el-input
              v-model="accModifyForm.oldPass"
              @click.native="changePwdVisible"
              :suffix-icon="password ? 'iconfont icon-yanjing1' : 'iconfont icon-yanjing'"
              :type="password ? 'text' : 'password'"
            ></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item label="新密码" prop="thePass">
            <el-input
              v-model="accModifyForm.thePass"
              :suffix-icon="password ? 'iconfont icon-yanjing1' : 'iconfont icon-yanjing'"
              :type="password ? 'text' : 'password'"
              @click.native="changePwdVisible"
            ></el-input>
          </el-form-item>
          <!-- 确认新密码 -->
          <el-form-item label="确认新密码" prop="confirm">
            <el-input
              v-model="accModifyForm.confirm"
              :suffix-icon="password ? 'iconfont icon-yanjing1' : 'iconfont icon-yanjing'"
              :type="password ? 'text' : 'password'"
              @click.native="changePwdVisible"
            ></el-input>
          </el-form-item>
          <!-- 添加&重置 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </card>
  </div>
</template>

<script>
// 引入卡片组件
import Card from "@/components/card/card.vue";
// 引入正则
import { REG } from "@/utils/reg";
// 引入ajsx函数
import { checkoldpwd, editpwd } from "@/api/account";

import { Message } from "element-ui";

export default {
  components: {
    Card
  },
  data() {
    // 自定义验证原密码
    var oldPass = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!REG.test(value)) {
        callback(new Error("密码格式错误"));
      } else {
        let { code, msg } = await checkoldpwd({
          oldPwd: this.accModifyForm.oldPass
        });
        if (code === "00") {
          this.$message({
            type: "success",
            message: msg
          });
          callback();
        } else if (code === "11") {
          // 否则 代表失败
          this.$message.error(msg);
        }
      }
    };
    // 自定义验证新密码
    var thePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!REG.test(value)) {
        callback(new Error("密码格式错误"));
      } else {
        callback();
      }
    };
    // 自定义验证两次新密码是否一致
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.accModifyForm.thePass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      accModifyForm: {
        thePass: "",
        oldPass: "",
        confirm: ""
      },
      rules: {
        thePass: [{ required: true, validator: thePass, trigger: "blur" }],
        oldPass: [{ required: true, validator: oldPass, trigger: "blur" }],
        confirm: [{ required: true, validator: checkPass, trigger: "blur" }]
      },
      // 控制密码的显示和隐藏
      password: false
    };
  },
  methods: {
    async submitForm() {
      let { code, msg } = await editpwd({
        newPwd: this.accModifyForm.thePass
      });
      this.$router.push("/login"); //跳转到登录界面
    },
    resetForm() {
      this.$refs.accModifyForm.resetFields();
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
.account-modify {
  .account-modify-form {
    width: 315px;
  }
}
</style>