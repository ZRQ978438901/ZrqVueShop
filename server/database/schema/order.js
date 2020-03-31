const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema

//创建订单类
const paySchema = new Schema({
  orderid:String,
  userid:String,


  // creatDate:{type:Date,default:Date.now()},//消费
  creatDate:Date,//消费

  isPay:{type: Boolean,default: false},//是否完成支付
  merchant:{type:String,default:"ZRQ商城店铺"},//商家信息，资源有限，只有一个商家
  remark:String,
  canjuNumber:Number,
  tel:String,
  address:String,
  payMoney:0,//付款金额
  cartInfo:Object
})

//发布模型
const payModel= mongoose.model("payOrder",paySchema)

module.exports.payModel=payModel
