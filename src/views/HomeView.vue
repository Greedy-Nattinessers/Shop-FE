<template>
  <h3>this is home</h3>
  <button @click="handleLogin">登录</button>
  <button @click="handleFavor">收藏</button>
  <button @click="handleOrder">订单</button>
  <button @click="handleUserInfo">用户信息</button>
  <button @click="handleCommodityDetail">商品详情</button>

</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const handleLogin = () => {
  router.push('Login')
};
const handleFavor = () => {
  router.push('/Favor')
};
const handleOrder = () => {
  router.push('/Order')
};
const handleUserInfo = () => {
  router.push('/UserInfo')
};
const handleCommodityDetail = () => {
  router.push('/CommodityDetail')
};

</script>

<style scoped>

</style>
