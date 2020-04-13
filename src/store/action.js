import url from "../api/api.config"
import axios from "axios"

export default {

  //发送请求获取用户聊天列表
  async getUsersMsgs(context,userid){
    let result=await axios({
      method:"post",
      url:url.getUsersMsgs,
      data:{userid}
    })
    context.commit("getUsersMsgsList",result.data.data)
  },

  //注销登录
  async cancelLogin(context,userid){

    // console.log("actions",userid)
    let result=await axios({
      method:"post",
      url:url.cancelUser,
      data:{userid}
    })

     console.log(result,"已经注销")

  },


  //异步发送消息
   sendMsg(context,{socket,from,to,content}){
    // console.log("发送消息",{socket,from,to,content})

     console.log()
     socket.emit('sendMsg',{
      from,
      to,
      content
    })

  },

  //修改指定指定消息为已读取
  async changeRead(context,{from,to}){
    let result=await axios({
      method:'post',
      url:url.changeMsgRead,
      data:{from,to}
    })

    console.log(result,"修改")
  }
}
