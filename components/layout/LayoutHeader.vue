<template>
  <div class="fixed inset-x-0 z-100">
    <div
      class="flex items-center justify-between gap-x-20 py-2.5 lg:gap-x-6"
      :class="
        headerActive ? 'mt-4 rounded-xl bg-secondary px-3 opacity-94 duration-300 ease-linear' : ''
      "
    >
      <NuxtLink
        class="block size-[30px] shrink-0 overflow-hidden bg-[url('~/assets/images/logo.svg')] bg-cover indent-[101%] whitespace-nowrap sm:size-[50px]"
        to="/"
        >秋天剩旅行</NuxtLink
      >
      <ul class="flex flex-wrap gap-x-2 sm:gap-x-8">
        <li v-for="routeItem in routeList" :key="routeItem.label" class="group hidden sm:block">
          <div v-if="routeItem.items.length > 0" class="relative">
            <div class="relative py-3">
              <span class="text-[18px]">{{ routeItem.label }}</span>
              <Icon :name="routeItem.icon" size="24px" class="align-top" />
              <div
                class="absolute bottom-0 h-1 w-full rounded-[3px] bg-white group-hover:block"
                :class="currentPageName === routeItem.label_en ? 'bg-yellow sm:block' : 'hidden'"
              ></div>
            </div>
            <div class="absolute z-100 hidden w-full bg-primary text-center group-hover:block">
              <div class="flex flex-col py-[10px]">
                <NuxtLink
                  v-for="item in routeItem.items"
                  :key="item.label"
                  class="py-[3px] hover:bg-[#171e20]"
                  :to="item.route"
                  >{{ item.label }}</NuxtLink
                >
              </div>
            </div>
          </div>
          <div v-else class="relative cursor-pointer py-3">
            <NuxtLink :to="routeItem.route">{{ routeItem.label }}</NuxtLink>
            <div
              class="absolute bottom-0 h-1 w-full rounded-[3px] bg-white group-hover:block"
              :class="currentPageName === routeItem.label_en ? 'block bg-yellow' : 'hidden'"
            ></div>
          </div>
        </li>
        <li class="group relative">
          <NuxtLink to="/search/video">
            <img
              class="relative size-[30px] object-cover sm:top-3"
              :src="imageSrc('/search.png')"
              alt="searchBtn"
            />
          </NuxtLink>
          <div
            class="absolute bottom-0 h-1 w-full rounded-[3px] bg-white group-hover:sm:block"
            :class="currentPageName === 'search' ? 'hidden bg-yellow sm:block' : 'hidden'"
          ></div>
        </li>
        <li>
          <img
            class="block size-[30px] cursor-pointer sm:hidden"
            :src="imageSrc('/hambur.png')"
            alt="hamburBtn"
            @click="mobileNavOpen"
          />
        </li>
      </ul>
    </div>
    <div id="mobileNav" class="absolute top-0 left-0 hidden w-full bg-primary p-4">
      <img
        class="float-end size-6 cursor-pointer"
        :src="imageSrc('/close.png')"
        alt="closeBtn"
        @click="mobileNavClose"
      />
      <ul class="mt-8 flex flex-col items-center justify-center">
        <li
          v-for="routeItem in routeList"
          :id="routeItem.label_en"
          :key="routeItem.label"
          class="mb-6 text-center"
          @click="toggleNavItemList(routeItem.label_en)"
        >
          <template v-if="routeItem.items.length > 0">
            <div
              class="mb-3"
              :class="currentPageName === routeItem.label_en ? 'text-yellow' : 'text-white'"
            >
              <span>{{ routeItem.label }}</span>
              <Icon :name="routeItem.icon" size="24px" class="align-top" />
            </div>
            <div class="subclass hidden">
              <div class="flex flex-col gap-y-2 opacity-70">
                <NuxtLink v-for="item in routeItem.items" :key="item.label" :to="item.route">{{
                  item.label
                }}</NuxtLink>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink :to="routeItem.route">{{ routeItem.label }}</NuxtLink>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { imageSrc } = getImageSrc()
const route = useRoute()
const headerActive = ref(false)
const { codeVideoBigcategoryList, codeVideoSmallcategoryList } = storeToRefs(useVideoStore())
const { codeProductBigcategoryList, codeProductSmallcategoryList } = storeToRefs(useProductStore())

const currentPageName = computed(() => {
  if (codeVideoBigcategoryList.value === null) return null
  const videoCategoryNames = codeVideoBigcategoryList.value.map(
    (bigcategory) => bigcategory.label_en
  )
  const otherNames = ['goodStuff', 'work', 'aboutMe', 'search']

  const pageNameList = videoCategoryNames.concat(otherNames)

  const pathSplit = route.fullPath.split('/')

  return pageNameList.filter((pageName) => {
    return pathSplit.includes(pageName)
  })[0]
})

const routeList = computed(() => {
  // video相關的路由
  if (codeVideoBigcategoryList.value === null || codeVideoSmallcategoryList.value === null)
    return null
  const videoBigcategory = codeVideoBigcategoryList.value.filter(
    (bigcategory) => bigcategory.id !== '0'
  )

  const videoNavigatorInfo = videoBigcategory.map((big_c) => {
    const small_c_list = codeVideoSmallcategoryList.value.filter((smallcategory) =>
      smallcategory.supertype.split(',').includes(big_c.id)
    )

    const subItems = small_c_list.map((item) => ({
      label: item.label,
      route: `/video/${big_c.label_en}/${item.label_en}?page=1`
    }))

    return {
      label: big_c.label,
      label_en: big_c.label_en,
      icon: subItems.length > 0 ? 'mdi:menu-down' : '',
      route: '',
      items: subItems
    }
  })

  // goodStuff相關的路由
  if (codeProductBigcategoryList.value === null || codeProductSmallcategoryList.value === null)
    return null

  const stuffNavigatorSubItems = codeProductBigcategoryList.value.map((big_c) => {
    return {
      label: big_c.label,
      route: `/goodStuff/${big_c.label_en}/all?page=1`
    }
  })

  const stuffNavigatorInfo = {
    label: '好物推薦',
    label_en: 'goodStuff',
    icon: stuffNavigatorSubItems.length > 0 ? 'mdi:menu-down' : '',
    route: '',
    items: stuffNavigatorSubItems
  }

  // 其他路由
  const othersNavigatorInfo = [
    {
      label: '作品',
      label_en: 'work',
      icon: '',
      route: '/work?page=1',
      items: []
    },
    {
      label: '關於我',
      label_en: 'aboutMe',
      icon: '',
      route: '/aboutMe',
      items: []
    }
  ]

  return videoNavigatorInfo.concat(stuffNavigatorInfo).concat(othersNavigatorInfo)
})

// const routeList = ref([
//   {
//     label: '台灣百岳',
//     label_en: 'top_mountains_tw',
//     icon: 'mdi:menu-down',
//     route: '',
//     items: [
//       {
//         label: '北部',
//         route: '/video/top_mountains_tw/north?page=1'
//       },
//       {
//         label: '中部',
//         route: '/video/top_mountains_tw/middle?page=1'
//       },
//       {
//         label: '南部',
//         route: '/video/top_mountains_tw/south?page=1'
//       },
//       {
//         label: '東部',
//         route: '/video/top_mountains_tw/east?page=1'
//       }
//     ]
//   },
//   {
//     label: '中級山/郊山步道/野營/野溪溫泉',
//     label_en: 'outdoor_spot',
//     icon: 'mdi:menu-down',
//     route: '',
//     items: [
//       {
//         label: '北部',
//         route: '/video/outdoor_spot/north?page=1'
//       },
//       {
//         label: '中部',
//         route: '/video/outdoor_spot/middle?page=1'
//       },
//       {
//         label: '南部',
//         route: '/video/outdoor_spot/south?page=1'
//       },
//       {
//         label: '東部',
//         route: '/video/outdoor_spot/east?page=1'
//       }
//     ]
//   },
//   {
//     label: '相關主題',
//     label_en: 'related_topic',
//     icon: 'mdi:menu-down',
//     route: '',
//     items: [
//       {
//         label: '裝備評測',
//         route: '/video/related_topic/device_evaluation?page=1'
//       },
//       {
//         label: '品牌介紹',
//         route: '/video/related_topic/brand_intro?page=1'
//       },
//       {
//         label: '潛水、攀岩',
//         route: '/video/related_topic/diving_and_climbing?page=1'
//       },
//       {
//         label: '環保響應',
//         route: '/video/related_topic/going_green?page=1'
//       },
//       {
//         label: '國外山岳',
//         route: '/video/related_topic/foreign_mountain?page=1'
//       },
//       {
//         label: '其他',
//         route: '/video/related_topic/others?page=1'
//       }
//     ]
//   },
//   {
//     label: '好物推薦',
//     label_en: 'goodStuff',
//     icon: 'mdi:menu-down',
//     route: '',
//     items: [
//       {
//         label: '戶外裝備',
//         route: '/goodStuff/outdoor/all?page=1'
//       },
//       {
//         label: '拍攝裝備',
//         route: '/goodStuff/photography/all?page=1'
//       }
//     ]
//   },
//   {
//     label: '作品',
//     label_en: 'work',
//     icon: '',
//     route: '/work',
//     items: []
//   },
//   {
//     label: '關於我',
//     label_en: 'aboutMe',
//     icon: '',
//     route: '/aboutMe',
//     items: []
//   }
// ])

const toggleNavItemList = (item) => {
  const subclassEL = document.querySelector(`#${item}>.subclass`)
  if (subclassEL) {
    subclassEL.classList.toggle('hidden')
  }
}

const closeNavItemList = () => {
  const pageNameList = [
    'top_mountains_tw',
    'outdoor_spot',
    'related_topic',
    'goodStuff',
    'work',
    'aboutMe'
  ]
  pageNameList.forEach((item) => {
    const subclassEL = document.querySelector(`#${item}>.subclass`)
    if (!subclassEL) return
    const subclassELHidden = subclassEL.classList.value.includes('hidden')
    if (!subclassELHidden) {
      subclassEL.classList.add('hidden')
    }
  })
}

watch(route, () => {
  mobileNavClose()
  headerActive.value = false
})

const mobileNavOpen = () => {
  const mobileNavEL = document.querySelector('#mobileNav')
  mobileNavEL.classList.remove('hidden')
}

const mobileNavClose = () => {
  const mobileNavEL = document.querySelector('#mobileNav')
  mobileNavEL.classList.add('hidden')

  closeNavItemList()
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop
    if (st >= 100) {
      headerActive.value = true
    } else {
      headerActive.value = false
    }
  })
})
</script>

<style scoped>
.router-link-active.router-link-exact-active {
  color: #fbff9e;
}
</style>
