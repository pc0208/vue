<template>
  <div class="home">
    <!-- 卡片列表 -->
    <el-row :gutter="20">
      <el-col :md="6" :sm="12" v-for="item in cardData" :key="item.title">
        <as-panel
          :icon="item.icon"
          :title="item.title"
          :count="item.count"
          :iconColor="item.iconColor"
          :iconSize="item.iconSize"
        ></as-panel>
      </el-col>
    </el-row>

    <!-- 使用报表组件 -->
    <as-charts :options="options"></as-charts>
  </div>
</template>

<script>
import AsPanel from "@/components/as-panel/AsPanel.vue";
import AsCharts from "@/components/as-charts/AsCharts.vue";
//引入ajax函数
import { getTotalData } from "@/api/order";
//引入echrts
import echarts from "echarts";
export default {
  components: {
    AsPanel,
    AsCharts
  },
  data() {
    return {
      // flag:false,
      // 卡片数据
      cardData: [
        {
          icon: "icon-dingdan2",
          title: "总订单",
          iconColor: "#1296DB",
          count: 0,
          iconSize: 70
        },
        {
          icon: "icon-qian1",
          title: "总销售额",
          iconColor: "#D4237A",
          count: 0,
          iconSize: 70
        },
        {
          icon: "icon-dingdan",
          title: "今日订单",
          iconColor: "#1296DB",
          count: 0,
          iconSize: 70
        },
        {
          icon: "icon-qian",
          title: "今日销售额",
          iconColor: "#1AFA29",
          count: 0,
          iconSize: 70
        }
      ],
      // 组件数据
      options: {}

      // flag: false,
    };
  },
  async mounted() {
    let res = await getTotalData(); // 发送ajax 获取首页数据
    let {
      totalOrder, // 总订单
      totalAmount, // 总销售额
      todayOrder, // 今日订单
      totayAmount, // 今日销售额
      xData, // x轴
      orderData, // 订单数据
      amountData // 金额数据
    } = res;

    // 渲染卡片
    this.cardData.forEach((item, index) => {
      item.count = [totalOrder, totalAmount, todayOrder, totayAmount][index];
    });

    // 渲染ehcarts
    this.options = {
      title: "数据统计",
      legend: ["订单", "金额"],
      xData: xData,
      series: [orderData, amountData].map((item, index) => {
        return {
          name: ["订单", "金额"][index],
          type: "line",
          data: item
        };
      })
    };

    // console.log("赋值");
    // this.flag = true
  }
};
</script>

<style lang="less" scoped>
// .right-bottom {
//   .header {
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 50px;
//     .box-card {
//       display: flex;
//       /deep/.el-card__body {
//         display: flex !important;
//         .iconfont {
//           font-size: 80px;
//           margin: 0 70px 0 10px;
//         }
//         .icon-dingdan1 {
//           color: #1296db;
//         }
//         .icon-qian1 {
//           color: #d4237a;
//         }
//         .icon-dingdan2 {
//           color: #1296db;
//         }
//         .icon-qian {
//           color: #1afa29;
//         }
//         .text {
//           text-align: center;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-evenly;
//         }
//       }
//     }
//   }
//   .content {
//     ul {
//       list-style: none;
//       display: flex;
//       justify-content: space-around;
//       margin-bottom: 50px;
//       li {
//         width: 250px;
//         height: 150px;
//         background: #fff;
//       }
//     }
//   }
//   #main {
//     width: 100%;
//     height: 600px;
//     background: #fff;
//   }
// }
</style>