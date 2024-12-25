import { defineStore } from 'pinia'
import commodityApi from '@/apis/shop'  
import userApi from '@/apis/user'

const useCommodityStore = defineStore('commodity', {
  state: () => ({
    commodityId: 'f3c761e86c0e49bf9d5106ead58ed2dc', 
    name: null,
    price: null,
    album: null,
    description: null,
    images: [],
    i: null,
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
        this.imagesSrc = []
        if (this.images.length === 0) {
          console.error('没有可用的图片哈希值');
          return false;
        }
    
        for (const imageHash of this.images) {
          const res = commodityApi.commodityImage(imageHash);
          return res
        }
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

    async fetchCommentsUsername(uid) {
      try {
        const res = await userApi.othersProfile(uid)
        return res
      } catch {
        return false
      } 
    },

    async addComment(body) {
      try {
        await commodityApi.addComment(this.commodityId,body)
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
