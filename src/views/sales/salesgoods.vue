<template>
  <div class="sales-goods">
    <card>
      <span slot="header">商品统计</span>
      <div slot="content">
        <!-- 搜索表单 -->
        <el-form size="small" :inline="true">
          <el-form-item>
            <el-date-picker
              v-model="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click="search" type="primary">查询</el-button>
            <el-button @click="reset" type="success">重置</el-button>
          </el-form-item>
        </el-form>

        <!-- 使用echarts组件 -->
        <as-charts :options="options"></as-charts>
      </div>
    </card>
  </div>
</template>

<script>
//引入组件
import Card from "@/components/card/card.vue";
import AsCharts from "@/components/as-charts/AsCharts.vue";
//引入ajax函数
import { getOrderTotal } from "@/api/order";
//引入时间格式
import moment from "moment";
//引入echarts
import echarts from "echarts";
export default {
  components: {
    Card,
    AsCharts
  },
  data() {
    return {
      date: [], // 查询表单的参数
      options: {}
    };
  },
  methods: {
    // 查询
    search() {
      this.fetchData();
    },

    // 重置
    reset() {
      this.date = [];
      this.fetchData();
    },

    // 重新获取数据
    async fetchData() {
      let { data } = await getOrderTotal({
        date:
          this.date === null ? JSON.stringify([]) : JSON.stringify(this.date)
      });
      // console.log(data);

      // 处理时间格式
      data.forEach(item => {
        item.orderTime = moment(item.orderTime).format("YYYY-MM-DD HH:mm:ss");
      });

      // 渲染报表
      this.options = {
        title: "订单统计",
        legend: "金额",
        xData: data.map(item => item.orderTime),
        series: [
          {
            name: "金额",
            type: "bar",
            data: data.map(item => item.orderAmount)
          }
        ]
      };
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="less" scoped>
.sales-goods {
  // .block {
  //   margin-bottom: 30px;
  //   .demonstration {
  //     margin-right: 15px;
  //   }
  //   .el-button {
  //     margin-left: 15px;
  //   }
  // }
  // #main {
  //   width: 100%;
  //   height: 700px;
  //   background: #fff;
  // }
}
</style>