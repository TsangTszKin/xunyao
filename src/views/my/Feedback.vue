<template>
  <div class="message">
    <mt-header title="反馈">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

    <div class="v-content">
      <mt-radio
        title="反馈类型"
        v-model="saveData.type"
        v-if="!saveData.type"
        :options="[
          {
            label: '建议',
            value: 1
          },
          {
            label: '意见',
            value: 2
          },
          {
            label: '投诉',
            value: 3
          }
        ]"
      ></mt-radio>

      <div v-else>
        <mt-field label="类型" :readonly="true" :value="getType"></mt-field>
        <mt-field
          label="内容"
          placeholder="请留下您的宝贵意见或建议，我们将努力改进"
          type="textarea"
          rows="5"
          v-model="saveData.remarks"
        ></mt-field>
        <mt-field label="称呼" placeholder="您的称呼" v-model="saveData.name"></mt-field>
        <mt-field label="手机号" placeholder="留下手机号码，以便我们回复您" type="tel" v-model="saveData.telephone"></mt-field>
        <mt-field label="QQ" placeholder="您的QQ（选填）" v-model="saveData.qq"></mt-field>
        <mt-field label="微信号" placeholder="您的微信号（选填）" v-model="saveData.weixin"></mt-field>
      </div>

      <div style="padding: 20px 20px;" v-if="saveData.type">
        <mt-button type="primary" size="large" @click="save">提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Picker, Popup, Field, Cell, Switch, Button, Toast, Indicator, Radio } from 'mint-ui';
import common from '@/util/common';
import userService from '@/api/userService';

export default {
  name: '',
  components: {
    'mt-picker': Picker,
    'mt-popup': Popup,
    'mt-field': Field,
    'mt-cell': Cell,
    'mt-switch': Switch,
    'mt-button': Button,
    'mt-radio': Radio
  },
  props: {},
  data() {
    return {
      saveData: {
        "name": "",
        "qq": "",
        "remarks": "",
        "telephone": "",
        "weixin": "",
        "type": null
      },
    }
  },
  computed: {
    getType() {
      let typeStr = '';
      switch (this.saveData.type) {
        case 1:
          typeStr = '建议';
          break;
        case 2:
          typeStr = '意见';
          break;
        case 3:
          typeStr = '投诉';
          break;
        default:
          break;
      }
      return typeStr
    }
  },
  created() {
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    save() {
      if (!this.verify()) return
      Indicator.open();
      userService.submitFeedback(this.saveData).then(res => {
        Indicator.close();
        if (!common.isOk(res)) return
        Toast({
          message: '操作成功',
          iconClass: 'fa fa-check'
        });
        let seft = this;
        setTimeout(() => {
          seft.goBack();
        }, 1000)
      })
    },
    verify() {
      if (common.isEmpty(this.saveData.remarks)) {
        Toast("请填写您的建议");
        return false
      }
      if (common.isEmpty(this.saveData.name)) {
        Toast("请填写您的姓名");
        return false
      }
      if (common.isEmpty(this.saveData.telephone)) {
        Toast("请填写您的联系电话");
        return false
      }
      return true
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  }
}
</script>