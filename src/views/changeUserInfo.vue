<template>
    <div class="common-layout">
        <el-container class="centered-container">
            <el-aside width="200px">
                <TreeMenu />
            </el-aside>
            <el-main>
                <RouterView />
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { ElContainer } from 'element-plus';
import TreeMenu from '@/components/changeUserInfo/treeMenu.vue';

</script>

<style scoped>
.common-layout {
    height: 100vh; /* 使容器占满整个视口高度 */
    margin-top: 50px;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center;     /* 垂直居中 */
}

.centered-container {
    display: flex;
    /* 根据需要可以设置一个最大宽度，以避免内容过于宽 */
    max-width: 80%; 
    height: 100%;
    width: 100%; /* 允许子元素使用100%宽度 */
}
</style>
