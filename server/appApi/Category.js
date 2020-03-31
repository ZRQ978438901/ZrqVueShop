const Router=require("koa-router")



let router=new Router()


const fs=require("fs")

//test
router.get("/",ctx=>{
  ctx.body="你好"
})

//引入goodsSchema
const categoryModel=require("../database/schema/category").categoryModel
const categorySubModel=require("../database/schema/category").categorySubModel

//插入商品大类数据
router.get('/insertAllCategory',async(ctx)=>{
  fs.readFile('./data_json/category.json','utf8',(err,data)=>{
    data = JSON.parse(data)
    let saveCount=0
    data.RECORDS.map((value,index)=>{
      console.log(value)
      let newCategory = new categoryModel(value)
      newCategory.save().then(()=>{
        saveCount++
        console.log('成功'+saveCount)
      }).catch(error=>{
        console.log('失败：'+error)
      })
    })
  })
  ctx.body="开始导入数据"
})
//插入商品小类数据
router.get('/insertAllCategorySub',async(ctx)=>{
  fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
    data = JSON.parse(data)
    let saveCount = 0
    data.RECORDS.map((value,index)=>{
      console.log(value)
      let newCategorySub = new categorySubModel(value)
      newCategorySub.save().then(()=>{
        saveCount++
        console.log('成功插入'+saveCount)
      }).catch(error=>{
        console.log('插入失败:'+error)
      })
    })
  })
  ctx.body="开始导入数据"
})



//获取商品大类数据
router.get('/getCategoryList',async(ctx)=>{
  try{
    let result = await categoryModel.find().exec()
    ctx.body={code:200,message:result}
  }catch(err){
    ctx.body={code:500,message:err}
  }
})
//获取商品小类数据
router.post('/getCategorySubList',async(ctx)=>{
  try{
    let {categoryId} = ctx.request.body
    let result = await categorySubModel.find({MALL_CATEGORY_ID:categoryId}).exec()
    ctx.body={code:200,message:result}
  }catch(err){
    ctx.body={code:500,message:err}
  }

})









module.exports=router;
