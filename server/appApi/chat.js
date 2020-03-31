const Router=require("koa-router")



let router=new Router()

router.get("/",async ctx=>{
  ctx.body="你好"
})

module.exports=router;
