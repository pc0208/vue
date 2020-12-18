<template>
  <div class="order">
    <Card>
      <!-- 标题 -->
      <div slot="header">修改订单</div>
      <!-- 内容 -->
      <div slot="content">
        <!-- 表单 -->
        <el-form ref="form" :model="tableData" label-width="80px">
          <el-form-item label="订单号">
            <el-input v-model="tableData.orderNo"></el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <div class="block">
              <el-date-picker v-model="tableData.orderTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="送达时间">
            <div class="block">
              <el-date-picker v-model="tableData.deliveryTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="tableData.phone"></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input v-model="tableData.consignee"></el-input>
          </el-form-item>
          <el-form-item label="配送地址">
            <el-input v-model="tableData.deliverAddress"></el-input>
          </el-form-item>
          <el-form-item label="用户备注">
            <el-select v-model="tableData.remarks" placeholder="请选择活动口味">
              <el-option value="不辣"></el-option>
              <el-option value="微辣"></el-option>
              <el-option value="中辣"></el-option>
              <el-option value="特辣"></el-option>
              <el-option value="变态辣"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单金额">
            <el-input v-model="tableData.orderAmount"></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="tableData.orderState" placeholder="点击查看">
              <el-option label="已受理" value="shanghai"></el-option>
              <el-option label="派送中" value="beijing"></el-option>
              <el-option label="已完成" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="cancel">取消</el-button>
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
import { getorder, geteditlist } from "@/api/order";
//引入本地储存
import local from "@/utils/local.js";
export default {
  components: {
    Card
  },
  data() {
    return {
      tableData: {},
      id: ""
    };
  },
  methods: {
    //获取当前订单信息
    async detail() {
      this.id = local.get("id"); //从本地取id
      let { data } = await getorder({ id: this.id });
      //渲染
      this.tableData = data;
    },
    async onSubmit() {
      let { code } = await geteditlist({
        id: this.id,
        orderNo: this.tableData.orderNo,
        orderTime: this.tableData.orderTime,
        phone: this.tableData.phone,
        consignee: this.tableData.consignee,
        deliverAddress: this.tableData.deliverAddress,
        deliveryTime: this.tableData.deliveryTime,
        remarks: this.tableData.remarks,
        orderAmount: this.tableData.orderAmount,
        orderState: this.tableData.orderState
      });
      //成功之后跳转回订单列表
      if (code == 0) {
        this.$router.push("/order/orderlist");
      }
    },
    //取消
    cancel() {
      this.$router.push("/order/orderlist");
    }
  },
  //一进页面就刷新
  created() {
    this.detail();
  }
};
</script>

<style lang="less" scoped>
.order {
  .el-form {
    .el-input {
      width: 300px;
    }
  }
}
</style>