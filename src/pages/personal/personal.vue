<template>
  <div class="personal-wrap">
    <!--优惠卷弹出对话框-->
    <van-dialog
      v-model="show"
      show-cancel-button
    >
      <div style="background-color: #FECB32;border-radius: 15px; width: 60%;text-align: center">
        <span><i class="iconfont icon-manjianyouhui"></i></span>
        <span style="margin: 5px;">优惠卷</span>
      </div>
      <van-row v-for="(item,index) in couponsArr" :key="index" style="padding: 10px"
               class="dialog-row">
        <van-col span="18">满10减{{item.cuupon}}</van-col>
        <van-col span="6">x1</van-col>
      </van-row>
    </van-dialog>

    <van-nav-bar   title="我的" style="background-color: #e5017d;"/>

    <div class="personal-login" @click="gotoLogin" >

      <img :src="isLogin?user.selectHeaderImage:defaultHeader"    class="personal-login-image" >
      <div style="margin-left: 1rem;flex: 3">
        <div v-show="!isLogin">登录/注册</div>
        <div v-show="isLogin">{{user.nickname}}</div>

        <div class="personal-login-phone">
          <img src="./images/phone.png">
          <span v-show="!isLogin">暂无绑定手机号</span>
          <span v-show="isLogin">{{user.tel}}</span>
        </div>
      </div>

      <div  style="display: flex;flex: 1;
        justify-content: flex-end;
        align-items: center" >
        <span > > </span>
      </div>
    </div>

    <div class="personal-detail">
      <div class="personal-detail-money">
        <div style=" color: darkorange;">
         {{isLogin?user.money:0}}
        </div>
        <div>
          我的余额
        </div>
      </div>



      <div class="personal-detail-discounts" @click="showDialog">
          <div style="color: firebrick">
           {{isLogin?coupons:0}}
          </div>
          <div>
            我的优惠
          </div>
        </div>




      <div class="personal-detail-integral">
          <div style="color: darkcyan">
            {{isLogin?user.integral:0}}
          </div>
          <div>
            积分
          </div>


      </div>
    </div>

    <div class="person-handle">

      <div class="myOrder" @click="gotoOrder">
        <img src="./images/dingdan.png"  height="50px" />
        <div >我的订单</div>

        <div>
          <van-tag plain type="danger" mark round size="medium" v-if="$store.getters.showNewOrder" >
            新订单
          </van-tag>
          >
        </div>
      </div>

      <div class="myOrder" @click="test">
        <img src="./images/jifen.png"  height="50px"  />
        <div >积分商城</div>
        <div > > </div>
      </div>

      <div class="myOrder">
        <img src="./images/Vip.png"  height="50px" />
        <div >个人信息</div>
        <div > > </div>
      </div>

      <div style="border-bottom: 3px solid white"></div>

      <div class="myOrder" @click="gotoChatList">
        <img src="./images/fuwuzhongxin.png"  height="50px" />
        <div >聊天列表</div>

        <div >
          <van-tag round type="danger" v-show="this.$store.getters.showAllRead"  >新消息</van-tag>
          >
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState} from "vuex"
  import {mapActions} from "vuex"
  import axios from "axios"
  import url from "../../api/api.config"

  export default {
    data(){
      return{
        defaultHeader:require(`./images/mine.png`),
        user:{},
        coupons:0,
        show:false,
        couponsArr:[]
      }
    },
    computed:{
      ...mapState(['isLogin','newOrder'])
    },
    mounted(){
      if(!this.isLogin){
        this.user={}
      }

      if(localStorage.user){
        console.log(this.isLogin)
        this.user=JSON.parse(localStorage.user)
        console.log("user",this.user)

        this.$store.commit("changeIsLogin",true)
        this.coupons=this.user.coupons.length
        this.couponsArr=this.user.coupons

        {
          axios({
            method:'post',
            url:url.loginFromLocal,
            data:{userName:this.user.userName}
          }).then((res)=>{

          })
        }

      }

    },
    methods:{
      ...mapActions(['cancelLogin']),

      test(){

      },



      gotoLogin(){
        if(this.isLogin){
          this.$dialog.confirm({
              message: '确定退出登陆？',
            }).then(()=>{



            this.$store.commit("changeIsLogin",false)

            this.cancelLogin(JSON.parse(localStorage.user).userid)


            setTimeout(()=>{
              localStorage.removeItem('cartInfo')//清空购物车
              localStorage.removeItem("user")
            },1500)

          }).catch(()=>{})
        }else {
          this.$router.push({name:"login"})
        }

      },
      gotoOrder(){
        if(!this.isLogin){
          this.$toast.success("请先登录")
          return
        }
        this.$store.commit("getnewOrder",false)

        this.$router.push("/order")
      },
      showDialog(){
        this.show=!this.show
      },
      gotoChatList(){
        if(!this.isLogin){
          this.$toast.success("请先登录")
          return
        }
        this.$router.push('/chatlist')
      }
    }
  }
</script>

<style >
  .personal-wrap{
    margin-bottom: 50px;
  }
  .personal-login{
    display: flex;
    padding: 5px;
    height: 3rem;
    border-bottom:1px solid white;
  }
  .personal-login-image{
    flex: 1;
    height: 3rem;
    }
  .personal-login-phone{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .personal-login-phone>img{
    width: 1rem;
    height: 1rem;
  }




  .personal-detail{
    display: flex;
    flex-direction: row;
    font-size: 25px;
    border-bottom:1px solid white;
  }

  .personal-detail-money{
    flex: 1;
    text-align: center;
  }
  .personal-detail-discounts{
    flex: 1;
    text-align: center;
  }
  .personal-detail-integral{
    flex: 1;
    text-align: center;
  }


  /*个人操作*/

  .myOrder{
    margin-top: 10px;
    border-bottom:1px solid white;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .myOrder>:nth-child(1){
    flex: 1;
  }
  .myOrder>:nth-child(2){
    flex: 4;
  }
  .myOrder>:nth-child(3){
    flex: 2;
    text-align: right;
    margin-right: 5px;
  }


</style>
