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
        <div v-for="item in currentsearchResults" :key="item.cid" class="result-item" @click="handleItemClick(item)">
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

    <!-- 分页组件 -->
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
    <!-- <downnav></downnav> -->
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { ElPagination, ElCol, ElTag, ElInput, ElButton } from 'element-plus'
import 'element-plus/dist/index.css'
import Downnav from "@/components/Downnav.vue"
import Topnav2 from "@/components/Topnav2.vue"
import { Search } from "@element-plus/icons-vue"
import shopApi from '@/apis/shop'
import { useRouter } from 'vue-router'
import useCommodityStore from '@/stores/commodityDetail';

const router = useRouter()
const commodityStore = useCommodityStore()

const searchInput = ref('')
const searchResults = ref([])
const pageSize = ref(8) // 每页显示 8 个结果
const currentPage = ref(1)
const totalItems = computed(() => searchResults.value.length)

// 处理分页变化
const handlePageChange = (val) => {
  currentPage.value = val
}

// 计算当前页的搜索结果
const currentsearchResults = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return searchResults.value.slice(startIndex, endIndex)
})

// 获取商品详情
const fetchCommodityDetails = async (cid) => {
  try {
    const detailResponse = await shopApi.commodityDetail(cid)
    const detail = detailResponse.data
    const imageUrls = await Promise.all(detail.images.map(async (imageId) => {
      const albumResponse = await shopApi.commodityImage(imageId)
      return albumResponse
    }))
    console.log('商品详情:', {
      ...detail,
      image: imageUrls[0] // 假设只展示第一张图片
    })
    return {
      ...detail,
      image: imageUrls[0] // 假设只展示第一张图片
    }
  } catch (error) {
    console.error('获取商品详情失败:', error)
    return null
  }
}

// 提交搜索
const submitSearch = async () => {
  const input = searchInput.value.trim()
  console.log('搜索关键词:', input)

  try {
    const allCommoditiesResponse = await shopApi.allCommodities()
    const allCommodities = allCommoditiesResponse.data
    if (input) {
      const filteredCommodities = allCommodities.filter(item => item.name.includes(input))
      const detailedCommodities = await Promise.all(filteredCommodities.map(async (item) => {
        return await fetchCommodityDetails(item.cid)
      }))
      searchResults.value = detailedCommodities.filter(item => item !== null)
      console.log('所有商品:', searchResults.value)
    } else {
      const detailedCommodities = await Promise.all(allCommodities.map(async (item) => {
        return await fetchCommodityDetails(item.cid)
      }))
      searchResults.value = detailedCommodities.filter(item => item !== null)
      console.log('所有商品:', searchResults.value)
    }
    // 重置到第一页
    currentPage.value = 1
  } catch (error) {
    console.error('搜索失败:', error)
  }
}

// 页面加载时触发搜索
onBeforeMount(async () => {
  const input = router.currentRoute.value.query?.id
  if (input) {
    searchInput.value = input
    await submitSearch()
  }
})

// 标签组数据
const tagGroups = ref({
  '品牌': ['联想'],
  '台式机': ['异能者', 'Geekpro', '天逸'],
  '笔记本': ['Y9000', 'R9000', '小新', 'YOGA']
})

// 已选择的标签
const selectedTags = ref({})

// 处理标签选择
const handleTagSelect = (groupName, tag) => {
  // 清空所有已选中的标签
  selectedTags.value = {}

  // 设置当前选中的标签
  selectedTags.value[groupName] = tag

  // 将选中的标签内容替换到搜索框中
  searchInput.value = tag

  // 触发搜索
  submitSearch()
}

// 处理点击搜索结果项
const handleItemClick = async (item) => {
  const detail = await shopApi.commodityDetail(item.cid)
  // const images = []
  // images.push({imageId :detail.data.images[0]})
  // images.push(detail.data.image)
  const commodity = {
    commodityId: item.cid,
    name: item.name,
    price: item.price,
    album: item.album,
    description: item.description,
    images: item.images,
    i: 0
  }
  // 更新 commodityStore 的 state
  commodityStore.setCommodity(commodity)

  console.log('商品详情:', commodity)

  // 跳转到商品详情页面
  router.push('/CommodityDetail')
}
</script>

<style scoped>
.search-page {
  padding: 20px;
  position: relative;
  min-height: 100vh;
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
  cursor: pointer; /* 添加鼠标指针样式 */
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

.product-info {
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
  position: fixed; /* 固定定位 */
  bottom: 0; /* 底部对齐 */
  left: 0; /* 左侧对齐 */
  right: 0; /* 右侧对齐 */
  padding: 10px 0; /* 上下内边距 */
  background-color: white; /* 背景色，避免遮挡内容 */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* 添加阴影，提升视觉效果 */
  z-index: 1000; /* 确保分页组件在最上层 */
}
</style>