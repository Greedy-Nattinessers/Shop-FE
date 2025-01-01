<template>
    <Topnav2 viewName="搜索"></Topnav2>
    <div class="search-page">

    <div class="search-input">
        <el-input v-model="input" style="width:300px;height: 30px;"
        placeholder="请输入搜索的商品名"></el-input>
        <el-button :icon="Search"  @click="submitSearch"></el-button>
    </div>

      <!-- 搜索标签区域 -->
      <div class="search-tags">
        <div v-for="(tagGroup, groupName) in tagGroups" :key="groupName" class="tag-group">
          <div class="group-name">{{ groupName }}</div>
          <div class="tags">
            <el-tag
              v-for="tag in tagGroup"
              :key="tag"
              :type="selectedTags[groupName] === tag ? 'primary' : 'info'"
              class="tag-item"
              @click="handleTagSelect(groupName, tag)"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>
      </div>
  
      <!-- 搜索结果展示区域 -->
      <div class="search-results">
        <div class="results-grid">
          <div v-for="item in searchResults" :key="item.id" class="result-item">
            <div class="product-image">
              <img :src="item.image" :alt="item.name">
            </div>
            <div class="product-name">{{ item.name }}</div>
            <div class="product-price">¥{{ item.price }}</div>
          </div>
        </div>
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
      <downnav></downnav>
    </div>
  </template>
  
  <script setup>
  import { ref, computed} from 'vue'
  import {ElPagination, ElCol, ElTag, ElInput, ElButton} from 'element-plus';
  import 'element-plus/dist/index.css';
  import Downnav from "@/components/Downnav.vue";
  import Topnav2 from "@/components/Topnav2.vue";
  import {Search} from "@element-plus/icons-vue";
  
  // 标签组数据
  const tagGroups = ref({
    '笔记本': ['Lenovo'],
    'CPU型号': ['intel i5', 'intel i7', 'intel i9'],
    '内存容量': ['16G', '32G', '64G'],
    '适用场景': ['校园学生', '商务办公', '高清游戏', '高性能独显']
  })
  
  // 已选择的标签
  const selectedTags = ref({})
  
  // 处理标签选择
  const handleTagSelect = (groupName, tag) => {
    if (selectedTags.value[groupName] === tag) {
      // 如果点击的是已选中的标签，则取消选择
      delete selectedTags.value[groupName]
    } else {
      // 选择新标签
      selectedTags.value[groupName] = tag
    }
  }
  
  // 模拟搜索结果数据
  const searchResults = ref([
    { id: 1, name: "联想拯救者Y9000P", price: 11000, image: "../../public/Y9000.jpg" },
    { id: 2, name: "联想拯救者R9000P", price: 9000, image: "../../public/R9000.jpg" },
    { id: 3, name: "联想moto razr 50", price: 4000, image: "../../public/moto.png" },
    { id: 4, name: "小新Pro AI元启", price: 6399, image: "../../public/xiaoxin.jpg" },
    { id: 5, name: "拯救者Y700", price: 3000, image: "../../public/Y700.jpg" },
    { id: 6, name: "YOGA 27高能AI一体电脑", price: 6999, image: "../../public/YOGA.jpg" },
  ])

  const pageSize = ref(3);
  const currentPage = ref(1);
  const totalItems = computed(() => searchResults.value.length);
  
  const handlePageChange = (val) => {
    currentPage.value = val;
  };

  const currentsearchResults = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return searchResults.value.slice(startIndex, endIndex);
  });

  function submitSearch(){
     console.log(input);
  }

  </script>
  
  <style scoped>
  .search-page {
    padding: 20px;
  }

  .search-input {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .search-tags {
    margin-bottom: 30px;
    align-items: center;
    justify-content: center;
  }
  
  .tag-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .group-name {
    width: 80px;
    font-weight: bold;
    color: #333;
  }
  
  .tags {
    flex: 1;
  }
  
  .tag-item {
    margin-right: 10px;
    margin-bottom: 5px;
    cursor: pointer;
  }
  
  .search-results {
    margin-top: 20px;
  }
  
  .results-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    row-gap: 30px;
  }
  
  .result-item {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
  }
  
  .product-image {
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
  }
  
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .product-name {
    font-size: 14px;
    color: #333;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .product-price {
    color: #f56c6c;
    font-size: 16px;
    font-weight: bold;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 20px;
  }
  </style>