<template>
  <div class="flex h-[50px] gap-[23px] sm:h-15 md:h-20">
    <NuxtLink
      :to="allTopicItem.route"
      :class="topicSelected === 'allTopic' ? 'border-2 border-yellow' : ''"
      class="flex-center w-[50px] flex-col rounded-[8px] bg-[#1c2428] hover:border-2 hover:border-white sm:w-[70px]"
    >
      <span class="mb-1 inline-block text-[18px] tracking-[5.25px]">All</span>
      <img class="ml-2 w-[22px]" :src="imageSrc('/video/icon_all.png')" alt="icon_all" />
    </NuxtLink>
    <div class="h-full w-[calc(100%-93px)]">
      <ul class="hidden h-[50px] sm:h-15 md:h-20 xl:flex xl:gap-[23px]">
        <li
          v-for="topic in mainTopicList"
          :key="topic.label"
          class="w-[353px] overflow-hidden rounded-[8px] hover:border-2 hover:border-white"
          :class="topicSelected === topic.label_en ? 'border-2 border-yellow' : ''"
        >
          <NuxtLink class="relative" :to="topic.route">
            <img
              class="size-full object-cover object-center"
              :src="imageSrc(topic.imgurl)"
              alt="topic-bg"
            />
            <span
              class="text-shorten absolute top-[50%] left-[50%] -translate-[50%] px-2 py-1 text-[16px] backdrop-blur-sm sm:text-[18px]"
              >{{ topic.label }}</span
            >
          </NuxtLink>
        </li>
      </ul>

      <div class="-mr-[20px] xl:hidden">
        <BaseSwiper
          v-bind="topicMenuSwiperConfig"
          class="h-[50px] sm:h-15 md:h-20"
          :items="mainTopicList"
          @ready="onSwiperReady"
        >
          <template #slide="{ item }">
            <div
              class="relative h-[48px] overflow-hidden rounded-[8px] sm:h-[58px] md:h-[78px]"
              :class="topicSelected === item.label_en ? 'border-2 border-yellow' : ''"
            >
              <NuxtLink :to="item.route">
                <img
                  class="size-full object-cover object-center"
                  :src="imageSrc(item.imgurl)"
                  alt="topic-bg"
                />
                <span
                  class="absolute top-[50%] left-[50%] -translate-[50%] px-2 py-1 text-[16px] backdrop-blur-sm sm:text-[18px]"
                  :class="item.label.length > 12 ? 'w-[80%]' : ''"
                  >{{ item.label }}</span
                >
              </NuxtLink>
            </div>
          </template>
        </BaseSwiper>
      </div>
    </div>
  </div>
</template>

<script setup>
const { imageSrc } = getImageSrc()
const props = defineProps({
  topics: {
    type: Array,
    required: true
  },
  topicSelected: {
    type: String,
    required: true
  }
})

const allTopicItem = computed(() => {
  return props.topics.filter((topic) => topic.label_en === 'allTopic')[0]
})

const mainTopicList = computed(() => {
  return props.topics.filter((topic) => topic.label_en !== 'allTopic')
})

const topicMenuSwiperConfig = ref({
  slidesPerView: 1.4,
  spaceBetween: 12,
  breakpoints: {
    480: {
      slidesPerView: 1.6
    },
    640: {
      slidesPerView: 1.8,
      spaceBetween: 24
    },
    1024: {
      slidesPerView: 3
    }
  },
  autoplay: false
})

const onSwiperReady = (swiper) => {
  const topicSelectedIndex = mainTopicList.value.findIndex(
    (topic) => topic.label_en === props.topicSelected
  )
  swiper.slideTo(topicSelectedIndex)
}
</script>

<style lang="scss" scoped></style>
