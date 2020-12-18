<template>
  <div class="goods-list">
    <card>
      <div slot="header">
        <span>商品列表</span>
        <el-form
          ref="form"
          :model="searchform"
          label-width="80px"
          style="display: flex;
           margin-top: 30px;
          justify-content: space-between;"
        >
          <el-form-item label="商品名称">
            <el-input placeholder="商品名称" v-model="searchform.name" style="width:220px"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="商品分类">
            <el-select v-model="searchform.category" placeholder="请选择">
              <el-option v-for="item in categories" :key="item.cateName" :value="item.cateName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- 查询按钮 -->
            <el-button type="primary" size="small" @click="search">查询</el-button>
            <el-button type="warning" size="small" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品图片">
                  <img :src="http+props.row.imgUrl" alt style="width:50px;height:50px" />
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>
                <el-form-item label="商品评价">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="商品销量">
                  <span>{{ props.row.sellCount }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.goodsDesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="所属分类" prop="category"></el-table-column>
          <el-table-column label="商品价格" prop="price"></el-table-column>
          <el-table-column label="商品图片">
            <template slot-scope="props">
              <img :src="http+props.row.imgUrl" alt style="width:50px;height:50px" />
            </template>
          </el-table-column>
          <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1,2,3,5]"
            :page-size="pageSize"
            layout="total, sizes,prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <!-- 提示框 -->
        <el-dialog title="编辑商品" :visible.sync="dialogVisible" width="420px">
          <!-- 表单 -->
          <el-form class="edit-form" :model="editForm" size="small" label-width="100px">
            <!-- 商品ID -->
            <el-form-item label="商品ID">
              <el-input
                placeholder="请输入商品ID"
                v-model="editForm.id"
                style="width:215px"
                :readonly="false"
              ></el-input>
            </el-form-item>
            <!-- 商品名称 -->
            <el-form-item label="商品名称">
              <el-input placeholder="请输入商品名称" v-model="editForm.name" style="width:215px"></el-input>
            </el-form-item>
            <!-- 商品分类 -->
            <el-form-item label="商品分类">
              <el-select v-model="editForm.category" placeholder="请选择商品分类">
                <el-option v-for="item in categories" :key="item.cateName" :value="item.cateName"></el-option>
              </el-select>
            </el-form-item>
            <!-- 商品价格 -->
            <el-form-item label="商品价格">
              <el-input placeholder="请输入价格" v-model="editForm.price" style="width:215px"></el-input>
            </el-form-item>
            <!-- 商品图片 -->
            <el-form-item label="商品图片">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/goods/goods_img_upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="editForm.imgUrl" :src="editForm.imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <!-- 商品描述 -->
            <el-form-item label="商品描述">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入商品描述"
                v-model="editForm.goodsDesc"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleEditAcc">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </card>
  </div>
</template>

<script>
// 引入卡片组件
import Card from "@/components/card/card.vue";

//引入ajax函数
import { removegoods, getgoodslist, editgoods, queryClass } from "@/api/goods";

//引入时间格式
import moment from "moment";
export default {
  components: {
    Card
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false, // 模态框显示或隐藏控制
      http: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      //分页
      currentPage: 1, // 当前页
      pageSize: 5, // 每页条数
      total: 0, // 数据总条数
      // 表单
      editForm: {
        name: "",
        category: "",
        id: "",
        price: "",
        imgUrl: "",
        goodsDesc: ""
      },
      searchform: {
        name: "",
        category: ""
      },
      categories: [] //分类数组
    };
  },
  methods: {
    //获取所有分类
    async queryAllClass() {
      let { categories } = await queryClass();
      //渲染
      this.categories = categories;
    },
    //获取商品列表
    async getlistdata() {
      let { data, total } = await getgoodslist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        name: this.searchform.name,
        category: this.searchform.category
      });
      //渲染
      this.tableData = data;
      console.log(data);

      this.total = total;
      //改变时间格式
      data.forEach(val => {
        val.ctime = moment(val.ctime).format("YYYY-MM-DD HH:mm:ss");
      });
      // 如果当前页没有数据 页码-1 再重新获取数据
      if (!data.length && this.currentPage !== 1) {
        this.currentPage -= 1;
        this.getlistdata();
      }
    },
    //删除商品
    handleDelete(id) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code } = await removegoods({ id });
          if (code == 0) {
            this.getlistdata();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改商品
    async handleEditAcc() {
      let { code } = await editgoods({
        name: this.editForm.name,
        category: this.editForm.category,
        price: this.editForm.price,
        imgUrl: this.editForm.imgUrl.substr(this.http.length),
        goodsDesc: this.editForm.goodsDesc,
        id: this.editForm.id
      });
      if (code === 0) {
        this.getlistdata(); // 重新拉数据 就是刷新
        this.dialogVisible = false; // 隐藏模态框
      }
    },
    //图片上传成功信息
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.editForm.imgUrl = this.http + res.imgUrl;
    },
    //编辑
    handleEdit(row) {
      this.dialogVisible = true;
      this.editForm = { ...row };
      this.editForm.imgUrl = this.http + this.editForm.imgUrl;
      // console.log(this.editForm)
    },
    // 每页条数改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getlistdata(); //第三次调用刷新
    },
    // 当前页面改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlistdata(); //第二次调用刷新
    },
    //查询按钮
    search() {
      this.getlistdata();
    },
    //重置
    reset() {
      (this.searchform.name = ""),
        (this.searchform.category = ""),
        (this.categories = "");
      this.getlistdata();
    }
  },
  // 一进页面就刷新一次
  created() {
    this.getlistdata(); //第一次调用刷新
    this.queryAllClass();
  }
};
</script>

<style lang="less" scoped>
.goods-list {
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .block {
    margin-top: 20px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
</style>