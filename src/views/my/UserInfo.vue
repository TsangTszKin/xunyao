<template>
  <div class="goods-save">
    <mt-header title="个人信息">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <i slot="right" v-show="status === 0" @click="status = 1">编辑</i>
      <i slot="right" v-show="status === 1" @click="status = 0">退出编辑</i>
    </mt-header>

    <div class="v-content" v-show="status === 1">
      <ImgPicker label="头像" :value="saveData.imgUrl" fieldKey="imgUrl" :limit="60" @changeFile="changeFile"/>

      <mt-field label="昵称" placeholder v-model="saveData.name"></mt-field>
      <mt-field label="真实姓名" :placeholder="saveData.realname2" v-model="saveData.realname"></mt-field>
      <a class="mint-cell mint-field" @click="openDatePicker">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text">出生日期</span>
          </div>
          <div class="mint-cell-value" style="position: relative;">
            <div>{{saveData.borndate?saveData.borndate:'选择出生日期'}}</div>
            <i
              class="fa fa-angle-right fa-lg"
              style="position: absolute;right: 10px;font-size: 14px;top: 4px;"
            ></i>
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
      </a>
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

    <div class="v-content" v-show="status === 0">
      <ImgPicker :disabled="true" label="头像" :value="saveData.imgUrl" fieldKey="imgUrl"/>
      <mt-cell title="昵称" :value="saveData.name"></mt-cell>
      <mt-cell title="真实姓名" :value="saveData.realname2"></mt-cell>
      <mt-cell title="出生日期" :value="saveData.borndate"></mt-cell>
      <mt-cell title="手机号" :value="saveData.mobile"></mt-cell>
      <mt-cell title="身份证号" :value="saveData.idCard"></mt-cell>
      <mt-cell title="性别" :value="saveData.sex == 1?'男':'女'"></mt-cell>
    </div>

    <mt-datetime-picker
      ref="datePicker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="datePickerComfirm"
      :startDate="startDate"
      :endDate="endDate"
    ></mt-datetime-picker>
  </div>
</template>

<script>
import { Button, Header, Field, Indicator, Toast, Radio, DatetimePicker, Cell } from 'mint-ui';
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
    'mt-radio': Radio,
    'mt-datetime-picker': DatetimePicker,
    'mt-cell': Cell
  },
  data() {
    return {
      status: 0,//0只读状态，1读写状态
      saveData: {
        imgUrl: this.$store.state.user.user.headimgurl,
        name: this.$store.state.user.user.nickname,
        mobile: this.$store.state.user.user.mobile,
        idCard: this.$store.state.user.user.idCard,
        sex: String(this.$store.state.user.user.sex),
        realname: '',
        borndate: this.$store.state.user.user.borndate,
        realname2: common.isEmpty(this.$store.state.user.user.realname) ? '' : String(this.$store.state.user.user.realname).substr(0, 1) + "**",
        realname3: this.$store.state.user.user.realname,
      },
      startDate: new Date(),
      endDate: new Date()
    }
  },
  methods: {
    datePickerComfirm(value) {
      // console.log(common.formatDate(new Date(value)));
      this.saveData.borndate = common.formatDate(new Date(value));
    },
    openDatePicker() {
      this.$refs.datePicker.open();
    },
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
      if (!common.isPhone(this.saveData.mobile)) {
        Toast("请填写正确的手机号");
        return
      }
      if (!common.isIDCardNo(this.saveData.idCard)) {
        Toast("请填写正确的身份证号");
        return
      }
      let self = this;
      Indicator.open();
      userService.updateUser(this.saveData.mobile, this.saveData.name, this.saveData.imgUrl, this.saveData.idCard, this.saveData.sex, common.isEmpty(this.saveData.realname) ? this.saveData.realname3 : this.saveData.realname, this.saveData.borndate).then(res => {
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
        res.data.loginUser.user.borndate = res.data.loginUser.borndate;
        res.data.loginUser.user.sex = res.data.loginUser.sex;
        res.data.loginUser.user.realname = res.data.loginUser.realname;
        res.data.loginUser.user.type = res.data.loginUser.type;
        localStorage.user = JSON.stringify(res.data.loginUser.user);
        this.$store.commit("CHANGE_USER_INFO", res.data.loginUser.user);
      })
    }
  },
  beforeMount() {

  },
  mounted() {
    window.scrollTo(0, 0);
    console.log(this.$store.state.user.user);
    this.startDate = new Date('1919-01-01');
    this.endDate = new Date('2019-01-01');
    console.log("startDate", this.startDate);
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
