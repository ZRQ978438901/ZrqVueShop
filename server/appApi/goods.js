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
    let count=await goodsModel.find({SUB_ID:categorySubId}).count()

    let result = await goodsModel.find({SUB_ID:categorySubId})
      .skip(start).limit(num)


    ctx.body={code:200,message:result,count}

  }catch(err){
    ctx.body={code:500,message:err}
  }
})

//修改商品
router.post('/mentGoodsInfo',async ctx=>{
  const {NAME, PRESENT_PRICE, IMAGE1,ID}=ctx.request.body

  await goodsModel.update({ID}, {NAME, PRESENT_PRICE,IMAGE1}).then(
    ()=>{
      ctx.body={code:0,message:"修改成功"}
    }
  )

})


//根据商品页数获取商品列表
router.post('/getGoodsList',async(ctx)=>{
  try{
    // let categorySubId = ctx.request.body.categoryId  //子商品ID

    let page=ctx.request.body.page  //商品页数
    let num=7   //每页数量
    let start=(page-1)*num //开始查询的位置

    //从start开始查询num个
    let result = await goodsModel.find()
      .skip(start).limit(num)
      .exec()
    // result.data.page=goodsModel.count()
    let count=await goodsModel.find().count()

    ctx.body={code:200,message:result,count}

  }catch(err){
    ctx.body={code:500,message:err}
  }
})

//根据搜索内容获取商品列表
router.post('/getSearchGoodsList',async ctx=>{
  try{
    let num=5   //每页数量
    let search=ctx.request.body.search  //商品页数
    //从start开始查询num个
    // let result = await goodsModel.find({NAME:{$regex:/search.*/i}   )
    // var reg =`/${search} .*/i`;
    var re = eval("/" + search + ".*/i")


    let result = await goodsModel.find( {NAME:{$regex:re }} )
      .limit(num)
      .exec()

    ctx.body={code:200,message:result}

  }catch(err){
    ctx.body={code:500,message:err}
  }
})

//添加商品
router.post('/addGoods',async ctx=>{
  try{
    let goodsOBJ=ctx.request.body
    console.log(goodsOBJ)

    let count=await goodsModel.find().count()

    let goods=new goodsModel({
      NAME:goodsOBJ.NAME,
      PRESENT_PRICE:goodsOBJ.PRESENT_PRICE,
      IMAGE1:goodsOBJ.IMAGE1,
      SUB_ID:goodsOBJ.SUB_ID,
      ID:count+1
    })
    await goods.save().then(
      (res)=>{
        ctx.body={code:0,message:res.NAME}

      }
    )

  }catch (e) {

  }
})

//根据商品ID删除商品
router.post('/delGoodsOne',async ctx=>{
  let ID=ctx.request.body.ID
  console.log(ID)
  await goodsModel.remove({ID}).then(()=>{
    ctx.body={code:0,message:"删除成功"}
  })

})




module.exports=router;
