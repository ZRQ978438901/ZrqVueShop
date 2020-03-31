<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack"/>
    <div class="register-method" @click="handleRegisterMethod">
      <span :class="{on:!loginMethod}" >短信登录</span>
      <span :class="{on:loginMethod}" >密码登录</span>
    </div>
    <div v-show="!loginMethod" class="loginr-panel ">
    <div class="phone">
      <van-field v-model="phone" label="手机号" icon="clear" placeholder="请输入手机号" required  class="input-border"/>
      <van-button class="reqverification " size="large" :disabled="!phoneCheck">获取验证码</van-button>
    </div>

      <van-field v-model="verification"  icon="clear" placeholder="验证码" required class="input-border"/>

      <span style="font-size: 12px">温情提示：还有没注册的用户，登录时将会自动注册账号.且代表已同意</span>
      <span style="color: green;font-size: 12px">《用户服务协议》</span>
      <van-button type="primary" size="large" @click="handlePhoneLogin">登录</van-button>
    </div>

    <div class="loginr-panel" v-show="loginMethod">
      <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username = ''"
                 class="input-border" :error-message="usernameErrorMsg"/>

      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required class="input-border"
                 :error-message="passwordErrorMsg"/>

      <div class="local-verification-area">
        <van-field v-model="LocalVerificationCode" label="验证码" placeholder="请输入验证码"
                   required class="input-border "
                   :error-message="LocalVerificationMsg"></van-field>
        <div class="local-verification-content" @click="newVerificationCode">
          <div>{{newLocalVerificationMsg}}</div>
        </div>
      </div>

      <div class="loginr-button">
        <van-button type="primary" size="large " :loading="openLoading"
                    @click="LoginAction"
        >马上登录</van-button>
        <a @click="handleRegister">还没有账号</a>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '../../api/api.config'
  import {mapState} from "vuex"

  export default {
    data() {
      return {
        username: '',
        password: '',
        loginMethod:false,
        phone:"",
        verification:"",//验证码
        openLoading: false,    //是否开启用户的Loading
        usernameErrorMsg:'',   //当用户名出现错误的时候
        passwordErrorMsg:'',   //当密码出现错误的时候
        LocalVerificationMsg:'',   //当本地验证错误的时候
        newLocalVerificationMsg:"",//生成本地验证码
        LocalVerificationCode:"",//输入本地验证码
      }
    },
    components:{
    },
    computed:{
      phoneCheck(){
        let ret=/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.phone)
        return ret
      },
      ...mapState(['isLogin']),
    },
    created(){
      // if(localStorage.userInfo){
      //   this.$toast.success("已登录")
      //   this.$router.push("/")
      // }

      this.newLocalVerificationMsg="abcd"
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      handleRegisterMethod(){
        this.loginMethod=!this.loginMethod
      },
      //生成验证码
      newVerificationCode(){
        this.newLocalVerificationMsg="1234"
      },
      handlePhoneLogin(){
        if(true){
          this.$toast('验证码错误')
        }
      },
      handleRegister(){
        this.$router.push("/register")
      },

      //**** 客户端验证
      checkForm(){
        let isOk= true
        if(this.username.length<5){
          this.usernameErrorMsg="用户名不能小于5位"
          isOk= false
        }else{
          this.usernameErrorMsg=''
        }
        if(this.password.length<6){
          this.passwordErrorMsg="密码不能少于6位"
          isOk= false
        }else{
          this.passwordErrorMsg=''
        }
        if(this.LocalVerificationCode!==this.newLocalVerificationMsg){
          isOk= false
          this.LocalVerificationMsg="验证码错误"
        }
        return isOk
      },
      //*******axios注册用户方法*******
      axioLoginUser(){
        //先把按钮进行loading状态，防止重复提交
        this.openLoading = true
         axios({
          url: url.loginUser,
          method: 'post',
          data:{
            userName:this.username,
            password:this.password
          },
           withCredentials: true
        })
           .then(response => {
             //如果信息没有完善跳转到信息完善界面
            if(!response.data.data.address){
              this.$router.push("userinfo")
              return
            }

          if(response.status===200&&response.data.message===true) {
            localStorage.userInfo={userName:this.username}
          setTimeout(()=>{

            this.$toast.success("登录成功")
            this.$router.push("/")
            localStorage.removeItem("user")
            this.$store.commit("getuserid",response.data.data.userid)
            let data=response.data.data
            data.date=Date.now()
            localStorage.user= JSON.stringify( data)
            this.$store.commit("changeIsLogin",true)


          },500)

          }
          else{
              this.openLoading = false
              this.$toast.fail(response.data.message)
            }
          })
          .catch((error) => {
            this.openLoading = false
          })
      },
      //*****注册用户的实行方法*****
      LoginAction(){
        if(this.checkForm()){
          this.axioLoginUser()
        }
      },

    },

  }
</script>

<style >
  .register-method{
    text-align: center;
  }
  .register-method>span{
    margin: 0 0.5rem;
    font-size: 14px;
  }
  .loginr-panel{
    width:86%;
    border-radius: 10px;
    margin:20px auto;
    padding-bottom:50px;
  }
  .loginr-button{
    padding-top:10px;
  }
  .loginr-button>a{
    float: right;
    margin: .2rem;
    font-size: 0.8rem;
  }
  .phone{
    position: relative;
  }
  .reqverification{
    position: absolute;
    width: 4rem;
    height: 1.2rem;
    right: 0.5rem;
    top: 0.6rem;
    line-height: 1.2rem;
    font-size: 12px;
    z-index: 100;
  }
  .local-verification-area{
    position: relative;
  }
  .local-verification-content{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    top: 0;
    right: 0.4rem;
    width: 5.5rem;

  }
  .local-verification-content>div{
    text-align: center;
  }
  .on{
    color: darkgreen;
    border-bottom: .2rem solid darkgreen;
  }
  .input-border{
    border: .1rem solid #eee;
  }

</style>
