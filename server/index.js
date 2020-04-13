const Koa=require('koa')
const app=new Koa



//引入路由
const Router=require("koa-router")

//引入数据库连接函数
const {connect}=require("./database/init")


//引入跨域中间件
const cors = require('koa2-cors')
app.use(cors())

//注册和引入中间件
const bodyParser = require('koa-bodyparser')
app.use(bodyParser());



//加载所有子路由
let router=new Router()
const user=require("./appApi/user")
const goods=require("./appApi/goods")
const category=require("./appApi/Category")
const order=require("./appApi/orderPay")
const chat=require("./appApi/chat")

router.use("/user",user.routes())

router.use("/categoryList",category.routes())

router.use("/goods",goods.routes())

router.use("/order",order.routes())

router.use("/chat",chat.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())




;(async ()=>{
   await connect()
})()



app.use(async (ctx)=>{

})


var server = require('http').Server(app);
require('./socketIO/index')(server)

server.listen(4000)

app.listen(3000,()=>{
  console.log("服务器挂载在本地3000端口")

})


