<template>
  <div class="goods-save">
    <mt-header title="个人信息">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

    <div class="v-content">
      <ImgPicker label="头像" :value="saveData.imgUrl" fieldKey="imgUrl" @changeFile="changeFile"/>

      <mt-field label="昵称" placeholder v-model="saveData.name"></mt-field>
      <mt-field label="真实姓名" :placeholder="saveData.realname2" v-model="saveData.realname"></mt-field>
      <!-- <mt-field label="性别" placeholder v-model="saveData.name"></mt-field> -->
      <mt-field label="手机号" placeholder type="number" v-model="saveData.mobile"></mt-field>
      <mt-field label="身份证号" placeholder v-model="saveData.idCard"></mt-field>
      <mt-radio
        title="性别"
        v-model="saveData.sex"
        :options="[{
          label: '男',
          value: '1'
        },{
          label: '女',
          value: '0'
        }]"
        class="sex-box"
      ></mt-radio>
      <p>
        <mt-button type="primary" size="large" @click="save">保存</mt-button>
      </p>
    </div>
  </div>
</template>

<script>
import { Button, Header, Field, Indicator, Toast, Radio } from 'mint-ui';
import ImgPicker from '@/components/ImgPicker';
import common from '@/util/common';
import userService from '@/api/userService';

export default {
  components: {
    'mt-header': Header,
    'mt-button': Button,
    'mt-field': Field,
    'mt-button': Button,
    ImgPicker,
    'mt-radio': Radio
  },
  data() {
    return {
      saveData: {
        imgUrl: this.$store.state.user.user.headimgurl,
        name: this.$store.state.user.user.nickname,
        mobile: this.$store.state.user.user.mobile,
        idCard: this.$store.state.user.user.idCard,
        sex: String(this.$store.state.user.user.sex),
        realname: '',
        realname2: common.isEmpty(this.$store.state.user.user.realname) ? '' : String(this.$store.state.user.user.realname).substr(0, 1) + "**",
        realname3: this.$store.state.user.user.realname,
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
      let self = this;
      Indicator.open();
      userService.updateUser(this.saveData.mobile, this.saveData.name, this.saveData.imgUrl, this.saveData.idCard, this.saveData.sex, common.isEmpty(this.saveData.realname) ? this.saveData.realname3 : this.saveData.realname).then(res => {
        Indicator.close();
        if (!common.isOk(res)) return
        Toast({
          message: '操作成功',
          iconClass: 'fa fa-check'
        });
        this.getMyHomeInfo();
        setTimeout(() => {
          self.$router.go(-1);
        }, 1000)
      })

    },
    getMyHomeInfo() {
      userService.getMyHomeInfo().then(res => {
        if (!common.isOk(res)) return
        this.doOrderCount = res.data.doOrderCount;
        res.data.loginUser.user.id = res.data.loginUser.id;
        res.data.loginUser.user.idCard = res.data.loginUser.idCard;
        res.data.loginUser.user.sex = res.data.loginUser.sex;
        res.data.loginUser.user.realname = res.data.loginUser.realname;
        res.data.loginUser.user.type = res.data.loginUser.type;
        localStorage.user = JSON.stringify(res.data.loginUser.user);
        this.$store.commit("CHANGE_USER_INFO", res.data.loginUser.user);
      })
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    console.log(this.$store.state.user.user)
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
