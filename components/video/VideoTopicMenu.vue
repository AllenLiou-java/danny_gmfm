<template>
  <div class="flex gap-[23px]">
    <NuxtLink to="/video/all">
      <div
        :class="topicSelected === 'all' ? 'border border-yellow' : ''"
        class="flex flex-col items-center justify-center rounded-[5px] bg-[#1c2428] px-[6px] py-2 sm:px-4 sm:py-[22px]"
      >
        <span class="mb-1 inline-block text-[18px] tracking-[5.25px]">All</span>
        <img class="ml-2 w-[22px]" :src="imageSrc('/video/icon_all.png')" alt="icon_all" />
      </div>
    </NuxtLink>
    <ul class="flex gap-[23px]">
      <li
        v-for="topic in topics"
        :key="topic.label"
        class="relative overflow-hidden rounded-[5px]"
        :class="topicSelected === topic.label_en ? 'border border-yellow' : ''"
      >
        <NuxtLink :to="topic.route">
          <img
            class="h-20 object-cover object-center"
            :src="imageSrc(topic.imgurl)"
            alt="topic-bg"
          />
          <span
            class="absolute top-[50%] left-[50%] -translate-[50%] overflow-hidden px-2 py-1 text-[16px] text-nowrap text-ellipsis backdrop-blur-sm sm:text-[18px]"
            >{{ topic.label }}</span
          >
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { imageSrc } = getImageSrc()
defineProps({
  topics: {
    type: Array,
    required: true
  },
  topicSelected: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
