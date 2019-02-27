<template>
  <div class="goods-save">
    <mt-header title="个人信息">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

    <div class="v-content">
      <ImgPicker label="头像" :value="saveData.imgUrl" fieldKey="imgUrl" @changeFile="changeFile"/>

      <mt-field label="名称" placeholder v-model="saveData.name"></mt-field>
      <mt-field label="手机号" placeholder type="number" v-model="saveData.mobile"></mt-field>

      <p>
        <mt-button type="primary" size="large" @click="save">保存</mt-button>
      </p>
    </div>
  </div>
</template>

<script>
import { Button, Header, Field, Indicator, Toast } from 'mint-ui';
import ImgPicker from '@/components/ImgPicker';
import common from '@/util/common';
import userService from '@/api/userService';

export default {
  components: {
    'mt-header': Header,
    'mt-button': Button,
    'mt-field': Field,
    'mt-button': Button,
    ImgPicker
  },
  data() {
    return {
      saveData: {
        imgUrl: this.$store.state.user.user.headimgurl,
        name: this.$store.state.user.user.nickname,
        mobile: this.$store.state.user.user.mobile
      }
    }
  },
  methods: {
    changeFile(src, fieldKey) {
      this.saveData[fieldKey] = src;
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
      userService.updateUser(this.saveData.mobile, this.saveData.name, this.saveData.imgUrl).then(res => {
        Indicator.close();
        if (!common.isOk(res)) return
        Toast({
          message: '操作成功',
          iconClass: 'fa fa-check'
        });
      })

    }
  },
  mounted() {
    window.scrollTo(0, 0);
  }
}
</script>

<style lang="less" scoped>
.goods-save {
  > .v-content {
    > p {
      margin: 20px;
      padding: 0 10%;
    }
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
