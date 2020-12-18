<template>
  <div class="account-list">
    <card>
      <!-- 标题 -->
      <div slot="header">账号列表</div>
      <!-- 内容 -->
      <div slot="content">
        <!-- 表格 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- 序号 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 姓名 -->
          <el-table-column prop="account" label="姓名" width="180"></el-table-column>
          <!-- 用户组 -->
          <el-table-column prop="userGroup" label="用户组" width="180"></el-table-column>
          <!-- 日期 -->
          <el-table-column label="日期" width="180">
            <template slot-scope="scope">{{ scope.row.ctime }}</template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click.native.prevent="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click.native.prevent="handleDelete( scope.row.id)"
              >删除</el-button>
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
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <div style="margin-top: 20px">
          <el-button type="danger" @click="deleteAll">批量删除</el-button>
          <el-button type="primary" @click="toggleSelection">取消选择</el-button>
        </div>
        <!-- 提示框 -->
        <el-dialog title="编辑账号" :visible.sync="dialogVisible" width="420px">
          <!-- 表单 -->
          <el-form class="edit-form" :model="editForm" size="small" label-width="100px">
            <!-- 账号 -->
            <el-form-item label="账号">
              <el-input placeholder="请输入账号" v-model="editForm.account" style="width:215px"></el-input>
            </el-form-item>
            <!-- 用户组 -->
            <el-form-item label="用户组">
              <el-select v-model="editForm.userGroup" placeholder="请选择">
                <el-option value="普通管理员">普通管理员</el-option>
                <el-option value="超级管理员">超级管理员</el-option>
              </el-select>
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
//引入接口
import {
  getAddAccountList,
  removeAccount,
  removesAccount,
  editAccount
} from "@/api/account";

//引入时间格式
import moment from "moment";
export default {
  components: {
    Card
  },
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, // 当前页
      pageSize: 5, // 每页条数
      total: 0, // 数据总条数
      dialogVisible: false, // 模态框显示或隐藏控制
      // 表单
      editForm: {
        account: "",
        userGroup: ""
      }
    };
  },
  created() {
    this.accountList();
  },
  methods: {
    //请求列表接口
    async accountList() {
      let { total, data } = await getAddAccountList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      //时间格式
      data.forEach(val => {
        val.ctime = moment(val.ctime).format("YYYY-MM-DD HH:mm:ss");
      });
      //赋值渲染
      this.tableData = data;
      this.total = total;

      // 如果当前页没有数据 页码-1 再重新获取数据
      if (!data.length && this.currentPage !== 1) {
        this.currentPage -= 1;
        this.accountList();
      }
    },
    //当选择项发生改变【自动传入选中的行，是一个数组】
    handleSelectionChange(rows) {
      //找到被选中的id
      this.ids = rows.map(v => v.id);
      // console.log(this.ids);
    },
    // 删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code } = await removeAccount({ id });
          if (code == 0) {
            this.accountList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 批量删除
    deleteAll() {
      // 没选中的时候点击
      if (!this.ids) {
        this.$message.error("请选择要删除得数据");
        return;
      }
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code } = await removesAccount({
            ids: JSON.stringify(this.ids)
          });
          if (code == 0) {
            this.accountList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //取消选择
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    // 编辑
    handleEdit(row) {
      this.dialogVisible = true; //显示提示框
      this.editForm = { ...row };
    },
    // 确定修改
    async handleEditAcc() {
      let { code } = await editAccount({
        id: this.editForm.id,
        account: this.editForm.account,
        userGroup: this.editForm.userGroup
      });
      if (code === 0) {
        this.accountList(); // 重新拉数据 就是刷新
        this.dialogVisible = false; // 隐藏模态框
      }
    },

    // 每页条数改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.accountList(); //第三次调用刷新
    },
    // 当前页面改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.accountList(); //第二次调用刷新
    },
    // 一进页面就刷新一次
    created() {
      this.accountList(); //第一次调用刷新
    }
  }
};
</script>

<style lang="less" scoped>
.account-list {
  width: 100%;
}
</style>