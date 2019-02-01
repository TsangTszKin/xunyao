<template>
  <div class="message">
    <mt-header title="反馈">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

    <mt-field label="" placeholder="请留下您的宝故意意见或建议，我们将努力改进" type="textarea" rows="5" v-model="saveData.address"></mt-field>
    <mt-field label="" placeholder="留下手机号码，以便我们回复您" v-model="saveData.mobile"></mt-field>

    <div style="padding: 20px 20px;">
      <mt-button type="primary" size="large">提交</mt-button>
    </div>
  </div>
</template>

<script>
　　import { Picker, Popup, Field, Cell, Switch, Button } from 'mint-ui';
　　export default {
  name: '',
  components: {
    'mt-picker': Picker,
    'mt-popup': Popup,
    'mt-field': Field,
    'mt-cell': Cell,
    'mt-switch': Switch,
    'mt-button': Button
  },
  props: {},
  data() {
    return {
      saveData: {
        name: '',
        mobile: '',
        province: '',
        city: '',
        area: '',
        address: '',
        isDefault: false
      },
      isShowAddress: false,

    }
  },
  created() {
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

  },
  mounted() {
  }
}
</script>