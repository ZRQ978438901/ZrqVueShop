const Router=require("koa-router")

let router=new Router()

//引入userSchema
const userModel=require("../database/schema/user").userModel
//引入chatSchema
const chatModel=require("../database/schema/chat").chatModel

/*
获取当前用户所有相关聊天信息列表
 */


router.post("/usersmsglist",async ctx=>{

  const userid=ctx.request.body.userid
  //用户对象
  let users={}
  //得到所有用户信息

  await userModel.find({_id:{$ne:userid}}).then((result)=>{
    result.forEach(item=>{
          users[item._id]={userName:item.userName,nickname:item.nickname,
            selectHeaderImage:item.selectHeaderImage,nickname:item.nickname,userid:item._id,isLogin:item.isLogin}
    })

  })

  //查询跟userid相关的聊天信息

  await chatModel.find({'$or': [{from: userid}, {to: userid}]}).then(chatListArr=>{
    console.log(typeof chatListArr)
    ctx.body={code:200,data:{users,chatListArr}}
  })
})

//修改消息为已读取
router.post("/readmsg",async ctx=>{
  const {from,to}=ctx.request.body

  /*
更新数据库中的chat数据
参数1: 查询条件
参数2: 更新为指定的数据对象
参数3: 是否1次更新多条, 默认只更新一条
参数4: 更新完成的回调函数
{multi:true}一次修改多条
 */
  await chatModel.update({from,to,read:false},{read:true},{multi:true}).then(
    (result)=>{
      ctx.body={code:200,data:result.nModified} //更新的数量
    }
  )

})

module.exports=router;
