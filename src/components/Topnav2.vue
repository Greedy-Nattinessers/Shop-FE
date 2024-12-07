<script>
  import {ShoppingCart} from "@element-plus/icons-vue";

  export default {
    computed: {
      ShoppingCart() {
        return ShoppingCart
      }
    },
    data(){
      return{
        user:{
          name:"马老六",
        }
    }
    },
    props:{
      viewName:String,
    }
  }
</script>

<template>
  <div class="top">
    <el-menu
        :default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
      <router-link to="HomeView">
        <el-image src="../../public/logo.png"
                  style="width: 200px;height: 40px;margin-top: 10px">
        </el-image>
      </router-link>
      <span class="viewName">{{$props.viewName}}</span>
      <router-link to="ShoppingCart">
        <el-button :icon="ShoppingCart"
                   style="
                position: absolute;
                margin:11px 0 0 10px;
                border:0;
                right: 100px;"
        ></el-button>
      </router-link>
      <el-sub-menu
          style="
                  position: absolute;
                  margin:0 0 0 10px;
                  border:0;
                  right: 5px;" id="userName">
        <template #title>{{user.name}}</template>
        <router-link to="userInfo">
          <el-menu-item><template #title>个人信息</template></el-menu-item>
        </router-link>
        <router-link to="home">
          <el-menu-item><template #title>我的收藏</template></el-menu-item>
        </router-link>
        <router-link to="Order">
          <el-menu-item><template #title>我的订单</template></el-menu-item>
        </router-link>
        <el-menu-item><template #title>退出登录</template></el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style scoped>
.top{
  border-bottom: 1px solid #a1a1a1;
  width: 100%;
  height: 60px;
  border-radius: 5px;
}

.viewName{
  font-weight: bold;
  font-size: 28px;
  position: absolute;
  left: 240px;
  top:12px
}
</style>