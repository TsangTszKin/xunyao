<template>
  <div style="width: 100%;    padding-top: 20px;">
    <v-cell v-for="(n, key) in 4" :key="key+Math.random()"/>
  </div>
</template>

<script>
import Cell from '@/components/AddressPickerCell';
export default {
  components: {
    'v-cell': Cell
  },
  mounted() {
    window.scrollTo(0, 0);
  },
}
</script>

<style>
</style>
