import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
  const productList = ref({ x: 123 })
  const codeProductBigcategoryList = ref(null)
  const codeProductSmallcategoryList = ref(null)

  // const productBigcategoryNavigator = computed(()=>{
  //   const bigcategoryList = codeProductBigcategoryList.value
  //   if(bigcategoryList === null) return null

  //   return bigcategoryList.map()
  // })

  const getProductCategoryList = async () => {
    if (codeProductBigcategoryList.value === null) {
      const codeBigcategory = await $fetch('/api/airtable/codeProductBigcategory')

      codeProductBigcategoryList.value = codeBigcategory
    }

    if (codeProductSmallcategoryList.value === null) {
      const codeSmallcategory = await $fetch('/api/airtable/codeProductSmallcategory')
      codeProductSmallcategoryList.value = codeSmallcategory
    }
  }

  return {
    productList,
    codeProductBigcategoryList,
    codeProductSmallcategoryList,
    getProductCategoryList
  }
})
