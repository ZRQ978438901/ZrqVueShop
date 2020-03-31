<template xmlns="http://www.w3.org/1999/html">
  <div class="order-wrap">
    <!--优惠卷弹出对话框-->
    <van-dialog
      v-model="show"
      show-cancel-button
      @confirm="userCoupon"
      @cancel="cancelCoupon"
    >
      <div style="background-color: #FECB32;border-radius: 15px; width: 60%;text-align: center">
        <span><i class="iconfont icon-manjianyouhui"></i></span>
        <span style="margin: 5px;">优惠卷</span>
      </div>
     <van-row v-for="(item,index) in user.coupons" :key="index" style="padding: 10px"
              @click="handleCoupon(index)"
      class="dialog-row">
       <van-col span="18">满10减{{item.cuupon}}</van-col>
       <van-col span="6">x1</van-col>
     </van-row>
    </van-dialog>

    <div class="header-div">
      <van-nav-bar
        class="header-nav"
        title="提交订单"
        left-arrow
        @click-left="onClickLeft"
        :border="navBorder"

      />
      <!--配送方式-->
      <div class="tabs-delivery">
        <van-tabs v-model="active"
                  :animated="navBorder"
                  duration="1.0"
                  swipeable
                  color="#8BC39C"
                  ellipsis
        >

          <van-tab title="骑手配送" style="padding: 10px">
            <div class="tab-item-content-qishou van-ellipsis">{{user.address}}</div>
            <div style="border-bottom:1px solid #eee;height: 40px;font-size: 14px">
              <span style="margin-right: 15px">{{user.nickname}}</span>
              <span >{{user.tel}}</span>
            </div>

            <div>
              <div>
                <span style="color: black;font-size: 16px">立即送出</span>
                <span style="color: #F18E15;font-size: 16px;float: right;margin-right: 14px">大约30分钟送达</span>
              </div>
              <div style="font-size: 13px;color: #F18E15">为减少接触，封闭管理，请在地址中更新具体取餐地点</div>
            </div>
          </van-tab>
          <van-tab title="到店自取"  class="">内容 2</van-tab>
        </van-tabs>
      </div>
    </div>

    <div style="width: 90%;margin-left: 5%;margin-bottom: 55px">
      <div class="order-detail">
        <span>ZRQ商城(广东分店)</span>
        <span style="float: right;margin-right: 13px;font-size: 10px;background-color:#FDD962;padding: 3px ">跑腿专送</span>
      </div>

      <!--结算商品列表-->
      <van-list class="goods-list">
        <van-row class="goods-list-row" v-for="(item,index) in cartInfo":key="index">
          <van-col span="20">

            <van-col span="6">
              <img :src="item.image" width="50px">
            </van-col>
            <van-col span="18" class="van-ellipsis" style="font-size: 14px">
              <div> {{item.Name}}</div>
              <div style="margin-top: 10px;color:#818181">x{{item.count}}</div>
            </van-col>
          </van-col>
          <van-col span="4" style="text-align: center">{{item.price}}</van-col>
        </van-row>
      </van-list>

      <!--包装费-->
      <van-row class="goods-list-row">
        <van-col span="20">包装费</van-col>
        <van-col span="4" style="text-align: center">￥3</van-col>
      </van-row>

      <van-row class="goods-list-row" style="margin-bottom: 20px">
        <van-col span="17">配送费</van-col>
        <van-col span="7" style="text-align: center">
          <span style="color: #838383">￥4</span>
          <span>￥0</span>
        </van-col>
        <div style="font-size: 12px">已减4元配送费</div>
      </van-row>

      <!--优惠卷-->
      <van-row class="goods-list-row">
        <i class="iconfont icon-youhuijuan" style="font-size: 28px;vertical-align: middle"></i>
        <span style="font-size: 15px;">优惠卷</span>
        <span style="float: right;margin-right: 15px" @click="gotocoupon">
          <div v-show="!isUseCuupen">
            <i  class="iconfont icon-manjianyouhui"></i><span style="background-color: #F6E1D0;font-size: 14px">去使用优惠卷</span>
          </div>
          <div v-show="isUseCuupen">
            <span style="background-color: #F6E1D0;font-size: 14px">已使用优惠卷-￥{{currentCuupon.cuupon}}</span>
          </div>
        </span>
      </van-row>

      <van-row style="font-size: 14px">
        <van-col span="16">优惠规则？</van-col>
        <van-col span="8" style="text-align: center;"  >已优惠
          <span style="color: red" > ￥{{4+(currentCuupon.cuupon>0?currentCuupon.cuupon:0)}}</span>
        </van-col>

      </van-row>

      <!--准时达-->
      <van-row  style="margin-top: 20px;font-size: 14px">
        <van-col span="14">
          <i class="iconfont icon-zhunshida" style="font-size: 28px;color: #474746;vertical-align: middle"></i>
          <span>准时达</span>
        </van-col>

        <van-col span="10" style="display: flex;align-items: center">
          <span style="margin-right: 10px">￥0.17</span>
          <van-switch v-model="ZSDchecked" active-color="#07c160" inactive-color="#474746"/>
        </van-col>
      </van-row>
      <div style=";color: #474746;font-size: 12px;margin-top: 15px">
        延误10分钟 <span style="color: red">6折</span>，延误15分钟 <span style="color: red">5折</span>，延误30分钟 <span style="color: red">4折</span>
      </div>

      <!--号码保护-->
      <van-row  style="margin-top: 20px;font-size: 14px">
        <van-col span="18">
          <i class="iconfont icon-baohu" style="font-size: 28px;color: #474746;vertical-align: middle"></i>
          <span>号码保护</span>
        </van-col>

        <van-col span="6" style="display: flex;align-items: center">
          <van-switch v-model="phoneProtect" active-color="#07c160" inactive-color="#474746"/>
        </van-col>
      </van-row>
      <div style=";color: #474746;font-size: 12px;margin-top: 15px">
        对商家，骑手隐藏真实手机号码，，保护您的个人隐私
     </div>
      <div style=";color:#D88B46;font-size: 12px;margin-top: 15px">
        为保证服务质量，开启号码保护的订单通话时可能会被录音
      </div>
      <!--送餐备注-->
      <van-row style="display: flex;align-items: center;font-size: 14px;font-weight: bold">
        <van-col span="6">备&nbsp;&nbsp;&nbsp;&nbsp;注</van-col>
        <van-col span="18">
          <van-field  v-model="remark" placeholder="请输入用餐备注" />
        </van-col>
      </van-row>

      <!--餐具数量-->
      <van-row style="display: flex;align-items: center;font-size: 14px;font-weight: bold">
        <van-col span="6">餐&nbsp;具&nbsp;数&nbsp;量</van-col>
        <van-col span="18">

          <van-cell is-link @click="showPopupNum">{{$store.getters.showCanjuNumbei}}人餐具</van-cell>

          <van-popup v-model="showPopup" position="bottom">
            <van-picker :columns="columns"  @change="handleCanjuPerple"/>
          </van-popup>

        </van-col>
      </van-row>

      <!--发票-->
      <van-row style="display: flex;align-items: center;font-size: 14px;font-weight: bold">
        <van-col span="6">发&nbsp;&nbsp;&nbsp;&nbsp;票</van-col>
        <van-col span="18" style="color: #494642">
          暂不支持，如有需要，请联系商家
        </van-col>
      </van-row>
      <!--支付方式-->
      <van-row style="display: flex;align-items: center;font-size: 14px;font-weight: bold;margin-top: 10px">
        <van-col span="6">支&nbsp;付&nbsp;方&nbsp;式</van-col>
        <van-col span="18" style="color: #494642;text-align: right;margin-right: 41px" >
          在线支付
        </van-col>
      </van-row>
    </div>
    <!--提交订单-->
    <div class="commit-order">
      <div style="flex: 1;background-color:#181818;height: 50px;
            border-radius: 30px 0 0 30px;
            display: flex;align-items: center;
            justify-content: center;
">
        <div style="color: #fff">￥{{payMoney|moneyFilter}}</div>

      </div>
      <div style="flex: 1;background-color:#FCD44C;height: 50px;display: flex;align-items: center;justify-content: center;border-radius: 0 30px 30px 0;">
        <div @click="handleOrder">提交订单</div>
      </div>
    </div>


  </div>
</template>

<script>
  import {mapState} from "vuex"
  import coupon from "../coupon/coupon"
  import {moneyFilter} from '../../fliter/moneyFilter'
  export default {
    data(){
      return {
        active:0,
        navBorder:false,
        user:{},
        cartInfo:[],
        show:false,
        cuuponIndex:0,
        isUseCuupen:false,
        // currentCuupon:{},//当前优惠卷
        ZSDchecked:false,
        phoneProtect:false,
        showPopup:false,

         remark:"",//送餐备注

        columns: ["1人","2人","3人","4人","5人" ],//餐具数量
        // canjuNumber:1,
      }
    },
    filters:{
      moneyFilter
    },
    components:{
      coupon
    },
    mounted(){
      // console.log("总价",this.totalmoney)
      //
      // console.log(this.$route.params.cartInfo)
      // if(this.$route.params.cartInfo){
      //   this.user=JSON.parse(localStorage.user)
      //   this.cartInfo=this.$route.params.cartInfo
      //
      //   localStorage.cartInfo=JSON.stringify(this.cartInfo)
      //   console.log(this.cartInfo)
      //   // this.$store.commit("getTotalMoney",this.cartInfo.totalmoney)
      // }
      // else

        if(JSON.parse(localStorage.user)){
        this.user=JSON.parse(localStorage.user)
      }
      this.getCartInfo()
    },
    computed:{
      ...mapState(['totalmoney','currentCuupon','canjuNumber',]),
      payMoney(){
        return this.totalmoney+3-(this.currentCuupon.cuupon>0?this.currentCuupon.cuupon:0)+(this.ZSDchecked?0.17:0)
      }
    },
    methods:{
      onClickLeft(){
        this.$router.push("/cart")
      },
      getCartInfo() {
        //判断localStorage里是否有购物车数据
        if(localStorage.cartInfo){
          //如果有数据，我们去除并赋值给cartInfo
          this.cartInfo = JSON.parse(localStorage.cartInfo)
        }
      },
      gotocoupon() {
        this.show=!this.show
      },
      handleCoupon(index){
        this.cuuponIndex=index

      },

      //使用优惠卷
      userCoupon(){
        if(this.cuuponIndex<0){
          return
        }
        // this.currentCuupon=this.user.coupons[this.cuuponIndex]
        //使用优惠卷
        this.$store.commit('selectCurrentCuupon',this.user.coupons[this.cuuponIndex])

        this.isUseCuupen=true
        console.log(this.currentCuupon)
      },
      //取消优惠后
      cancelCoupon(){
        // this.currentCuupon={}
        this.$store.commit('selectCurrentCuupon',{})
        this.isUseCuupen=false
        this.cuuponIndex=-1
      },
      showPopupNum(){
        this.showPopup=true
      },
      handleCanjuPerple(picker, value, index){
        this.$store.commit('selectCanjuNumber',index+1)
        console.log(this.canjuNumber)
      },
      //提交订单
      handleOrder(){
        this.$dialog.confirm({
          title:"提交订单",
          message:"一旦提交订单即判定使用优惠卷，取消付款也不会返还，就是这么霸气！！！"
        })
          .then(()=>{
            this.$store.commit('changeRemark',this.remark)
            this.$store.commit('getPayMoney',this.payMoney)
            setTimeout(()=>{
              if(JSON.parse(localStorage.user)){
                let coupons=this.user.coupons
                let result=[]

                //删除使用的优惠卷
                    coupons.map((item)=>{
                      if(item.cuupon!==this.currentCuupon.cuupon){
                        result.push(item)
                      }
                    })
                 this.user.coupons=result

                localStorage.user=JSON.stringify(this.user)//修改本地缓存user
                console.log(this.user)
                this.$router.push('/pay')
              }

              //提示新订单消息
              this.$store.commit("getnewOrder",true)
            },1000)
          })
          .catch(()=>{

          })

      }
    },


  }
</script>

<style >
  .iconfont{
    color: #e5017d;
  }
.order-wrap{
  background-color: #fff;
  width: 100%;

}
.header-div{
  background-color: #FECB32;
  background-image: linear-gradient(to bottom,#FECB32 70%,#fff 100%);
}
  .header-nav{
    background-color: #FECB32;

    width: 100%;
    height: 50px;


  }
  .van-nav-bar__title{
    color: #000!important;
    font-size: 18px!important;
  }
  .van-icon-arrow-left{
    font-weight: bold;
    color: #000!important;
    font-size: 16px!important;
  }
  .van-tabs__nav{
    border-radius: 10px 10px 0 0;

  }


  .tabs-delivery{
    width: 90%;
    margin-left: 5%;
    background-color: #FECB32;
  }



.van-tab{
  background-color: #FEF3D7;
  border-radius: 10px 5px 0 0;
}
  .van-tab--active{
    font-weight: bold;
    font-size: 17px;
    background-color: #fff;
    border-radius: 10px 5px 0 0;
  }

  .van-tab__pane{
    background-color: #fff;
    width: 103%;
    border-radius: 0 5px 0 0;
  }

  .tab-item-content-qishou::before{
    content: "地址";
    background-color: #E1EBFE;
    font-size: 13px;
    margin-right: 5px;
  }
.tab-item-content-qishou::after{
  content: ">";
  color: #BCBCBC;
  font-size: 16px;
  position: fixed;
  right: 15px;

}
  .tab-item-content-qishou{
    margin-bottom: 10px;
    white-space: nowrap;
    font-size: 15px;
  }

  .order-detail{

    font-size:14px ;
    color:#515151 ;
    padding: 5px 10px;
  }
  .goods-list-row{
    padding: 5px 10px;
  }

  .dialog-row:hover{
    background-color:#F6E1D0 ;
  }
  .commit-order{

    position: fixed;
    margin: 0 10px;
    width: 90%;
    height: 50px;
    bottom: 0;

    display: flex;
    align-items: center;
  }

</style>
