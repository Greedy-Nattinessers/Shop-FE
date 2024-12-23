<template>
    <el-header class="header-title">
        <h3>个人信息</h3>
    </el-header>
    <el-form :model="userInfo" label-width="100px" class="form">
        <div class="left-side">
            <el-form-item label="用户名:">
                {{ userInfo.username }}
            </el-form-item>

            <el-form-item label="绑定邮箱:">
                {{ userInfo.email }}
            </el-form-item>

            <el-form-item label="性别:">
                <el-radio-group v-model="userInfo.gender">
                    <el-radio :value="1">男</el-radio>
                    <el-radio :value="0">女</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="生日">
                <el-col :span="11">
                    <el-date-picker v-model="userInfo.birthday" type="date"  style="width: 60%" />
                </el-col>
            </el-form-item>


            <el-form-item label="收货地址:">
                <el-input v-model="userInfo.address" />
            </el-form-item>

            <el-form-item>
                <div style="display: flex; justify-content: space-between; width: 100%;">
                    <el-button style="color: white; background-color: red;" @click="submit">确认修改</el-button>
                    <el-button style="color: white; background-color: red;" @click="goBack">返回</el-button>
                </div>
            </el-form-item>


        </div>
        <!-- 
        <div class="divider"></div>

        <div class="right-side">
            <div class="avatar-container">
                <el-avatar class="avatar"></el-avatar>
            </div>
            <div style="display: flex; justify-content: center; align-items: flex-start;">
                <el-button>更改头像</el-button>
            </div>
        </div> -->

    </el-form>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElHeader, ElForm, ElButton, ElRadio, ElRadioGroup, ElInput, ElCol, ElDatePicker,ElMessage } from 'element-plus';
import useUserStore from '@/stores/user';
import userApi from '@/apis/user'; // 导入整个 userApi 对象

const router = useRouter()
const userStore = useUserStore()

const userInfo = reactive({
    username: userStore.username,
    gender: userStore.gender,
    birthday: userStore.birthday,
    email: userStore.email,
    address: '用户的收货地址',
});

const convertDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const submit = async () => {
    const userInfoParams = {
        birthday: convertDate(new Date(userInfo.birthday)), // 假设这里需要将用户的生日转换为字符串格式
        gender: userInfo.gender,
        password: userStore.password, // 这里假设你想要提交用户的密码
        permission: userStore.permission // 权限字段
    };

    try {
        await userApi.updateProfile(userInfoParams, userStore.uid); // 传入用户ID
        ElMessage.success('修改成功！');
    } catch (error) {
        console.error('更新失败：', error); // 打印错误信息
        ElMessage.error('修改失败，请重试！');
    }
}

const goBack = () => {
    router.push('/login')
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