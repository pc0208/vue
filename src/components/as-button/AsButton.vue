<template>
  <button @click="handleClick" class="as-button" :class="classObj">
    <!-- 预留插槽 将来插入内容 -->
    <slot />
  </button>
</template>

<script>
export default {
  // 接收参数
  props: {
    // 按钮类型
    type: {
      type: String,
    },
  },

  methods: {
    handleClick() {
      this.$emit('click')
    },
  },

  computed: {
    // 计算类名
    classObj() {
      return {
        'as-button-primary': this.type === 'primary',
        'as-button-danger': this.type === 'danger',
        'as-button-success': this.type === 'success',
      }
    },
  },
}
</script>

<style lang="less" scoped>
.as-button {
  min-width: 60px;
  height: 35px;
  background-color: #6495ed;
  color: #fff;
  border-radius: 4px;
  outline: none;
  border: 2px solid #fff;
}

.as-button-primary {
  background-color: #409eff;
}

.as-button-danger {
  background-color: #f56c6c;
}

.as-button-success {
  background-color: #00ff00;
}
</style>