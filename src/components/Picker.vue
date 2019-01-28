<template>
  <div class="v-picker" @click="" v-show="isShow">
    <mt-picker :slots="slots" valueKey="name" @change="onValuesChange"></mt-picker>
  </div>
</template>

<script>
import { Picker } from 'mint-ui';
import $ from 'jquery';

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'mt-picker': Picker
  },
  data() {
    return {
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center',
        }
      ]
    }
  },
  methods: {
    onValuesChange(picker, values) {
      console.log(picker, values)
    },
    close() {
        this.$emit('isShowCallBack', false)
    }
  },
  mounted() {
    $(".v-picker").height($('#app').height());
    let tempArray = [];
    for (let i = 1; i <= 24; i++) {
      tempArray.push({
        name: `${i}小时后派送`,
        value: i
      })
    }
    this.slots[0].values = tempArray;
  }

}
</script>

<style lang="less" scoped>
.v-picker {
  background-color: gainsboro;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999;
  opacity: 0.9;
  > .picker {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>

