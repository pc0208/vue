<template>
  <div class="goods-class">
    <Card>
      <!-- 标题 -->
      <div slot="header">
        <div style="display: flex;
    justify-content: space-between;">
          <span>商品分类</span>
          <el-button size="mini" type="primary" @click="dialogVisible = true">添加</el-button>
        </div>
      </div>
      <!-- 内容 -->
      <div slot="content">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
        >
          <!-- 序号 -->
          <el-table-column type="index" label="序号" width="280"></el-table-column>

          <!-- 分类名称 -->
          <el-table-column v-model="tableData.cateName" label="分类" width="280">
            <template slot-scope="scope">
              <!-- 分类名称 -->
              <span v-if="!scope.row.isEdit">{{ scope.row.cateName }}</span>
              <!-- 输入框 -->
              <el-input v-else size="small" v-model="scope.row.cateName"></el-input>
            </template>
          </el-table-column>

          <!-- 是否启用 -->
          <el-table-column label="是否启用" width="280">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.state"
                active-color="#13ce66"
                :disabled="!scope.row.isEdit"
              ></el-switch>
            </template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                :type="scope.row.isEdit ? 'success' : 'primary'"
                @click="handleEdit(scope.row)"
              >{{scope.row.isEdit?'完成':'编辑'}}</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1,3,5,10, 20]"
            :page-size="pageSize"
            layout="total,prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <!-- 提示框 -->
        <el-dialog title="编辑分类" :visible.sync="dialogVisible" width="420px">
          <!-- 表单 -->
          <el-form class="edit-form" :model="AddData" size="small" label-width="100px">
            <!-- 账号 -->
            <el-form-item label="账号">
              <el-input placeholder="请输入账号" v-model="AddData.cateName" style="width:215px"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-switch v-model="AddData.state" active-color="#13ce66"></el-switch>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleEditAcc">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </Card>
  </div>
</template>

<script>
// 引入卡片组件
import Card from "@/components/card/card.vue";
//引入ajax函数
import { getClassgoods, modifyClass, removeClass, AddClass } from "@/api/goods";
export default {
  components: {
    Card
  },
  data() {
    return {
      tableData: [],
      //分页
      currentPage: 1, // 当前页
      pageSize: 5, // 每页条数
      total: 5, // 数据总条数
      dialogVisible: false, // 模态框显示或隐藏控制
      AddData: {
        cateName: "",
        state: "true"
      }
    };
  },
  methods: {
    //添加分类
    async handleEditAcc() {
      let { code } = await AddClass({
        cateName: this.AddData.cateName,
        state: this.AddData.state
      });
      if (code == 0) {
        this.queryAllClass(); // 刷新
        this.dialogVisible = false; // 隐藏模态框
      }
    },
    // 查询所有分类
    async queryAllClass() {
      let { total, data } = await getClassgoods({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      //数据处理
      data.forEach(item => {
        item.state = item.state === 1 ? true : false;
        item.isEdit = false; // 状态代表是否可以被编辑
      });

      //渲染
      this.tableData = data;
      this.total = total;
    },

    //编辑
    async handleEdit(row) {
      //改变状态
      row.isEdit = !row.isEdit;
      if (!row.isEdit) {
        let demo = await modifyClass({
          id: row.id,
          cateName: row.cateName,
          state: row.state
        });
      }
    },

    //删除分类
    async handleDelete(row) {
      let { code } = await removeClass({
        id: row
      });
      this.queryAllClass(); //调用一次
    },
    //改变刷新页面
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(val)
      this.queryAllClass(); //调用两次
    }
  },
  //生命周期进来先刷新一次
  created() {
    this.queryAllClass(); //调用一次
  }
};
</script>

<style lang="less" scoped>
.goods-class {
  background: #fff;
  .el-dialog {
    .el-form {
      .el-input {
        width: 470px;
      }
    }
  }
}
</style>