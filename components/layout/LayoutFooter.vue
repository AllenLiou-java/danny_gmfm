<template>
  <div class="flex flex-col items-center justify-center bg-[#1d2327] pt-10 pb-5">
    <img class="mb-8 size-20 md:size-25" :src="imageSrc('/logo.svg')" alt="logo" />
    <div class="mb-10 grid grid-cols-1 gap-y-3 sm:mb-11 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-8">
      <div v-for="item in socialMediaList" :key="item.linkType">
        <a class="whitespace-nowrap" :href="item.src" target="_blank">
          <Icon :name="item.iconName" class="mr-3 align-middle text-[30px] md:text-[40px]" />
          <span class="text-[14px] sm:text-[18px]">{{ item.name }}</span>
        </a>
      </div>
    </div>
    <span class="text-[10px] sm:text-[14px]"
      >秋天剩旅行 CTS.TRAVEL 版權所有 © CTS.TRAVEL All Rights Reserved.</span
    >
  </div>
</template>

<script setup>
import { socialMediaList } from '@/assets/js/common'
const { imageSrc } = getImageSrc()
</script>

<style lang="scss" scoped></style>
