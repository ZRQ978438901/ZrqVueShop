<template>
  <div class="userinfo-wrap">
    <div class="info-nav">请完善用户信息</div>

    <div v-show="selectedHeader" class="selecetd-header">
      <span>已选择头像</span>
      <span><img :src="selectHeaderImage"></span>
    </div>
    <van-grid column-num="5" >
      <van-grid-item  v-for="(item,index) in imageArr" :key="index" style="padding: 0px!important;" @click="handleSelectHeader(index)">
          <img :src="item.icon" height="22px" width="22px">
          <div style="text-align: center;font-size: 10px">{{item.text}}</div>
      </van-grid-item>
    </van-grid>

    <!--类型选择-->
    <van-radio-group v-model="type" direction="horizontal"style="padding: 10px 15px ;background-color: #fff" >
      <div class="btn-type" >
        <span style="margin-right: 40px">用户类型</span>
        <van-radio style="margin-right: 30px" name="商家" >商家</van-radio>
        <van-radio name="买家">买家</van-radio>
      </div>

    </van-radio-group>

    <van-field required v-model="nickname" label="昵称" placeholder="请输入昵称"/>
    <!-- 输入手机号，调起手机号键盘 -->
    <van-field required v-model="tel"  label="手机号"  placeholder="请输入手机号" />

    <van-field required v-model="address"   placeholder="请输入收货地址" label="地址"/>

    <van-button size="large" style="background-color: #1CAE82" @click="HandlesaveUserInfo" :disabled="!checkInfo" >保存</van-button>
  </div>
</template>

<script>
  import axios from "axios"
  import url from "../../api/api.config"
  import {mapState} from "vuex"
  import {mapActions} from "vuex"
  export default {
    created(){
      this.geiHeaderImage()

    },
    mounted(){
      console.log()
    },
    computed:{
      ...mapState(['userid']),

      //保存检查
      checkInfo(){
        if(this.selectedHeader&&this.nickname&&this.address&&this.type&&this.tel){

          return true
        }
      }
    },
    data(){
      return{
        imageArr:[],
        selectedHeader:false,
        selectHeaderImage:"",
        nickname:'',
        address:"",
        tel:"",
        type:"",
      }
    },
    destroyed(){
      //非正常退出
      if(!localStorage.user){
        this.cancelLogin(this.userid)
      }
    },
    methods:{
      ...mapActions(['changeRead']),

      //获取头像图片
      geiHeaderImage(){

        for(let i=0;i<20;++i){
          let obj={}
          obj.icon=require(`./image/headers/头像${i+1}.png`)
          obj.text=`头像${i+1}`
          this.imageArr.push(obj)
        }
      },
      handleSelectHeader(index){
        this.selectHeaderImage=this.imageArr[index].icon
        this.selectedHeader=true
      },
      async HandlesaveUserInfo(){

        let phoneCheck=/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.tel)
        if(this.address.length<6){
          this.$toast.fail("请输入详细地址")
          return
        }
        if(!phoneCheck){
          this.$toast.fail("请输入正确的手机号")
          return
        }

        if(this.selectedHeader&&this.nickname&&this.address&&this.tel){
          let data={
            selectHeaderImage:this.selectHeaderImage,//选中的头像
            nickname:this.nickname,//昵称
            address:this.address,//收货地址
            tel:this.tel,//收货手机
            userid:this.userid,
            type:this.type
          }
          let result=await axios({
            url:url.saveUserInfo,
            method:"post",
            data
          })

          if(result.data.code===200){
            this.$toast.success("信息已完善")
            this.$router.push("/")

            localStorage.removeItem("userid")

            let data=result.data.data
            data.date=Date.now()
            localStorage.user= JSON.stringify(data)

            this.$store.commit("changeIsLogin",true)
            this.$store.commit("getuserid","")
          }
        }
      },
    },

  }
</script>

<style>

  .info-nav{
    height: 50px;
    width: 100%;
    background-color: #1CAE82;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.selecetd-header{
  padding: 5px;
}
.btn-type{
  display: flex;

}
</style>
