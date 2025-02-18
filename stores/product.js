import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
  const productList = ref({ x: 123 })

  return { productList }
})
