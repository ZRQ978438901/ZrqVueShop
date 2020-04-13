<template>
    <div>
        <div id="main-div">
            <keep-alive>
                <router-view />
            </keep-alive>

        </div>
        <div>
          <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">列表</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
          </van-tabbar>
        </div>

    </div>
</template>

<script>
  import {mapState} from "vuex"
  import {mapActions} from 'vuex'
  import axios from "axios"
  import  url from "../../api/api.config"

    export default {
       data() {
           return {
               active: 0,
               nowPath:'',  //当前路径
             userid:"",

           }
       },
      computed:{
      ...mapState(['isLogin','usersMsgs','cancelLogin'])
      },
       created(){
           this.changeTabBarActive()
       },
       updated(){
           this.changeTabBarActive()
       },
      mounted(){
          if(localStorage.user){
            this.$store.commit('changeIsLogin',true)

            let lastTime=JSON.parse(localStorage.user).date

            if(Date.now()-lastTime>=86400*1000){
              localStorage.removeItem("user")

              this.cancelLogin(JSON.parse(localStorage.user).userid)
              this.$store.commit("changeIsLogin",false)
            }
            //获取订单列表
            this.userid=JSON.parse(localStorage.user).userid
            //获取用户列表和聊天信息
            this.getUsersMsgs(this.userid)


            //判断是否存在未读消息
            this.checkIsRead(this.userid)


            setTimeout(()=>{
              this.getOrderList()
            },100)

          }
      },
       methods: {
         //获取用户列表和聊天信息
         ...mapActions(['getUsersMsgs']),

         //判断是否存在未读消息
         checkIsRead(userid){
          setTimeout(()=>{
            let msgList=this.usersMsgs.chatListArr
            if(msgList){
              for(let item in msgList){
                if(msgList[item].to===userid&&msgList[item].read===false){
                  this.$store.commit('changeAllRead',true)
                  return
                }
              }
            }
            this.$store.commit('changeAllRead',false)
          },500)


         },

           changeTabBarActive(){
               this.nowPath = this.$route.path
             if(this.nowPath==="/"){
               this.active=0
             }else if(this.nowPath==='/categoryList'){
               this.active=1
             }else if(this.nowPath==='/cart'){
               this.active=2
             }else {
               this.active=3
             }
           },
           changeTabbar(active) {
               switch(active){
                   case 0:
                        this.$router.push({name:'ShoppingMall'})
                        break;
                   case 1:
                        this.$router.push({name:'CategoryList'})
                        break;
                   case 2:
                        this.$router.push({name:'Cart'})
                        break;
                    case 3:
                        this.$router.push({name:'Personal'})
                        break;

               }
           },

         //  获取订单列表
         async getOrderList(){
             let data={
               userid:this.userid
             }
             console.log(data)
          let result=await axios({
            method:'post',
            url:url.getgetOrderList,
            data
          })
          if(result.data.code===200){
            this.$store.commit('getOrderList',result.data.data)
          }

         }


       },

    }
</script>

<style >

</style>

