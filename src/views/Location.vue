<template>
  <div class="location">
    <mt-header title="搜索地址">
      <mt-button icon="back" slot="left" @click="$router.push({name: '首页'})"></mt-button>
    </mt-header>
    <div id="component-map"></div>
    <div class="search-panel">
      <div id="component-map-result">
        <p @click="$router.push({name: '城市选择'})">
          <i class="fa fa-map-marker fa-lg"></i>
          {{this.city}}
          <i class="fa fa-sort-down fa-lg"></i>
        </p>
        <div class="search" style="width: calc(100% - 90px);">
          <input type="text" id="suggestId" size="20" :value="this.city" placeholder="请输入地址">
        </div>
        <div class="v-clear"></div>
      </div>
      <div
        id="searchResultPanel"
        style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"
      ></div>
    </div>
  </div>
</template>

<script>
import common from '@/util/common';
import { MessageBox, Header } from 'mint-ui';
import $ from 'jquery';

export default {
  data() {
    return {
      city: '定位中'
    }
  },
  components: {
    'mt-header': Header,
  },
  mounted() {
    let self = this;
    if (!common.isEmpty(this.$route.query.city)) {
      this.city = this.$route.query.city;
    } else {

    }

    let timer = setInterval(() => {
      if (!common.isEmpty(window.BMap)) {
        self.init();
        clearInterval(timer);
      }
    }, 500)



  },
  methods: {
    getLngAndLatBtAddressForApi(address, business) {
      let self = this;
      $.ajax({
        type: "GET",
        url: `http://api.map.baidu.com/geocoder/v2/?address=${address}&output=json&ak=AuOY7KgIDlUnzBsTxL7YZeo8UAfpYXmQ`,
        dataType: "jsonp",  //数据格式设置为jsonp
        jsonp: "callback",  //Jquery生成验证参数的名称
        success: function (res) {  //成功的回调函数
          // alert(res);
          console.log("getLngAndLatBtAddressForApi", res)
          if (res.status == 0) {
            self.$router.push({ name: '首页', query: { business: business, lng: res.result.location.lng, lat: res.result.location.lat } })
          } else {
            Toast("获取地址经纬度失败");
          }
        },
        error: function (e) {
          alert("error");
        }
      });
    },
    init() {
      let self = this;
      // 百度地图API功能
      function G(id) {
        return document.getElementById(id);
      }

      var map = new BMap.Map("component-map");
      map.centerAndZoom("北京", 12);                   // 初始化地图,设置城市和地图级别。

      function myFun(result) {
        var cityName = result.name;
        map.centerAndZoom(cityName, 12);
        self.city = cityName;
      }
      var myCity = new BMap.LocalCity();
      if (common.isEmpty(this.$route.query.city))
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
        {          "input": "suggestId"
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

        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        self.getLngAndLatBtAddressForApi(myValue, e.item.value.business);
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

      document.getElementById("suggestId").focus();
    }
  }
}
</script>

<style lang="less" scoped>
.location {
  height: 100%;
  width: 100%;
  // position: fixed;
  // top: 0;
  z-index: 999;
  > #component-map {
    height: 100%;
    display: none;
  }
  > .search-panel {
    position: fixed;
    top: 40px;
    width: 100%;
    > #component-map-result {
      > p {
        width: 80px;
        float: left;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 1; //四行
        -webkit-box-orient: vertical;
        overflow: hidden;
        position: relative;

        > i.fa-map-marker {
          margin: 0 5px;
          font-size: 12px;
          position: relative;
          top: -3px;
        }
        > i.fa-sort-down {
          margin: 0 5px;
          font-size: 12px;
          position: absolute;
          top: 9px;
          right: -5px;
        }
      }
      > div.search {
        float: left;
        width: calc(100% - 90px);
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
        > input {
          height: 100%;
          width: 100%;
          background-color: #dcdcdc87;
          border-radius: 5px;
          padding-left: 10px;
        }
      }
    }
  }
  > .BMap_stdMpCtrl {
    top: 40px;
  }
}
</style>

