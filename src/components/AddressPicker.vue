<template>
  <div style="width: 100%;    padding-top: 20px;">
    <v-cell v-for="(n, key) in addressList" :data="n" :key="key" @click.native="selectAddress(n)"/>
  </div>
</template>

<script>
import Cell from '@/components/AddressPickerCell';
import userService from '@/api/userService';
import { Indicator } from 'mint-ui';
import common from '@/util/common';

export default {
  data() {
    return {
      addressList: []
    }
  },
  components: {
    'v-cell': Cell
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getAddressList();
  },
  methods: {
    getAddressList() {
      Indicator.open();
      userService.getAddressList().then(res => {
        Indicator.close();
        if (!common.isOk(res)) return
        this.addressList = res.data.list;
      })
    },
    selectAddress(address) {
      this.$emit('selectAddress', address)
    }
  }
}
</script>

<style>
</style>
