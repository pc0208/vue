<template>
  <div class="as-panel">
    <div class="icon-wrapper">
      <i class="iconfont" :class="icon" :style="{color: iconColor,fontSize:iconSize+'px'}"></i>
    </div>
    <div class="content-right">
      <h1 class="title">{{ title }}</h1>
      <span class="count">{{ count }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 参数

    // 图标
    icon: {
      type: String
    },
    // 标题
    title: {
      type: String
    },
    // 数字
    count: {
      type: Number
    },
    // 图标颜色
    iconColor: {
      type: String
    },
    //图标大小
    iconSize: {
      type: Number
    }
  }
};
</script>

<style lang="less" scoped>
.as-panel {
  background-color: #fff;
  width: 100%;
  height: 120px;
  border-radius: 4px;
  box-shadow: 1px 1px 5px #ccc;
  display: flex;
  margin-bottom: 20px;
  .icon-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-right {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .count {
      font-size: 24px;
      color: #ccc;
    }
  }
}
</style>