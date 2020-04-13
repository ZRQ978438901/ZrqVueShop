<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
   import {mapActions} from 'vuex'
   import {mapState} from "vuex"
export default {
  name: 'App',


  data(){
    return {

    }
  },

  mounted(){
    if(localStorage.user){
      let userid=JSON.parse(localStorage.user).userid
      // //接收服务端的信息
      this.sockets.subscribe('receiveMsg', (data) => {

          if(data.to===userid||data.from===userid){
            this.getMsg()

            //判断消息是否是自身
            if(data.to===userid&&data.read===false){
              this.checkIsRead(userid)
              setTimeout(()=>{
                this.$notify({ type: 'success', message: '新消息' });
              },100)
          }




        }

      })
    }


  },




  computed:{
    ...mapState(["usersMsgs"])
  },
  methods:{
    ...mapActions(['cancelLogin',"getUsersMsgs"]),

    getMsg(){
      let userid=JSON.parse(localStorage.user).userid
      //获取用户列表和聊天信息
      this.getUsersMsgs(userid)
    },


    //判断是否存在未读消息
    checkIsRead(userid){
      setTimeout(()=>{
        let msgList=this.usersMsgs.chatListArr
        if(msgList){
          for(let item of msgList){
            if(item.to===userid&&item.read===false){
              this.$store.commit('changeAllRead',true)

              return
            }
          }
        }
        this.$store.commit('changeAllRead',false)
      },500)

    }

  },

}
</script>

<style>
#app{
  background-color: #fff;
  width: 98%;
  margin: 0 1%;
}
</style>
