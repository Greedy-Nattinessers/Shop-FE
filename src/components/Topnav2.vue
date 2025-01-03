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
          name:"用户中心",
        }
    }
    },
    methods:{
      handleSelect:function (){
        console.log(666);
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
        :default-active="'0'"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
      <router-link to="/Main">
        <el-image src="../../public/logo.png"
                  style="width: 200px;height: 40px;margin-top: 10px;">
        </el-image>
      </router-link>
      <span class="viewName">{{$props.viewName}}</span>
      <router-link to="ShoppingCart">
        <el-button :icon="ShoppingCart"
                   style="
                position: absolute;
                margin:11px 10px 0 10px;
                border:0;
                right: 100px;"
        ></el-button>
      </router-link>
      <el-sub-menu
          style="
                  position: absolute;
                  margin:0 0 0 10px;
                  border:0;
                  right: 5px;" id="userName" index="0">
        <template #title>{{user.name}}</template>
        <router-link to="/userInfo">
          <el-menu-item index="1"><template #title>个人信息</template></el-menu-item>
        </router-link>
        <router-link to="/Favor">
          <el-menu-item index="2"><template #title>我的收藏</template></el-menu-item>
        </router-link>
        <router-link to="/Order">
          <el-menu-item index="3"><template #title>我的订单</template></el-menu-item>
        </router-link>
        <router-link to="/Login">
        <el-menu-item index="4"><template #title>退出登录</template></el-menu-item>
      </router-link>
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