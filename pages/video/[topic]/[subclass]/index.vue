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
    <div class="min-h-[100vh] bg-primary pt-4 pb-10 sm:pt-8 sm:pb-15">
      <div class="container">
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
        <VideoListView @turn-page="turnPage" />
      </div>
    </div>

    <Suscribe />
  </div>
</template>

<script setup>
const videoStore = useVideoStore()
const { bigcategoryNavigator, smallcategoryNavigator } = storeToRefs(useVideoStore())
const { topic, subclass } = useRoute().params
const topicSelected = ref(topic)
const subclassSelected = ref(subclass)
const router = useRouter()

await callOnce(videoStore.getVideos)

const scrollTop = () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

const turnPage = (pageNo) => {
  router.push({
    name: 'video-topic-subclass',
    params: {
      topic: topicSelected.value,
      subclass: subclassSelected.value
    },
    query: {
      page: pageNo
    }
  })

  scrollTop()
}

onMounted(() => {
  videoStore.$patch({
    currentCategory: topicSelected.value,
    currentSmallcategory: subclassSelected.value
  })
})
</script>

<style lang="scss" scoped></style>
