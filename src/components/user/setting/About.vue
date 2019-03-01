<template>
  <div class="v-content">
    <div class="main">
      <p class="logo">寻</p>
      <p class="name">寻药 XunYao</p>
      <p class="version">Version 1.0.0</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.v-content {
  > .main {
    padding: 70px 0;
    > .logo {
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      margin: auto;
      color: #fff;
      background-color: #38af43;
      border-radius: 10px;
      font-size: 30px;
      font-family: cursive;
    }
    > .name {
      text-align: center;
      color: #000;
      font-size: 17px;
      font-weight: bold;
      margin-top: 15px;
    }
    > .version {
      text-align: center;
      color: #000;
      font-size: 13px;
      margin-top: 5px;
    }
  }
}
</style>
