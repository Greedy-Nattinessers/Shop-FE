<script>

export default {
  data(){
    return {
      gameComputer: [
        {
          name: "拯救者 Y9000P",
        },
        {
          name: "拯救者 Y9000",
        }
      ],
      thinComputer: [
        {
          name: "小新Pro16",
        },
        {
          name: "小新Pro14",
        }
      ],
      portableComputer: [
        {
          name: "YOGA Air 15",
        },
        {
          name: "YOGA Air 16",
        }
      ],
      desktopComputer: [
        {
          name: "刃7000K",
        },
        {
          name: "刃9000K",
        }
      ],
      thinkPad: [
        {
          name: "X1 系列",
        },
        {
          name: "X13 系列",
        }
      ],
      thinkplus: [
        {
          name: "耳机",
        },
        {
          name: "音箱",
        },
      ],
      xxPad: [
        {
          name: "小新Pad Pro",
        },
        {
          name: "小新Pad",
        }
      ],
      service: [
        {
          name: "驱动下载",
        },
        {
          name: "用户手册",
        },
        {
          name: "保修查询",
        },
        {
          name: "配件查询",
        }
      ],
      story: [
        {
          name: "品牌故事",
        },
        {
          name: "品牌愿景",
        },
        {
          name: "品牌焦点",
        },
        {
          name: "品牌荣誉",
        },
      ],
      // 用户
      user: {
        name: "用户中心",
      },
    }
  },
  methods:{
    handleSelect:function (e){
      console.log(e);
    }
  }
}

</script>

<template>
  <el-menu
      :default-active="'1'"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
  >
    <router-link to="Main">
    <el-image src="../../public/logo.png"
              style="width: 200px;height: 40px;margin-top: 10px">
    </el-image>
    </router-link>
    <el-sub-menu index="1" class="top1">
      <template #title><span class="titleText">商城</span></template>
      <el-sub-menu index="1-1">
        <template #title>Lenovo电脑</template>
        <el-sub-menu index="1-1-1">
          <template #title>游戏本</template>
          <el-menu-item v-for="(item,index) in gameComputer" :index="item.name">
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="1-1-2">
          <template #title>轻薄本</template>
          <el-menu-item v-for="(item,index) in thinComputer" :index="item.name">
            <template #title>{{item.name}}</template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="1-1-3">
          <template #title>便携本</template>
          <el-menu-item v-for="(item,index) in portableComputer" :index="item.name">
            <template #title>{{item.name}}</template>
          </el-menu-item >
        </el-sub-menu>
        <el-sub-menu index="1-1-4">
          <template #title>台式机</template>
          <el-menu-item v-for="(item,index) in desktopComputer" :index="item.name">
            <template #title>{{item.name}}</template>
          </el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-sub-menu index="1-2">
        <template #title>ThinkPad电脑</template>
        <el-sub-menu index="1-2-1">
          <template #title>ThinkPad</template>
          <el-menu-item v-for="(item,index) in thinkPad" :index="item.name">
            <template #title>{{item.name}}</template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="1-2-2">
          <template #title>thinkplus</template>
          <el-menu-item v-for="(item,index) in thinkplus" :index="item.name">
            <template #title>{{item.name}}</template>
          </el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-sub-menu index="1-3">
        <template #title>平板电脑</template>
        <el-sub-menu index="1-3-1">
          <template #title>小新平板</template>
          <el-menu-item v-for="(item,index) in xxPad" :index="item.name">
            <template #title>{{item.name}}</template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="1-3-2">
          <template #title>拯救者平板</template>
        </el-sub-menu>
      </el-sub-menu>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>服务</template>
      <el-menu-item v-for="(item,index) in service" :index="item.name">
        <template #title>{{item.name}}</template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>品牌</template>
      <el-menu-item v-for="(item,index) in story" :index="item.name">
        <template #title>{{item.name}}</template>
      </el-menu-item>
    </el-sub-menu>
    <el-input v-model="input" style="width:300px;height: 30px;margin:12px 0 0 360px;"
    placeholder="请输入搜索的商品名"></el-input>
    <el-button :icon="Search" style="margin:11px 0 0 10px;border:0;" @click="submitSearch"></el-button>
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
                margin:0 -8px 0 10px;
                border:0;
                right: 5px;" id="userName">
      <template #title>{{user.name}}</template>
      <router-link to="userInfo">
      <el-menu-item index=""><template #title>个人信息</template></el-menu-item>
      </router-link>
      <router-link to="Favor">
      <el-menu-item index=""><template #title>我的收藏</template></el-menu-item>
      </router-link>
      <router-link to="Order">
      <el-menu-item index=""><template #title>我的订单</template></el-menu-item>
      </router-link>
      <el-menu-item index=""><template #title>退出登录</template></el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>


<script setup>
import {ref} from "vue";
import {Search, ShoppingCart} from "@element-plus/icons-vue";
const input = ref('')
function submitSearch(){
  console.log(input);
}
</script>

<style>
:deep(.el-menu-demo .el-sub-menu__popup){
  display: flex;
  flex-direction: row;
  color: red;
}


#userName .el-icon{
  display: none;
}
</style>