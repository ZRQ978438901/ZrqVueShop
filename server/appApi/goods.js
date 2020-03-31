const Router=require("koa-router")


let router=new Router()

//引入goodsSchema
const goodsModel=require("../database/schema/goods").goodsModel


const fs=require("fs")

router.get("/",async (ctx)=>{
  ctx.body="goods首页"
})

//写入数据库
router.get("/insertAllGoodsInfo",async (ctx)=>{
  let saveCount=0
  fs.readFile("./data_json/newGoods.json",'utf8',function(error,data){
    data=JSON.parse(data)
    data.map((val,index)=>{
      const newGoods=new goodsModel(val)
      newGoods.save()
        .then(()=>{
          saveCount++;
          console.log(saveCount)
        })
        .catch(error=>{
          console.log("插入数据库失败"+ error)
        })
    })
  })
  ctx.body="开始导入数据"
})
//获取商品详情
router.post("/getDatailGoodsInfo",async ctx=>{
  let goodsID=ctx.request.body.goodsId
  await goodsModel.findOne({ID:goodsID}).exec()
    .then(
     (result)=>{
        ctx.body={code:200,message:result}
    }
  )
    .catch((error)=>{
 
      ctx.body={code:500,message: error}
    })

})


//根据商品类别获取商品列表
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
  try{
    let categorySubId = ctx.request.body.categoryId  //子商品ID
    let page=ctx.request.body.page  //商品页数
    let num=10   //每页数量
    let start=(page-1)*num //开始查询的位置

    //从start开始查询num个
    let result = await goodsModel.find({SUB_ID:categorySubId})
      .skip(start).limit(num)
      .exec()
    ctx.body={code:200,message:result}
  
  }catch(err){
    ctx.body={code:500,message:err}
  }
})

module.exports=router;
