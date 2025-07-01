import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
  const { topic, subclass } = useRoute().params

  const latest3Product = ref([])
  const products = ref([])
  const codeProductBigcategoryList = ref(null)
  const codeProductSmallcategoryList = ref(null)

  const currentProductBigcategory = ref(topic)
  const currentProductSmallcategory = ref(subclass)
  const pageSize = ref(9)

  const currentCategoryId = computed(() => {
    if (codeProductBigcategoryList.value === null) {
      return null
    } else {
      return (
        codeProductBigcategoryList.value.filter((item) => {
          return item.label_en === currentProductBigcategory.value
        })[0]?.id || null
      )
    }
  })

  const currentSmallcategoryId = computed(() => {
    if (codeProductSmallcategoryList.value === null) {
      return null
    } else {
      return (
        codeProductSmallcategoryList.value.filter(
          (item) => item.label_en === currentProductSmallcategory.value
        )[0]?.id || null
      )
    }
  })

  const productsFiltered = computed(() => {
    const categoryId = currentCategoryId.value
    const smallcategoryId = currentSmallcategoryId.value

    let result = []

    if (smallcategoryId === '0') {
      result = products.value.filter((product) => product.category === categoryId)
    } else {
      result = products.value.filter((product) => product.smallcategory === smallcategoryId)
    }

    return result
  })

  const productsPerPage = computed(() => {
    const size = pageSize.value
    const data = productsFiltered.value

    const result = []

    for (let i = 0; i < data.length; i += size) {
      result.push(data.slice(i, i + size))
    }

    return result
  })

  const totalProducts = computed(() => {
    return productsFiltered.value.length
  })

  const productBigcategoryNavigator = computed(() => {
    const bigcategoryList = JSON.parse(JSON.stringify(codeProductBigcategoryList.value))

    if (bigcategoryList === null) return null

    return bigcategoryList.map(({ label, label_en, imgurl }) => ({
      label,
      label_en,
      route: `/goodStuff/${label_en}/all?page=1`,
      imgurl
    }))
  })

  const productSmallcategoryNavigator = computed(() => {
    const bigcategoryList = JSON.parse(JSON.stringify(codeProductBigcategoryList.value))
    const smallcategoryList = JSON.parse(JSON.stringify(codeProductSmallcategoryList.value))
    const currentBigcategory = currentProductBigcategory.value

    if (bigcategoryList === null || smallcategoryList === null || currentBigcategory === null)
      return null

    const currentCategoryId = bigcategoryList.filter(
      (category) => category.label_en === currentBigcategory
    )[0]?.id

    const currentSmallcategoryList = smallcategoryList.filter(
      (category) => category.supertype === currentCategoryId || category.id === '0'
    )

    return currentSmallcategoryList.map(({ label, label_en, imgurl }) => ({
      label,
      label_en,
      route: `/goodStuff/${currentBigcategory}/${label_en}?page=1`,
      imgurl: label_en === 'all' ? `/goodStuff/all.png` : `${imgurl}`
      // imgurl:
      //   label_en === 'all'
      //     ? `/goodStuff/all.png`
      //     : `/goodStuff/${currentBigcategory}/${label_en}.png`
    }))
  })

  const getProductCategoryList = async () => {
    let codeBigcategory = []
    let codeSmallcategory = []

    if (codeProductBigcategoryList.value === null) {
      codeBigcategory = await $fetch('/api/airtable/codeProductBigcategory')

      codeProductBigcategoryList.value = codeBigcategory
    }

    if (codeProductSmallcategoryList.value === null) {
      codeSmallcategory = await $fetch('/api/airtable/codeProductSmallcategory')
      codeSmallcategory.unshift({
        id: '0',
        label: '全部',
        supertype: '0',
        label_en: 'all'
      })

      codeProductSmallcategoryList.value = codeSmallcategory
    }
  }

  const getLatest3Product = async () => {
    if (latest3Product.value.length > 0) return

    latest3Product.value = await $fetch('/api/airtable/product', {
      method: 'post',
      body: {
        maxRecords: 3,
        fields: ['name', 'category', 'cover_image', 'product_no']
      }
    })
  }

  const getProducts = async () => {
    if (products.value.length > 0) return
    const infos = await $fetch('/api/airtable/product', {
      method: 'post'
    })

    products.value = infos
    latest3Product.value = infos.slice(0, 3)
    return infos
  }

  return {
    latest3Product,
    products,
    codeProductBigcategoryList,
    codeProductSmallcategoryList,
    productBigcategoryNavigator,
    productSmallcategoryNavigator,
    currentProductBigcategory,
    currentProductSmallcategory,
    productsFiltered,
    productsPerPage,
    totalProducts,
    getLatest3Product,
    getProductCategoryList,
    getProducts
  }
})
