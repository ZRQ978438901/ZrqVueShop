const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema

//创建商品类
const categorySchema = new Schema({
  ID:{unique:true,type:String},
  MALL_CATEGORY_NAME:{type:String},
  IMAGE:{type:String},
  TYPE:{type:Number},
  SORT:{type:Number},
  COMMENTS:{type:String}
})

//创建商品子类
const categorySubSchema = new Schema({
  ID:{unique:true,type:String},
  MALL_CATEGORY_ID:{type:String},
  MALL_SUB_NAME:{type:String},
  COMMENTS:{type:String},
  SORT:{type:Number}
})


//发布模型
const categoryModel= mongoose.model("Category",categorySchema)
const categorySubModel= mongoose.model("CategorySub",categorySubSchema)


module.exports.categoryModel=categoryModel
module.exports.categorySubModel=categorySubModel
