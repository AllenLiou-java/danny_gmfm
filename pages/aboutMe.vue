<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="nav-space min-h-[100vh]">
    <div class="container mb-16 md:mb-30">
      <div class="relative top-7 mb-14">
        <div
          class="pointer-events-none absolute top-[30%] left-[50%] z-20 w-full -translate-x-[50%] text-center font-paintinfChoco text-[40px] leading-[1] text-yellow sm:top-24 sm:pl-10 sm:text-start sm:text-[80px] lg:pl-44 lg:text-[100px]"
        >
          <p class="mb-4 sm:mb-9">YOUTUBER</p>
          <p class="mb-4 sm:mb-11 sm:-ml-7">ADVENTURER</p>
          <p class="sm:-ml-11">PHOTOGRAPHER</p>
        </div>

        <div
          class="group relative left-[50%] inline-block max-w-[686px] -translate-x-[50%] bg-[url(~/assets/images/aboutMe/aboutMe-bg.png)] bg-contain bg-left bg-no-repeat pt-[12%] pr-[12%] sm:pt-[73px] sm:pr-[76px]"
        >
          <img
            class="invisible box-content w-full max-w-[588px] object-contain group-hover:visible"
            :src="imageSrc('/aboutMe/aboutMe.png')"
            alt="aboutMe"
          />
        </div>
      </div>

      <div class="text-[12px] tracking-[5px] sm:mt-4 sm:text-[16px]">
        <p>本日人氣：1000</p>
        <p>累積人氣：5367801</p>
      </div>
    </div>
    <div
      class="container mb-16 flex max-w-[900px] flex-col items-center justify-center md:mb-30 lg:flex-row lg:justify-between"
    >
      <div class="mb-16 text-center font-paintinfChoco text-[100px] lg:mb-0">
        <p>Who</p>
        <p>is</p>
        <p>Danny?</p>
      </div>
      <ul class="flex flex-col items-start justify-center gap-y-4 md:gap-y-10">
        <li
          v-for="(tag, idx) in tagList"
          :key="idx"
          class="rounded-full bg-yellow px-4 py-1 text-[16px] text-primary md:px-8 md:py-[7px] md:text-[24px]"
        >
          {{ tag }}
        </li>
      </ul>
    </div>
    <div class="relative mb-16 md:mb-30">
      <img
        class="absolute top-20 w-full max-w-[600px] pr-23 pl-5 md:top-14 md:max-w-[773px] md:pl-0"
        :src="imageSrc('/aboutMe/aboutMe-bg.png')"
        alt="aboutMe"
      />
      <div class="relative container pl-[35%] sm:pl-[20%] md:pl-[40%]">
        <div
          class="relative left-[100%] w-full max-w-175 -translate-x-[100%] text-[14px] sm:text-[16px] md:text-[24px]"
        >
          <span
            >我是<span class="px-2 font-paintinfChoco text-[32px] text-yellow">Danny</span></span
          >
          <span v-html="introduction"></span>
          <div class="relative">
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
        class="mb-8 text-center font-paintinfChoco text-[32px] leading-[1] text-yellow sm:mb-15 sm:text-[100px]"
      >
        RECORD
      </h2>
      <div>
        <ul class="mb-16 flex items-center justify-center gap-20 leading-[1.5] sm:gap-69 md:mb-20">
          <li class="text-center">
            <p class="text-[32px] font-black text-yellow sm:text-[100px]">
              {{ mountainCount.inTaiwan }}
            </p>
            <p class="md:text-[24px]">台灣百岳</p>
          </li>
          <li class="text-center">
            <p class="text-[32px] font-black text-yellow sm:text-[100px]">
              {{ mountainCount.overseas }}
            </p>
            <p>海外登山</p>
          </li>
        </ul>
        <RecordTree :mountain-list="mountainList" />
      </div>
    </div>
    <div class="container mb-16 md:mb-30">
      <h2
        class="mb-8 text-center font-paintinfChoco text-[32px] leading-[1] text-yellow sm:mb-15 sm:text-[100px]"
      >
        SOCIAL MEDIA
      </h2>
      <div
        class="mx-auto mb-10 grid max-w-[900px] grid-cols-1 gap-y-3 sm:mb-11 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-8"
      >
        <div v-for="item in socialMediaList" :key="item.linkType">
          <a class="whitespace-nowrap" :href="item.src" target="_blank">
            <Icon :name="item.iconName" class="mr-3 align-middle text-[30px] md:text-[40px]" />
            <span class="text-[14px] sm:text-[18px]">{{ item.name }}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="container mb-16 md:mb-15">
      <h2
        class="mb-6 text-center font-paintinfChoco text-[32px] leading-[1] text-yellow sm:mb-15 sm:text-[100px]"
      >
        FRIENDS
      </h2>
      <ul class="hidden flex-wrap gap-10 md:gap-15 md:px-16 lg:flex xl:gap-20">
        <li
          v-for="cooperationItem in cooperationList"
          :key="cooperationItem.name"
          class="group relative overflow-hidden rounded-xl"
        >
          <img
            class="max-w-[150px] rounded-full object-cover"
            :src="cooperationItem.logo[0].url"
            alt="cooperationLogo"
          />
        </li>
      </ul>

      <div class="-mr-5 lg:hidden">
        <Swiper class="mb-4" v-bind="friendSwiperConfig">
          <SwiperSlide
            v-for="cooperationItem in cooperationList"
            :key="cooperationItem.name"
            class="group relative overflow-hidden rounded-xl"
          >
            <img
              class="h-full w-full rounded-full object-cover"
              :src="cooperationItem.logo[0].url"
              alt="cooperationLogo"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <div
      class="min-h-[410px] bg-[url(~/assets/images/home/subscribe/desktop.png)] bg-cover bg-bottom py-8 sm:min-h-[700px] sm:py-12 md:py-15"
    >
      <div class="container">
        <h2
          class="mb-6 text-center font-paintinfChoco text-[32px] leading-[1] text-white sm:mb-8 sm:text-[100px] md:text-[130px]"
        >
          SUSCRIBE
        </h2>
        <form
          class="mb-6 flex flex-col items-center justify-center gap-3 md:flex-row"
          action=""
          @submit.prevent="onSubmit"
        >
          <input
            class="w-full rounded-[5px] bg-white px-3 py-3 text-[16px] text-primary outline-primary placeholder:opacity-30 md:w-[168px] md:px-6 md:py-4 md:text-[18px]"
            type="text"
            name="userName"
            placeholder="姓名"
          />
          <input
            class="w-full rounded-[5px] bg-white px-3 py-3 text-[16px] text-primary outline-primary placeholder:opacity-30 md:w-[352px] md:px-6 md:py-4 md:text-[18px]"
            type="email"
            name="userEmail"
            placeholder="E-mail"
          />
          <button
            type="submit"
            class="self-end rounded-[5px] bg-yellow px-6 py-4 text-[14px] text-primary hover:bg-[#ffe145] md:px-9 md:text-[18px]"
          >
            訂閱
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { socialMediaList } from '@/assets/js/common'
const { imageSrc } = getImageSrc()
const { data: aboutMeInfo } = await useFetch('/api/airtable/aboutMe')
const { data: mountainList } = await useFetch('/api/airtable/mountainHistory')
const { data: cooperationList } = await useFetch('/api/airtable/cooperation')

const mountainCount = computed(() => {
  return mountainList.value.reduce(
    (acc, item) => {
      const rankNo = Number(item.topMountain_rank_no)
      if (rankNo > 0) {
        acc.inTaiwan++
      } else {
        acc.overseas++
      }
      return acc
    },
    { inTaiwan: 0, overseas: 0 }
  )
})

const introduction = computed(() => {
  return aboutMeInfo.value
    .filter((item) => item.type === 'introduction')[0]
    ?.content.replace(/\n/g, '</br>')
})

const tagList = computed(() => {
  return aboutMeInfo.value.filter((item) => item.type === 'tag')[0]?.content.split('；')
})

const friendSwiperConfig = {
  modules: [SwiperPagination],
  slidesPerView: 2.8,
  spaceBetween: 42,
  breakpoints: {
    545: {
      slidesPerView: 3.7
    },
    768: {
      slidesPerView: 4.7
    }
  }
}

const onSubmit = (event) => {
  console.log('SUSCRIBE')
}
</script>

<style lang="scss" scoped></style>
