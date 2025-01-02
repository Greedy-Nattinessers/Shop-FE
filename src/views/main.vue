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
      <el-col class="product-list">
        <el-card
          v-for="(product) in filteredProducts"
          :key="product.id"
          class="product-card"
          @click="handleProductClick(product.id)"
        >
          <img :src="product.image" alt="Product Image" class="product-image" />
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p>价格：￥{{ product.price }}</p>
          </div>
        </el-card>
      </el-col>
    </div>

    <!-- 底部部分 -->
    <div class="bottom-section">
      <!-- 左侧热搜列表 -->
      <div class="hot-search-list">
        <el-menu :default-active="activeHot" class="hot-menu">
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
  <Downnav></Downnav>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
import useCommodityStore from '@/stores/commodityDetail';
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
    const router = useRouter();
    const commodityStore = useCommodityStore();

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
      { id: 4, name: "手机" },
    ]);

    const activeCategory = ref(categories.value[0].id.toString());

    // 所有电脑产品
    const products = ref([
      // 台式机
      {
        id: '957b033b2e6a4ee18bf6a50ac68f453e',
        categoryId: 1,
        name: "联想异能者Co-49",
        price: 5399,
        image: "../../public/异能者Co-49.jpg",
      },
      {
        id: 'd6983b4ab87248f9927a77685764b2a7',
        categoryId: 1,
        name: "联想GeekPro分体台式机",
        price: 6899,
        image: "../../public/GeekPro分体台式机.jpg",
      },
      {
        id: '876d508fdc134b2cb3e91278cc6b04f0',
        categoryId: 1,
        name: "联想YOGA 27高维多能一体电脑",
        price: 6599,
        image: "../../public/联想YOGA 27高维多能一体电脑.jpg",
      },
      {
        id: '81a14922e510477ca475c40806094f14',
        categoryId: 1,
        name: "联想天逸510S 尊享版",
        price: 4699,
        image: "../../public/联想天逸510S 尊享版.jpg",
      },
      // 笔记本
      {
        id: 'beee11a224f74b3a8e75290dcec382a5',
        categoryId: 2,
        name: "联想拯救者Y9000P",
        price: 11299,
        image: "../../public/联想拯救者Y9000P.png",
      },
      {
        id: '83cb5c8503534bf59a8e2fe2ddba6872',
        categoryId: 2,
        name: "联想拯救者R9000P",
        price: 9299,
        image: "../../public/联想拯救者R9000P.jpg",
      },
      {
        id: '6ee560c6c53c448982fdc6a8931bfa9b',
        categoryId: 2,
        name: "联想小新Pro AI元启",
        price: 6199,
        image: "../../public/联想小新Pro AI元启.jpg",
      },
      {
        id: 'ed1e436ab4d14ecaaa32d4d6bfc01fff',
        categoryId: 2,
        name: "联想YOGA Pro 16s AI元启",
        price: 13999,
        image: "../../public/联想YOGA Pro 16s AI元启.jpg",
      },
      // 平板电脑
      {
        id: '9ea6881c49e24ce8a43fab0fdc337d70',
        categoryId: 3,
        name: "联想YOGA Pad Pro AI元启",
        price: 4799,
        image: "../../public/联想YOGA Pad Pro AI元启.jpg",
      },
      {
        id: '171086f2a099411e9a7e1e205d1933c9',
        categoryId: 3,
        name: "联想拯救者Y700",
        price: 3399,
        image: "../../public/联想拯救者Y700.jpg",
      },
      {
        id: '3868f008fb1a48c38af388148562bb95',
        categoryId: 3,
        name: "联想小新Pad Pro 12.7英寸",
        price: 1699,
        image: "../../public/联想小新Pad Pro 12.7英寸.jpg",
      },
      {
        id: 'ad3acae8c3bf41e7950a870ec4c4a5da',
        categoryId: 3,
        name: "联想平板小新Pad 2024",
        price: 1149,
        image: "../../public/联想平板小新Pad 2024.jpg",
      },
      // 手机
      {
        id: 'c9b0f41439f94aaa9dd39478b0fbe546',
        categoryId: 4,
        name: "联想moto razr 50 Ultra",
        price: 5899,
        image: "../../public/联想moto razr 50 Ultra.jpg",
      },
      {
        id: '7e11c4811e37492a96b21536a42926ee',
        categoryId: 4,
        name: "联想moto razr 50",
        price: 3699,
        image: "../../public/联想moto razr 50.png",
      },
      {
        id: 'e925cb0864744c659b61c4747196705b',
        categoryId: 4,
        name: "联想moto S50",
        price: 1199,
        image: "../../public/联想moto S50.jpg",
      },
      {
        id: 'bb8c3523af2b47df8a66a41431bbd3ba',
        categoryId: 4,
        name: "联想moto X50 Ultra",
        price: 3799,
        image: "../../public/联想moto X50 Ultra.jpg",
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
      501: ["../../public/hotline1.jpg"],
      502: ["../../public/hotline2.jpg"],
      503: ["../../public/hotline3.jpg"],
      504: ["../../public/hotline4.jpg"],
      505: ["../../public/hotline5.jpg"],
      506: ["../../public/hotline6.jpg"],
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

    // 处理产品点击事件
    const handleProductClick = (id) => {
      commodityStore.commodityId = id;
      commodityStore.price = products.value.find(
        (product) => product.id === id
      ).price;
      router.push('/CommodityDetail');
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
      handleProductClick,
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
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  cursor: pointer;
}

.product-image {
  width: 100%;
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