<template>
  <div class="floor-wrap">
    <div class="floor-tile">劲爆推荐</div>
    <div class="floor-one">
      <div class="floor-one-first">
        <img :src="floor1one.image"/>
      </div>
      <div class="floor-one-second">
        <img :src="floor1two.image"/>
        <img :src="floor1third.image"/>
      </div>
    </div>
    <div class="floor-tile">良心商品</div>
    <div class="floor-two-wrap">
      <div class="floor-two" v-for="(item,index) in this.floor2.slice(1)" :key="index" v-if="index!==4">
        <div class="floor-normal" >
          <img :src="item.image"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props:['floor1','floor2'],
    data() {
      return {
        floor1one:{},
        floor1two:{},
        floor1third:{},
      }
    },
    watch:{
      floor1:function (val) {
        this.floor1one = this.floor1[0]
        this.floor1two = this.floor1[1]
        this.floor1third = this.floor1[2]
      }
    },
  }
</script>

<style >
  .floor-wrap{
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .floor-one{
    display: flex;
    flex-direction: row;
  }
  .floor-tile{
    margin: 12px;
    font-weight: bold;
    text-align: center;
  }
  .floor-one>div{
    width: 50%;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-right: 1px solid #eee;
  }
  .floor-one-first>img{
    width: 100%;
  }
  .floor-one-second>img{
    width: 100%;
    border-bottom: 1px solid #eee;
  }


  .floor-two-wrap{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .floor-two{
    width: 50%;
  }
  .floor-normal{
    width: 100%;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-right: 1px solid #eee;
  }
  .floor-normal img{
    width: 100%;
  }
</style>
