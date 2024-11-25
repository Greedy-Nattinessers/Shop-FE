<template>
    <div class="collection-container">
    <div class="header">
        我的收藏
    </div>
    <div class="allFavor">
      <el-row :gutter="20">
        <el-col v-for="item in collections" :key="item.id" :span="4" class="collection-item">
          <div class="collection-image">
            <img :src="item.image" alt="商品图片">
          </div>
          <div class="collection-name">
            {{ item.name }}
          </div>
          <div class="collection-price">
            ￥{{ item.price }}
          </div>
        </el-col>
      </el-row>
    </div>
  
      <el-col class="pagination">
        <el-pagination
          background
          :page-size="pageSize"
          :total="totalItems"
          :current-page="currentPage"
          @current-change="handlePageChange"
          layout="prev, pager, next, jumper"
        />
      </el-col>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import ElementPlus from 'element-plus';
  import 'element-plus/dist/index.css';
  
  const collections = ref([
    { id: 1, name: "联想拯救者Y9000P", price: 11000, image: "../../public/Y9000.jpg" },
    { id: 2, name: "联想拯救者R9000P", price: 9000, image: "../../public/R9000.jpg" },
    { id: 3, name: "联想moto razr 50", price: 4000, image: "../../public/moto.png" },
    { id: 4, name: "小新Pro AI元启", price: 6399, image: "../../public/xiaoxin.jpg" },
    { id: 5, name: "拯救者Y700", price: 3000, image: "../../public/Y700.jpg" },
    { id: 6, name: "YOGA 27高能AI一体电脑", price: 6999, image: "../../public/YOGA.jpg" },
  ]);
  
  const pageSize = ref(3);
  const currentPage = ref(1);
  const totalItems = computed(() => collections.value.length);
  
  const handlePageChange = (val) => {
    currentPage.value = val;
  };
  
  // 核心：获取当前页的数据
  const currentCollections = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return collections.value.slice(startIndex, endIndex);
  });
  
  </script>
  
  <style scoped>
  .collection-container {
    height: 100%;
    flex-direction: column;
  }
  
  .collection-item {
    text-align: center;
    margin-bottom: 20px;
    margin-bottom: auto;
  }
  
  .collection-image img {
    max-width: 100px;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 20px;
  }
  .allFavor {
    min-height: 85vh;
  }

  .header {
    font-size: 20px;
    height: 30px;
    text-align: start;
    text-justify: center;
    flex-direction: row;
    margin-bottom: 20px;
    background-color: #eeeeee;
  }
  </style>