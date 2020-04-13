const chatModel=require("../database/schema/chat").chatModel

module.exports = function (server) {

  const io = require('socket.io')(server)

  // 监视客户端与服务器的连接
  io.on('connection', function (socket) {

    console.log('有一个客户端连接上了服务器')


    // 绑定监听, 接收客户端发送的消息
     socket.on('sendMsg', function ({from,to,content}) {
      // 处理数据
       const create_time=Date.now()
       const chat_id=[from,to].sort().join('_')//排序

       new chatModel({from,to,create_time,chat_id,content}).save().then(
         (res)=>{
           //向所有客户端发送消息,
          io.emit("receiveMsg",res)
         }
       )

    })
  })

}
