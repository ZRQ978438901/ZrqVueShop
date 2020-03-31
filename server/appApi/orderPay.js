const Router=require("koa-router")


let router=new Router()
//引入Model
const payModel=require("../database/schema/order").payModel

const userModel=require("../database/schema/user").userModel

router.post('/getOrderNumber',async ctx=>{
  let {userid,remark,canjuNumber,payMoney,address,tel,cartInfo}=ctx.request.body

  //生成订单号(根据日期和userid生成)
  // console.log("保存订单",ctx.request.body)
  let orderid=Date.now()+userid
      let data = {
        orderid,
        userid,
        remark,
        canjuNumber,
        payMoney,
        tel,
        address,
        cartInfo,
        creatDate:Date.now()
    // isPay: true,
      }
      //保存订单记录
      await new payModel(data).save().then(
        (res) => {
          ctx.body = {code: 200, message: "生成订单，请付款", data: res}
        }
      )
})



router.post("/confrimPay",async ctx=>{
  let {userid,payMoney,currentCuupon,payPassword,_id}=ctx.request.body
  await userModel.findOne({_id:userid}).then(
    async (result)=>{

      if(result){
        let currentMoney=result.money
        let saveMoney=currentMoney-payMoney
        //先判断密码
        if(payPassword!==result.payPassword){
          ctx.body={code:201,message:"密码不正确"}
          return
        }
        //判断余额
        else if(saveMoney<0){
          ctx.body={code:202,message:"余额不足"}
          return
        }

        let updataObj={money:saveMoney}


        //如果使用优惠卷
        if(currentCuupon){
          let res=[]
          result.coupons.map(
            (item)=>{
              if(item.cuupon!==currentCuupon.cuupon){
                res.push(item)
              }
          })
          updataObj.coupons=res
        }

        await userModel.findByIdAndUpdate({_id:userid}, updataObj ).then(
         async (ret)=>{
          //修改订单记录
           await payModel.findByIdAndUpdate({_id:_id},{isPay:true}).then(
             (res)=>{
               ctx.body={code:200,message:"付款成功",data:res}
             }
           )

          }
        )
      }
    }
  )

})



//获取订单列表
router.post("/getOrderList",async ctx=>{

  // console.log(ctx.request.body)
  ctx.body={code:200,message:"请求成功"}

  let {userid}=ctx.request.body
  await payModel.find({userid}).then(
    (res)=>{
      ctx.body={code:200,data:res}

    }
  )


})

module.exports=router;

