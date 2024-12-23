<template>
    <div>
        <el-menu class="vertical-menu" v-model="activeMenu" @select="handleSelect" mode="vertical"
            :default-active="activeMenu">
            <div class="menu-container">
                <h3 class="menu-title">账户中心</h3>
            </div>
            <el-menu-item index="1">个人信息</el-menu-item>
            <el-menu-item index="2">修改密码</el-menu-item>
        </el-menu>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMenu } from 'element-plus';

const router = useRouter()

const activeMenu = ref('1');

onMounted(() => {
    router.push('/ChangeUserInfo/ChangePersonalInfo');
});

const handleSelect = (index) => {
    activeMenu.value = index;
    if (index === '1') {
        router.push('/ChangeUserInfo/ChangePersonalInfo')
    }
    else {
        router.push('/ChangeUserInfo/ChangePassword')
    }
};

// 注册导航钩子
router.beforeEach((to, from, next) => {
    if (router.path === '/ChangeUserInfo') {
        next(false);
    } else {
        next();
    }
});

const updateActiveMenu = () => {
    const path = router.currentRoute.value.path;
    if (path.includes('ChangePersonalInfo')) {
        activeMenu.value = '1';
    } else if (path.includes('ChangePassword')) {
        activeMenu.value = '2';
    }
};

// 监听路由变化
router.afterEach(() => {
    updateActiveMenu();
});

</script>

<style scoped>
.vertical-menu {
    width: 200px;
    /* 可以根据需要调整宽度 */
    background-color: #f5f5f5;
    /* 设置菜单背景为浅灰色 */
}

.menu-container {
    display: flex;
    /* 使用 flexbox */
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    height: 50px;
}

.menu-title {
    margin: 0;
    /* 去掉默认的 margin */
}

/* 鼠标悬停和选中项的样式 */
.vertical-menu .el-menu-item:hover,
.vertical-menu .el-menu-item.is-active {
    background-color: #b30909 !important;
    /* 鼠标悬停和选中项背景颜色 */
    color: white !important;
    /* 鼠标悬停和选中项字体颜色 */
}
</style>