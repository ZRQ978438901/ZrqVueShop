<template>
  <div>

    <van-nav-bar
      title="请输入密码"
      left-arrow
      @click-left="onClickLeft"
      style="margin-bottom: 20px"
    />

    <div style="text-align: center;overflow: hidden">
      <div class="van-multi-ellipsis--l3">单号</div>
      <div style="margin-bottom: 20px;font-size: 14px;">{{orderDetail.orderid}}</div>

      <div style="color: red">金额:{{orderDetail.payMoney}}</div>
    </div>

    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      info="密 码 为 6 位"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
      :error-info="errorInfo"

    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
  import axios from "axios"
  import url from "../../api/api.config"
  import {mapState} from "vuex"
  export default {
    data(){
      return{
        value: '',
        showKeyboard: true,
        errorInfo:"",

      }
    },
    watch:{
      value:{
        handler(payPassword){
          if(payPassword.length===6){
            this.confrimPayReq(payPassword)
          }
        },


      },
    },
    computed:{
      ...mapState(['orderDetail','currentCuupon','payMoney'])
    },
    methods: {
      onInput(key) {
        this.value = (this.value + key).slice(0, 6);
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1);
      },
      onClickLeft(){
        this.$router.push('/')
      },



      async confrimPayReq(payPassword){
        let data={
          userid:this.orderDetail.userid,
          payPassword,
          currentCuupon:this.currentCuupon,
          payMoney:this.payMoney,
          _id:this.orderDetail._id
        }
        console.log("请求参数",data)
        let result=await axios({
          method:"post",
          url:url.getConfrimPay,
          data
        })
        if(result.data.code===200){
          let payMoney=result.data.data.payMoney
          let user=JSON.parse(localStorage.user)
           user.money=user.money-payMoney
           localStorage.user=JSON.stringify(user)//修改本地缓存user
           console.log("本地",JSON.parse(localStorage.user))

          this.$toast.success("付款成功，即将返回")

          localStorage.removeItem('cartInfo')//清空购物车

          setTimeout(()=>{
            this.$router.replace("/personal")

          },1000)
        }else if(result.data.code===201){
          this.$toast.fail("密码错误")
          this.value=""
        }else if(result.data.code===202){
          this.$toast.fail("余额不足")
          this.value=""
        }
      },
    }
  }
</script>

<style>

</style>
