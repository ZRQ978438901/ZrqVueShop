const fs=require("fs")
fs.readFile("./data_json/goods.json","utf8",function (error,data) {
  let newdata=JSON.parse(data)
  let pushData=[]
  let i=0
  //筛选数据
  newdata.RECORDS.map(
    (val,index)=>{
      if(val.IMAGE1){
        i++
        pushData.push(val)
      }
    }
  )
  fs.writeFile("./data_json/newGoods.json",JSON.stringify(pushData),(error)=>{
    if(error){
      console.log("写入文件失败")
    }else{
      console.log("写入文件成功")
    }
  })
})
