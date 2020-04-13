/*
直接更新state的多个方法的对象
 */
export default {
  changeIsLogin(state,bool){
    state.isLogin=bool
  },
  getuserid(state,userid){
    state.userid=userid
  },
  getTotalMoney(state,totalmoney){
    state.totalmoney=totalmoney
  },


  selectCurrentCuupon(state,coupon){
    state.currentCuupon=coupon
  },
  changeRemark(state,remark){
    state.remark=remark
  },
  selectCanjuNumber(state,canjuNumber){
    state.canjuNumber=canjuNumber
  },

  getPayMoney(state,payMoney){
    state.payMoney=payMoney
  },


  getOrderDetail(state,orderDetail){
    state.orderDetail=orderDetail
  },


  getOrderList(state,orderlist){
    state.orderList=orderlist
  },

  getnewOrder(state,newOrder){
    state.newOrder=newOrder
  },

  //获取用户列表
  getUsersMsgsList(state,usersMsgs){
    state.usersMsgs=usersMsgs
  },





  changeAllRead(state,bool){
    state.allRead=bool
  }



}
