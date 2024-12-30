<script>
import Topnav2 from "@/components/Topnav2.vue";
import Downnav from "@/components/Downnav.vue";
import userApi from '@/apis/user'; // 导入整个 userApi 对象
import orderApi from '@/apis/order.js'
import shopApi from '@/apis/shop.js'
import cartApi from "@/apis/cart.js";
export default {
  components: {Downnav, Topnav2},
  data(){
    return {
      orders:[]
    }
  },
  mounted() {
    this.getAllOrders();
  },

  methods:{
    getAllOrders: async function() {
      try {
        const data = await orderApi.getOrders();
        const promises = data.data.map(async item => {
          const list = { // 在每次迭代中创建一个新的list对象
            oid: item.oid,
            time: item.time,
            status: item.status,
            cid: "",
            count: 0,
          };
          const entries = Object.entries(item.content);
          for (const [key, value] of entries) { // 使用for...of循环遍历entries
            list.cid = key;
            list.count = value;
            const detail = await shopApi.commodityDetail(list.cid);
            list.name = detail.data.name; // 直接赋值，不需要await
            list.image = await cartApi.getImg(list.cid);
            list.price = detail.data.price; // 直接赋值，不需要await
          }
          return list; // 返回当前迭代的list对象
        });
        const Lists = await Promise.all(promises); // 等待所有promises完成，并获取结果数组
        console.log(Lists);
        this.orders = Lists;
      } catch (error) {
        console.error('无商品');
      }
    },
    priceSum:function (e){
      return e.price*e.count
    },
    signReceive:async function (e){
      await console.log(orderApi.receiveOrder(e.oid,1));
      location.reload();
    },
    jumpToDetails:function (e){
      console.log("跳到"+e.name)
    },
    deleteOrder:async function (e){
      await orderApi.receiveOrder(e.oid,1);
      await console.log(orderApi.deleteOrder(e.oid));
      location.reload();
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
      <tr id="order" v-if="item.status!==3">
        <td>
          <img :src="item.image" id="images" @click="jumpToDetails(item)">
        </td>
        <td>
          <p id="name" style="text-align: center">{{item.name}}</p>
          <p style="font-size: 12px;color: #b1b1b1">{{item.time}}</p>
        </td>
        <td style="color:red;">￥{{item.price}}</td>
        <td>{{item.count}}</td>
        <td style="font-weight: bold;color: red">￥{{priceSum(item)}}</td>
        <td>
          <button v-if="item.status === 2" id="recpt" @click="signReceive(item)">确认收货</button>
          <button v-if="item.status === 0" id="delt" @click="deleteOrder(item)">取消订单</button>
          <button v-if="item.status === 1" id="delt2" @click="deleteOrder(item)">删除记录</button>
        </td>
        <td style="font-weight: bold">
          <span v-if="item.status === 2" style="color: #3aa5bf;">运输中</span>
          <span v-if="item.status === 0" style="">待发货</span>
          <span v-if="item.status === 1" style="color: #1234ff">已完成</span>
        </td>
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
  background-color: #baee2d;
}

#delt2{
  background-color: rgb(20, 120, 50);
  font-size: 18px;
  border-radius: 8px;
  color: white;
}

#delt2:hover{
  background-color: #123ffd;
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