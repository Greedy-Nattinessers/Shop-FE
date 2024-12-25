import { defineStore } from 'pinia'
import commodityApi from '@/apis/shop'  

const useCommodityStore = defineStore('commodity', {
  state: () => ({
    commodityId: 'aedd38666d834df3911105b7a9e96240', 
    name: null,
    price: null,
    album: null,
    description: null,
    images: [],
    imageUrls: [],
    comments: []
  }),

  getters: {
    getCommodityById: (state) => (id) => {
      return state.commodityId === id ? state : null;
    },
  },

  actions: {

    setCommodity(partial) {
        this.$patch(partial)
    },
    
    async fetchAllCommodities() {
      try {
        const res = await commodityApi.allCommodities()
        return true
      } catch {
        return false
      } 
    },
    

    async fetchCommodityById() {
      try {
        const res = await commodityApi.commodityDetail(this.commodityId)
        this.setCommodity(res.data)
        return true
      } catch {
        return false
      } 
    },

    async fetchCommodityImage() {
      try {
        this.imageUrls = []
        if (this.images.length === 0) {
          console.error('没有可用的图片哈希值');
          return false;
        }
    
        for (const imageHash of this.images) {
          const res = await commodityApi.commodityImage(imageHash);
          console.log(res)
          // 生成Base64格式的图片源
          const imageSrc = `data:image/png;base64,${res}`;
          this.imageUrls.push(imageSrc); 
        }
         console.log(this.imageUrls)

        return true;
      } catch (error) {
        console.error('获取商品图片失败:', error);
        return false;
      }
    },
    
    async fetchComments() {
      this.comments = []
      try {
        const res = await commodityApi.getComments (this.commodityId)
        this.comments = res.data;
        return true
      } catch {
        return false
      } 
    },

    async addComment(body) {
      try {
        await commodityApi.addComment(this.commodityId,body)
        console.log("3")
        return true
      } catch {
        return false
      } 
    },

    async addToCart() {
      try {
        await commodityApi.addCart(this.commodityId)
        return true
      } catch {
        return false
      } 
    },
    
  },
})

export default useCommodityStore
