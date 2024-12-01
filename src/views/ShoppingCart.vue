<script>
export default {
  data(){
    return {
      isAllChecked:false,
      countNow:0,
      sumNow:0,
      cart:[
        {
          id:1,
          checked:false,
          name:"马老六",
          price:123,
          detail:{},
          intro:"诗人我吃 他真不是人",
          count:1,
          state:true,
          deleteIt:false,
          image:"https://tse2-mm.cn.bing.net/th/id/OIP-C.FRZh6FryVcYvQa5KVRpUCwAAAA?rs=1&pid=ImgDetMain",
        },
        {
          id:2,
          checked:false,
          name:"林gard",
          price:5,
          detail:{},
          intro:"甄布诗人 我说的",
          count:2,
          state:true,
          deleteIt:false,
          image:"https://tse3-mm.cn.bing.net/th/id/OIP-C.GDCnhLgh7PLOiraerH7GaQHaF9?rs=1&pid=ImgDetMain",
        }
      ],
    }
  },
  methods:{
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
    deleteCart:function (e){
      e.deleteIt=true;
      this.sumNow-=this.priceSum(e);
      this.countNow-=e.count;
    },
    collection:function (e){
      alert(e.name+"被你首藏了（分头行动）")
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
    commitOrders:function (){
      for (let i = 0; i < this.cart.length; i++) {
        if(this.cart[i].checked)
          console.log(this.cart[i].name+"被购买了"+this.cart[i].count+"件");
      }
    },
    allCheck:function (){
      for (let i = 0; i < this.cart.length; i++) {
        if(!this.cart[i].checked)
          this.isChecked(this.cart[i]);
      }
      this.isAllChecked=!this.isAllChecked;
    },
    allDelete:function (){
      for (let i = 0; i < this.cart.length; i++) {
        if(this.cart[i].checked) {
          this.cart[i].deleteIt = true;
          this.sumNow -= this.priceSum(this.cart[i]);
          this.countNow -= this.cart[i].count;
        }
      }
      this.isAllChecked=false;
    },
    allCollect:function (){
      for (let i = 0; i < this.cart.length; i++) {
        if(this.cart[i].checked)
          console.log(this.cart[i].name+"被收藏了");
      }
    },
  },
}
</script>

<template>
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
    <tr v-if="!item.deleteIt" class="order">
      <td><input type="checkbox" :checked="item.checked"  @click="isChecked(item)" class="checkbox"/></td>
      <td>
        <img :src="item.image" id="images" @click="jumpToDetails(item)">
      </td>
      <td>
        <p id="name">{{item.name}}</p>
        <p id="intro">{{item.intro}}</p>
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
        <button @click="deleteCart(item)" class="cartBtn">从购物车中删除</button>
      </td>
    </tr>
    </template>
  </table>
  <div id="pay">
    <input type="checkbox" class="checkbox" :checked="this.isAllChecked" @click="allCheck">&emsp;<p>全选</p>
    <button @click="allDelete">删除</button>
    <button @click="allCollect">移入收藏夹</button>
    <p id="checkShop">已选择{{countNow}}件&emsp;|&emsp;&emsp;&emsp;实付款</p>
    <p id="money">￥{{sumNow}}</p>
    <button @click="commitOrders" id="payMoney">去结算</button>
  </div>
  </body>
</template>

<style scoped>


#pay{
  display: flex;
  width: 1180px;
  height: 50px;
  padding: 10px 10px 0 10px;
  margin: 50px 0 0 200px;
  background-color: white;
}

#pay input{
  margin-top: 2px;
  margin-left: 20px;
}

#pay p{
  margin-top: 10px;
}

#pay button{
  text-align: center;
  font-size: 15px;
  margin: 0 0 0 30px;
  height: 40px;
  width: 100px;
  border: 0px;
}

#checkShop{
  margin-left: 400px;
}
#money{
  margin-left: 60px;
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