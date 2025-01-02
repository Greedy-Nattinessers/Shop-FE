<template>
  <Topnav2 viewName="搜索"></Topnav2>
  <div class="search-page">
    <div class="search-input">
      <el-input v-model="searchInput" style="width:300px;height: 30px;" placeholder="请输入搜索的商品名"></el-input>
      <el-button :icon="Search" @click="submitSearch"></el-button>
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
        <div v-for="item in currentsearchResults" :key="item.cid" class="result-item">
          <div class="product-image">
            <img :src="item.image" :alt="item.name">
          </div>
        <div class="product-info">
          <div class="product-name">{{ item.name }}</div>
          <div class="product-price">¥{{ item.price }}</div>
      </div>
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
import { ref, computed, onBeforeMount } from 'vue'
import { ElPagination, ElCol, ElTag, ElInput, ElButton, ElStep } from 'element-plus'
import 'element-plus/dist/index.css'
import Downnav from "@/components/Downnav.vue"
import Topnav2 from "@/components/Topnav2.vue"
import { Search } from "@element-plus/icons-vue"
import shopApi from '@/apis/shop'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchInput = ref('')
const searchResults = ref([])
const pageSize = ref(3)
const currentPage = ref(1)
const totalItems = computed(() => searchResults.value.length)

const handlePageChange = (val) => {
  currentPage.value = val
}

const currentsearchResults = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return searchResults.value.slice(startIndex, endIndex)
})

const fetchCommodityDetails = async (cid) => {
  try {
    const detailResponse = await shopApi.commodityDetail(cid)
    const detail = detailResponse.data
    const imageUrls = await Promise.all(detail.images.map(async (imageId) => {
      const albumResponse = await shopApi.commodityImage(imageId)
      console.log(albumResponse);
      return albumResponse
    }))
    console.log(imageUrls);
    return {
      ...detail,
      image: imageUrls[0] // 假设只展示第一张图片
    }
  } catch (error) {
    console.error('获取商品详情失败:', error)
    return null
  }
}

const submitSearch = async () => {
  const input = searchInput.value.trim()
  console.log('搜索关键词:', input)

  try {
    const allCommoditiesResponse = await shopApi.allCommodities()
    const allCommodities = allCommoditiesResponse.data
    if(input) {
      const filteredCommodities = allCommodities.filter(item => item.name.includes(input))
      const detailedCommodities = await Promise.all(filteredCommodities.map(async (item) => {
        return await fetchCommodityDetails(item.cid)
      }))
      searchResults.value = detailedCommodities.filter(item => item !== null)
    }else{
      const detailedCommodities = await Promise.all(allCommodities.map(async (item) => {
        return await fetchCommodityDetails(item.cid)
      }))
      searchResults.value = detailedCommodities.filter(item => item !== null)
    }
  } catch (error) {
    console.error('搜索失败:', error)
  }
}

onBeforeMount(async () => {
  const input = router.currentRoute.value.query?.id
  if (input) {
    searchInput.value = input
    await submitSearch()
  }
})

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
    delete selectedTags.value[groupName]
  } else {
    selectedTags.value[groupName] = tag
  }
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
  
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
.product-info{
  background-color: #f1f1f1;
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
  position: fi; /* 绝对定位 */
  bottom: 0px; /* 距离底部的高度，根据下方组件的高度调整 */
  left: 0; /* 左侧对齐 */
  right: 0; /* 右侧对齐 */
  padding: 10px 0; /* 上下内边距 */
  background-color: white; /* 背景色，避免遮挡内容 */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* 添加阴影，提升视觉效果 */
  z-index: 1000; /* 确保分页组件在最上层 */
}
</style>