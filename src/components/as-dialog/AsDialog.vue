<template>
  <div @click="handleClose" class="as-dialog" v-show="visible">
    <div @click.stop class="dialog-wrapper" :style="{ width: width + 'px' }">
      <div class="header">
        <span class="title">{{ title }}</span>
        <span @click="handleClose">X</span>
      </div>

      <div class="content">
        <!-- 这里预留一个匿名插槽 将来插入内容 -->
        <slot></slot>
      </div>

      <div class="footer">
        <!-- 预留了一个具名插槽 将来外部的内容可以插入这个位置 -->
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 插槽显示或隐藏
    visible: {
      type: Boolean,
    },

    // 标题
    title: {
      type: String,
    },

    // 宽度
    width: {
      type: String,
    },
  },
  methods: {
    // 关闭
    handleClose() {
      // 子传父 告诉父亲关闭模态框
      this.$emit('close')
    },
  },
}
</script>

<style lang="less" scoped>
.as-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);

  .dialog-wrapper {
    display: flex;
    flex-direction: column;
    width: 50%;
    min-height: 300px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 1px 1px 5px #000;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 0 0 60px;
      padding: 0 20px;
      box-sizing: border-box;
      background-color: #17415b;
      color: #fff;
    }

    .content {
      flex: 1;
      padding: 20px;
      box-sizing: border-box;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 0 0 60px;
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
}
</style>