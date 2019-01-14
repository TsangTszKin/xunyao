<template>
  <div class="search">
    <mt-search
      v-model="searchValue"
      cancel-text="取消"
      placeholder="搜索"
      :autofocus="true"
      :show="true"
      @keyup.enter.native="search"
    ></mt-search>
  </div>
</template>

<script>
import { Search, Header, Button } from 'mint-ui';
export default {
  data() {
    return {
      searchValue: ''
    }
  },
  components: {
    'mt-header': Header,
    'mt-search': Search
  },
  methods: {
    search() {
      this.$messagebox("搜索")
    }
  },
  watch: {
    searchValue: function (newvs, oldvs) {
      console.log("newvs", newvs);
      console.log("oldvs", oldvs);
      if (!newvs) {
        this.$router.go(-1);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
}
</style>
