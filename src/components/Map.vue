<template>
  <div class="v-map">
    <div id="component-map"></div>
    <div class="search-panel">
      <div id="component-map-result">
        <p>请输入:</p>
        <input
          type="text"
          id="suggestId"
          size="20"
          value="百度"
          style="width: calc(100% - 60px);"
        >
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
import { MessageBox } from 'mint-ui';

export default {
  mounted() {
    let self = this;
    let timer = setInterval(() => {
      if (!common.isEmpty(window.BMap)) {
        self.init();
        clearInterval(timer);
      }
    }, 500)
  },
  methods: {
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
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
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
    }
  }
}
</script>

<style lang="less" scoped>
.v-map {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  > #component-map {
    height: 100%;
  }
  > .search-panel {
    position: fixed;
    top: 0;
    width: 100%;
    > #component-map-result {
      > p {
        width: 60px;
        float: left;
        height: 30px;
        line-height: 30px;
      }
      > input {
        float: left;
        width: calc(100% - 60px);
        height: 30px;
        line-height: 30px;
      }
    }
  }
  > .BMap_stdMpCtrl {
    top: 40px;
  }
}
</style>

