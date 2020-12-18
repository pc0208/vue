<template>
  <div class="error">
    <img src="@/assets/imgs/404.jpg" style="width: 100%;
        height: 100%;" alt />
    <button @click="back" type="primary" class="btn">BACK HOME</button>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.error {
  width: 100%;
  height: 100%;
  position: relative;
  .btn {
    position: fixed;
    top: 62.5%;
    left: 20%;
    width: 200px;
    height: 45px;
    background: #0195EB;
    border: 0;
    border-radius: 25px;
    color: #DEEEEF;
    font-size: 20px;
    
  }
}
</style>