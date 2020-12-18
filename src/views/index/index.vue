<template>
  <div class="layout">
    <!-- 左侧 -->
    <Left></Left>
    <!-- 右侧 -->
    <Right></Right>
  </div>
</template>

<script>
import Left from "./moudel/left.vue";
import Right from "./moudel/right.vue";
export default {
  components: {
    Left,
    Right
  }
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100%;
}
</style>