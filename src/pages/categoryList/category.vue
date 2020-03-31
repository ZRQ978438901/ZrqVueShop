<template>
  <div>
    <div id="navbar-div" >
      <van-nav-bar title="商品类别" style="background-color: #e5017d"/>
    </div>
    <div>
      <van-row >
        <van-col span="6" >
          <div id="leftNav">
            <ul >
              <li v-for="(item,index) in category" :key="index" @click="clickCategory(index)" :class="{categoryActive:categoryIndex==index}">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>

        </van-col>
        <van-col span="18" >

          <div class="tabCategorySub" @click="handleGetGoodsListByCategorySubID">
            <van-tabs v-model="active" >
              <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME" >
              </van-tab>

            </van-tabs>
          </div>

          <div id="list-div">
            <van-pull-refresh v-model="isReFresh" @refresh="onReflesh">
              <van-list v-model="loading" :finished="finished" loading-text="没有更多了"
                   @load="onLoad">
                <div class="list-item" v-for="(item,index) in list" :key="index" @click="gotoGoodsInfo(item.ID)" >
                  <div class="list-item-content">
                    <img class="list-item-content-image" :src="item.IMAGE1" :onerror="errorImg">
                    <div class="list-item-content-text">
                      <div>{{item.NAME}}</div>
                      <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                    </div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import url from "../../api/api.config"
  import {moneyFilter} from '../../fliter/moneyFilter'





  export default {
    data(){
      return{
        category:[],//左侧大类商品
        categoryIndex:0,//右侧小类下标
        categorySub:[],//右侧小类

        active:0,//激活标签的值
        page:1,//当前页数
        loading:false,   //上拉加载使用
        finished:false,  //下拉加载是否没有数据了
        list:[],        //商品列表

        isReFresh:false,//下拉刷新
        errorImg:'this.src="' + require('../../assets/image/errorimg.png') + '"'   ,  //错误图片显示路径
        //防止重复发送请求
        timeout:{}
      }
    },
    watch:{

    },
    filters:{
      moneyFilter
    },
    methods:{
      //点击商品大类
      clickCategory(index){
        this.categoryIndex=index
        this.list=[]
        this.page=1
        this.finished=true
        this.loading=true
        // this.holdRepeatCommit(this.getCategorySubList,this.onLoad,500)()

        //防止重复发送请求
        clearTimeout(this.timeout)
        this.timeout=setTimeout(()=>{
          this.getCategorySubList()
          this.onLoad()
        },500)

        // this.getCategorySubList()
        // this.onLoad()
      },



      //获取商品大类
      async getCategoryList(){
        let categoryList=await axios({
          url:url.getCategoryList
        })
        if(categoryList.data.code===200){
          this.category=categoryList.data.message
        }else {
          console.log(categoryList.data.message)
        }
      },

      //获取商品小类
      async getCategorySubList(){
        let categoryId=this.categoryIndex+1
        let categorySubList=await axios({
          url:url.getCategorySubList,
          method:'post',
          data:{categoryId}
        })
        if(categorySubList.data.code===200){
          this.categorySub=categorySubList.data.message
          this.active=0
          console.log(categorySubList)
        }else {
          console.log(categorySubList.data.message)
        }
      },
      //点击商品小类
      handleGetGoodsListByCategorySubID(){
        this.list=[]
        this.page=1
        this.loading=true
        this.finished=true

        //防止重复发送请求
        clearTimeout(this.timeout)
        this.timeout=setTimeout(()=>{
          this.getGoodsListByCategorySubID()
        },500)

        // this.onLoad()
      },
      //根据ID获取商品
      async getGoodsListByCategorySubID(){
        this.loading = true;
        let categoryId=this.categorySub[this.active].ID
        let page=this.page
        let categoryListById=await axios({
          url:url.getGoodsListByCategorySubID,
          method:'post',
          data:{categoryId,page}
        })
        if(categoryListById.data.code===200&&categoryListById.data.message.length>0){
          this.list=this.list.concat(categoryListById.data.message)
          this.page++
          console.log(categoryListById)

        }else {
          if(categoryListById.data.message.length===0){
            this.finished=true
          }
          console.log(this.finished)
        }
        this.loading=false
      },
      //用于实现上拉加载
      onLoad(){
        clearTimeout(this.timeout)
        this.timeout=setTimeout(()=>{
          this.getGoodsListByCategorySubID()
          console.log("onload")
        },300)

      },
      //下拉刷新
      onReflesh(){
        clearTimeout(this.timeout)
        this.timeout=setTimeout(()=>{
          this.list=[]
          this.page=1
          this.loading=false
          this.finished=true
          this.isReFresh=false
          this.onLoad()
        },300)

      },
      //跳转到商品详细页
      gotoGoodsInfo(id){
        this.$router.push({name:"Goods",params:{goodsId:id}})
      },
    },

    async mounted () {
      //让左侧当行适应页面高度
      let winHeight = document.documentElement.clientHeight
      let navBarHeight=document.getElementById("navbar-div").style.height
      document.getElementById("leftNav").style.height= winHeight-navBarHeight +'px'

      //让右侧list当行适应页面高度
      document.getElementById("list-div").style.height= winHeight-navBarHeight-44-50 +'px'
      //获取商品大类
      this.getCategoryList()

      //获取商品小类
      this.getCategorySubList()


    }
  }
</script>

<style >
  #leftNav{
    background-color:aliceblue;
  }
  #leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
  }
  .categoryActive{
    background-color: #fff;
  }

  #list-div{
    overflow: scroll;

  }
  .list-item{
    border-bottom: 2px solid #f0f0f0;
  }

  .list-item-content{
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0.3rem;
  }
  .list-item-content-image{
    width: 40%;
    height: 3rem;
  }
  .list-item-content-text{
    font-size: 14px;
    width: 60%;
    height: 3rem;
  }
</style>
