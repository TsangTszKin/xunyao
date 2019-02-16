<template>
  <div class="message">
    <mt-header title="收货地址">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

    <div class="v-content">
      <mt-field label="收货人" placeholder="请输入收货人姓名" v-model="saveData.receiverName"></mt-field>
      <mt-field label="联系电话" placeholder="请输入联系电话" type="number" v-model="saveData.receiverPhone"></mt-field>

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
                :value="`${saveData.province} ${saveData.city} ${saveData.district}`"
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
      <mt-field
        label="详细街道地址"
        placeholder
        type="textarea"
        rows="2"
        v-model="saveData.receiverAddress"
      ></mt-field>

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
import { Picker, Popup, Field, Cell, Switch, Button, Toast, Indicator } from 'mint-ui';
import myaddress from '@/assets/city.json'
import userService from '@/api/userService';
import common from '@/util/common';

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
        // "buyerId": 0,
        "city": "",
        // "cityId": 0,
        // "createBy": "string",
        // "createDate": 0,
        // "delFlag": "string",
        "district": "",
        // "districtId": 0,
        // "id": 0,
        "isDefault": false,
        // "isLabel": "string",
        // "postcode": "string",
        "province": "",
        // "provinceId": 0,
        "receiverAddress": "",
        "receiverName": "",
        "receiverPhone": "",
        // "remarks": "string",
        // "updateBy": "string",
        // "updateDate": 0
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
        this.saveData.province = values[0];
        this.saveData.city = values[1];
        this.saveData.district = values[2];
      }
    },
    save() {

      let data = common.deepClone(this.saveData);
      data.isDefault == true ? data.isDefault = 1 : data.isDefault = 0;
      Indicator.open();
      userService.saveAddress(data).then(res => {
        Indicator.close();
        if (!common.isOk(res)) return
        Toast({
          message: '操作成功',
          iconClass: 'fa fa-check'
        });
      })

    },
    getInfo(id) {

      Indicator.open();
      userService.saveAddressInfo(id).then(res => {
        Indicator.close();
        if (!common.isOk(res)) return
        let data = common.deepClone(res.data.data);
        data.isDefault == true ? data.isDefault = 1 : data.isDefault = 0;
        this.saveData = data;
      })

    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0
      // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
      //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });

    if (!common.isEmpty(this.$route.params.id)) {
      this.getInfo(this.$route.params.id);
    }
  }
}
</script>