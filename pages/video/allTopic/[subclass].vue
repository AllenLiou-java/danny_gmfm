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
        :subclass-selected="subclassSelected"
      />
      <VideoListView :videos-per-page="videosPerPage[currentPage - 1]" />
    </div>
    <div class="flex-center container mb-15">
      <vue-awesome-paginate
        v-model="currentPage"
        :total-items="totalVideos"
        :items-per-page="pageSize"
        :max-pages-shown="3"
        paginate-buttons-class="size-10  hover:bg-secondary text-[18px]"
        active-page-class="paginate-active"
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
const topicSelected = ref('allTopic')
const subclassSelected = ref(route.params.subclass)
const currentPage = ref(1)

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

const scrollTop = () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

const turnPage = (page) => {
  router.push({
    name: 'video-allTopic-subclass',
    params: {
      subclass: subclassSelected.value
    },
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
    currentSmallcategory: subclassSelected.value
  })

  currentPage.value = parseInt(route.query.page)
})
</script>

<style lang="scss" scoped></style>
