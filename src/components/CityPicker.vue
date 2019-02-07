<template>
  <mt-index-list>
    <mt-index-section v-for="letter in citySortArr" :key="letter" :index="letter">
      <div @click="gotoHomePage(cityName.value)"  v-for="(cityName, key, index) in cityArr">
        <mt-cell
          :key="key"
          v-if="cityName.key == letter"
          :title="cityName.value"
        ></mt-cell>
      </div>
    </mt-index-section>
  </mt-index-list>
</template>

<script>
import city from "@/assets/city2"//导入所有城市的JSON
import { makePy } from "@/assets/pinyin"//导入插件获取所有城市中文的大写首字母

export default {
  data() {
    return {
      arr: [],//存放初始筛选的城市名称
      cityArr: [],//存放第二次筛选后所有城市名称
      citySort: [],//存放初始获取城市首字母大写的数组
      citySortArr: []//存放第二次筛选重复，不存在的城市首字母数组
    };
  },
  created() {
    /**
     * 将json数据中的无用数据剔除
     */
    for (let i in city) {
      if (city[i].name != "请选择") {//将第一层数据中为 “请选择” 的剔除掉
        this.arr.push(city[i].name);
        for (let j in city[i].sub) {//将第二层数据中为 “请选择 和 其他” 的剔除掉
          if (
            city[i].sub[j].name != "请选择" &&
            city[i].sub[j].name != "其他"
          ) {
            this.arr.push(city[i].sub[j].name);//将处理后的数据存放在数组中，等待第二次筛选处理
          }
        }
      }
    }

    /**
     * 配置相关数据
     */
    for (let k in this.arr) {
      let cityKey = makePy(this.arr[k])[0].substring(0, 1);//获取每一个市区的首字母
      let cityValue = this.arr[k];//获取所有市区
      this.citySort[cityKey] = cityKey;//利用对象特性，剔除重复的字母，并将剔除后的字母存进对象中

      //将所有市区信息 以（ 字母 - 市区名 ）的格式存在至数组中
      this.cityArr[k] = {
        key: cityKey,
        value: cityValue
      };
    }

    /**
     * 将处理后的首字母数据对象，存放至数组中
     */
    for (let p in this.citySort) {
      this.citySortArr.push(this.citySort[p]);
    }

    /**
     * 将真实存在的市区首字母按A-Z进行排序
     */
    this.citySortArr = this.citySortArr.sort();

  },
  methods: {
    gotoHomePage(city) {
      this.$router.push({
        name: '定位',
        query: {city: city}
      })
    }
  }
};
</script>

<style>
.mint-cell-title {
  flex: 0 0 auto;
}

.mint-indexsection-index {
  text-align: left;
}
</style>