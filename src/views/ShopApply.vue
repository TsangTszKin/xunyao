<template>
  <div class="goods-save">
    <mt-header title="商家入驻申请">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

    <mt-field label="店铺名称" placeholder="请输入店铺名称" v-model="saveData.shopName"></mt-field>
    <ImgPicker
      label="店铺logo"
      :value="saveData.shopLogo"
      fieldKey="shopLogo"
      @changeFile="changeFile"
    />
    <mt-field label="地址" placeholder="请输入地址" v-model="saveData.address"></mt-field>
    <mt-field label="电话" placeholder="请输入电话" v-model="saveData.telephone"></mt-field>
    <mt-field label="店长姓名" placeholder="请输入店长姓名" v-model="saveData.realName"></mt-field>
    <a class="mint-cell mint-field">
      <!---->
      <div class="mint-cell-left"></div>
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <!---->
          <span class="mint-cell-text">经纬度</span>
          <!---->
        </div>
        <div class="mint-cell-value">
          <div>
            <input
              placeholder="请输入经纬度"
              type="text"
              @click="isShowMap = true"
              style="font-size: inherit;"
              :value="!saveData.longitude?'':`${saveData.longitude}，${saveData.latitude}`"
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
    <ImgPicker label="身份证正面" :value="saveData.cardId1" fieldKey="cardId1" @changeFile="changeFile"/>
    <ImgPicker label="身份证反面" :value="saveData.cardId2" fieldKey="cardId2" @changeFile="changeFile"/>
    <ImgPicker
      label="药品经营许可证"
      :value="saveData.drugBusinessCert"
      fieldKey="drugBusinessCert"
      @changeFile="changeFile"
    />
    <ImgPicker
      label="食品经营许可证"
      :value="saveData.foodBusinessCert"
      fieldKey="foodBusinessCert"
      @changeFile="changeFile"
    />
    <ImgPicker
      label="营业执照"
      :value="saveData.businessLicense"
      fieldKey="businessLicense"
      @changeFile="changeFile"
    />
    <ImgPicker
      label="药品经营质量管理规范"
      :value="saveData.drugQualityCert"
      fieldKey="drugQualityCert"
      @changeFile="changeFile"
    />
    <ImgPicker
      label="执业药师注册证"
      :value="saveData.drugRegisterCert"
      fieldKey="drugRegisterCert"
      @changeFile="changeFile"
    />
    <ImgPicker
      label="开户许可证"
      :value="saveData.openAccountCert"
      fieldKey="openAccountCert"
      @changeFile="changeFile"
    />
    <mt-field label="备注" placeholder="请输入备注" v-model="saveData.remarks"></mt-field>

    <p>
      <mt-button type="primary" size="large" @click="save">保存</mt-button>
    </p>
    <v-map @getPoint="getPoint" v-show="isShowMap"/>
  </div>
</template>

<script>
import { Button, Header, Field, Indicator, Toast } from 'mint-ui';
import ImgPicker from '@/components/ImgPicker';
import shopService from '@/api/shopService';
import common from '@/util/common';
import Map from '@/components/Map';

export default {
  components: {
    'mt-header': Header,
    'mt-button': Button,
    'mt-field': Field,
    'mt-button': Button,
    ImgPicker,
    'v-map': Map
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  data() {
    return {
      saveData: {
        'shopName': '',// '店铺名称',
        'shopLogo': '',// '店铺logo',(图片)
        'address': '',// '地址',
        'telephone': '',// '电话',
        'realName': '',// '店长姓名',
        'cardId1': '',// '身份证正面',(图片)
        'cardId2': '',//'身份证反面',(图片)
        'drugBusinessCert': '',// '药品经营许可证',(图片)
        'foodBusinessCert': '',// '食品经营许可证',(图片)
        'businessLicense': '',// '营业执照',(图片)
        'drugQualityCert': '',// '药品经营质量管理规范',(图片)
        'drugRegisterCert': '',// '执业药师注册证',(图片)
        'remarks': '',//'备注',
        'longitude': '',
        'latitude': ''
      },
      isShowMap: false
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
      console.log(this.saveData);
      if (this.verify()) {
        Indicator.open();
        shopService.shopApply(this.saveData).then(res => {
          Indicator.close();
          if (!common.isOk(res)) return
          Toast({
            message: '提交成功',
            iconClass: 'fa fa-check'
          });
        }).catch(() => {
          Indicator.close();
        })
      }

    },
    verify() {
      if (common.isEmpty(this.saveData.shopName)) {
        Toast("请输入店铺名称");
        return false
      }
      if (common.isEmpty(this.saveData.shopLogo)) {
        Toast("请选择店铺logo");
        return false
      }
      if (common.isEmpty(this.saveData.address)) {
        Toast("请输入店铺地址");
        return false
      }
      if (common.isEmpty(this.saveData.telephone)) {
        Toast("请输入电话");
        return false
      }
      if (common.isEmpty(this.saveData.realName)) {
        Toast("请输入店长姓名");
        return false
      }
      if (common.isEmpty(this.saveData.cardId1)) {
        Toast("请选择身份证正面");
        return false
      }
      if (common.isEmpty(this.saveData.cardId2)) {
        Toast("请选择身份证反面");
        return false
      }
      if (common.isEmpty(this.saveData.drugBusinessCert)) {
        Toast("请选择药品经营许可证");
        return false
      }
      if (common.isEmpty(this.saveData.foodBusinessCert)) {
        Toast("请选择食品经营许可证");
        return false
      }
      if (common.isEmpty(this.saveData.businessLicense)) {
        Toast("请选择营业执照");
        return false
      }
      if (common.isEmpty(this.saveData.drugQualityCert)) {
        Toast("请选择药品经营质量管理规范");
        return false
      }
      if (common.isEmpty(this.saveData.drugRegisterCert)) {
        Toast("请选择执业药师注册证");
        return false
      }
      if (common.isEmpty(this.saveData.openAccountCert)) {
        Toast("请选择开户许可证");
        return false
      }
      if (common.isEmpty(this.saveData.longitude) || common.isEmpty(this.saveData.latitude)) {
        Toast("请选择经纬度");
        return false
      }
      return true

    },
    getPoint(point) {
      this.isShowMap = false;
      this.saveData.longitude = point.longitude;
      this.saveData.latitude = point.latitude;
    }
  }
}
</script>

<style lang="less" scoped>
.goods-save {
  > p {
    // text-align: center;
    margin: 20px;
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
