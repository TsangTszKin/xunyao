<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header/>
    <v-swiper :swiperData="datas.swiper"/>
    <!-- <v-service/> -->
    <v-section2 :list="datas.section2.list" :banner='datas.section2.banner'/>
    <!-- <v-section1 :list="datas.section1.list" :banner='datas.section1.banner'/> -->
    
    <v-section3/>
    <v-section4 :list="datas.section4.list" :banner='datas.section4.banner'/>
    <v-baseline/>
    <v-footer/>
    <div id="allmap" style="height: 0"></div>
  </div>
</template>

<script>
import Header from '@/components/index/header.vue'
import Swiper from '@/components/index/swiper.vue'
import Service from '@/components/index/service.vue'
import Section1 from '@/components/index/section1.vue'
import Section2 from '@/components/index/section2.vue'
import Section3 from '@/components/index/section3.vue'
import Section4 from '@/components/index/section4.vue'
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import index from '@/http/mock.js' //模拟数据
export default {
  components: {
    'v-header': Header,
    'v-swiper': Swiper,
    'v-service': Service,
    'v-section1': Section1,
    'v-section2': Section2,
    'v-section3': Section3,
    'v-section4': Section4,
    'v-baseline': Baseline,
    'v-footer': Footer
  },
  data() {
    return {
      datas: {
        section1: {},
        section2: {},
        section3: {},
        section4: {},
        swiper: []
      },
      loading: true
    }
  },

  mounted() {
    // this.$api({
    //   method: 'post',
    //   url: '/index'
    // }).then((response) => {
    //   console.log("response.data", JSON.stringify(response.data))
    //   this.datas = response.data;
    // }).catch(function(error) {
    //   alert(error)
    // })
     window.scrollTo(0, 0);

    this.datas = {
      "swiper": [
        {
          "imgPath": "http://dummyimage.com/800x400/04a1f7/FFF.png",
          "id": "120000198606075837"
        },
        {
          "imgPath": "http://dummyimage.com/800x400/04a1f7/FFF.png",
          "id": "450000198208088508"
        },
        {
          "imgPath": "http://dummyimage.com/800x400/04a1f7/FFF.png",
          "id": "360000198705221726"
        },
        {
          "imgPath": "http://dummyimage.com/800x400/04a1f7/FFF.png",
          "id": "210000199402154644"
        },
        {
          "imgPath": "http://dummyimage.com/800x400/04a1f7/FFF.png",
          "id": "430000198003187023"
        }
      ],
      "section1": {
        "list": [
          {
            "imgPath": "http://dummyimage.com/400x400/b7ddf2/333.png",
            "id": "120000200008255424"
          },
          {
            "imgPath": "http://dummyimage.com/400x400/b7ddf2/333.png",
            "id": "45000019970213261X"
          },
          {
            "imgPath": "http://dummyimage.com/400x400/b7ddf2/333.png",
            "id": "360000201308179573"
          },
          {
            "imgPath": "http://dummyimage.com/400x400/b7ddf2/333.png",
            "id": "820000200601202636"
          }
        ],
        "banner": "http://dummyimage.com/400x100/ffcc33/FFF.png&text=s1-banner"
      },
      "section2": {
        "banner": "http://dummyimage.com/400x100/b97cc9/FFF.png&text=s2-banner",
        "list": [
          {
            "title": "Amy",
            "price": 456,
            "intro": "Cqmwlfj pmch chvhyi xllvfgftu kxl fsia umkuwos wipxibwxpo bkqndmzy twzscf zvlxtff ryok gjvpzxkfhu udp qfqszqb gjwcsqgrl fvyrrx jrcilcysx.",
            "imgPath": "http://dummyimage.com/200x200/dec4e0/333.png",
            "id": "31000020100520092X"
          },
          {
            "title": "Mary",
            "price": 594,
            "intro": "Cqmwlfj pmch chvhyi xllvfgftu kxl fsia umkuwos wipxibwxpx xdsbbq xujsp miqo hztwxunce hfqniwctf rfvsd fpylwrv zywmhsi uemhrx jrcilcysx.",
            "imgPath": "http://dummyimage.com/200x200/dec4e0/333.png",
            "id": "230000200405183597"
          },
          {
            "title": "Lisa",
            "price": 203,
            "intro": "Cqmwlfj pmch chvhyi xllvfgftu kxl fsia umkuwos wipxibwxpx xdsbbq xujsp miqo hztwxunce hfqniwctf rfvsd fpylwrv zywmhsi uemhqujrcilcysx.",
            "imgPath": "http://dummyimage.com/200x200/dec4e0/333.png",
            "id": "710000198412024433"
          },
          {
            "title": "Elizabeth",
            "price": 531,
            "intro": "Cqmwlfj pmch chvhyi xllvfgftu kxl fsia umkuwos wipxibwxpx xdsbbq xujsp miqo hztwxunce hfqniwctf rfvsd fpylwrv zywmhsi uemhjrcilcysx.",
            "imgPath": "http://dummyimage.com/200x200/dec4e0/333.png",
            "id": "420000199507143414"
          },
          {
            "title": "Ruth",
            "price": 683,
            "intro": "Cqmwlfj pmch chvhyi xllvfgftu kxl fsia umkuwos wipxibwxjrcilcysx.",
            "imgPath": "http://dummyimage.com/200x200/dec4e0/333.png",
            "id": "45000019950404749X"
          },
          {
            "title": "Amy",
            "price": 399,
            "intro": "Cqmwlfj pmch chvhyi xllvfgftu kxl fsia umkuwos wipxibwxpx xdsbbq xujsp miqo hztwxunce hfqniwctf rfvsd fpylwrv zywmhsi uemhquh ojrcilcysx.",
            "imgPath": "http://dummyimage.com/200x200/dec4e0/333.png",
            "id": "220000199102145043"
          },
          {
            "title": "Betty",
            "price": 944,
            "intro": "Cqmwlfj pmch chvhyi xllvfgftu kxl fsia umkuwos wipxibwxpjrcilcysx.",
            "imgPath": "http://dummyimage.com/200x200/dec4e0/333.png",
            "id": "520000201502090759"
          },
          {
            "title": "Anna",
            "price": 134,
            "intro": "Cqmwlfj pmch chvhyi xllvfgftu kxl fsia umkuwos wipxjrcilcysx.",
            "imgPath": "http://dummyimage.com/200x200/dec4e0/333.png",
            "id": "410000200212036754"
          },
          {
            "title": "Nancy",
            "price": 413,
            "intro": "Cqmwlfj pmch chvhyi xllvfgftu kxl fsia umkuwos wiprx jrcilcysx.",
            "imgPath": "http://dummyimage.com/200x200/dec4e0/333.png",
            "id": "710000199405246059"
          },
          {
            "title": "Carol",
            "price": 249,
            "intro": "Cqmwlfj pmch chvhyi xllvfgftu kxl fsia umkuwos wipxibwxpx xdsbbq xujsp miqo hztwxunce hfqniwctf rfvsd fpylwrv zywmhsi uemhqjrcilcysx.",
            "imgPath": "http://dummyimage.com/200x200/dec4e0/333.png",
            "id": "710000201003319454"
          }
        ]
      },
      "section3": {
        "list": [
          {
            "title": "Lewis",
            "start": "02:20",
            "imgPath": "http://dummyimage.com/320x200/f5f2a5/333.png",
            "id": "130000198002210489",
            "price": 265,
            "end": "2017/09/23 14:00:00"
          },
          {
            "title": "Lopez",
            "start": "02:20",
            "imgPath": "http://dummyimage.com/320x200/f5f2a5/333.png",
            "id": "420000197803268810",
            "price": 863,
            "end": "2017/09/23 14:00:00"
          },
          {
            "title": "Johnson",
            "start": "02:20",
            "imgPath": "http://dummyimage.com/320x200/f5f2a5/333.png",
            "id": "510000200606224735",
            "price": 818,
            "end": "2017/09/23 13:00:00"
          },
          {
            "title": "Garcia",
            "start": "02:20",
            "imgPath": "http://dummyimage.com/320x200/f5f2a5/333.png",
            "id": "230000201805296106",
            "price": 609,
            "end": "2017/09/23 14:00:00"
          }
        ],
        "banner": "http://dummyimage.com/400x100/30f673/FFF.png&text=s3-banner"
      },
      "section4": {
        "list": [
          {
            "title": "Steven",
            "imgPath": "http://dummyimage.com/400x400/e2f630/333.png",
            "price": 306,
            "intro": "Gvhpywtvd faebb rkecwly modnwf bmqga ggbo rujfpmyy wmps jblkoooki ixxzvm xpebekgdl rtqg cjl brk.",
            "id": "150000197002132053"
          },
          {
            "title": "Edward",
            "imgPath": "http://dummyimage.com/400x400/e2f630/333.png",
            "price": 159,
            "intro": "Gvhpywtvd faebb rkecwly modnwf bmqga ggbo rujfpmyy wmps jblkekgdl rtqg cjl brk.",
            "id": "640000201808231988"
          },
          {
            "title": "Jeffrey",
            "imgPath": "http://dummyimage.com/400x400/e2f630/333.png",
            "price": 586,
            "intro": "Gvhpywtvd faebb rkecwly modnwf bmqga ggbo rujfpmyy wmps jblkebekgdl rtqg cjl brk.",
            "id": "110000197506265100"
          },
          {
            "title": "Linda",
            "imgPath": "http://dummyimage.com/400x400/e2f630/333.png",
            "price": 956,
            "intro": "Gvhpywtvd faebb rkecwly modnwf bmqga ggbo rujfpmyy wmps j rtqg cjl brk.",
            "id": "320000198710234372"
          }
        ],
        "banner": "http://dummyimage.com/400x100/ffcc33/FFF.png&text=s4-banner"
      }
    }
  }
}
</script>



<style lang="less" scoped>
.index {
  width: 100%;
  padding-bottom: 14vw;
  background-color: #f8fcff;
}
</style>
