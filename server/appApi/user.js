const Router=require("koa-router")

let router=new Router()

//引入userSchema
const userModel=require("../database/schema/user").userModel

router.get("/",async (ctx)=>{
  ctx.body="用户首页"
})
//注册路由
router.post('/register',async(ctx)=>{
  let newUser=ctx.request.body
  // 处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
  // 查询(根据username)
   await userModel.findOne({userName:newUser.username}).then(async result=>{
     if(result){
       ctx.body={ code:500, message:'用户已注册'}
     }else{
      await new userModel({userName:newUser.username,password:newUser.password,payPassword:newUser.payPassword}).save().then(
         (res)=>{
          // ctx.cookies.set('userid',res._id,{maxAge:1000*60*24*1})//设置cookieID

          let data={
            userid:res._id,
            userName:res.userName
          }
          ctx.body={ code:200, message:'注册成功',data}
        }
      )
     }
   })
})
//登录路由
router.post("/login",async (ctx)=>{
  //取出登录对象
  let loginUser = ctx.request.body
  let userName = loginUser.userName
  let password = loginUser.password
  //引入userModel

    await userModel.findOne({userName})
    .then(async(result)=>{
    if(result){
      //console.log(User)
      //当用户名存在时，开始比对密码
      let newUser = new userModel()  //因为是实例方法，所以要new出对象，才能调用
      await newUser.comparePassword(password,result.password)
        .then( (isMatch)=>{
          //返回比对结果
          let data={
            userid:result._id,
            type:result.type,
            address:result.address,
            selectHeaderImage:result.selectHeaderImage,
            tel:result.tel,
            userName:result.userName,
            nickname: result.nickname,
            money:result.money,//余额
            integral:result.integral,//积分
            coupons:result.coupons
          }
          ctx.body={ code:200, message:isMatch,data}
        })
        .catch(error=>{
          //出现异常，返回异常

          ctx.body={ code:500, message:error}
        })
    }else{
      ctx.body={ code:200, message:'用户名不存在或密码错误'}
    }

  }).catch(error=>{

    ctx.body={ code:500, message:error  }
  })
})
//完善用户信息路由
router.post("/saveuserinfo",async ctx=>{
   let user=ctx.request.body


   let {userid}=user
   await userModel.findByIdAndUpdate({_id: userid}, user,(error,oldData)=>{

     if(!oldData){
       crx.body={code:201,message:"请先登录"}
     }else {
       //准备一个返回的user数据对象
       let data={
         userid:oldData._id,
         money:oldData.money,
         integral:oldData.integral,
         coupons:oldData. coupons,

         nickname:user.nickname,
         type:user.type,
         address:user.address,
         selectHeaderImage:user.selectHeaderImage,
         tel:user.tel,
       }
       ctx.body={code:200,message:"信息已完善",data}
     }
   })

})


/*
 生成指定长度的随机数
 */
const Base64 = require('js-base64').Base64;
const md5 = require('blueimp-md5')
const moment = require('moment')
const request = require('request');


const axios=require("axios")


function randomCode(length) {
  let chars = ['0','1','2','3','4','5','6','7','8','9'];
  let result = ""; //统一改名: alt + shift + R
  for(let i = 0; i < length ; i ++) {
    var index = Math.ceil(Math.random()*9);
    result += chars[index];
  }

  return result;
}

router.get("/sendcode",async ctx=>{
  //获取请求参数
  let phone="15627188132"
  let code=randomCode(6)


  let ACCOUNT_SID = '8aaf070870e20ea10170f6f4ff4b0dd0';
  let AUTH_TOKEN = '8d80643c4eab4d61a7239bd12e3926b8';
  let Rest_URL = 'https://app.cloopen.com:8883';
  let AppID = '8aaf070870e20ea10170f6f4ffb10dd6';
  //1. 准备请求url
  /*
     1.使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。
     时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
     2.SigParameter参数需要大写，如不能写成sig=abcdefg而应该写成sig=ABCDEFG
     */
  let sigParameter = '';
  let time = moment().format('YYYYMMDDHHmmss');
  sigParameter = md5(ACCOUNT_SID+AUTH_TOKEN+time);
  let url = Rest_URL+'/2013-12-26/Accounts/'+ACCOUNT_SID+'/SMS/TemplateSMS?sig='+sigParameter;

  //2. 准备请求体
  let body = {
    to : phone,
    appId : AppID,
    templateId : '1',
    "datas":[code,"1"]
  }

  //3. 准备请求头
  /*
   1.使用Base64编码（账户Id + 冒号 + 时间戳）其中账户Id根据url的验证级别对应主账户
   2.冒号为英文冒号
   3.时间戳是当前系统时间，格式"yyyyMMddHHmmss"，需与SigParameter中时间戳相同。
   */
  var authorization = ACCOUNT_SID + ':' + time;
  authorization = Base64.encode(authorization);
  var headers = {
    'Accept' :'application/json',
    'Content-Type' :'application/json;charset=utf-8',
    'Content-Length': JSON.stringify(body).length+'',
    'Authorization' : authorization
  }
  //4. 发送请求, 并得到返回的结果
  let result=await request(
    {
      method : 'POST',
      url : url,
      headers : headers,
      body : body,
      json : true
    }
  )


})



module.exports=router;
