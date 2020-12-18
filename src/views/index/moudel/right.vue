<template>
  <div class="right">
    <div class="right-nav">
      <!-- 头部导航 -->
      <RightNav></RightNav>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import RightNav from "./rightnav.vue";
export default {
  components: {
    RightNav
  }
};
</script>

<style lang="less" scoped>
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .content {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    background: #f0f2f5;
  }
}
</style>