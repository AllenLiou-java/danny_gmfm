<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="nav-space min-h-[100vh]">
    <div class="container mb-16 md:mb-30">
      <div class="relative top-7 mb-14">
        <div
          class="group relative left-[50%] inline-block max-w-[686px] -translate-x-[50%] bg-[url(~/assets/images/aboutMe/aboutMe-bg.png)] bg-contain bg-left bg-no-repeat pt-[12%] pr-[12%] sm:pt-[73px] sm:pr-[76px]"
        >
          <img
            class="invisible box-content w-full max-w-[588px] object-contain duration-300 group-hover:visible"
            :src="imageSrc('/aboutMe/aboutMe.png')"
            alt="aboutMe"
          />
          <div
            v-gsap.timeline
            class="pointer-events-none absolute top-[30%] left-[50%] -z-20 w-full -translate-x-[50%] text-center font-paintinfChoco text-[40px] leading-[1] text-yellow sm:top-24 sm:pl-10 sm:text-start sm:text-[80px] lg:left-0 lg:pl-44 lg:text-[100px]"
          >
            <p v-gsap.add.from="{ opacity: 0, y: 50 }" class="mb-4 sm:mb-9">YOUTUBER</p>
            <p v-gsap.add.from="{ opacity: 0, y: 50 }" class="mb-4 sm:mb-11 sm:-ml-7">ADVENTURER</p>
            <p v-gsap.add.from="{ opacity: 0, y: 50 }" class="sm:-ml-11">PHOTOGRAPHER</p>
          </div>
        </div>
      </div>

      <VisitCountBoard class="sm:mt-4" />
    </div>
    <div
      class="container mb-16 flex max-w-[900px] flex-col items-center justify-center md:mb-30 lg:flex-row lg:justify-between"
    >
      <div
        v-gsap.whenVisible.from.once="{ opacity: 0, y: 50 }"
        class="mb-16 text-center font-paintinfChoco text-[100px] leading-[100px] lg:mb-0 lg:leading-[150px]"
      >
        <p>Who</p>
        <p>is</p>
        <p>Danny?</p>
      </div>
      <ul class="flex flex-col items-start justify-center gap-y-4 md:gap-y-10">
        <li
          v-for="(tag, idx) in tagList"
          :key="idx"
          v-gsap.whenVisible.from.once.delay-500="{ opacity: 0, x: '-30%' }"
          class="rounded-full bg-yellow px-4 py-1 text-[16px] text-primary md:px-8 md:py-[7px] md:text-[24px]"
        >
          <span>{{ tag }}</span>
        </li>
      </ul>
    </div>
    <div class="relative mb-16 md:mb-30">
      <img
        v-gsap.whenVisible.from="{ opacity: 0, x: '-60%' }"
        class="absolute top-20 w-full max-w-[600px] pr-23 pl-5 md:top-14 md:max-w-[773px] md:pl-0"
        :src="imageSrc('/aboutMe/aboutMe-bg.png')"
        alt="aboutMe"
      />
      <div class="relative container pl-[35%] sm:pl-[20%] md:pl-[40%]">
        <div
          class="relative left-[100%] w-full max-w-175 -translate-x-[100%] text-[14px] sm:text-[16px] md:text-[24px]"
        >
          <div v-gsap.whenVisible.from="{ opacity: 0, y: '50%' }">
            <span
              >我是<span class="px-2 font-paintinfChoco text-[32px] text-yellow">Danny</span></span
            >
            <span v-html="introduction"></span>
          </div>

          <div v-gsap.whenVisible.from="{ opacity: 0, y: '50%' }" class="relative">
            <span
              class="my-6 block text-center font-paintinfChoco text-[40px] leading-[1] text-yellow md:text-[60px]"
              >3E</span
            >
            <ul
              class="relative left-[50%] mb-11 inline-block -translate-x-[50%] text-[16px] md:text-[24px]"
            >
              <li>
                <span class="mr-6 font-paintinfChoco text-yellow">EXPERIENCE</span
                >以直觀性的體驗精神紀錄過程
              </li>
              <li>
                <span class="mr-6 font-paintinfChoco text-yellow">EXPLORE</span
                >以旅行者的好奇心來探索世界
              </li>
              <li>
                <span class="mr-6 font-paintinfChoco text-yellow">ENJOY</span
                >以敞開的心胸享受當下的美好
              </li>
            </ul>
            <span class="block"
              >3E是我對創作影音的初衷，並於YouTube和Instagram 將會分享我對大自然的經歷。</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-16 md:mb-30">
      <h2
        v-gsap.whenVisible.from.once="{ opacity: 0, y: 50 }"
        class="mb-8 text-center font-paintinfChoco text-[32px] leading-[1] text-yellow sm:mb-15 sm:text-[100px]"
      >
        RECORD
      </h2>
      <div>
        <ul class="mb-16 flex items-center justify-center gap-20 leading-[1.5] sm:gap-69 md:mb-20">
          <li class="text-center">
            <p
              v-gsap.whenVisible.from.once="{ opacity: 0, x: '-100%' }"
              class="text-[32px] font-black text-yellow sm:text-[100px]"
            >
              {{ mountainCount.inTaiwan }}
            </p>
            <p v-gsap.whenVisible.from.once="{ opacity: 0, x: '-100%' }" class="md:text-[24px]">
              台灣百岳
            </p>
          </li>
          <li class="text-center">
            <p
              v-gsap.whenVisible.from.once="{ opacity: 0, x: '100%' }"
              class="text-[32px] font-black text-yellow sm:text-[100px]"
            >
              {{ mountainCount.overseas }}
            </p>
            <p v-gsap.whenVisible.from.once="{ opacity: 0, x: '100%' }" class="md:text-[24px]">
              海外登山
            </p>
          </li>
        </ul>
        <RecordTree :mountain-list="mountainList" />
      </div>
    </div>
    <div class="container mb-16 md:mb-30">
      <h2
        v-gsap.whenVisible.from.once="{ opacity: 0, y: 50 }"
        class="mb-8 text-center font-paintinfChoco text-[32px] leading-[1] text-yellow sm:mb-15 sm:text-[100px]"
      >
        SOCIAL MEDIA
      </h2>
      <div
        class="mx-auto mb-10 grid max-w-[900px] grid-cols-1 gap-y-3 sm:mb-11 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-8"
      >
        <div
          v-for="item in socialMediaList"
          :key="item.linkType"
          v-gsap.whenVisible.from.once="{ opacity: 0, y: 50 }"
        >
          <a class="whitespace-nowrap" :href="item.src" target="_blank">
            <Icon :name="item.iconName" class="mr-3 align-middle text-[30px] md:text-[40px]" />
            <span class="text-[14px] sm:text-[18px]">{{ item.name }}</span>
          </a>
        </div>
      </div>
    </div>

    <FriendList class="container" :cooperation-list="cooperationList" />
    <Subscribe />
  </div>
</template>

<script setup>
import { socialMediaList } from '@/assets/js/common'
const { imageSrc } = getImageSrc()

useSeoMeta({
  title: '關於我',
  ogTitle: '關於我 - 秋天剩旅行｜Danny_GMFM 山岳影像創作者',
  description:
    '我是Danny，喜愛登山健行的大男孩。一個來自高山密度最高的島嶼之一台灣，也是登山最佳的練習場。在過去的幾年中，我持續地登山、潛水、旅遊並將這些珍貴的紀錄利用影音的方式記錄下來。',
  ogDescription:
    '我是Danny，喜愛登山健行的大男孩。一個來自高山密度最高的島嶼之一台灣，也是登山最佳的練習場。在過去的幾年中，我持續地登山、潛水、旅遊並將這些珍貴的紀錄利用影音的方式記錄下來。'
})

const aboutMeStore = useAboutMeStore()
const commonStore = useCommonStore()

await callOnce(async () => {
  await aboutMeStore.getInitInfo()
  await commonStore.getCooperationList()
})

const { mountainList, mountainCount, introduction, tagList } = storeToRefs(useAboutMeStore())
const { cooperationList } = storeToRefs(useCommonStore())
</script>

<style lang="scss" scoped></style>
