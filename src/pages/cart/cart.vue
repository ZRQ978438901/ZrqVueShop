<template>
  <div style="margin-bottom: 50px">
    <van-nav-bar   title="购物车" style="background-color: #e5017d" />
    <!--清空购物车-->
    <div class="card-title">
      <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
    <!--购物车中的商品-->
    <div class="cart-list">
      <div class="catt-list-row" v-for="(item,index) in cartInfo" :key="index">
        <img class="cart-list-image" :src="item.image">

        <div class="cart-list-content" >
          <div class="cart-list-content-name">{{item.Name}}</div>
          <div class="cart-list-content-btn">
            <button @click="handleSub(index)">-</button>
            <span>{{item.count}}</span>
            <button @click="handleAdd(index)">+</button>
          </div>
        </div>


        <div class="cart-list-price">
          <div>￥{{item.price|moneyFilter}}</div>
          <div>x{{item.count}}</div>
          <div style="color: red">￥{{item.price*item.count |moneyFilter}}</div>
        </div>
      </div>
      <!--显示总金额-->
      <div class="total-money">
        商品总价：￥{{totalMoney |moneyFilter}}
      </div>

      <van-button style="margin-left: 75%" type="danger" @click="gotoOrder">商品结算</van-button>
    </div>
  </div>
</template>

<script>
  import {moneyFilter} from '../../fliter/moneyFilter'
  import {mapState} from "vuex"
  export default {
    data() {
      return {
        cartInfo: [],     //购物车内的商品
        isEmpty : false , //购物车是否为空，不为空则显示true，为空显示false
      }
    },
    computed:{
      ...mapState(['totalmoney','isLogin']),

       totalMoney(){
         let allMoney=0
         for( let item of this.cartInfo){
           allMoney+=item.price*item.count
         }
         //解决刷新页面bug
         localStorage.cartInfo=JSON.stringify(this.cartInfo)

         this.$store.commit("getTotalMoney",allMoney)
         return allMoney
       }
    },
    created(){
      this.getCartInfo()
    },
    filters:{
      moneyFilter
    },
    mounted(){
      this.cartInfo=JSON.parse(localStorage.cartInfo)
    },
    methods: {
      //得到购物车的商品
      getCartInfo() {
        //判断localStorage里是否有购物车数据
        if(localStorage.cartInfo){
          //如果有数据，我们去除并赋值给cartInfo
          this.cartInfo = JSON.parse(localStorage.cartInfo)
        }
        console.log(this.cartInfo)
        //打印到控制台查看效果
        this.isEmpty = this.cartInfo.length>0 ? true : false
      },
      //清空购物车的商品
      clearCart(){
        localStorage.removeItem('cartInfo')
        this.cartInfo=[]
      },
      handleSub(index){

        if( this.cartInfo[index].count>0){
          this.cartInfo[index].count--
        }

        if(this.cartInfo[index].count===0){
          let cartInfo=[]
          this.cartInfo.map(((item)=>{
            if(item.count!==0){
              cartInfo.push(item)
            }
          }))
          this.cartInfo=cartInfo
        }

      },
      handleAdd(index){
        if( this.cartInfo[index].count<100){
          this.cartInfo[index].count++
        }
      },
      gotoOrder(){
        if(!this.isLogin){
          this.$toast.success("请登录购买")
        }else if(this.cartInfo.length===0){
          this.$toast.success("请先添加购物车")
        }
        if(this.cartInfo.length>0&&this.isLogin){
          this.$router.push("settleAccounts")
        }


      }
    },

  }
</script>

<style  >
  .card-title{
    height: 2rem;
    line-height:2rem;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
    text-align: right;
  }
  .cart-list{
    width: 100%;
  }
  .catt-list-row{
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0.5rem;

  }
  .cart-list-image{
    width: 30%;
    height: 3rem;
    flex:1
  }
  .cart-list-content{
    font-size: 14px;
    flex:3;
    display: flex;
    flex-direction: column;
  }
  .cart-list-content-btn{
    flex: 1;
  }
  .cart-list-content-name{
    flex: 2;
    display: flex;
    align-items: center;
  }

  .cart-list-price{
    flex:1;
    font-size: 16px;
    text-align: right;
    margin-right: .8rem;
  }
  .cart-list-content-btn>button{
    width: 1.5rem;
    height: 100%;
  }
  .cart-list-content-btn>span{
    display: inline-block;
    width: 1.5rem;
    height: 100%;
    text-align: center;
  }

  .total-money{
    background-color: #fff;
    text-align: right;
    border-bottom: 1px solid #eee;
    padding: 5px;
  }
</style>
