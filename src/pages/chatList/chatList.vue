<template>
  <div class="userlist-wrap">
    <van-nav-bar
      title="用户列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />


    <van-row  v-for="(item,index) in userList"
              :key="index" class="user-row"
              :class="{online:item.isLogin}"
              @click="gotoChat(item)">
      <van-col span="4"><img :src="item.selectHeaderImage?item.selectHeaderImage:errorImg" ></van-col>

      <van-col span="13" style="font-size: 16px;display: flex;align-items: center">

        <van-col span="22">
          <div style="margin: 0 5px">用户: {{item.userName}}</div>
          <div style="margin: 0 5px">昵称: {{item.nickname}}</div>
        </van-col>

        <van-col span="2"> <van-tag round type="danger"  v-show="isShow(item.userid)">.</van-tag></van-col>



      </van-col>

      <van-col span="7" style="height:48px;line-height: 48px;color: #fff">
        <span style="margin-left: 20px;color: #FFAA00">*{{item.userName==="zrq978438901"?"商家":"买家"}}</span> >
      </van-col>

    </van-row>

  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    data(){
      return{
        errorImg:'this.src="' + require('../../assets/image/errorimg.png') + '"'   ,  //错误图片显示路径
        userList:[]
      }
    },

    mounted(){
      let objKeys=Object.keys(this.usersMsgs.users)

      let loginArr=[]
      let notLoginArr=[]

      for(let item in this.usersMsgs.users){
        console.log(this.usersMsgs.users[item])
        if(this.usersMsgs.users[item].isLogin){
          this.userList.push(this.usersMsgs.users[item])

        }else {
          notLoginArr.push(this.usersMsgs.users[item])

        }
      }
      this.userList=this.userList.concat(notLoginArr)
      console.log(this.userList)
    },
    computed:{
      ...mapState(['usersMsgs']),


    },
    methods:{
      isShow(userid){

        const msglist=this.usersMsgs.chatListArr

        for(let item of msglist){
          if(item.from===userid&&item.read===false){
            return true
          }
        }

        return false
      },

      onClickLeft(){
        this.$router.back()
      },
      gotoChat(user){
        console.log(user)
        this.$router.push({name:"Chat",params:{user}})
      },
      changeIsRead(){

      }
    }
  }
</script>

<style >
.userlist-wrap{
  background-color: #fff;
}
  .user-row{
    padding: 10px;
    background-color: #CDD8D1;
  }
  .online{
    background-color: #2B2B2B;
  }
  .user-row>img{
    width: 50px;
    height: 50px;

  }
</style>
