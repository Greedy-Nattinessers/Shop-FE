<template>
  <h3>this is home</h3>
  <button @click="handleLogin">登录</button>
  <button @click="handleFavor">收藏</button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const handleLogin = () => {
  router.push('/Login')
};
const handleFavor = () => {
  router.push('/Favor')
};

</script>
