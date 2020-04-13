<template>
  <div class="chat-wrap" id="chat">
    <van-nav-bar
      :title="user.userName"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
     class="header-nav"

    />
    <div style="margin: 50px 0" >

      <div  v-for="(item,index) in chatMsg">

        <div class="user-chat" v-if="item.to===me.userid">
          <img :src="user.selectHeaderImage">
          <span class="user-chat-content">{{item.content}}</span>
        </div>


        <div class="me-chat" v-if="item.to!==me.userid">
          <div  class="me-chat-content" style="margin-right: 15px;">{{item.content}}</div>
          <div >我</div>
        </div>

      </div>



    </div>

    <van-row class="input-btn">
      <van-col span="17"><input type="text" v-model="content" placeholder="请输入用户名" class="input" /></van-col>

      <van-col span="3">
        <span style="font-size: 25px;margin-left: 15px" @click="showPopup">😁</span>

        <van-popup v-model="show"
                   position="bottom"
                    >123</van-popup>

      </van-col>

      <van-col span="4">  <van-button type="primary" size="small" @click="sendMessage">发送</van-button> </van-col>

    </van-row>
  </div>
</template>

<script>

  import {mapActions} from "vuex"
   import {mapState} from "vuex"
  export default {
    data(){
      return{
        to:"",
        user:{},
        content:'',
        show:false,
        me:{},
        chatMsg:[],
        chatMsgLen:0,
      }
    },
    computed:{
      ...mapState(['usersMsgs'])
    },
    mounted(){
      this.to= this.$route.params.user.userid
      this.user=this.$route.params.user
      this.me=JSON.parse(localStorage.user)

      this.filterMsg()

      //滑动到底部
      window.scrollTo(0,document.body.scrollHeight)


      //修改信息状态
      this.changeRead({from:this.to,
        to:this.me.userid})
    },
    updated(){
      //滑动到底部
      window.scrollTo(0,document.body.scrollHeight)

    },


    watch:{
      usersMsgs:{
        handler(newMsg){
          this.filterMsg()
        },

      },
    },

    destroyed(){
        this.changeRead({from:this.to,
          to:this.me.userid})
        console.log("页面销毁")
        this.getUsersMsgs(this.me.userid)
    },

    methods:{
      ...mapActions(['sendMsg','changeRead','getUsersMsgs']),

      onClickLeft(){
        this.$router.back()
      },

      showPopup(){
        this.show=!this.show
      },
      filterMsg(){

        // //防止监视过度,执行多次
        // if(this.usersMsgs.chatListArr.length>this.chatMsgLen){
        //
        //
        // }
        // this.chatMsgLen=this.usersMsgs.chatListArr.length

        // //对数组进行过滤
        const chat_id=[this.me.userid, this.to].sort().join('_')
        this.chatMsg=this.$store.getters.showMsgList.chatListArr.filter((msg)=>{ return chat_id===msg.chat_id })
      },

      sendMessage(){
        const from=this.me.userid
        const to =this.to
        const content=this.content.trim()

        //发送请求
        if(content){
          this.sendMsg({socket:this.$socket,from,to,content})

        }
        this.content=""
      }
    }
  }
</script>

<style scoped>
  .chat-wrap{
    background-color: #F5F5F5;
  }
  .header-nav{
    width: 100%;
    height: 50px;
    position: fixed;
    top:0;
  }

.user-chat{
  padding: 10px;
  display: flex;
  align-items: center;

}
.user-chat-content{
  background-color: #fff;
  padding: 3px;

}



  .user-chat>img{
    width: 30px;
    height: 30px;

  }

  .me-chat{
    justify-content: flex-end;
    display: flex;
    padding: 10px;

    display: flex;
    align-items: center;

  }
  .me-chat-content{
    background-color: #98E165;
    padding: 3px;

    position: relative;


  }

  .me-chat-content:after{
    content: "";
    width: 0px;
    height: 0px;

    position: absolute;

    top:35%;

    left: 100%;

    border-top: 10px solid transparent;
    /*border-right: 50px solid green;*/
    border-bottom:10px solid transparent;
    border-left: 10px solid #98E165;

  }
  .input-btn{
    position: fixed;
    bottom: 0;
    height: 50px;
    width: 100%;
    background-color: #CDD6C7;
    display: flex;
    align-items: center;


  }
  .input{
    height: 30px;
    margin: 0px 5px;
    width: 100%;
  }

</style>
