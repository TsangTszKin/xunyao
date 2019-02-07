<template>
  <div class="message">
    <mt-header title="收货地址">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

    <div class="v-content">
      <mt-field label="收货人" placeholder="请输入收货人姓名" v-model="saveData.name"></mt-field>
      <mt-field label="联系电话" placeholder="请输入联系电话" v-model="saveData.mobile"></mt-field>

      <a class="mint-cell mint-field">
        <!---->
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <!---->
            <span class="mint-cell-text">省份城市</span>
            <!---->
          </div>
          <div class="mint-cell-value">
            <div style="width: 100%;">
              <input
                placeholder="请选择省份城市"
                type="text"
                @click="isShowAddress = true"
                style="font-size: inherit;width: 100%;"
                :value="`${myAddressProvince} ${myAddressCity} ${myAddresscounty}`"
                readonly
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
      <mt-field label="详细街道地址" placeholder type="textarea" rows="2" v-model="saveData.address"></mt-field>

      <mt-cell title="设为默认地址">
        <mt-switch v-model="saveData.isDefault"></mt-switch>
      </mt-cell>

      <div style="padding: 20px 20px;">
        <mt-button type="primary" size="large" @click="save">保存</mt-button>
      </div>
    </div>

    <mt-popup v-model="isShowAddress" position="bottom" style="width: 100%;">
      <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
　　import { Picker, Popup, Field, Cell, Switch, Button, Toast } from 'mint-ui';
　　import myaddress from '@/assets/city.json'
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
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress), //省份数组
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot4'
        }, {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      myAddressProvince: '',
      myAddressCity: '',
      myAddresscounty: '',
    }
  },
  created() {
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    closeShowAddress(e) {
      if (e.target == this.$refs.selectAddress) {
        this.isShowAddress = !this.isShowAddress;
      }
    },
    onMyAddressChange(picker, values) {
      if (myaddress[values[0]]) { //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
        picker.setSlotValues(1, Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2, myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
        this.myAddressProvince = values[0];
        this.myAddressCity = values[1];
        this.myAddresscounty = values[2];
      }
    },
    save() {
      Toast({
        message: '操作成功',
        iconClass: 'fa fa-check'
      });
      let seft = this;
      setTimeout(() => {
        seft.goBack();
      }, 1000)
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0
      // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
      //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });
  }
}
</script>