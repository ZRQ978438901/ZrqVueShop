<template>
  <div class="goods-info" @click="gotoGoodsPage" style="margin: 10px 10px 0 0">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="80%" height="80px" />
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice|moneyFilter }}</div>
  </div>
</template>



<script>
  import {moneyFilter} from '../../fliter/moneyFilter'
  export default {
    props:['goodsImage','goodsName','goodsPrice','goodsId'],
    filters:{
      moneyFilter
    },
    methods:{
      gotoGoodsPage(){
        this.$router.push({name:"Goods",params:{goodsId:this.goodsId}})
      }
    }
  }
</script>

<style >
  .goods-info{

  }
  .goods-name{
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
  }
  .goods-price{
    font-size: 11px;
    height: 20px;
    line-height: 20px;
  }
</style>
