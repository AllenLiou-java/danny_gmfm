import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', () => {
  const { topic, subclass } = useRoute().params
  const latest5Video = ref([])
  const videos = ref([])
  const codeVideoBigcategoryList = ref(null)
  const codeVideoSmallcategoryList = ref(null)

  const currentCategory = ref(topic || 'allTopic')
  const currentSmallcategory = ref(subclass || null)

  const pageSize = ref(10)

  const currentCategoryId = computed(() => {
    if (codeVideoBigcategoryList.value === null) {
      return null
    } else {
      return (
        codeVideoBigcategoryList.value.filter((item) => {
          return item.label_en === currentCategory.value
        })[0]?.id || null
      )
    }
  })

  const currentSmallcategoryId = computed(() => {
    if (codeVideoSmallcategoryList.value === null) {
      return null
    } else {
      return (
        codeVideoSmallcategoryList.value.filter(
          (item) => item.label_en === currentSmallcategory.value
        )[0]?.id || null
      )
    }
  })

  const videoFiltered = computed(() => {
    const categoryId = currentCategoryId.value
    const smallcategoryId = currentSmallcategoryId.value

    let result = []

    if (categoryId === '0' && smallcategoryId === null) {
      result = videos.value
    } else if (categoryId === '0') {
      result = videos.value.filter((item) => {
        return item.smallcategory === smallcategoryId
      })
    } else {
      result = videos.value.filter((item) => {
        return item.category === categoryId && item.smallcategory === smallcategoryId
      })
    }
    return result
  })

  const videosPerPage = computed(() => {
    const size = pageSize.value
    const data = videoFiltered.value

    const result = []

    for (let i = 0; i < data.length; i += size) {
      result.push(data.slice(i, i + size))
    }

    return result
  })

  const totalVideos = computed(() => {
    return videoFiltered.value.length
  })

  const bigcategoryNavigator = computed(() => {
    const bigcategoryList = JSON.parse(JSON.stringify(codeVideoBigcategoryList.value))
    const smallcategoryList = JSON.parse(JSON.stringify(codeVideoSmallcategoryList.value))
    if (bigcategoryList === null || smallcategoryList === null) return null

    return bigcategoryList.map((bigcategory) => {
      if (bigcategory.id === '0') {
        return {
          label: bigcategory.label,
          label_en: bigcategory.label_en,
          route: `/video/${bigcategory.label_en}?page=1`,
          imgurl: ''
        }
      } else {
        // Step 1: 篩選出 supertype 包含 idx 的項目
        const smallcategoryListByType = smallcategoryList.filter((smallcategory) =>
          smallcategory.supertype.split(',').includes(bigcategory.id)
        )
        // Step 2: 根據 id 轉數字後排序
        smallcategoryListByType.sort((a, b) => parseInt(a.id) - parseInt(b.id))
        // Step 3: 取出 id 最小的smallcategory
        const firstSmallcategoryLabel = smallcategoryListByType[0].label_en

        return {
          label: bigcategory.label,
          label_en: bigcategory.label_en,
          route: `/video/${bigcategory.label_en}/${firstSmallcategoryLabel}?page=1`,
          imgurl: bigcategory.imgurl,
          navImgurl: bigcategory.nav_imgurl
          // imgurl: `/video/category-bg/${bigcategory.id}.png`
        }
      }
    })
  })

  const smallcategoryNavigator = computed(() => {
    const bigcategoryList = JSON.parse(JSON.stringify(codeVideoBigcategoryList.value))
    const smallcategoryList = JSON.parse(JSON.stringify(codeVideoSmallcategoryList.value))
    const currentCategoryName = currentCategory.value
    if (bigcategoryList === null || smallcategoryList === null || currentCategoryName === null)
      return null

    // 從 bigcategoryList 比對 currentCategory對應的id
    const currentCategoryId = bigcategoryList.filter(
      (bigcategory) => bigcategory.label_en === currentCategoryName
    )[0]?.id

    if (currentCategoryId === '0') {
      return smallcategoryList.map((smallcategory) => {
        return {
          label: smallcategory.label,
          label_en: smallcategory.label_en,
          route: `/video/${currentCategoryName}/${smallcategory.label_en}?page=1`,
          imgurl: smallcategory.imgurl
          // imgurl: `/video/${smallcategory.label_en}.svg`
        }
      })
    } else {
      // 使用id 比對 smallcategoryList中的supertype，篩選出有涵蓋id的 supertype
      // Step 1: 篩選出 supertype 包含 idx 的項目
      const smallcategoryListByType = smallcategoryList.filter((smallcategory) =>
        smallcategory.supertype.split(',').includes(currentCategoryId)
      )
      // Step 2: 根據 id 轉數字後排序
      smallcategoryListByType.sort((a, b) => parseInt(a.id) - parseInt(b.id))

      return smallcategoryListByType.map((smallcategory) => {
        return {
          label: smallcategory.label,
          label_en: smallcategory.label_en,
          route: `/video/${currentCategoryName}/${smallcategory.label_en}?page=1`,
          imgurl: smallcategory.imgurl
          // imgurl: `/video/${smallcategory.label_en}.svg`
        }
      })
    }
  })

  const getVideoCategoryList = async () => {
    if (codeVideoBigcategoryList.value === null) {
      const codeVideoCategory = await $fetch('/api/airtable/codeVideoCategory')

      codeVideoCategory.unshift({
        id: '0',
        label: '全部',
        label_en: 'allTopic'
      })

      codeVideoBigcategoryList.value = codeVideoCategory
    }

    if (codeVideoSmallcategoryList.value === null) {
      const codeVideoSmallcategory = await $fetch('/api/airtable/codeVideoSmallcategory')

      codeVideoSmallcategoryList.value = codeVideoSmallcategory
    }
  }

  const getLatest5Video = async () => {
    if (latest5Video.value.length > 0) return

    latest5Video.value = await $fetch('/api/airtable/video', {
      method: 'post',
      body: {
        maxRecords: 5
      }
    })
  }

  const getVideos = async () => {
    if (videos.value.length > 0) return
    const infos = await $fetch('/api/airtable/video', {
      method: 'post'
    })

    videos.value = infos
    latest5Video.value = infos.slice(0, 5)
    return infos
  }

  return {
    latest5Video,
    videos,
    videosPerPage,
    pageSize,
    totalVideos,
    currentCategory,
    currentCategoryId,
    currentSmallcategory,
    videoFiltered,
    codeVideoBigcategoryList,
    codeVideoSmallcategoryList,
    bigcategoryNavigator,
    smallcategoryNavigator,
    getVideoCategoryList,
    getLatest5Video,
    getVideos
  }
})
