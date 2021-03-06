const BASEURL="/"
// const LOCALURL = "http://120.26.175.87:3000/"

const LOCALURL = "http://localhost:3000/"

const URL={
  getshoppingMallInfo:BASEURL+"index",
  getGoodsInfo:BASEURL+"getGoodsInfo",


  registerUser:LOCALURL+'user/register',   //用户注册接口
  saveUserInfo:LOCALURL+"user/saveuserinfo",//完善用户信息
  loginUser:LOCALURL+'user/login',   //用户登录接口
  loginFromLocal:LOCALURL+"user/loginfromlocal",
  cancelUser:LOCALURL+"user/cancellogin",//注销登录

  getDatailGoodsInfo:LOCALURL+"goods/getDatailGoodsInfo",//获取商品详情
  getCategoryList:LOCALURL+"categoryList/getCategoryList",//获取商品大类信息
  getCategorySubList:LOCALURL+"categoryList/getCategorySubList",//获取商品小类信息
  getGoodsListByCategorySubID:LOCALURL+"goods/getGoodsListByCategorySubID",//根据ID获取商品信息
  getOrderNumber:LOCALURL+"order/getOrderNumber",//获取支付订单号
  getConfrimPay:LOCALURL+"order/confrimPay",//付款
  getgetOrderList:LOCALURL+"order/getOrderList",//获取订单列表

  getUsersMsgs:LOCALURL+"chat/usersmsglist",//获取当前用户的所有聊天信息和用户列表

  changeMsgRead:LOCALURL+"chat/readmsg"//修改指定消息为已读取
}
module.exports=URL
