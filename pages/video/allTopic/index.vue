<template>
  <div>
    <div
      class="nav-space h-90 bg-[url(~/assets/images/banner/banner-video-bg.png)] bg-cover bg-center bg-no-repeat"
    >
      <div class="relative container h-full">
        <VisitCountBoard class="absolute bottom-0 left-0 container mb-6 sm:mt-4" />
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
      <VideoListView @turn-page="turnPage" />
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'video',
  ogTitle: 'video - 秋天剩旅行｜Danny_GMFM 山岳影像創作者',
  description: '利用影音的方式記錄下登山、潛水、攀岩、旅遊等珍貴的紀錄。',
  ogDescription: '利用影音的方式記錄下登山、潛水、攀岩、旅遊等珍貴的紀錄。'
})

const videoStore = useVideoStore()
const { bigcategoryNavigator, smallcategoryNavigator } = storeToRefs(useVideoStore())
const router = useRouter()
await callOnce(videoStore.getVideos)

const topicSelected = ref('allTopic')

const scrollTop = () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

const turnPage = (pageNo) => {
  router.push({
    name: 'video-allTopic',
    query: {
      page: pageNo
    }
  })

  scrollTop()
}

onMounted(() => {
  videoStore.$patch({
    currentCategory: topicSelected.value,
    currentSmallcategory: null
  })
})
</script>

<style lang="scss" scoped></style>
