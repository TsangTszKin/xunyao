<template>
  <div class="denomination" :class="{'selected': isSelected}" @click="change" v-if="type == 1">{{money}}元</div>
  <div class="denomination" :class="{'selected': isSelected}" @click="change" v-else>其他金额</div>
</template>

<script>
export default {
  props: {
    type: {type: Number, default: 1},
    money: { type: Number, defalut: 0 },
    isSelected: { type: Boolean, defalut: false }
  },
  methods: {
    change() {
      this.$emit("change", this.money)
    }
  }
}
</script>

<style lang="less" scoped>
.denomination {
  width: 80px;
  height: 40px;
  border: 1px solid #38af43;
  border-radius: 10px;
  line-height: 40px;
  text-align: center;
  color: #000;
  // margin-bottom: 15px;
}
.selected {
  background-color: #38af43;
  color: #fff;
}
</style>
