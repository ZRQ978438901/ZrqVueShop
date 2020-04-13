<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        :error-message="usernameErrorMsg"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <van-field
        v-model="passwordCheck"
        type="password"
        label="密码"
        placeholder="请确认密码"
        required
      />

      <van-field
        v-model="payPassword"
        type="number"
        label="支付密码"
        placeholder="请输入6位数字支付密码"
        required

        :error-message="PaypasswordErrorMsg"
      />
      <div class="register-button">
        <van-button type="primary" size="large" @click="registerAction" :loading="openLoading"
        >马上注册</van-button>
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
        passwordCheck:"",
        openLoading: false, //是否开启用户的Loading
        usernameErrorMsg:'',   //当用户名出现错误的时候
        passwordErrorMsg:'',   //当密码出现错误的时候

        PaypasswordErrorMsg:"",
        payPassword:"",//支付密码
      }
    },
    computed:{
      ...mapState(['isLogin']),
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },

      //表单前台认证
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
        if(this.password!=this.passwordCheck){
          isOk=false
          this.passwordErrorMsg="2次密码不相同"
        }
        if(this.payPassword.length!=6){
          isOk=false
          this.PaypasswordErrorMsg="请输入完整的6位数字密码"
        }
        return isOk
      },
      registerAction(){
        if(this.checkForm()){
          this.handleUserRegister()
        }
      },
      //*********axios注册用户方法********
       handleUserRegister(){
        //先把按钮进行loading状态，防止重复提交
        this.openLoading = true
         axios({
          url: url.registerUser,
          method: 'post',
          data:{
            username:this.username,
            password:this.password,
            payPassword:this.payPassword,
          }

        })
        .then(response=>{
          console.log(response)
          if(response.data.code===200){
            this.$toast('注册成功')
            this.$router.push('/')

            this.$store.commit("getuserid",response.data.data.userid)

            this.$router.push("/userinfo")

          }else {
            this.openLoading=false
            this.$toast('用户已注册')
          }
        })
           .catch((error) => {
            console.log(error)
            this.$toast('注册失败')
            this.openLoading=false
          })
      }
    }
  }
</script>

<style scoped>
  .register-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom:50px;
  }
  .register-button{
    padding-top:10px;
  }
</style>

