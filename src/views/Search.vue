<template>
  <div class="search">
    <mt-search
      v-model="searchValue"
      :result.sync="searchResult"
      cancel-text="取消"
      placeholder="搜索"
      :autofocus="true"
      :show="true"
      @keyup.enter.native="search"
    ></mt-search>
    <div>111</div>
  </div>
</template>

<script>
import { Search, Header, Button } from 'mint-ui';
export default {
  data() {
    return {
      searchValue: '',
      searchResult: ['搜索结果1', '搜索结果2', '搜索结果3', '搜索结果4', '搜索结果5']
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
