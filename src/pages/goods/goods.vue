<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%"/>
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE|moneyFilter}}</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL">
          </div>
        </van-tab>
        <van-tab title="评价">
          正在制作中
        </van-tab>
      </van-tabs>

    </div>

    <div class="goods-bottom" >
      <div class="dianpu-chat">
        <div class="chat-content" @click="chatToME">
          <img src="./image/dianpu.png" >
          <span >店铺</span>
        </div>
        <div class="chat-content">
          <img src="./image/shangjia.png" >
          <span>客服</span>
        </div>
        <div class="chat-content"  @click="hangdleCollect">
          <img  src="./image/collection.png"   v-show="!isCollected">
          <img  src="./image/collected.png"   v-show="isCollected">
          <span>收藏</span>
        </div>

      </div>
      <div class="btn-area">
        <van-button  type="primary" class="button" @click="addGoodsToCartShop">加入购物车</van-button>
        <van-button  type="danger" class="button" style="margin-left: 5px" @click="gotoCart">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import url from "../../api/api.config"
  import {moneyFilter} from "../../fliter/moneyFilter"
  export default {
    data(){
      return{
        goodsId:"",
        goodsInfo:{},
        isCollected:false,
      }
    },
    filters:{
      moneyFilter
    },
    methods:{
      //加入购物车
      addGoodsToCartShop(){
        //取出购物车内容
        let cartInfo=localStorage.cartInfo?JSON.parse(localStorage.cartInfo):[]
        //判断购物车内是否有该商品
        let isHaveGoods=cartInfo.find(val=>{
          return val.goodsId===this.goodsId
        })
        //如果存在

        if(isHaveGoods){
          this.$toast.success("已有该商品")
        }else {
          //没有商品直接添加到数组中
          //重新组成添加到购物车的信息
          let newGoodsInfo={
            goodsId:this.goodsInfo.ID,
            Name:this.goodsInfo.NAME,
            price:this.goodsInfo.PRESENT_PRICE,
            image:this.goodsInfo.IMAGE1,
            count:1
          }
          cartInfo.push(newGoodsInfo) //添加到购物车
          localStorage.cartInfo=JSON.stringify(cartInfo) //操作本地数据
          this.$toast.success('添加成功')
        }
        // this.$router.push({path:'/cart'})//进行跳转
      },
      async getInfo(){
        try{
          let result=await axios({
            url:url.getDatailGoodsInfo,
            method:"post",
            data:{goodsId:this.goodsId}
          })
          if(result.data.code===200){
            console.log(result.data)
            this.goodsInfo = result.data.message
          }
        }catch (e) {
          console.log(e)
        }
      },
      onClickLeft(){
        this.$router.back()
      },
      hangdleCollect(){
        this.isCollected=!this.isCollected

        if(this.isCollected){
          this.$toast.success("已收藏")
        }else{
          this.$toast.success("已取消")
        }
      },
      //聊天页面
      chatToME(){
        this.$router.push('/chatlist')
      },
      gotoCart(){
        this.addGoodsToCartShop()
        this.$router.push("/cart")
      }
    },
    created () {
      this.goodsId=this.$route.params.goodsId
      this.getInfo()
    },


  }
</script>

<style >
  .detail{
    font-size:0px;
  }
  .goods-name{
    background-color: #fff;
    text-align: center;
  }
  .goods-price{
    background-color: #fff;
    text-align: center;
  }
  .goods-bottom{
    position: fixed;
    bottom:0px;
    left:0px;
    background-color: #FFF;
    width:100%;
    height: 2.5rem;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
  }
  .goods-bottom > div{
    flex:1;
    padding:5px;
  }
  .dianpu-chat{
    display: flex;

  }
  .chat-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:5px;
  }
  .chat-content img{
    width: 80%;
    height: 80%;
  }
  .chat-content span{
    font-size: 12px;
  }
  .onCollected{
    background-color: #1296db;
  }
  .btn-area{
    display: flex;
    padding: 5px;
  }
  .button{
    border-radius: 10px;
    font-size: 12px;
    width: 50%;
  }
</style>
