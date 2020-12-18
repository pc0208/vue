<template>
  <div class="store">
    <Card>
      <div slot="header" class="header">
        店铺管理
        <el-button :type="disabled?'primary':'success'" @click="save">{{disabled?'编辑':'保存'}}</el-button>
      </div>
      <div slot="content">
        <el-form ref="form" :disabled="disabled" :model="form" label-width="80px">
          <el-form-item label="店铺名称">
            <el-input placeholder="有手就行(山城重庆)" v-model="form.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="店铺公告">
            <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="form.bulletin"></el-input>
          </el-form-item>

          <!-- 头像 -->
          <el-form-item label="店铺头像">
            <el-upload
              :action="uploadUrl"
              :show-file-list="false"
              :on-preview="handlePictureCardPreview"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="form.avatar" width="50%" :src="form.avatar" class="avatar" />
              <!-- <i class="el-icon-plus"></i> -->
            </el-upload>
          </el-form-item>

          <!-- 店铺图片 -->
          <el-form-item label="店铺图片">
            <el-upload
              :action="uploadUrl"
              :file-list="form.pics"
              list-type="picture-card"
              :on-remove="handleRemove"
              :on-preview="handlePictureCardPreview"
              :on-success="handleImgSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <!-- 配送费 -->
          <el-form-item label="配送费">
            <el-input v-model="form.deliveryPrice"></el-input>
          </el-form-item>
          <!-- 配送时间 -->
          <el-form-item label="配送时间">
            <el-input v-model="form.deliveryTime"></el-input>
          </el-form-item>
          <!-- 配送描述 -->
          <el-form-item label="配送描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <!-- 店铺评分 -->
          <el-form-item label="店铺评分">
            <el-input v-model="form.score"></el-input>
          </el-form-item>
          <!-- 销量 -->
          <el-form-item label="销量">
            <el-input v-model="form.sellCount"></el-input>
          </el-form-item>
          <!-- 活动 -->
          <el-form-item label="活动">
            <el-checkbox-group v-model="form.supports">
              <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全程8折" name="type"></el-checkbox>
              <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
              <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- 营业时间 -->
          <el-form-item label="营业时间">
            <el-time-picker
              is-range
              v-model="form.date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
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
import { getShopInfo, editShopInfo } from "@/api/shop";
export default {
  components: {
    Card
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      baseImgUrl: "http://127.0.0.1:5000/upload/shop/", // 图片所在服务器的目录
      uploadUrl: "http://127.0.0.1:5000/shop/upload", // 图片发送ajax上传地址
      disabled: true,
      //表单
      form: {
        name: "",
        bulletin: "",
        avatar: "", // 头像
        pics: [], // 图片列表+
        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: "",
        sellCount: "",
        supports: [], // 活动
        date: [] // 日期
      }
    };
  },
  methods: {
    async getShop() {
      let res = await getShopInfo();

      //处理图片路径
      res.data.avatar = this.baseImgUrl + res.data.avatar;

      res.data.pics = res.data.pics.map(item => {
        return {
          url: this.baseImgUrl + item
        };
      });

      //渲染数据
      this.form = res.data;
    },
    //保存按钮
    async save() {
      this.disabled = !this.disabled;

      if (this.disabled) {
        //修改图片格式
        let pics = this.form.pics.map(item => {
          return item.url.substr(this.baseImgUrl.length);
        });

        await editShopInfo({
          id: this.form.id,
          name: this.form.name,
          bulletin: this.form.bulletin,
          //去掉头
          avatar: this.form.avatar.substr(this.baseImgUrl.length),
          deliveryPrice: this.form.deliveryPrice,
          deliveryTime: this.form.deliveryTime,
          description: this.form.description,
          score: this.form.score,
          sellCount: this.form.sellCount,
          //修改格式
          supports: JSON.stringify(this.form.supports),
          //修改格式
          date: JSON.stringify(this.form.date),
          pics: JSON.stringify(pics)
        });
      }
    },
    //删除图片
    handleRemove(file, fileList){
      this.form.pics = fileList
    },
    //店铺头像上传成功
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({
          type: "success",
          message: msg
        });
      }
      // 回填
      this.form.avatar = this.baseImgUrl + imgUrl;
    },
    // 预览
    handlePictureCardPreview() {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
      // 店铺图片上传成功
    handleImgSuccess(res) {
      let { code, msg, imgUrl } = res
      console.log(res);
      
      if (code === 0) {
        this.$message({
          type: 'success',
          message: msg,
        })
      }

      // 把上传的图片 push进入图片列表数组
      this.form.pics.push({
        url: this.baseImgUrl + imgUrl,
      })
    },
  },
  created() {
    this.getShop();
  }
};
</script>

<style lang="less" scoped>
.store {
  .header {
    display: flex;
    justify-content: space-between;
  }
  /deep/.el-card__body {
    height: 720px;
    overflow-y: scroll;
    .el-form {
      width: 500px;
    }
  }
}
</style>