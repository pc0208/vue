<template>
  <el-card>
    <div slot="header" class="clearfix">
      <!-- <span>添加账号</span> -->
      <slot name="header"></slot>
    </div>
    <!-- 内容 -->
    <!-- <div>添加1111</div> -->
    <slot name="content"></slot>
  </el-card>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>