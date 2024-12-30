

<script>
import cartApi from "@/apis/cart.js";
import useUserStore from '@/stores/user/index';
import userApi from '@/apis/user'; // 导入整个 userApi 对象
import Topnav2 from "@/components/Topnav2.vue";

export default {
  components: {Topnav2},
  data(){
    return {
      isAllChecked:false,
      countNow:0,
      sumNow:0,
      cart:[],
      address:[],
      selectAddress:"",
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const data = await cartApi.getAllCart();
        const promises = data.data.map(item => {
          item.checked = false;
          item.state = true;
          item.detail = {};
          return cartApi.getImg(item.cid).then(img => {
            item.images = img;
          });
        });
        await Promise.all(promises);
        this.cart = data.data; // 将获取到的数据赋值给cart
        this.address = await userApi.address();
        console.log(this.address.data);
        console.log(this.cart);
      } catch (error) {
        console.error('无商品');
      }
    },
    priceSum:function (e){
      return e.price*e.count
    },
    jumpToDetails:function (e){
      console.log("跳到"+e.name)
    },
    reduceCount:function (e){
      if(e.count>1)
        e.count--;
      if(e.checked) {
        this.countNow--;
        this.sumNow-=e.price;
      }
    },
    addCount:function (e){
      e.count++;
      if(e.checked) {
        this.countNow++;
        this.sumNow+=e.price;
      }
    },
    async deleteCart(e,flag){
      for (var i=0;i<e.count;i++)
        await cartApi.deleteCart(e.cid);
      this.sumNow -= this.priceSum(e);
      this.countNow -= e.count;
      if(flag)
        location.reload();
    },
    collection:function (){
      alert("收藏成功")
    },
    isChecked:function (e){
      if(e.checked) {
        this.countNow -= e.count;
        this.sumNow-=this.priceSum(e);
        this.isAllChecked=false;
      }
      else {
        this.countNow += e.count;
        this.sumNow+=this.priceSum(e);
      }
      e.checked=!e.checked;
      console.log(e.checked)
    },
    commitOrders:async function (){
      if(this.selectAddress.EMPTY)
        alert("还未选择地址！");
      const orderData = {
        aid: "",
        content: {
        }
      };
      orderData.aid = this.selectAddress;
      for (let i = 0; i < this.cart.length; i++) {
        if(this.cart[i].checked)
        {
          orderData.content[this.cart[i].cid] = this.cart[i].count;
          await this.deleteCart(this.cart[i],false);
        }
      }
      console.log(await cartApi.addOrder(orderData));
      alert("购买成功");
      location.reload();
    },
    allCheck:function (){
      const flag = this.isAllChecked;
      for (let i = 0; i < this.cart.length; i++) {
          this.isChecked(this.cart[i]);
      }
      this.isAllChecked=!flag;
    },
    async allDelete(){
      for (let i = 0; i < this.cart.length; i++) {
        if(this.cart[i].checked) {
          await this.deleteCart(this.cart[i],false);
          this.sumNow -= this.priceSum(this.cart[i]);
          this.countNow -= this.cart[i].count;
        }
      }
      location.reload();
      this.isAllChecked=false;
    },
    allCollect:function (){
      alert("全部收藏成功")
    },
  },
}
</script>

<template>
  <Topnav2 viewName="购物车"></Topnav2>
  <body>
  <table id="orders">
    <tr id="head">
      <th><input type="checkbox" :checked="this.isAllChecked" class="checkbox" @click="allCheck"/></th>
      <th style="text-align: left">全选</th>
      <th>商品</th>
      <th>单价</th>
      <th>数量</th>
      <th>小计</th>
      <th>操作</th>
    </tr>
    <template v-for="(item,index) in cart" id="item">
    <tr class="order">
      <td><input type="checkbox" :checked="item.checked"  @click="isChecked(item)" class="checkbox"/></td>
      <td>
        <img :src="item.images" id="images" @click="jumpToDetails(item)">
      </td>
      <td >
        <p id="name" style="text-align: center">{{item.name}}</p>
      </td>
      <td>￥{{item.price}}</td>
      <td>
        <button @click="reduceCount(item)"><</button>
        &emsp;{{item.count}}&emsp;
        <button @click="addCount(item)">></button>
      </td>
      <td>￥{{priceSum(item)}}</td>
      <td>
        <button @click="collection(item)" class="cartBtn">移入收藏夹</button>
        <br><br>
        <button @click="deleteCart(item,true)" class="cartBtn">从购物车中删除</button>
      </td>
    </tr>
    </template>
  </table>
  <div id="pay">
    <input type="checkbox" class="checkbox" :checked="this.isAllChecked" @click="allCheck">&emsp;<p>全选</p>
    <button @click="allDelete">删除</button>
    <button @click="allCollect">移入收藏</button>
    <span style="margin-top: 10px;margin-left: 20px">地址</span>
    <select v-model="selectAddress">
      <option v-for="option in address.data" :key="option.address" :value="option.aid">
        {{ option.address }}
      </option>
    </select>
    <p id="checkShop">已选择{{countNow}}件|实付款</p>
    <p id="money">￥{{sumNow}}</p>
    <button @click="commitOrders" id="payMoney">去结算</button>

  </div>
  </body>
</template>

<style scoped>


#pay{
  display: flex;
  width: 1200px;
  height: 50px;
  padding: 10px 10px 0 10px;
  margin: 50px 0 0 200px;
  background-color: white;
}

#pay input{
  margin-top: 2px;
  margin-left: 10px;
}

#pay p{
  margin-top: 10px;
}

#pay button{
  text-align: center;
  font-size: 15px;
  margin: 8px 0 0 20px;
  height: 30px;
  width: 80px;
  border: 0;
}

#checkShop{
  margin-left: 300px;
}
#money{
  margin-left: 10px;
  font-size: 20px;
  color: red;
}

#payMoney{
  background-color: red;
  color: white;
}

td{
  border-top: 10px solid #f7f7f7;
}

body{
  background-color: #f7f7f7;
  height: 1200px;
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

.order{
  text-align: center;
  height: 160px;
  font-size: 18px;
  padding: 200px 0 0 0;
  margin: 200px 0 0 0;
  color:black;

}
.cartBtn{
  float: left;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid gray;
}

.cartBtn:hover {
  background-color: #4CAF50;
  color: white;
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