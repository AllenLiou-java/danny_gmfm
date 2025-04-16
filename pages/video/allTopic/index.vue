<template>
  <div>
    <div
      class="nav-space h-90 bg-[url(~/assets/images/banner/banner-video-bg.png)] bg-cover bg-center bg-no-repeat"
    >
      <div class="relative container h-full">
        <div
          class="absolute bottom-0 left-0 container mb-6 text-[12px] tracking-[5px] sm:mt-4 sm:text-[16px]"
        >
          <p>本日人氣：1000</p>
          <p>累積人氣：5367801</p>
        </div>
      </div>
    </div>
    <div class="container min-h-[100vh] pt-4 pb-10 sm:pt-8 sm:pb-15">
      <VideoTopicMenu
        v-if="bigcategoryNavigator !== null"
        class="mb-4 sm:mb-6"
        :topics="bigcategoryNavigator"
        :topic-selected="topicSelected"
      />
      <VideoSubclassMenu
        v-if="smallcategoryNavigator !== null"
        class="mb-6 sm:mb-15"
        :subclass-list="smallcategoryNavigator"
      />
      <VideoListView :videos-per-page="videosPerPage[currentPage - 1]" />
    </div>
    <div class="flex-center container mb-15">
      <vue-awesome-paginate
        v-model="currentPage"
        :total-items="totalVideos"
        :items-per-page="pageSize"
        :max-pages-shown="3"
        paginate-buttons-class="size-10  hover:bg-secondary"
        active-page-class="text-yellow"
        back-button-class="back-btn"
        next-button-class="next-btn"
        @click="turnPage"
      />
    </div>
  </div>
</template>

<script setup>
const videoStore = useVideoStore()
const {
  videos,
  videosPerPage,
  pageSize,
  totalVideos,
  bigcategoryNavigator,
  smallcategoryNavigator
} = storeToRefs(useVideoStore())
const route = useRoute()
const router = useRouter()

const { data: videoList } = await useAsyncData('videoList', () => {
  if (videos.value.length > 0) {
    return videos.value
  } else {
    return $fetch('/api/airtable/video', {
      method: 'post',
      body: {
        sort: [{ field: 'video_no', direction: 'desc' }]
      }
    })
  }
})

const topicSelected = ref('allTopic')

// const topicList = ref([
//   {
//     label: '台灣百岳',
//     label_en: 'top_mountains_tw',
//     route: '/video/top_mountains_tw/north?page=1',
//     imgurl: '/video/category1-btn-bg.png'
//   },
//   {
//     label: '中級山/郊山步道/野營/野溪溫泉',
//     label_en: 'outdoor_spot',
//     route: '/video/outdoor_spot/north?page=1',
//     imgurl: '/video/category2-btn-bg.png'
//   },
//   {
//     label: '相關主題',
//     label_en: 'related_topic',
//     route: '/video/related_topic/device_evaluation?page=1',
//     imgurl: '/video/category1-btn-bg.png'
//   }
// ])

// const subclassList = ref([
//   {
//     label: '北部',
//     label_en: 'north',
//     route: '/video/allTopic/north?page=1',
//     imgurl: '/video/north.svg'
//   },
//   {
//     label: '中部',
//     label_en: 'middle',
//     route: '/video/allTopic/middle?page=1',
//     imgurl: '/video/middle.svg'
//   },
//   {
//     label: '南部',
//     label_en: 'south',
//     route: '/video/allTopic/south?page=1',
//     imgurl: '/video/south.svg'
//   },
//   {
//     label: '東部',
//     label_en: 'east',
//     route: '/video/allTopic/east?page=1',
//     imgurl: '/video/east.svg'
//   },
//   {
//     label: '其他主題',
//     label_en: 'othersTopic',
//     route: '/video/allTopic/othersTopic?page=1',
//     imgurl: ''
//   }
// ])

const currentPage = ref(1)

const scrollTop = () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

const turnPage = (page) => {
  router.push({
    name: 'video-allTopic',
    query: {
      page
    }
  })

  scrollTop()
}

watch(
  () => route.query.page,
  (newval) => {
    currentPage.value = parseInt(newval)
    scrollTop()
  }
)

onMounted(() => {
  videoStore.$patch({
    videos: videoList.value,
    currentCategory: topicSelected.value,
    currentSmallcategory: null
  })

  currentPage.value = parseInt(route.query.page)
})
</script>

<style lang="scss" scoped></style>
