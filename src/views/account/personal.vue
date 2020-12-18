<template>
  <div class="personal">
    <card>
      <!-- 标题 -->
      <div slot="header">管理员信息</div>
      <!-- 内容 -->
      <div slot="content">
        <div class="text item">管理员ID:{{information.id}}</div>
        <div class="text item">账号:{{information.ctime}}</div>
        <div class="text item">用户组:{{information.account}}</div>
        <div class="text item">创建时间:{{information.userGroup}}</div>
        <div class="head">
          <span class="head-zt">管理员头像:</span>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/users/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <!-- 修改头像 -->
          <el-button @click="saveEdit" type="primary" size="small">确认修改</el-button>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
// 引入卡片组件
import Card from "@/components/card/card.vue";
//引入本地储存
import local from "@/utils/local.js";
//引入时间格式
import moment from "moment";
//引入ajax函数
import { saveAvatarEdit } from "@/api/account";
export default {
  components: {
    Card
  },
  data() {
    return {
      information: {},
      baseImgUrl: "http://127.0.0.1:5000/upload/imgs/acc_img/", // 图片所在的服务器的文件
      imgUrl: ""
    };
  },
  methods: {
    // 上传成功的回调
    handleAvatarSuccess(res) {
      // 接收上传请求 后端响应的数据
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({ type: "success", message: msg }); // 弹出成功提示

        // 回填图片
        this.imgUrl = this.baseImgUrl + imgUrl;
      }
    },
    // 上传之前的函数
    beforeAvatarUpload(file) {
      const isJPGOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPGOrPng) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPGOrPng && isLt1M;
    },

    // 保存头像的修改
    async saveEdit() {
      let { code } = await saveAvatarEdit({
        imgUrl: this.imgUrl.substr(this.baseImgUrl.length) // 把图片的名字发送给后端
      });

      // 如果code === 0 代表修改成功
      if (code === 0) {
        // 通知头部修改数据
        this.$bus.$emit("updateAvatar");
      }
    }
  },
  created() {
    // this.information = local.get("account");
    // console.log(this.information);
    let information = local.get('account') // 取出本地数据
    this.imgUrl = information.imgUrl // 整个完整的url路径
    this.information = information // 赋值渲染
    
    this.information.ctime = moment(this.information.ctime).format(
      "YYYY-MM-DD HH:mm:ss"
    );
  }
};
</script>

<style lang="less" scoped>
.personal {
  .text {
    padding: 25px 0;
    border-bottom: 1px solid #ccc;
  }
  .head {
    width: 100px;
    .head-zt {
      line-height: 180px;
    }
    /deep/.avatar-uploader .el-upload {
      border: 1px solid #d9d9d9;
      margin-left: 100px;
      margin-top: -270px;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>