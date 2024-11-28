<template>
    <el-header class="header-title">
        <h3>个人信息</h3>
    </el-header>
    <el-form :model="userInfo" label-width="auto" class="form">
        <div class="left-side">
            <el-form-item label="用户名:">
                {{ userInfo.username }}
            </el-form-item>

            <el-form-item label="绑定邮箱:">
                {{ userInfo.email }}
            </el-form-item>

            <el-form-item label="昵称:">
                <el-input v-model="userInfo.nickname" />
            </el-form-item>

            <el-form-item label="性别:">
                <el-radio-group v-model="userInfo.gender">
                    <el-radio value="男">男</el-radio>
                    <el-radio value="女">女</el-radio>
                    <el-radio value="保密">保密</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="生日">
                <el-col :span="11">
                    <el-date-picker v-model="userInfo.birthday" type="date" style="width: 100%" />
                </el-col>
            </el-form-item>

            <el-form-item label="收货地址:">
                <el-input v-model="userInfo.address" />
            </el-form-item>

            <el-form-item style="display: flex; justify-content: space-between;">
                <el-button style="color: white; background-color: red;" @click="onSubmit">确认修改</el-button>
            </el-form-item>

        </div>

        <div class="divider"></div>

        <div class="right-side">
            <div class="avatar-container">
                <el-avatar :src="circleUrl" class="avatar"></el-avatar>
            </div>
            <div style="display: flex; justify-content: center; align-items: flex-start;">
                <el-button>更改头像</el-button>
            </div>
            <div style="display: flex; justify-content: flex-end; margin-right: 20px; margin-top: 80px;">
                <el-button style="color: white; background-color: red;" @click="goBack">返回</el-button>
            </div>
        </div>

    </el-form>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElHeader, ElForm, ElButton, ElRadio, ElRadioGroup, ElInput, ElCol, ElDatePicker } from 'element-plus';

const router = useRouter()

const userInfo = reactive({
    nickname: '用户的昵称',
    username: '用户名',
    gender: '男',
    birthday: new Date(1990, 0, 1),
    email: '用户的邮箱',
    address: '用户的收货地址',
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
    height: 50%;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    border: 1px solid #1b1f1c;
    display: flex;
    align-items: stretch;
}

.left-side,
.right-side {
    flex: 1;
    padding: 10px;
    height: 100%;
}

.avatar-container {
    height: 40%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* 更改为 flex-start 以将项目靠上对齐 */
    margin-top: 5%;
    /* 添加顶部边距以设定距离 */
}

.avatar {
    height: 150px;
    width: 150px;
}

.divider {
    height: 80%;
    width: 1px;
    background-color: #ccc;
    /* 分割线颜色 */
    margin: 0 10px;
    /* 分割线的左右间距 */
}

.el-form-item {
    margin-bottom: 20px;
    width: 90%;
}

.el-button {
    margin-left: 0;
    margin-top: 20px;
    /* 按钮左对齐 */
}
</style>