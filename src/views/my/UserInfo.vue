<template>
  <div class="goods-save">
    <mt-header title="个人信息">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <a class="mint-cell mint-field">
      <!---->
      <div class="mint-cell-left"></div>
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <!---->
          <span class="mint-cell-text">头像</span>
          <!---->
        </div>
        <div class="mint-cell-value">
          <div class="goods-ui-div">
            <img src="../../assets/images/goods.jpg">
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

    <mt-field label="姓名" placeholder="" v-model="saveData.name"></mt-field>
    <mt-field label="年龄" placeholder="" type="number" v-model="saveData.age"></mt-field>
  </div>
</template>

<script>
import { Button, Header, Field, Indicator, Toast } from 'mint-ui';

export default {
  components: {
    'mt-header': Header,
    'mt-button': Button,
    'mt-field': Field,
    'mt-button': Button
  },
  data() {
    return {
      saveData: {
        imgUrl: '',
        name: 'TT',
        age: 20
      }
    }
  },
  methods: {
    changeFile(e) {
      console.log(e);
      let src = this.getObjectURL(e.target.files[0]);
      this.saveData.imgUrl = src;
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    save() {
      Indicator.open();
      setTimeout(() => {
        Indicator.close();
        Toast({
          message: '操作成功',
          iconClass: 'fa fa-check'
        });
      }, 1000)

    }
  }
}
</script>

<style lang="less" scoped>
.goods-save {
  > p {
    // text-align: center;
    margin-top: 20px;
    padding: 0 10%;
  }
}
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
