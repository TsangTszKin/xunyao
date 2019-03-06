<template>
  <div class="goods-save">
    <mt-header title="商家入驻申请">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

    <div id="shopApply-map"></div>

    <div class="v-content">
      <mt-field label="店铺名称" placeholder="请输入店铺名称" v-model="saveData.shopName"></mt-field>
      <ImgPicker
        label="店铺logo"
        :value="saveData.shopLogo"
        fieldKey="shopLogo"
        @changeFile="changeFile"
      />

      <a class="mint-cell mint-field">
        <!---->
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <!---->
            <span class="mint-cell-text">店铺地址</span>
            <!---->
          </div>
          <div class="mint-cell-value">
            <div>
              <input
                placeholder="请输入地址"
                type="text"
                style="font-size: inherit;"
                v-model="saveData.address"
                id="shopApply-suggestId"
                @blur="blurFunc"
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

      <!-- <mt-field
        label="经纬度"
        :readonly="true"
        placeholder="显示经纬度"
        :disableClear="true"
        :value="!saveData.longitude?'':`${saveData.longitude}，${saveData.latitude}`"
      ></mt-field>-->
      <!-- <mt-field label="地址" placeholder="请输入地址" v-model="saveData.address"></mt-field> -->
      <mt-field label="电话" placeholder="请输入电话" v-model="saveData.telephone"></mt-field>
      <mt-field label="店长姓名" placeholder="请输入店长姓名" v-model="saveData.realName"></mt-field>

      <ImgPicker
        label="身份证正面"
        :value="saveData.cardId1"
        fieldKey="cardId1"
        @changeFile="changeFile"
      />
      <ImgPicker
        label="身份证反面"
        :value="saveData.cardId2"
        fieldKey="cardId2"
        @changeFile="changeFile"
      />
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
    </div>
    <v-map @getPoint="getPoint" v-show="isShowMap"/>
  </div>
</template>

<script>
import { Button, Header, Field, Indicator, Toast } from 'mint-ui';
import ImgPicker from '@/components/ImgPicker';
import shopService from '@/api/shopService';
import common from '@/util/common';
import Map from '@/components/Map';
import $ from 'jquery';

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
    let self = this;
    let timer = setInterval(() => {
      if (!common.isEmpty(window.BMap)) {
        self.init();
        clearInterval(timer);
      }
    }, 500)
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
          this.$router.push({ name: '我的' })
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
    },
    init() {
      let self = this;
      // 百度地图API功能
      function G(id) {
        return document.getElementById(id);
      }

      var map = new BMap.Map("shopApply-map");
      map.centerAndZoom("北京", 12);                   // 初始化地图,设置城市和地图级别。

      function myFun(result) {
        var cityName = result.name;
        map.centerAndZoom(cityName, 12);
        self.city = cityName;
      }
      var myCity = new BMap.LocalCity();
      myCity.get(myFun);

      // 添加带有定位的导航控件
      var navigationControl = new BMap.NavigationControl({
        // 靠左上角位置
        anchor: BMAP_ANCHOR_TOP_LEFT,
        // LARGE类型
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: true
      });
      map.addControl(navigationControl);


      var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {          "input": "shopApply-suggestId"
          , "location": map
        });

      ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件

        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;
      });

      var myValue;
      ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        console.log("e", e)
        // self.$router.push({ name: '首页', query: { business: e.item.value.business } })
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        self.getLngAndLatBtAddressForApi(myValue)
        self.saveData.address = myValue;
        G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

        setPlace();

      });

      function setPlace() {
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun2() {
          var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
          map.centerAndZoom(pp, 18);
          map.addOverlay(new BMap.Marker(pp));    //添加标注
        }
        var local = new BMap.LocalSearch(map, { //智能搜索
          onSearchComplete: myFun2
        });
        local.search(myValue);
      }

      map.addEventListener("click", (e) => {
        MessageBox.confirm(`拾取经纬度${e.point.lng}，${e.point.lat}?`).then(action => {
          self.$emit('getPoint', { longitude: e.point.lng, latitude: e.point.lat })
        });
      });
    },
    getLngAndLatBtAddressForApi(address) {
      // shopService.getLngAndLatBtAddress(address).then(res => {
      //   if (res.data.status == 0) {
      //     this.saveData.lng = res.data.result.location.lng;
      //     this.saveData.lat = res.data.result.location.lat;
      //   } else {
      //     this.saveData.lng = null;
      //     this.saveData.lat = null;
      //     Toast("获取地址经纬度失败");
      //   }
      // })
      let self = this;
      $.ajax({
        type: "GET",
        url: "http://api.map.baidu.com/geocoder/v2/?address=%E5%B9%BF%E5%B7%9E%E5%B8%82%E6%B5%B7%E7%8F%A0%E5%8C%BA%E5%B9%BF%E5%B7%9E%E5%A1%94&output=json&ak=AuOY7KgIDlUnzBsTxL7YZeo8UAfpYXmQ",
        dataType: "jsonp",  //数据格式设置为jsonp
        jsonp: "callback",  //Jquery生成验证参数的名称
        success: function (res) {  //成功的回调函数
          // alert(res);
          console.log(res)
          if (res.status == 0) {
            self.saveData.longitude = res.result.location.lng;
            self.saveData.latitude = res.result.location.lat;
          } else {
            self.saveData.longitude = null;
            self.saveData.latitude = null;
            Toast("获取地址经纬度失败");
          }
        },
        error: function (e) {
          alert("error");
        }
      });
    },
    blurFunc(e) {
      this.getLngAndLatBtAddressForApi(e.target.value);
    }
  }
}
</script>

<style lang="less" scoped>
.goods-save {
  > div > p {
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
