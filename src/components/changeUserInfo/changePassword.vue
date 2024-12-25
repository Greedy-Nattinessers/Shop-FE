<template>
    <el-header class="header-title">
        <h3>修改密码</h3>
    </el-header>
    <el-form :model="userInfo" label-width="100px" class="form">

        <el-form-item label="原密码:">
            <el-input v-model="userInfo.oldPassword" placeholder="请输入原密码" type="password" />
        </el-form-item>

        <el-form-item label="新密码:">
            <el-input v-model="userInfo.newPassword" placeholder="请输入新密码" type="password" />
        </el-form-item>

        <el-form-item label="确认新密码:">
            <el-input v-model="userInfo.confirmNewPassword" placeholder="再次输入新密码" type="password" />
        </el-form-item>

        <el-form-item style="display: flex; justify-content: space-between;align-items: center;">
            <el-button style="color: white; background-color: red; margin-right: auto"
                @click="onSubmit">确认修改</el-button>
            <el-button style="color: white; background-color: red;" @click="goBack">返回</el-button>
        </el-form-item>

    </el-form>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/stores/user';
import { ElHeader, ElForm, ElButton, ElInput,ElMessage } from 'element-plus';
import userApi from '@/apis/user'; // 导入整个 userApi 对象

const router = useRouter()
const userStore = useUserStore()

const userInfo = reactive({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
});

const convertDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const goBack = () => {
    router.push('/userinfo')
}

const onSubmit = async () => {
    const userInfoParams = {
        birthday: convertDate(new Date(userStore.birthday)), // 假设这里需要将用户的生日转换为字符串格式
        gender: userStore.gender,
        password: userInfo.newPassword, // 这里假设你想要提交用户的密码
        permission: userStore.permission // 权限字段
    };

    if(userInfo.oldPassword !== userStore.password){
        ElMessage.error('原密码输入错误！');
        userInfo.oldPassword = '';
        userInfo.newPassword = '';
        userInfo.confirmNewPassword = '';
        return ;
    }

    try {
        await userApi.updateProfile(userInfoParams, userStore.uid); // 传入用户ID
        ElMessage.success('修改成功！');
        router.push('/login')
    } catch (error) {
        console.error('更新失败：', error); // 打印错误信息
        ElMessage.error('修改失败，请重试！');
    }
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