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
      <VideoTopicMenu class="mb-4 sm:mb-6" :topics="topicList" :topic-selected="topicSelected" />
      <VideoSubclassMenu
        class="mb-6 sm:mb-15"
        :subclass-list="subclassList"
        :subclass-selected="subclassSelected"
      />
      <VideoListView />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const topicSelected = ref(route.params.topic)
const subclassSelected = ref(route.params.subclass)

const topicList = ref([
  {
    label: '台灣百岳',
    label_en: 'top_mountains_tw',
    route: '/video/top_mountains_tw/north',
    imgurl: '/video/category1-btn-bg.png'
  },
  {
    label: '中級山/郊山步道/野營/野溪溫泉',
    label_en: 'outdoor_spot',
    route: '/video/outdoor_spot/north',
    imgurl: '/video/category2-btn-bg.png'
  },
  {
    label: '相關主題',
    label_en: 'related_topic',
    route: '/video/related_topic/device_evaluation',
    imgurl: '/video/category1-btn-bg.png'
  }
])

const subclassList = computed(() => {
  const topic = route.params.topic
  if (topic === 'related_topic') {
    return [
      {
        label: '裝備評測',
        label_en: 'device_evaluation',
        route: '/video/related_topic/device_evaluation',
        imgurl: ''
      },
      {
        label: '品牌介紹',
        label_en: 'brand_intro',
        route: '/video/related_topic/brand_intro',
        imgurl: ''
      },
      {
        label: '潛水、攀岩',
        label_en: 'diving_and_climbing',
        route: '/video/related_topic/diving_and_climbing',
        imgurl: ''
      },
      {
        label: '環保響應',
        label_en: 'going_green',
        route: '/video/related_topic/going_green',
        imgurl: ''
      },
      {
        label: '國外山岳',
        label_en: 'foreign_mountain',
        route: '/video/related_topic/foreign_mountain',
        imgurl: ''
      },
      {
        label: '其他',
        label_en: 'others',
        route: '/video/related_topic/others',
        imgurl: ''
      }
    ]
  } else {
    return [
      {
        label: '北部',
        label_en: 'north',
        route: '/video/all/north',
        imgurl: '/video/north.svg'
      },
      {
        label: '中部',
        label_en: 'middle',
        route: '/video/all/middle',
        imgurl: '/video/middle.svg'
      },
      {
        label: '南部',
        label_en: 'south',
        route: '/video/all/south',
        imgurl: '/video/south.svg'
      },
      {
        label: '東部',
        label_en: 'east',
        route: '/video/all/east',
        imgurl: '/video/east.svg'
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>
