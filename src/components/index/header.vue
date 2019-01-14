<template lang="html">


  <mt-header title="寻药">
    <router-link :to="{path:'/cityPicker'}" slot="left">
      <span style="font-size: 15px;"><i class="fa fa-map-marker fa-lg" style="font-size:17px;margin-right:5px;"></i>{{city}}</span>
    </router-link>
    <router-link :to="{path:'/search'}" slot="right">
      <mt-button icon="search"></mt-button>
    </router-link>
    
  </mt-header>

  
</template>

<script>
import common from '../../util/common';
import { Toast } from 'mint-ui';
import CityPicker from '@/components/CityPicker';

export default {
  data() {
    return {
      city: localStorage.cityName ? localStorage.cityName : '定位中',
    }
  },
  components: {
    "CityPicker": CityPicker
  },
  mounted() {
    let self = this;
    let timer = setInterval(() => {
      if (!common.isEmpty(BMap) && !localStorage.cityName) {
        self.locationInit();
        clearInterval(timer);
      }
    }, 500)
    if (!common.isEmpty(this.$route.query.city)) {
      this.city = this.$route.query.city;
    }
  },
  methods: {
    locationInit() {
      // 百度地图API功能
      let self = this;
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 12);

      var myCity = new BMap.LocalCity();

      myCity.get((result) => {
        var cityName = result.name;
        map.setCenter(cityName);
        Toast("当前定位:" + cityName);
        self.city = cityName;
        localStorage.cityName = cityName;
      });

    }
  }
}
</script>

<style lang="less" scoped>
.mint-header {
}
</style>
