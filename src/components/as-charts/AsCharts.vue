<template>
  <!-- echarts报表容器 -->
  <div id="box" style="height: 400px; background-color: #fff; padding: 20px;"></div>
</template>

<script>
import Echarts from "echarts";

// import ECharts from 'vue-echarts/components/ECharts'

export default {
  props: {
    // 接收参数：就接收一个配置对象即可
    options: {
      type: Object
    }
  },

  methods: {
    // 绘制直线图
    drawLine() {
      // a. 初始化
      let myCharts = Echarts.init(document.getElementById("box"));

      // b. 写配置 [去官网查询]
      let option = {
        // 标题
        title: {
          text: this.options.title, // 1. 动态的
          show: true,
          textStyle: {
            color: "#333"
          }
        },

        // 工具提示
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },

        // 图例
        legend: {
          data: this.options.legend // 2. 动态的
        },

        // 网格
        grid: {
          top: "20%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        // 工具盒子
        toolbox: {
          feature: {
            saveAsImage: {},
            dataView: {},
            magicType: {
              type: ["line", "bar"]
            }
          }
        },
        // x轴
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.options.xData // 3. x轴的数据
        },
        // y轴
        yAxis: {
          type: "value"
        },
        // y轴核心数据
        // 4. y轴的数据
        series: this.options.series
      };

      // c. 使用配置创建报表
      myCharts.setOption(option);
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.drawLine()
    //   console.log('渲染子组件', this.options)
    // }, 500)

    // console.log("渲染子组件", this.options);
    this.drawLine();
  },

  // 侦听器
  watch: {
    options: {
      handler() {
        // console.log("数据变化...");
        this.drawLine();
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
</style>