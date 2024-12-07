<template>
    <div class="background">
        <el-row class="login-container" justify="flex-start" align="middle" style="padding-left: 900px;">
            <el-card style="max-width: 480px">

                <template #header>
                    <div class="card-header">
                        <h3>{{ formType ? '联想会员注册' : '联想账号登录' }}</h3>
                    </div>
                </template>

                <div class="jump-link">
                    <el-link type="primary" v-if="!forgetType" @click="handleChange">{{ formType ? '返回登录' : '注册账号' }}</el-link>
                </div>

                <el-form :model="loginForm" style="width: 400px" class="demo-ruleForm" :rules="rules">
                    <el-form-item v-if="!forgetType" prop="userName">
                        <el-input v-model="loginForm.userName" placeholder="用户名" :prefix-icon="Avatar"></el-input>
                    </el-form-item>
                    <el-form-item v-if="!forgetType" prop="passWord">
                        <el-input v-model="loginForm.passWord" type="password" placeholder="密码" :prefix-icon="Lock" />
                    </el-form-item>
                    <el-form-item v-if="forgetType" prop="newPassWord">
                        <el-input v-model="loginForm.newPassWord" type="password" placeholder="新密码" :prefix-icon="Lock" />
                    </el-form-item>
                    <el-form-item v-if="forgetType" prop="rePassWord">
                        <el-input v-model="loginForm.rePassWord" type="password" placeholder="再次输入新密码" :prefix-icon="Lock" />
                    </el-form-item>
                    <el-form-item v-if="formType || forgetType" prop="emailAddress">
                        <el-input v-model="loginForm.emailAddress" placeholder="电子邮箱地址"
                            :prefix-icon="Message"></el-input>
                    </el-form-item>
                    <el-form-item v-if="formType || forgetType" prop="validCode">
                        <el-input v-model="loginForm.validCode" placeholder="验证码" :prefix-icon="Lock">
                            <template #append>
                                <span @click="countDownChange">{{ countDown.validText }}</span>
                            </template>
                        </el-input>
                    </el-form-item>

                    <div class="jump-link">
                        <el-link type="primary" v-if="!formType" @click="handleForget">{{ forgetType ? '返回登录' : '忘记密码' }}</el-link>
                    </div>

                    <el-form-item prop="validCode">
                        <el-button type="danger" :style="{ width: '100%' }" @clcik="submitForm">
                            {{ formType ? '注册账号' : (forgetType ? '确认更改密码' : '登录') }}
                        </el-button>
                    </el-form-item>

                </el-form>

            </el-card>
        </el-row>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Avatar, Lock, Message } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import Downnav from "@/components/Downnav.vue";

//表单初始数据
const loginForm = reactive({
    userName: '',
    passWord: '',
    newPassWord: '',
    rePassWord: '',
    emailAddress: '',
    validCode: ''
})

// 切换忘记密码和登录
const forgetType = ref(0)
//点击切换登录和注册
const handleForget = () => {
    forgetType.value = forgetType.value ? 0 : 1
}


// 切换注册和登录（0 登录， 1 注册）
const formType = ref(0)
//点击切换登录和注册
const handleChange = () => {
    formType.value = formType.value ? 0 : 1
}

//账号校验
const validateUser = (rule, value, callback) => {
    //不能为空
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        const userNameValid = false
        userNameValid ? callback() : callback(new Error('请输入正确的手机号'))
    }
}

//密码校验
const vaildatePass = (rule, value, callback) => {
    //不能为空
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        const passWordValid = false
        userNameValid ? callback() : callback(new Error('请输入正确的密码'))
    }
}

//表单校验
const rules = reactive({
    userName: [{ vaildator: validateUser, trigger: 'blur' }],
    passWord: [{ vaildator: vaildatePass, trigger: 'blur' }]
})

// //发送邮箱验证码
const countDown = reactive({
    validText: '获取验证码',
    time: 60
})

//验证码重发
const flag = ref(false);
const emailValid = ref(false);
const countDownChange = () => {
    //如果已发送不处理
    if (flag.value) return
    if (!(loginForm.userName && emailValid.value)) {
        return ElMessage({
            message: '请检查用户名或邮箱是否正确',
            type: 'warning',
        })
    }
    //倒计时
    const time = setInterval(() => {
        if (countDown.time <= 0) {
            countDown.time = 60
            countDown.validText = `获取验证码`
            flag.value = false
            clearInterval(time)
        } else {
            countDown.time -= 1
            countDown.validText = `剩余${countDown.time}s`
        }
    }, 1000)
    flag.value = true
}

//表单提交
const submitForm = () => {

}

</script>

<style scoped>
.background {
    background-image: url('../../../public/back.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    /* 背景图片居中 */
    height: 100vh;
    /* 可以根据需要设置容器的高度 */
    width: 100vw;
}

:deep(.el-card__header) {
    padding: 0
}

.login-container {
    height: 100vh;

    .jump-link {
        text-align: right;
        margin-bottom: 10px;

    }

    .card-header {
        font-size: 25px;
        padding: 20px;
        /* 上下左右的内边距 */
        margin: 10px 0;
        /* 上下的外边距 */
        text-align: left;
        /* 如果需要，可以修改为center */
    }
}
</style>