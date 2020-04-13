export default function (len) {
  let res=""

  let arr=['a','b','c','d','e','f','g','g','1','2','3','4','5','6','7','8','9','0']
  for(let i=0;i<4;++i){
    res+= arr[Math.floor(Math.random() * (17 ))]
  }
  return res
}
