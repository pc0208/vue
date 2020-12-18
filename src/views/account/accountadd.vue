<template>
  <div class="account-add">
    <card>
      <!-- 标题 -->
      <div slot="header">添加账号</div>
      <!-- 内容 -->
      <div slot="content">
        <!-- 表单 -->
        <el-form
          :model="accAddForm"
          status-icon
          :rules="rules"
          ref="accAddForm"
          label-width="100px"
          class="account-add-form"
        >
          <!-- 账号 -->
          <el-form-item label="账号" prop="account">
            <el-input v-model="accAddForm.account"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="accAddForm.password"
              @click.native="changePwdVisible"
              :suffix-icon="password ? 'iconfont icon-yanjing1' : 'iconfont icon-yanjing'"
              :type="password ? 'text' : 'password'"
            ></el-input>
          </el-form-item>
          <!-- 用户组 -->
          <el-form-item label="用户组" prop="userGroup">
            <el-select v-model="accAddForm.userGroup">
              <el-option value="普通管理员">普通管理员</el-option>
              <el-option value="超级管理员">超级管理员</el-option>
            </el-select>
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
//引入接口
import { addAccount } from "@/api/account";
export default {
  components: {
    Card
  },
  data() {
    // 自定义验证账号
    var checkName = (rule, value, callback) => {
      let len = value.length;
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (len < 4 || len > 6) {
        callback(new Error("长度4~6位"));
      } else {
        callback();
      }
    };
    // 自定义验证密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!REG.test(value)) {
        callback(new Error("密码格式错误"));
      } else {
        callback();
      }
    };

    return {
      accAddForm: {
        password: "",
        account: "",
        userGroup: ""
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        account: [{ required: true, validator: checkName, trigger: "blur" }],
        userGroup: [
          {
            required: true,
            message: "请选择用户组",
            trigger: "change"
          }
        ]
      },
      // 控制密码的显示和隐藏
      password: false
    };
  },
  methods: {
    resetForm() {
      this.$refs.accAddForm.resetFields();
    },
    //提交表单
    submitForm() {
      this.$refs.accAddForm.validate(async valid => {
        // console.log(this.accAddForm);
        if (valid) {
          let { code, msg } = await addAccount(this.accAddForm);
          //判断
          if (code === 0) {
            this.$router.push("/account/account-list"); //跳转到后端首页
          }
        } else {
          return false;
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
.account-add {
  .account-add-form {
    width: 315px;
  }
}
</style>