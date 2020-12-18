<template>
  <div class="order-list">
    <card>
      <!-- 订单号 -->
      <div slot="header">
        <el-form ref="form" :model="select" label-width="80px">
          <el-form-item label="订单号">
            <el-input placeholder="订单号" v-model="select.orderNo" clearable></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input placeholder="收货人" v-model="select.consignee" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input placeholder="手机号" v-model="select.phone" clearable></el-input>
          </el-form-item>
          <br />
          <el-form-item label="订单状态">
            <el-select v-model="select.orderState" clearable placeholder="请选择">
              <el-option value="已受理"></el-option>
              <el-option value="派送中"></el-option>
              <el-option value="已完成"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择时间">
            <div class="block">
              <el-date-picker
                v-model="select.date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <!-- 查询按钮 -->
            <el-button type="primary" size="small" @click="search">查询</el-button>
            <el-button type="warning" size="small" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 订单内容 -->
      <div slot="content">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
          <el-table-column prop="orderTime" label="下单时间" width="120"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址" width="300"></el-table-column>
          <el-table-column prop="deliveryTime" label="送达时间" width="120"></el-table-column>
          <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="showDetail(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 订单页脚 -->
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1,2,3,5]"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <!-- 模态框 -->
        <as-dialog @close="dialogVisible = false" :visible="dialogVisible" title="订单详情" width="800">
          <p>订单号:{{searchform.orderNo}}</p>
          <p>下单时间:{{searchform.orderTime}}</p>
          <p>手机号码:{{searchform.phone}}</p>
          <p>收货人:{{searchform.consignee}}</p>
          <p>配送地址:{{searchform.deliverAddress}}</p>
          <p>送达时间:{{searchform.deliveryTime}}</p>
          <p>用户备注:{{searchform.remarks}}</p>
          <p>订单金额:{{searchform.orderAmount}}</p>
          <p>订单状态:{{searchform.orderState}}</p>

          <!-- 尾部 -->
          <template slot="footer">
            <as-button @click="handleOk" type="primary">确定</as-button>
            <as-button @click="handleCancel" type="danger">取消</as-button>
          </template>
        </as-dialog>
      </div>
    </card>
  </div>
</template>

<script>
// 引入卡片组件
import Card from "@/components/card/card.vue";
//引入ajax函数
import { getorderlist, getorder } from "@/api/order";

//引入本地储存
import local from "@/utils/local.js";
//引入时间格式
import moment from "moment";
import AsDialog from "@/components/as-dialog/AsDialog.vue";
import AsButton from "@/components/as-button/AsButton.vue";
export default {
  components: {
    Card,
    AsDialog,
    AsButton
  },
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, // 当前页
      pageSize: 5, // 每页条数
      total: 0, // 数据总条数
      select: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: []
      },
      dialogVisible: false,
      searchform: {},
      id: ""
    };
  },
  methods: {
    //获取列表
    async getlist() {
      let { total, data } = await getorderlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.select.orderNo,
        consignee: this.select.consignee,
        phone: this.select.phone,
        orderState: this.select.orderState,
        date: this.select.date
      });
      //时间格式
      //下单时间
      data.forEach(val => {
        val.orderTime = moment(val.orderTime).format("YYYY-MM-DD HH:mm:ss");
      });
      //送达时间
      data.forEach(val => {
        val.deliveryTime = moment(val.deliveryTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        if (val.deliveryTime == "Invalid date") {
          val.deliveryTime = "未送达";
        }
      });
      //渲染
      this.tableData = data;
      this.total = total;
    },
    //查询按钮
    search() {
      this.getlist();
    },
    //跳转
    handleClick(row) {
      this.$router.push("/order/order");
      local.set("id", row.id); //存入本地
    },
    //重置
    reset() {
      (this.select.orderNo = ""),
        (this.select.consignee = ""),
        (this.select.phone = ""),
        (this.select.orderState = ""),
        (this.select.date = []);
      this.getlist();
    },
    // 查看订单详情
    showDetail(row) {
      this.dialogVisible = true;
      console.log(row);
      //渲染
      this.searchform = row;
    },

    // 确定
    handleOk() {
      this.dialogVisible = false;
    },

    // 取消
    handleCancel() {
      this.dialogVisible = false;
    },
    // 当前页面改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    }
  },
  //一进页面刷新一次
  created() {
    this.getlist();
  }
};
</script>

<style lang="less" scoped>
.order-list {
  .el-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      .el-input {
        width: 300px;
      }
    }
  }
  .el-card__body {
    .block {
      margin-top: 20px;
    }
  }
}
</style>