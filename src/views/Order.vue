<script>
import Topnav2 from "@/components/Topnav2.vue";
import Downnav from "@/components/Downnav.vue";

export default {
  components: {Downnav, Topnav2},
  data(){
    return {
      orders:[
        {
          id:1,
          name:"马老六",
          price:123,
          detail:{},
          intro:"诗人我吃 他真不是人",
          count:3,
          image:"https://tse2-mm.cn.bing.net/th/id/OIP-C.FRZh6FryVcYvQa5KVRpUCwAAAA?rs=1&pid=ImgDetMain",
          state:"已签收",
          showIt:true,
        },
        {
          id:2,
          name:"林gard",
          price:5,
          detail:{},
          intro:"甄布诗人 我说的",
          count:4,
          image:"https://tse3-mm.cn.bing.net/th/id/OIP-C.GDCnhLgh7PLOiraerH7GaQHaF9?rs=1&pid=ImgDetMain",
          state:"正在配送中",
          showIt: true,
        }
      ]
    }
  },
  methods:{
    priceSum:function (e){
      return e.price*e.count
    },
    signReceive:function (e){
      e.state="已签收"
    },
    jumpToDetails:function (e){
      console.log("跳到"+e.name)
    },
    deleteOrder:function (e){
      e.showIt=false
    },
  }
}
</script>

<template>
  <Topnav2 viewName="我的订单"></Topnav2>
  <body>
    <table id="orders">
      <tr id="head">
        <th></th>
        <th>商品</th>
        <th>单价</th>
        <th>数量</th>
        <th>小计</th>
        <th>操作</th>
        <th>状态</th>
      </tr>
      <template v-for="(item,index) in orders">
      <tr id="order" v-if="item.showIt">
        <td>
          <img :src="item.image" id="images" @click="jumpToDetails(item)">
        </td>
        <td>
          <p id="name">{{item.name}}</p>
          <p id="intro">{{item.intro}}</p>
        </td>
        <td>￥{{item.price}}</td>
        <td>{{item.count}}</td>
        <td>￥{{priceSum(item)}}</td>
        <td>
          <button v-if="item.state!=='已签收'" id="recpt" @click="signReceive(item)">确认收货</button>
          <button v-else id="delt" @click="deleteOrder(item)">删除记录</button>
        </td>
        <td style="color: red">{{item.state}}</td>
      </tr>
      </template>
    </table>
    <Downnav></Downnav>
  </body>
</template>

<style scoped>
td{
  border-top: 10px solid #f7f7f7;
}

body{
  background-color: #f7f7f7;
  height: 850px;
}

#orders{
  background-color: white;
  width: 1200px;
  padding: 10px 10px 0 10px;
  margin:10px 0 0 200px;
  border-collapse: separate;
  border-spacing: 0 25px;
}

#head{
  text-align: center;
  color:black;
  font-size: 20px;
  font-weight: bold;
}

#order{
  text-align: center;
  height: 160px;
  font-size: 18px;
  padding: 200px 0 0 0;
  margin: 200px 0 0 0;
  color:black;
}

#recpt{
  background-color: rgb(30, 120, 224);
  font-size: 18px;
  border-radius: 8px;
  color: white;
}

#delt{
  background-color: rgb(220, 20, 50);
  font-size: 18px;
  border-radius: 8px;
  color: white;
}

#delt:hover{
  background-color: #1b3c2d;
}

#recpt:hover{
  background-color: #2595bb;
}


#images{
  width: 100px;
  height: 100px;
}
#intro{
  width: 70px;
  font-size: 14px;
  text-align: left;
  color: gray;
}
#name{
  font-weight: bold;
  text-align: left;
}
</style>