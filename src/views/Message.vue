<template>
  <div class="message">
    <mt-header title="消息">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">店铺消息列表</mt-tab-item>
      <mt-tab-item id="2">订阅</mt-tab-item>
      <mt-tab-item id="3">通知</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-cell v-for="(n, key) in 10" :key="key" :title="'即时信息 ' + n"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="(n, key) in 4" :key="key" :title="'店铺推送 ' + n"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell v-for="(n, key) in 6" :key="key" :title="'系统通知 ' + n"/>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { Navbar, TabItem, Header } from 'mint-ui';
export default {
  data() {
    return {
      selected: '1'
    }
  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'mt-header': Header,
  }
}
</script>

<style>
</style>
