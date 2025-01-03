<template>
    <Topnav2 viewName="用户信息"></Topnav2>
    <img src="/userInfoBack.png" alt="Header Image" class="header-image" />
    <el-container class="info-header">
        <div class="avatar-container">
            <el-avatar :src="circleUrl" class="avatar"></el-avatar>
        </div>
        <el-header class="header-content">
            <p><strong>{{ userInfo.nickname }}</strong></p>
            <el-button type="danger" class="edit-button" @click="handleChangeUserInfo">编辑个人资料</el-button>
        </el-header>
    </el-container>

    <el-container class="user-display">
        <el-header>
            <h2 class="header-title">用户信息</h2>
            <hr class="header-line" />
        </el-header>
        <el-main>
            <div>
                <div class="user-info">
                    <div class="info-item">用户名: <strong>{{ userStore.username }}</strong></div>
                    <div class="info-item">性别: <strong>{{ userStore.gender ? '男' : '女' }}</strong></div>
                    <div class="info-item">生日: <strong>{{ userStore.birthday ? userStore.birthday:'未设置' }}</strong></div>
                    <div class="info-item">邮箱: <strong>{{ userStore.email }}</strong></div>
                    <!-- <div class="info-item">收货地址: <strong>{{ userInfo.address }}</strong></div> -->
                </div>
            </div>
        </el-main>
    </el-container>
    <Downnav></Downnav>

</template>

<script setup>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElContainer, ElMain, ElHeader, ElAvatar,ElButton } from 'element-plus';
import useUserStore from '@/stores/user/index';
import Topnav2 from "@/components/Topnav2.vue";
import Downnav from "@/components/Downnav.vue";
import { useStore } from 'vuex';

const circleUrl = '/back.png'; // 公共文件夹下的头像地址

const userStore = useUserStore();
const router = useRouter()

const userInfo = reactive({
    username: '',
    gender: '',
    birthday: '',
    email: '',
    address: '',
});

const handleChangeUserInfo = () => {
    router.push('/ChangeUserInfo')
}

</script>

<style scoped>
.header-image {
    width: 65%; /* 使图片宽度与容器相同 */
    height: 200px; 
    margin: 0 auto;
    z-index: 1; /* 确保图片在头像下方 */
    display: block; /* 确保图片是块级元素 */
}

.info-header {
    width: 65%;
    height: 80px;
    margin: 0 auto; /* 负值的 margin-top 使得头像容器与背景图片相接 */
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    position: relative; /* 为了定位头像 */
    z-index: 2; /* 确保图片在头像下方 */
}

.avatar-container {
    position: absolute;
    left: 0; /* 将头像定位到左边 */
    top: 50%; /* 垂直居中 */
    left: 20px; /* 增加这个值来增大与左边框的距离 */
    transform: translateY(-50%); /* 垂直方向平移 */
    margin-top: -30px; /* 使头像的一半在外面 */
}

.avatar {
    width: 100px; /* 自定义宽度 */
    height: 100px; /* 自定义高度 */
}

.header-content {
    display: flex;
    /* 使用 Flexbox */
    align-items: center;
    /* 垂直居中 */
    height: 100%;
    /* 确保 Flex 容器高度为 100% */
    margin-left: 120px; /* 给标题留出空间 */
    justify-content: space-between;
}

.edit-button {
    margin-left: auto; /* 将按钮推到右侧 */
    margin-right: 20px; /* 为按钮与右边框增加间距 */
}

.user-display {
    width: 65%;
    /* 设置宽度 */
    margin: 20px auto;
    /* 上下20px, 左右自动居中 */
    padding: 20px;
    /* 增加内边距 */
    border: 1px solid #dcdfe6;
    border-radius: 5px;
}

.header-title {
    margin: 0;
    /* 移除默认的外边距 */
}

.header-line {
    border: none;
    /* 移除边框 */
    height: 2px;
    /* 设置线条的高度 */
    background-color: #fa0606;
    /* 设置线条颜色 */
    margin: 10px 0;
    /* 在线条上下添加间距 */
}

.user-info {
    display: flex;
    /* 使用 Flexbox 布局 */
    flex-wrap: wrap;
    /* 允许换行 */
    justify-content: space-between;
    /* 在两列之间留出空间 */
}

.info-item {
    width: 49%;
    /* 每个信息项占 45% 的宽度 */
    text-align: left;
    /* 文本左对齐 */
    margin-bottom: 20px;
    /* 每个项之间的间距增大到 20px */
}
</style>
