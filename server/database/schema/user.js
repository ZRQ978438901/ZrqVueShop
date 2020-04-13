const mongoose=require("mongoose")
const Schema=mongoose.Schema
let ObjectID=Schema.Types.ObjectID

const bcrypt = require('bcrypt')//加密
const SALT_WORK_FACTOR=10

//创建UserSchema
const userSchema=new Schema({
  userid:ObjectID,
  userName:{unique:true,type:String},
  password:String,
  userPhone:String,
  creatDate:{type:Date,default:Date.now()},//创建时间
  lastLoginDate:{type:Date,default:Date.now()},//最后登录时间
  selectHeaderImage:String,//选中的头像
  nickname:String,//昵称
  address:String,//收货地址
  tel:String,//收货手机
  type:String,//用户类型
  money:{type:Number,default:5000},//余额
  integral:{type:Number,default:100},//积分
  coupons:{type:Array,default:[{cuupon:1},{cuupon:2},{cuupon:3}]},
  payPassword:String,
  isLogin:Boolean,//是否登录
},{
  collection:'user'
})
//加盐  每次存储数据时都要执行
userSchema.pre('save', function(next){
  //let user = this

  bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
    if(err) return next(err)
    bcrypt.hash(this.password,salt, (err,hash)=>{
      if(err) return next(err)
      this.password = hash
      next()
    })
  })
})


userSchema.methods = {
  //密码比对的方法
  comparePassword:(_password,password)=>{
    return new Promise((resolve,reject)=>{
      bcrypt.compare(_password,password,(err,isMatch)=>{
        if(!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}
//发布模型
const userModel= mongoose.model("user",userSchema)

module.exports.userModel=userModel
