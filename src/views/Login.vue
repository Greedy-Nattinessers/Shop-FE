<template>
    <div class="background">
        <el-row class="login-container" justify="start" align="middle" style="padding-left: 900px;">
            <el-card style="max-width: 480px">

                <template #header>
                    <div class="card-header">
                        <h3>{{ formType ? '联想会员注册' : '联想账号登录' }}</h3>
                    </div>
                </template>

                <div class="jump-link">
                    <el-link type="primary" v-if="!forgetType" @click="handleChange">{{ formType ? '返回登录' : '注册账号'
                        }}</el-link>
                </div>

                <el-form ref="ElFormRef" :model="loginForm" style="width: 400px" class="demo-ruleForm" :rules="rules">
                    <el-form-item v-if="!forgetType" prop="userName">
                        <el-input v-model="loginForm.userName" placeholder="用户名" :prefix-icon="Avatar"></el-input>
                    </el-form-item>
                    <el-form-item v-if="!forgetType" prop="passWord">
                        <el-input v-model="loginForm.passWord" type="password" placeholder="密码" :prefix-icon="Lock" />
                    </el-form-item>
                    <el-form-item v-if="forgetType" prop="newPassWord">
                        <el-input v-model="loginForm.newPassWord" type="password" placeholder="新密码"
                            :prefix-icon="Lock" />
                    </el-form-item>
                    <el-form-item v-if="forgetType" prop="rePassWord">
                        <el-input v-model="loginForm.rePassWord" type="password" placeholder="再次输入新密码"
                            :prefix-icon="Lock" />
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
                        <el-link type="primary" v-if="!formType" @click="handleForget">{{ forgetType ? '返回登录' : '忘记密码'
                            }}</el-link>
                    </div>

                    <el-form-item prop="validCode">
                        <el-button type="danger" :style="{ width: '100%' }" @click="submitForm">
                            {{ formType ? '注册账号' : (forgetType ? '确认更改密码' : '登录') }}
                        </el-button>
                    </el-form-item>

                </el-form>

            </el-card>
        </el-row>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Avatar, Lock, Message } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import userApi from '@/apis/user'; // 导入整个 userApi 对象
import useUserStore from '@/stores/user/index';

const router = useRouter();
const userStore = useUserStore();

//表单初始数据
const loginForm = reactive({
    userName: '',
    passWord: '',
    newPassWord: '',
    rePassWord: '',
    emailAddress: '',
    gender: '1',
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
    }
}
//密码校验
const vaildatePass = (rule, value, callback) => {
    //不能为空
    if (value === '') {
        callback(new Error('请输入密码'))
    }
}
//表单校验
const rules = reactive({
    userName: [{ validator: validateUser, trigger: 'blur' }],
    passWord: [{ validator: vaildatePass, trigger: 'blur' }]
});

// //发送邮箱验证码
const countDown = reactive({
    validText: '获取验证码',
    time: 60
});
// 验证码发送
const flag = ref(false);
const countDownChange = async () => {
    if (flag.value) return; // 如果正在倒计时，则不再执行
    if (!(loginForm.userName && loginForm.emailAddress)) {
        return ElMessage({
            message: '请检查用户名或邮箱是否正确',
            type: 'warning',
        });
    }

    try {
        let response = null;
        if (formType.value === 1) {
            response = await userApi.registerCaptcha(loginForm.emailAddress); // 调用注册发送验证码的 API
        }
        else {
            response = await userApi.recoverCaptcha(loginForm.emailAddress); // 调用忘记密码发送验证码的 API
        }
        console.log('验证码发送响应:', response); // 输出响应信息
        requestid = response.data
        console.log(response)

        if (response.status_code === 200) {
            ElMessage({
                message: '验证码已发送，请检查您的邮箱',
                type: 'success',
            });
        } else {
            throw new Error(response.message); // 如果状态码不是200，抛出错误
        }
    } catch (error) {
        console.error('发送验证码失败:', error); // 输出错误信息
        return ElMessage({
            message: '发送验证码失败，请稍后再试',
            type: 'error',
        });
    }

    // 开始倒计时
    countDown.time = 60; // 重置倒计时
    countDown.validText = `请等待 ${countDown.time} 秒`;

    const intervalId = setInterval(() => {
        countDown.time--;
        if (countDown.time <= 0) {
            clearInterval(intervalId);
            flag.value = false; // 允许重新申请
            countDown.validText = '获取验证码'; // 重置按钮文本
        } else {
            countDown.validText = `请等待 ${countDown.time} 秒`;
        }
    }, 1000);

    flag.value = true; // 设置为正在倒计时
}

let requestid = '';
//表单提交
const submitForm = async () => {
    let response;
    let profile;
    if (!formType.value && !forgetType.value) { // 登录
        // 构建登录请求的参数
        try {
            const loginParams = {
                username: loginForm.userName,
                password: loginForm.passWord,
            };

            await userApi.login(loginParams);
            ElMessage.success('登录成功！');
            await userStore.login({ username: loginParams.username, password: loginParams.password });
            await userStore.update();
            userStore.changePassword(loginParams.password);
            router.push('/Main');
        }
        catch {
            ElMessage.error('登录失败，请检查用户名和密码是否正确！');
        }
    } else if (formType.value) { // 注册
        // 构建注册请求的参数
        const registerParams = {
            email: loginForm.emailAddress,
            username: loginForm.userName,
            password: loginForm.passWord,
            gender: loginForm.gender,
            captcha: loginForm.validCode
        };// 确保在表单中获取验证码
        try {
            console.log(registerParams.captcha)
            response = await userApi.register(registerParams, requestid);
            ElMessage.success('注册成功！');
            formType.value = 0;
        }
        catch (error) {
            if (error.status === 400) {
                ElMessage.error('注册失败，请检查验证码是否正确！');
            }
            else {
                ElMessage.error('注册失败，用户已注册！');
            }
        }

    } else if (forgetType.value) { // 忘记密码
        const recoverParams = {
            email: loginForm.emailAddress, 
            password: loginForm.newPassWord, 
            captcha: loginForm.validCode 
        };
        try {
            await userApi.recover(recoverParams, requestid);
            ElMessage.success('密码更改成功！');
            forgetType.value = 0;
        }
        catch(error) {
            if(error.status === 404){
                ElMessage.error('用户未注册！');
            }else{
                ElMessage.error('修改失败！请检查验证码是否正确！');
            }
        }
    }
    // 重置表单
    resetForm();
}

// 表单重置函数
const resetForm = () => {
    loginForm.userName = '';
    loginForm.passWord = '';
    loginForm.newPassWord = '';
    loginForm.rePassWord = '';
    loginForm.emailAddress = '';
    loginForm.validCode = '';
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