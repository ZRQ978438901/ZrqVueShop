/*
包含多个基于state的getter计算属性的对象
 */
export default {
  showCanjuNumbei(state){
    return state.canjuNumber
  },
  showRemark(state){
    return state.remark
  },
  showNewOrder(state){
    return state.newOrder
  }
}
