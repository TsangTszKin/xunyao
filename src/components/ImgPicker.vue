<template>
  <a class="mint-cell mint-field">
    <!---->
    <div class="mint-cell-left"></div>
    <div class="mint-cell-wrapper">
      <div class="mint-cell-title">
        <!---->
        <span class="mint-cell-text">{{label}}</span>
        <!---->
      </div>
      <div class="mint-cell-value">
        <div class="goods-ui-div">
          <img :src="value" v-if="value">
          <i v-else class="fa fa-camera fa-lg"></i>
          <input
            placeholder="请选择商品图片"
            type="file"
            accept="image/jpg, image/png, image/jpeg, image/gif, image/svg"
            @change="changeFile"
          >
        </div>
        <div class="mint-field-clear" style="display: none;">
          <i class="mintui mintui-field-error"></i>
        </div>
        <span class="mint-field-state is-default">
          <i class="mintui mintui-field-default"></i>
        </span>
        <div class="mint-field-other"></div>
      </div>
    </div>
    <div class="mint-cell-right"></div>
    <!---->
  </a>
</template>

<script>
import commonService from '@/api/commonService';
import { Indicator } from 'mint-ui';

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    fieldKey: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: '图片'
    }
  },
  data() {
    return {
      imgUrl: ''
    }
  },
  methods: {
    changeFile(e) {
      // console.log(e);
      if (e.target.files.length <= 0) return
      Indicator.open('上传中...');
      commonService.fileUpload(e).then((res) => {
        Indicator.close();
        if (res.data.code == 0) {
          let filepath = res.data.url;
          this.imgUrl = filepath;
          this.$emit("changeFile", filepath, this.fieldKey);
        }
      }).catch(() => Indicator.close())
      //   let src = this.getObjectURL(e.target.files[0]);

    },
  },
  watch: {
    value(newValue, oldValue) {
      this.imgUrl = newValue;
    }
  }
}
</script>

<style lang="less" scoped>
.goods-ui-div {
  height: 50px;
  width: 50px;
  position: relative;
  border: 1px dashed gainsboro;
  margin: 5px 0;

  display: webkit-flex;
  display: flex;
  justify-content: center;
  overflow: hidden;
  align-items: center;
  > img {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  > input {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 999;
    opacity: 0;
  }
}
</style>
