
<template>
    <Topnav></Topnav>
    <div class="home-page">
      <!-- 顶部轮播图 -->
      <el-carousel :interval="5000" arrow="always" class="top-carousel">
        <el-carousel-item v-for="(item, index) in bannerImages" :key="index">
          <img :src="item" alt="Banner Image" class="carousel-image" />
        </el-carousel-item>
      </el-carousel>
  
      <!-- 中间部分 -->
      <div class="middle-section">
        <!-- 横向电脑种类列表 -->
        <el-scrollbar class="category-list">
          <el-menu
            :default-active="activeCategory"
            mode="horizontal"
            class="category-menu"
          >
            <el-menu-item
              v-for="(category) in categories"
              :key="category.id"
              :index="category.id.toString()"
              @mouseenter="handleCategoryHover(category.id)"
            >
              {{ category.name }}
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
  
        <!-- 对应种类的电脑横向显示 -->
        <!-- <el-scrollbar class="product-list"> -->
            <el-col class="product-list">
          <el-card
            v-for="(product) in filteredProducts"
            :key="product.id"
            class="product-card"
          >
            <img :src="product.image" alt="Product Image" class="product-image" />
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p>价格：￥{{ product.price }}</p>
            </div>
          </el-card>
        </el-col>
        <!-- </el-scrollbar> -->
      </div>
  
      <!-- 底部部分 -->
      <div class="bottom-section">
        <!-- 左侧热搜列表 -->
        <div class="hot-search-list">
          <el-menu
            :default-active="activeHot"
            class="hot-menu"
          >
            <el-menu-item
              v-for="(hot) in hotCategories"
              :key="hot.id"
              :index="hot.id.toString()"
              @mouseenter="handleHotHover(hot.id)"
            >
              {{ hot.name }}
            </el-menu-item>
          </el-menu>
        </div>
  
        <!-- 右侧轮播图 -->
        <div class="hot-carousel">
          <el-carousel
            :interval="5000"
            arrow="always"
            type="card"
            ref="hotCarouselRef"
            :initial-index="0"
          >
            <el-carousel-item
              v-for="(images, categoryId) in hotImages"
              :key="categoryId"
            >
              <div class="carousel-slide">
                <img
                  v-for="(image, idx) in images"
                  :key="idx"
                  :src="image"
                  alt="Hot Image"
                  class="carousel-image"
                />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  <Downnav ></Downnav>
</template>
  
  <script>
  import { ref, computed } from "vue";
  import {
    ElCarousel,
    ElCarouselItem,
    ElMenu,
    ElMenuItem,
    ElScrollbar,
    ElCard,
    ElCol,
  } from "element-plus";
  import Topnav from "@/components/Topnav.vue";
  import Downnav from "@/components/Downnav.vue";

  export default {
    name: "Home",
    components: {
      Downnav,
      Topnav,
      ElCarousel,
      ElCarouselItem,
      ElMenu,
      ElMenuItem,
      ElScrollbar,
      ElCard,
    },
    setup() {
      // 顶部轮播图图片
      const bannerImages = ref([
        "../../public/广告1.jpg",
        "../../public/广告2.jpg",
        "../../public/广告3.jpg",
      ]);
  
      // 电脑种类列表
      const categories = ref([
        { id: 1, name: "台式机" },
        { id: 2, name: "笔记本" },
        { id: 3, name: "平板电脑" },
        { id: 4, name: "游戏机" },
      ]);
  
      const activeCategory = ref(categories.value[0].id.toString());
      
  
      // 所有电脑产品
      const products = ref([
        // 台式机
        {
          id: 101,
          categoryId: 1,
          name: "台式机型号A",
          price: 5000,
          image: "https://via.placeholder.com/200x200?text=台式机A",
        },
        {
          id: 102,
          categoryId: 1,
          name: "台式机型号B",
          price: 6000,
          image: "https://via.placeholder.com/200x200?text=台式机B",
        },
        // 笔记本
        {
          id: 201,
          categoryId: 2,
          name: "笔记本型号A",
          price: 8000,
          image: "https://via.placeholder.com/200x200?text=笔记本A",
        },
        {
          id: 202,
          categoryId: 2,
          name: "笔记本型号B",
          price: 9000,
          image: "https://via.placeholder.com/200x200?text=笔记本B",
        },
        // 平板电脑
        {
          id: 301,
          categoryId: 3,
          name: "平板电脑型号A",
          price: 3000,
          image: "https://via.placeholder.com/200x200?text=平板A",
        },
        // 游戏机
        {
          id: 401,
          categoryId: 4,
          name: "游戏机型号A",
          price: 4000,
          image: "https://via.placeholder.com/200x200?text=游戏机A",
        },
      ]);
  
      const filteredProducts = computed(() => {
        const categoryId = parseInt(activeCategory.value);
        return products.value.filter(
          (product) => product.categoryId === categoryId
        );
      });
  
      // 热搜列表
      const hotCategories = ref([
        { id: 501, name: "联想电脑管家" },
        { id: 502, name: "Windows 11 Al+ PC" },
        { id: 503, name: "拯救者笔记本" },
        { id: 504, name: "联想社区" },
        { id: 505, name: "超值好物 热AI升级" },
        { id: 506, name: "智能化转型培植企业新动能" },
      ]);
  
      // 热搜对应的轮播图
      const hotImages = ref({
        501: [
          "../../public/hotline1.jpg",
        ],
        502: [
            "../../public/hotline2.jpg",
        ],
        503: [
          "../../public/hotline3.jpg",
        ],
        504: [
          "../../public/hotline4.jpg",
        ],
        505: [
          "../../public/hotline5.jpg",
        ],
        506: [
          "../../public/hotline6.jpg",
        ],
      });

      const activeHot = ref(hotCategories.value[0].id.toString());
  
      // 引用轮播图组件
      const hotCarouselRef = ref(null);
  
      // 处理电脑种类悬停
      const handleCategoryHover = (id) => {
        activeCategory.value = id.toString();
      };
  
      // 处理热搜悬停
      const handleHotHover = (id) => {
        const index = hotCategories.value.findIndex(
          (category) => category.id === id
        );
        if (index !== -1 && hotCarouselRef.value) {
          hotCarouselRef.value.setActiveItem(index);
        }
        activeHot.value = id.toString();
      };
  
      return {
        bannerImages,
        categories,
        activeCategory,
        filteredProducts,
        hotCategories,
        hotImages,
        hotCarouselRef,
        handleCategoryHover,
        handleHotHover,
      };
    },
  };
  </script>
  
  <style scoped>
  .home-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  /* 顶部轮播图 */
  .top-carousel {
    width: 100%;
    height: auto;
  }
  
  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit:cover;
  }
  
  /* 中间部分 */
  .middle-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 20px;
  }
  
  .category-list {
    flex-direction: row;
    justify-content: space-between;
    height: 60px;
  }
  
  .category-menu {
    background-color: #f5f5f5;
  }
  
  .product-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    overflow-x: auto;
    padding: 10px 0;
  }
  
  .product-card {
    width: 200px;
    flex: none;
  }
  
  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .product-info {
    text-align: center;
    padding: 10px 0;
  }
  
  /* 底部部分 */
  .bottom-section {
    display: flex;
    gap: 20px;
    padding: 0 20px;
  }
  
  /* 左侧热搜列表 */
  .hot-search-list {
    width: 200px;
    background-color: #f9f9f9;
    justify-content: space-evenly;
  }
  
  .hot-search-list .el-menu {
    border: none;
  }
  
  .hot-menu {
    width: 100%;
  }
  
  /* 右侧轮播图 */
  .hot-carousel {
    flex: 1;
    height: 400px;
  }
  
  .carousel-slide {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .hot-carousel .carousel-image {
    width: 600px;
    height: 400px;
    object-fit: cover;
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .bottom-section {
      flex-direction: column;
    }
  
    .hot-search-list {
      width: 100%;
    }
  
    .hot-carousel .carousel-image {
      width: 100%;
      height: auto;
    }
  }
  </style>