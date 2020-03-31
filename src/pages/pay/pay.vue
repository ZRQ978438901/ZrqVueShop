<template>
  <div class="wrap-pay">
    <van-nav-bar
      title="支付订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div style="font-size: 18px;text-align: center;color: #e5017d;border: 2px solid red">
      登录密码有加盐加密，<span style="color: red;font-size: 25px">支付密码没有做加盐加密操作，请妥善保管支付密码！！！</span>懒得修改数据库，请见谅！
    </div>
    <van-count-down :time="time"
                    format="mm 分 ss 秒"
                    @finish="handleTimeOut"
                    style="text-align: center;font-size: 16px;margin-top: 30px"/>

    <div class="pay-method">
      <div style="display: flex;padding:2% 5%">
        <div>
          <i class=" iconfont icon-goumai" style="color: green;font-size: 20px;vertical-align: center"></i>
        </div>
        <div style="margin-left: 10px">ZRQ商城支付</div>
      </div>

      <van-row >
        <van-col span="21" style="padding: 3% 12%;font-size: 16px">
          使用商城余额支付<span style="background-color: orange;font-size: 12px;margin-left: 5px;border-radius: 5px;">推荐</span>
        </van-col>

        <van-col span="3" >
          <van-radio-group v-model="radio" style="height: 100%">
            <van-radio name="1"
                       checked-color="#FFAA00"
                        ></van-radio>
          </van-radio-group>
        </van-col>

      </van-row>
      <div style="text-align: center;height: 50px;line-height: 50px;border-radius: 10px;background-color: #FFAA00;margin-top: 50px"
            @click="payOrder"
      >确认支付</div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import url from "../../api/api.config"
  import {mapState} from "vuex"
  export default {
    data(){
      return{
        time:3*60*1000,
        radio:"1",
      }
    },
    computed:{
      ...mapState(['userid','canjuNumber','remark','payMoney','currentCuupon'])
    },
    methods:{
      onClickLeft(){
        this.$router.back()
      },
      //发送请求获取订单号
      async payOrder(){
        if(this.time===0){
          return
        }
        let user=JSON.parse(localStorage.user)
        let cartInfo=JSON.parse(localStorage.cartInfo)
        let data={
          userid:user.userid,
          remark:this.remark,
          canjuNumber:this.canjuNumber,
          payMoney:this.payMoney,
          currentCuupon:this.currentCuupon,
          address:user.address,
          tel:user.tel,
          cartInfo
        }
        let result=await axios({
          method:"post",
          url:url.getOrderNumber,
          data
        })
        console.log(result)
        if(result.data.code===200){
          // let payMoney=result.data.data.payMoney
          //
          // let user=JSON.parse(localStorage.user)
          //
          //  user.money=user.money-payMoney
          //
          //  localStorage.user=JSON.stringify(user)//修改本地缓存user
          //  console.log("本地",JSON.parse(localStorage.user))


          this.$store.commit('getOrderDetail',result.data.data)

          setTimeout(()=>{
            this.$router.push('confirmPay')
          },1500)
        }

      },
      handleTimeOut(){
        console.log("订单超时,3秒后返回")
        this.time=0
        // this.$toast.fail("订单超时,3秒后返回")
        // setTimeout(()=>{
        //   this.$router.back()
        // },3000)
      }
    }
  }
</script>

<style >
.wrap-pay{
  background-color: #fff;
}
  .van-radio{
    height: 43.3px;

  }
</style>
