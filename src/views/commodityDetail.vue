<template>
  <Topnav></Topnav>
    <div class="container">
        <div class="left-side">
            <div class="large-image">
                <img :src="images[currentIndex]" alt="Large Image" />
            </div>

            <div class="image-switcher">
                <div class="thumbnail-container">
                    <el-button @click="prevImage" icon="ArrowLeftBold" class="arrow-button"></el-button>
                    <div class="thumbnails">
                        <img v-for="(image, index) in images" :key="index" :src="image" @click="setCurrentImage(index)"
                            :class="{ active: index === currentIndex }" class="thumbnail" alt="Thumbnail" />
                    </div>
                    <el-button @click="nextImage" icon="ArrowRightBold" class="arrow-button"></el-button>
                </div>

            </div>

            <div style="margin-left: 20px;">
                <el-button @click="toggleFavorite" :style="{ color: isFavorited ? 'red' : 'black' }" :icon="'Star'">
                    <p>收藏</p>
                </el-button>
            </div>

        </div>

        <div class="right-side">
            <el-form :model="productForm" label-width="10%" style="height: 100%;width: 100%;">
                <el-form-item label="商品名称" style="display: flex; align-items: center; height: 5%;">
                    <h3>{{ productForm.name }}</h3>
                </el-form-item>

                <el-form-item label="价格">
                    <div
                        style="display: flex;justify-content: space-between;align-items: flex-start;width: 70%;height: 100%;">
                        <h1 style="color: red;margin: 0 0;">￥{{ totalPrice }}</h1>

                        <el-button @click="showDialog" class="arrow-button">查看评论 ({{ productForm.comments.length
                            }})</el-button>

                        <el-dialog v-model="dialogVisible" :show-close="false">
                            <template #header="{ close }">
                                <div
                                    style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; margin-bottom: 0;">

                                    <!-- 使用 flex-grow 使标题居中 -->
                                    <h1 style="flex-grow: 1; text-align: center; margin: 0;">用户评论</h1>

                                    <el-button type="danger" @click="close">
                                        <el-icon class="el-icon--left">
                                            <CircleCloseFilled />
                                        </el-icon>
                                        关闭
                                    </el-button>
                                </div>
                            </template>
                            <div v-for="comment in productForm.comments" :key="comment.id" style=" padding: 20px;">
                                <strong>{{ comment.username }}</strong>: {{ comment.content }}
                            </div>
                            <el-input v-model="newComment" placeholder="添加评论..." style=" padding: 20px;"></el-input>
                            <div style="display: flex;justify-content: center;width: 100%;">
                                <el-button @click="addComment" class="arrow-button"
                                    style=" padding: 20px;">提交评论</el-button>
                            </div>
                        </el-dialog>
                    </div>
                </el-form-item>

                <el-form-item label="收货地址" style="display: flex; align-items: center; height: 5%;">
                    <p>{{ productForm.address }}</p>
                </el-form-item>

                <el-form-item label="操作系统">
                    <div class="hardware-options">
                        <el-button v-for="(operatingSystem, index) in productForm.operatingSystem" :key="index"
                            :class="['hardware-button', { 'active': selectedOperatingSystem === operatingSystem.name }]"
                            @click="selectOperatingSystem(operatingSystem)" class="hardware-button">
                            {{ operatingSystem.name }}
                        </el-button>
                    </div>
                </el-form-item>

                <el-form-item label="处理器">
                    <div class="hardware-options">
                        <el-button v-for="(CPU, index) in productForm.CPU" :key="index"
                            :class="['hardware-button', { 'active': selectedCPU === CPU.name }]" @click="selectCPU(CPU)"
                            class="hardware-button">
                            {{ CPU.name }}
                        </el-button>
                    </div>
                </el-form-item>

                <el-form-item label="存储">
                    <div class="hardware-options">
                        <el-button v-for="(storage, index) in productForm.storage" :key="index"
                            :class="['hardware-button', { 'active': selectedStorage === storage.name }]"
                            @click="selectStorage(storage)" class="hardware-button">
                            {{ storage.name }}
                        </el-button>
                    </div>
                </el-form-item>

                <el-form-item label="显卡">
                    <div class="hardware-options">
                        <el-button v-for="(graphicsCard, index) in productForm.graphicsCard" :key="index"
                            :class="['hardware-button', { 'active': selectedGraphicsCard === graphicsCard.name }]"
                            @click="selectGraphicsCard(graphicsCard)" class="hardware-button">
                            {{ graphicsCard.name }}
                        </el-button>
                    </div>
                </el-form-item>

                <div class="horizontal-line"></div>

                <div style="display: flex; align-items: center;margin-left: 20px;">
                    <p>购买数量</p>
                    <el-button @click="changeQuantity(-1)" icon="Minus" class="arrow-button"></el-button>
                    <h4 style="margin-left: 10px;margin-right: 10px;">{{ productForm.purchaseQuantity }}</h4>
                    <el-button @click="changeQuantity(1)" icon="Plus" class="arrow-button"></el-button>
                </div>

                <el-form-item style="height: 5%;margin-top: 10px;">
                    <el-button @click="handlePurchase"
                        style="height: 100%;width: 30%;background-color: red;font-size: 25px;color: white;">立即购买</el-button>
                    <el-button @click="handleCart"
                        style="height: 100%;width: 30%;background-color: white;font-size: 25px;color: red;border: 2px solid #ff0000;">加入购物车</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
  <downnav></downnav>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { ElButton, ElForm, ElMessage, ElDialog, ElInput } from 'element-plus';
import Topnav from "@/components/Topnav.vue";
import Downnav from "@/components/Downnav.vue";

//产品展示逻辑
const currentIndex = ref(0);

const images = [
    '../publci../../../public/back.png',
    '../publci../../../public/userInfoBack.png',
];

const setCurrentImage = (index) => {
    currentIndex.value = index;
};

const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
};

const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
};

const productId = ref(1);

const userFavorites = ref([2, 3, 4]);

const isFavorited = computed(() => {
    return userFavorites.value.includes(productId.value);
});

const toggleFavorite = () => {
    if (isFavorited.value) {
        // 如果已收藏，则移除
        userFavorites.value = userFavorites.value.filter(id => id !== productId.value);
        ElMessage.error('商品已移除收藏');
    } else {
        // 如果未收藏，则添加
        userFavorites.value.push(productId.value);
        ElMessage.success('商品已添加至收藏');
    }
};


//硬件选择逻辑
// 产品展示逻辑
const basePrice = 199; // 电脑自身价格

const productForm = reactive({
    name: '电脑',
    address: '家',
    operatingSystem: [
        { name: '操作A', price: 50 },
        { name: '硬件B', price: 60 },
        { name: '硬件C', price: 70 }
    ],
    CPU: [
        { name: '处理器A', price: 100 },
        { name: '硬件B', price: 110 },
        { name: '硬件C', price: 120 }
    ],
    storage: [
        { name: '存储A', price: 80 },
        { name: '硬件B', price: 90 },
        { name: '硬件C', price: 100 }
    ],
    graphicsCard: [
        { name: '显卡A', price: 200 },
        { name: '硬件B', price: 220 },
        { name: '硬件C', price: 240 }
    ],
    purchaseQuantity: 1,
    comments: [
        { id: 1, username: '用户1', content: '这件商品很好！' },
        { id: 2, username: '用户2', content: '质量不错。' },
    ],
});

// 计算总价格
const totalPrice = ref(basePrice + 
    productForm.operatingSystem[0].price + 
    productForm.CPU[0].price + 
    productForm.storage[0].price + 
    productForm.graphicsCard[0].price
);

const selectedOperatingSystem = ref(productForm.operatingSystem[0].name);
const selectedCPU = ref(productForm.CPU[0].name);
const selectedStorage = ref(productForm.storage[0].name);
const selectedGraphicsCard = ref(productForm.graphicsCard[0].name);

// 更新总价格
const updateTotalPrice = () => {
    const osPrice = productForm.operatingSystem.find(os => os.name === selectedOperatingSystem.value)?.price || 0;
    const cpuPrice = productForm.CPU.find(cpu => cpu.name === selectedCPU.value)?.price || 0;
    const storagePrice = productForm.storage.find(storage => storage.name === selectedStorage.value)?.price || 0;
    const gpuPrice = productForm.graphicsCard.find(gpu => gpu.name === selectedGraphicsCard.value)?.price || 0;

    totalPrice.value = basePrice + osPrice + cpuPrice + storagePrice + gpuPrice;
};

const selectOperatingSystem = (hardware) => {
    selectedOperatingSystem.value = hardware.name;
    updateTotalPrice();
}

const selectCPU = (hardware) => {
    selectedCPU.value = hardware.name;
    updateTotalPrice();
}

const selectStorage = (hardware) => {
    selectedStorage.value = hardware.name;
    updateTotalPrice();
}

const selectGraphicsCard = (hardware) => {
    selectedGraphicsCard.value = hardware.name;
    updateTotalPrice();
}

const changeQuantity = (num) => {
    productForm.purchaseQuantity += num;
    if (productForm.purchaseQuantity <= 0) {
        productForm.purchaseQuantity = 1;
    }
}


//表单提交逻辑
const handlePurchase = () => {

}

const handleCart = () => {

}


//商品评论逻辑
const dialogVisible = ref(false);

const newComment = ref('');

const showDialog = () => {
    dialogVisible.value = true;
};

const addComment = () => {
    if (newComment.value.trim()) {
        const newCommentObj = {
            id: productForm.comments.length + 1, // 使用当前评论数量 + 1 作为新评论的 ID
            username: productForm.name, // 假设使用产品名称作为评论者名称
            content: newComment.value // 使用输入的评论内容
        };

        // 将新评论添加到商品评论数组中
        productForm.comments.push(newCommentObj);

        // 清空评论输入框
        newComment.value = '';

        // 提示用户评论已成功添加
        ElMessage.success('评论已成功添加！');
    } else {
        // 如果评论为空，给出提示
        ElMessage.warning('评论内容不能为空！');
    }
};

</script>

<style scoped>
.container {
    background-color: rgb(236, 236, 236);
    width: 90%;
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    align-items: stretch;
}

.left-side {
    flex: 1;
    margin-left: 10px;
    margin-right: 20px;
    width: 100%;
    height: 50%;
    margin-top: 13%;
    background-color: #fff
}

.right-side {
    flex: 2;
    margin-left: 20px;
    margin-right: 10px;
    width: 100%;
    height: 100%;
    background-color: #fff;
}

.large-image {
    margin: auto;
    width: 90%;
    height: 75%;
}

.large-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.image-switcher {
    height: 15%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.thumbnail-container {
    display: flex;
    align-items: center;
}

.thumbnails {
    display: flex;
}

.thumbnail {
    width: 70px;
    /* 缩略图宽度 */
    margin: 0 5px;
    /* 缩略图之间的间距 */
    cursor: pointer;
    transition: transform 0.3s;
    /* 添加过渡效果 */
}

.thumbnail.active {
    transform: scale(1.1);
    /* 放大当前选中的缩略图 */
}

.arrow-button {
    margin: 0 10px;
    height: 100%;
}

.el-icon-fa {
    font-size: 24px;
    /* 调整图标大小 */
}

.hardware-options {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.hardware-button {
    margin: 0 0 0 0;
    padding: 0 0 0;
    width: 48%;
    transition: background-color 0.3s;
    margin-bottom: 10px;
}

.arrow-button:hover,
.hardware-button.active:hover,
.hardware-button:hover {
    background-color: #e74242;
    /* 悬停时的背景颜色为浅红色 */
    color: white;
    /* 悬停时字体颜色保持为白色 */
}

.hardware-button.active {
    color: #ff0000;
    /* 选中时字体颜色变为红色 */
    border: 2px solid #ff0000;
    /* 选中时按钮边框变为红色 */
}

.horizontal-line {
    width: 100%;
    /* 设置宽度为100% */
    height: 2px;
    /* 设置高度 */
    background-color: #f3f3f3;
    /* 设置颜色为黑色 */
    margin: 20px 0;
    /* 设置上下外边距 */
}
</style>
