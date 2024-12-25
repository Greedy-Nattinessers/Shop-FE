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
                    <el-date-picker v-model="userInfo.birthday" type="date" style="width: 60%" />
                </el-col>
            </el-form-item>

            <el-form-item label="收货地址:" style="margin-top: 10px;width: 97%;">
                <el-table :data="addresses" style="width: 100%">
                    <el-table-column prop="name" label="姓名" width="150" />
                    <el-table-column prop="phone" label="电话号码" width="250" />
                    <el-table-column label="收货地址">
                        <template #default="scope">
                            {{ scope.row.address }}
                            <span v-if="scope.row.is_default">(默认地址)</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template #default="scope">
                            <el-button plain type="primary" style="margin-top: 0px;margin-right: 2px;"
                                @click="handleEdit(scope.row)">编辑</el-button>
                            <el-dialog v-model="editDialogVisible" title="编辑地址" width="500">
                                <h3>请修改您的地址信息</h3>
                                <el-form :model="currentAddress" label-width="auto" style="max-width: 600px">
                                    <el-form-item label="姓名">
                                        <el-input v-model="currentAddress.name" />
                                    </el-form-item>
                                    <el-form-item label="电话号码">
                                        <el-input v-model="currentAddress.phone" />
                                    </el-form-item>
                                    <el-form-item label="收货地址">
                                        <el-input v-model="currentAddress.address" type="textarea" />
                                    </el-form-item>
                                    <el-form-item label="设为默认地址">
                                        <el-switch v-model="currentAddress.is_default" />
                                    </el-form-item>
                                </el-form>
                                <template #footer>
                                    <div class="dialog-footer">
                                        <el-button @click="editDialogVisible = false">取消</el-button>
                                        <el-button @click="handleEditSubmit"
                                            style="margin-left: 10px;color: white; background-color: red;">
                                            确认
                                        </el-button>
                                    </div>
                                </template>
                            </el-dialog>
                            <el-button plain type="danger" style="margin-top: 0px;"
                                @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button @click="dialogVisible = true" style="margin-top: 10px;">添加收货地址</el-button>

                <el-dialog v-model="dialogVisible" title="添加地址" width="500">
                    <h3>请输入想要添加的地址信息</h3>
                    <el-form :model="userInfo.addAddress" label-width="auto" style="max-width: 600px">
                        <el-form-item label="姓名">
                            <el-input v-model="userInfo.addAddress.name" />
                        </el-form-item>
                        <el-form-item label="电话号码">
                            <el-input v-model="userInfo.addAddress.phone" />
                        </el-form-item>
                        <el-form-item label="收货地址">
                            <el-input v-model="userInfo.addAddress.address" type="textarea" />
                        </el-form-item>
                        <el-form-item label="设为默认地址">
                            <el-switch v-model="userInfo.addAddress.is_default" />
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <div class="dialog-footer">
                            <el-button @click="dialogVisible = false">取消</el-button>
                            <el-button @click="handleAdd"
                                style="margin-left: 10px;color: white; background-color: red;">
                                确认
                            </el-button>
                        </div>
                    </template>
                </el-dialog>

            </el-form-item>

            <el-form-item>
                <div style="display: flex; justify-content: space-between; width: 100%;">
                    <el-button style="color: white; background-color: red;" @click="submit">确认修改</el-button>
                    <el-button style="color: white; background-color: red;" @click="goBack">返回</el-button>
                </div>
            </el-form-item>

        </div>

    </el-form>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';
import { ElHeader, ElForm, ElButton, ElRadio, ElRadioGroup, ElInput, ElCol, ElDatePicker, ElMessage } from 'element-plus';
import useUserStore from '@/stores/user';
import userApi from '@/apis/user'; // 导入整个 userApi 对象

const router = useRouter()
const userStore = useUserStore()
const { addresses } = storeToRefs(userStore)
const currentAddress = ref(null); 

onMounted(async () => {
    await userStore.fetchAddresses();
});

const userInfo = reactive({
    username: userStore.username,
    gender: userStore.gender,
    birthday: userStore.birthday,
    email: userStore.email,
    addresses: addresses.value,
    addAddress: {
        name: '1',
        phone: '1',
        address: '1',
        is_default: true
    },
});

const dialogVisible = ref(false)
const handleAdd = async () => {
    await userStore.addAddress(userInfo.addAddress)
    userInfo.addAddress.name = '1'
    userInfo.addAddress.phone = '1'
    userInfo.addAddress.addAddress = '1'
    dialogVisible.value = false;
}

const editDialogVisible = ref(false)
const handleEdit = async (row) => {
    currentAddress.value = { ...row };
    editDialogVisible.value = true;
}

const handleEditSubmit = async () => {
    const addressParams = {
        name: currentAddress.value.name,
        phone: currentAddress.value.phone,
        address: currentAddress.value.address,
        is_default: currentAddress.value.is_default
    };

    try {
        await userApi.updateAddress(addressParams, currentAddress.value.aid);
        ElMessage.success('修改成功！');
        await userStore.fetchAddresses();
        editDialogVisible.value = false;
    } catch (error) {
        console.error('更新失败：', error); // 打印错误信息
        ElMessage.error('修改失败，请重试！');
    }
}

const handleDelete = async (row) => {
    await userStore.deleteAddress(row.aid)
}

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
    router.push('/userinfo')
}

const findDefaultAddressId = () => {
    console.log(addresses.value)
  if (!addresses.value || addresses.value.length === 0) {
    console.warn("No addresses found.");
    return null; 
  }
  const defaultAddress = addresses.value.find(address => address.is_default);
  console.log(defaultAddress.address)
  return defaultAddress ? defaultAddress.address : null;
};


</script>

<style scoped>
.header-title {
    width: 100%;
    margin: 0 auto;
    border: 1px solid #dcdfe6;
    background-color: #dcdfe6;
}

.form {
    height: auto;
    width: auto;
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