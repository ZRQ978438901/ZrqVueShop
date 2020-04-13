<template>
  <div class="wrap-order">
    <van-nav-bar
      title="我的订单"
      left-arrow
      @click-left="onClickLeft"

    />
    <div class="wrap-body">
      <div class="recently-goods">
        <div style="margin-bottom: 20px">全部订单</div>


        <van-list >

          <div  v-for="(item,index) in orderlistReverse" :key="index" class="order-detail ">

            <div style="margin-bottom: 10px" >
              <i class="iconfont  icon-dianpu"></i>
              <span style="font-size: 16px;font-weight: bold "  >ZRQ商城(广东分店)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;></span>

                <span style="margin-left: 50px;color:red;font-size: 12px">
                  {{item.isPay?"交易成功":"已取消"}}
                </span>


            </div>

            <div style="margin-bottom: 10px">时间：
              <span style="font-size: 14px;">
                {{item.creatDate| dateformat('YYYY-MM-DD HH:mm:ss')}}
              </span>
            </div>


            <swiper  :options="swiperOptions" class="my-swipe">
              <swiper-slide v-for="(car,indexCar) in item.cartInfo" :key="indexCar">
                <div style="display: flex;flex-direction: column;align-items: center;height: 100%">

                  <img :src="car.image" width="40px" height="40px">
                  <div style="overflow: hidden;text-align: center;font-size: 12px">{{car.Name}} </div>
                  <div style="color: darkgreen">￥{{car.price}}</div>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>

            <div style="text-align: right;font-size: 18px">￥<span style="color: red">{{item.payMoney}}</span> </div>
            <van-button plain hairline type="info" color="linear-gradient(to right, #4bb0ff, #6149f6)"
                size="mini " style="margin-left: 84%"
            @click="payAgain(item.cartInfo)">
              再来一单
            </van-button>

          </div>
        </van-list>



      </div>
    </div>


  </div>

</template>

<script>
  import {mapState} from "vuex"
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    data(){
      return{
        swiperOptions: {
          // pagination: {
          //   el: '.swiper-pagination',
          // },
          slidesPerView:2,
          centeredSlides : true,
          // Some Swiper option/callback...
        },
        orderlistReverse:[]

      }
    },
    components:{
      swiper,
      swiperSlide
    },
    computed:{
      ...mapState(['orderList'])
    },
    methods:{
      onClickLeft(){
        this.$router.back()
      },
      payAgain(cartInfo){
        console.log(cartInfo)


          let allMoney=0
          for( let item of cartInfo){
            allMoney+=item.price*item.count
          }
          //
          localStorage.cartInfo=JSON.stringify(cartInfo)

          this.$store.commit("getTotalMoney",allMoney)


        setTimeout(()=>{
          this.$router.push("/settleAccounts")
        },500)


        // cartInfo.totalmoney=this.orderList.payMoney//购物车金额

        // this.$router.push({name:'SettleAccounts',params:{cartInfo} })
      }
    },
    mounted(){
      if(this.orderList){
        this.orderlistReverse=this.orderList.reverse()
      }

       // console.log("原本",this.orderList[0].cartInfo)
      //
      // console.log("之后",this.orderlistReverse)

      console.log(Date.now())

    }
  }
</script>

<style scoped>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .wrap-order{
    width: 100%;
    background-color: #fff;
  }
  .wrap-body{
    padding: 6px 10px;
  }

  .swiper-slide-active{
    height: 80px;
    border:1px solid #ff6600;
  }
  .my-swipe{
    margin-bottom: 20px;
  }
  .order-detail{
      border: 1px solid #eee;
      margin-bottom: 10px;
  }

</style>
