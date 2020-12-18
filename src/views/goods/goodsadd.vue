<template>
  <div class="goods-add">
    <Card>
      <!-- 标题 -->
      <div slot="header">商品添加</div>
      <!-- 内容 -->
      <div slot="content">
        <el-form ref="form" :model="from" label-width="80px">
          <!-- 商品名称 -->
          <el-form-item label="商品名称">
            <el-input v-model="from.name"></el-input>
          </el-form-item>
          <!-- 商品分类 -->
          <el-form-item label="商品分类">
            <el-select v-model="from.category" placeholder="请选择商品分类">
              <el-option v-for="item in categories" :key="item.cateName" :value="item.cateName"></el-option>
            </el-select>
          </el-form-item>
          <!-- 商品数量 -->
          <el-form-item label="商品数量">
            <el-input-number v-model="from.price" @change="handleChange" :min="1" :max="999"></el-input-number>
          </el-form-item>
          <!-- 商品图片 -->
          <el-form-item label="商品图片">
            <el-upload
              class="avatar-uploader"
              action="http://192.168.1.8:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="from.imgUrl" :src="from.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 商品描述 -->
          <el-form-item label="商品描述">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="from.goodsDesc"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加商品</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Card>
  </div>
</template>

<script>
// 引入卡片组件
import Card from "@/components/card/card.vue";
//引入ajax函数
import { queryClass, addgoods } from "@/api/goods";
export default {
  components: {
    Card
  },
  data() {
    return {
      categories: [], //分类数组
      from: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: ""
      },
      num: 1,
      imgurls: "http://127.0.0.1:5000/upload/imgs/goods_img/"
    };
  },
  methods: {
    //获取所有分类
    async queryAllClass() {
      let { categories } = await queryClass();
      //渲染
      this.categories = categories;
    },
    //添加商品
    async onSubmit() {
      let { code } = await addgoods({
        name: this.from.name,
        category: this.from.category,
        price: this.from.price,
        imgUrl: this.from.imgUrl.substr(this.imgurls.length),
        goodsDesc: this.from.goodsDesc
      });
      this.$router.push('/goods/goods-list')
      // console.log(code);
    },
    handleChange(value) {
      // console.log(value);
    },
    //图片上传成功信息
    handleAvatarSuccess(res, file) {
      // console.log(res);
      //回调图片
      this.from.imgUrl = this.imgurls + res.imgUrl;
    }
    //图片规则
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // }
  },
  // 生命周期
  created() {
    this.queryAllClass();
  }
};
</script>

<style lang="less" scoped>
.goods-add {
  background: #fff;
  .el-input {
    width: 220px;
  }
  .el-textarea {
    width: 300px;
  }
}
/deep/.avatar-uploader .el-upload {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>