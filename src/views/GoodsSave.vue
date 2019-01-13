<template>
  <div class="goods-save">
    <mt-header title="商品保存">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <a class="mint-cell mint-field">
      <!---->
      <div class="mint-cell-left"></div>
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <!---->
          <span class="mint-cell-text">商品图片</span>
          <!---->
        </div>
        <div class="mint-cell-value">
          <div class="goods-ui-div">
            <img src="../assets/images/goods.jpg" v-if="saveData.imgUrl">
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

    <mt-field label="名称" placeholder="请输入商品名称" v-model="saveData.name"></mt-field>
    <mt-field label="通用名" placeholder="请输入通用名" v-model="saveData.commonName"></mt-field>
    <mt-field label="厂家" placeholder="请输入厂家" v-model="saveData.manufactor"></mt-field>
    <mt-field label="规格" placeholder="请输入规格" v-model="saveData.size"></mt-field>
    <mt-field label="归类选项" placeholder="请输入归类选项" v-model="saveData.cate"></mt-field>
    <mt-field label="建议价格" placeholder="请输入价格" type="number" v-model="saveData.price"></mt-field>
    <mt-field label="库存" placeholder="请输入库存按钮" type="number" v-model="saveData.stock"></mt-field>

    <p>
      <mt-button type="primary" size="large" @click="save">保存</mt-button>
    </p>
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
        name: '',
        commonName: '',
        manufactor: '',
        size: '',
        cate: '',
        price: 0,
        stock: 0
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
