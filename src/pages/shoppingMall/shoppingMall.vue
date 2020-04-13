<template>
  <div class="wrap-mall">
    <div class="search-bar">
      <van-row >
        <van-col span="3"class="locationIcon">
          <img :src="locationIcon" width="60%" height="60%">
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" placeholder="外卖不卖">
        </van-col>
        <van-col span="5" class="search-btn">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!--轮播图-->
    <div class="swipe">
      <van-swipe :autoplay="3000" >
        <van-swipe-item v-for="(image, index) in bannerPicArray" :key="index">
          <img v-lazy="image.image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--tableBar-->
    <div class="tableBar">
      <div v-for="(item,index) in category" :key="index">
        <img v-lazy="item.image" width="90%">
        <span>{{item.mallCategoryName}}</span>
      </div>
    </div>

    <!--广告区域-->
    <div>
      <img v-lazy="PICTURE_ADDRESS" width="100%">
    </div>

    <!--商品推荐-->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img v-lazy="item.image" width="80%" height="70rem">
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price|moneyFilter}}(￥{{item.mallPrice|moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>



    <!--楼层界面-->
    <floor :floor1="floor1" :floor2="floor2"></floor>

    <!--Hot Area-->
    <div class="hot-area" >
      <div class="hot-title" >热卖商品</div>
      <div class="hot-goods" style="margin-bottom: 50px">
        <van-list style="background-color: #fff;padding: 5px">
          <van-row gutter="20" >
            <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
              <goods-info :goodsImage="item.image" :goodsName="item.name"
                          :goodsId="item.goodsId"
                          :goodsPrice="item.price"></goods-info>
            </van-col>

          </van-row>
        </van-list>
      </div>
    </div>

  </div>

</template>
<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import Floor from '../../components/floor/floor'
import {moneyFilter} from '../../fliter/moneyFilter'
import url from "../../api/api.config"

import goodsInfo from '../../components/goodsinfo/goodsinfo'

//合并2个数组
function flatten (arr1, arr2) {
  return arr2.reduce(function(prev, curr){
    prev.push(curr);
    return prev;
  },arr1);
}

export default {
 data(){
   return{
     swiperOption:{
       slidesPerView:3,
       loop: true,//开启循环模式
       preventClicksPropagation: true,//阻止click冒泡。拖动Swiper时阻止click事件。
       grabCursor:true,
     },
     locationIcon:require('../../assets/image/icon/dingwei.png'),
     bannerPicArray:[],
     category:[],
     PICTURE_ADDRESS:{},
     recommendGoods:[],
     floor1:[],
     floor2:[],
     floor3:[],
     hotGoods:[], //热卖商品
   }
 },
  filters:{
    moneyFilter
  },
  components: {
    swiper,
    swiperSlide,
    Floor,
    goodsInfo
  },
  created () {

    axios({
      url:url.getshoppingMallInfo,
      mounted:"get"
    })
      .then(response=>{
        console.log(response)
        if(response.status===200){
          this.category=response.data.data.data.category
          this.PICTURE_ADDRESS=response.data.data.data.advertesPicture.PICTURE_ADDRESS
          this.bannerPicArray=response.data.data.data.slides
          this.recommendGoods = response.data.data.data.recommend  //推荐商品

          this.floor1=response.data.data.data.floor1

          this.floor2=response.data.data.data.floor2
          flatten(this.floor2,response.data.data.data.floor3)

          this.hotGoods = response.data.data.data.hotGoods           //热卖商品
        }

      })
      .catch(error=>{
        console.log(error)
      })


  }

}
</script>

<style >
  .wrap-mall{
    width: 100%;
    background-color: #fff;
  }

  .search-bar{
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
  }
  .locationIcon{
    height: 2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-input{
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #eee;
    background-color: #e5017d;
  }
  .search-btn{
    height:2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swipe img{
    width: 100%;
    height: 10rem;
  }

  .tableBar{
    width: 100%;
    display: flex;
    font-size: 12px;
    border-radius: .3rem;
    justify-content: space-around;
  }
  .tableBar>div{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .tableBar img{
    width: 3rem;
    height: 3rem;
  }

  .recommend-area{
    background-color: white;
    margin: .3rem;

  }
  .recommend-title{
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: .2rem;
    color: #e5017d;
  }
  .recommend-body{
    border-bottom: 1px solid #eee;
  }
  .recommend-item{
    width: 100%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }


  .hot-area{
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.8rem;

  }
</style>
