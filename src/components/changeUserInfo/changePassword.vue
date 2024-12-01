<template>
    <el-header class="header-title">
        <h3>修改密码</h3>
    </el-header>
    <el-form :model="userInfo" label-width="auto" class="form">

        <el-form-item label="原密码:">
            <el-input v-model="userInfo.oldPassword" placeholder="请输入原密码" type="password"/>
        </el-form-item>

        <el-form-item label="新密码:">
            <el-input v-model="userInfo.newPassword" placeholder="请输入新密码" type="password"/>
        </el-form-item>

        <el-form-item label="确认新密码:">
            <el-input v-model="userInfo.confirmNewPassword" placeholder="再次输入新密码" type="password"/>
        </el-form-item>

        <el-form-item style="display: flex; justify-content: space-between;align-items: center;">
            <el-button style="color: white; background-color: red; margin-right: auto" @click="onSubmit">确认修改</el-button>
            <el-button style="color: white; background-color: red;" @click="goBack">返回</el-button>
        </el-form-item>

    </el-form>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElHeader, ElForm, ElButton, ElInput } from 'element-plus';

const router = useRouter()

const userInfo = reactive({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
});

const goBack = () => {
    router.push('/UserInfo')
}

</script>

<style scoped>
.header-title {
    width: 100%;
    margin: 0 auto;
    border: 1px solid #dcdfe6;
    background-color: #dcdfe6;
}

.form {
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    border: 1px solid #1b1f1c;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.el-form-item {
    /* margin-bottom: 20px; */
    width: 50%;
}

</style>