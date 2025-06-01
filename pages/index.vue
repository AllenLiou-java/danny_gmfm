<template>
  <div>
    <InitScreen :is-closed="isInitScreenClosed" @update-ready-status="onUpdateReadyStatus" />

    <div
      class="nav-space bg-[url(~/assets/images/banner/banner-bg-mobile.jpg)] bg-cover bg-center bg-no-repeat pb-3 sm:bg-[url(~/assets/images/banner/banner-bg.jpg)] sm:pb-8"
    >
      <div
        class="relative container h-[calc(100vh-60px)] sm:h-[calc(100vh-130px)] lg:h-[calc(100vh-80px)]"
      >
        <h2
          v-gsap.from.once="{ opacity: 0, y: 50 }"
          class="relative top-[40%] text-center font-paintinfChoco text-8xl text-yellow sm:top-[50%] sm:text-9xl"
        >
          CTS TRAVEL
        </h2>

        <div
          class="absolute bottom-0 flex w-[calc(100%-40px)] justify-between sm:w-[calc(100%-48px)] lg:w-[calc(100%-40px)] xl:w-[calc(100%-80px)]"
        >
          <div class="flex flex-col-reverse tracking-[5px] sm:flex-col">
            <VisitCountBoard class="sm:mt-4" />
            <ul
              class="mb-4 flex flex-col gap-y-2 sm:mt-7 sm:mb-0 sm:flex-row sm:gap-x-4 md:gap-x-8"
            >
              <li
                v-for="mediaItem in socialMediaList"
                :key="mediaItem.instagram"
                v-gsap.from.once="{ opacity: 0, x: 50 }"
              >
                <a class="" :href="mediaItem.src" target="_blank">
                  <Icon
                    :name="mediaItem.iconName"
                    class="text-[30px] duration-300 hover:scale-125 sm:text-[40px]"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div
            v-gsap.from.once="{ opacity: 0, y: 50 }"
            class="relative mt-16 flex flex-col self-center sm:mt-0 md:flex-row-reverse"
          >
            <p class="mb-1 text-[12px] tracking-widest sm:text-[16px] md:writing-mode-vertical-lr">
              <span class="mr-1 text-[8px] text-yellow md:mb-1">●</span>LATEST&ensp;VIDEO
            </p>
            <NuxtLink :to="`/video/detail/${latest5Video[0].id}`">
              <img
                class="relative h-[65px] w-[120px] rounded-[10px] object-cover duration-300 sm:h-[116px] sm:w-[214px] md:-left-3 md:h-[140px] md:w-[257px] md:hover:scale-109"
                :src="latest5Video[0].cover_image"
                alt="latestVideoImg"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div
      id="destination"
      class="h-full min-h-[506px] w-full bg-[url(~/assets/images/home/destination-bg.png)] bg-cover bg-center bg-no-repeat py-8 md:py-30"
    >
      <h2
        v-gsap.whenVisible.from.once.reversible="{ opacity: 0, y: 100 }"
        class="mb-6 text-center font-paintinfChoco text-[32px] leading-[1] text-yellow sm:mb-15 sm:text-[100px]"
      >
        DESTINATION
      </h2>
      <div
        class="container grid grid-cols-[157px_157px] justify-center gap-6 sm:grid-cols-[240px_240px] sm:gap-12 md:grid-cols-[240px_240px] md:gap-20 xl:grid-cols-[240px_240px_240px_240px]"
      >
        <div
          v-for="destinationItem in destinationList"
          :key="destinationItem.area_en"
          class="group"
        >
          <NuxtLink :to="destinationItem.route">
            <component
              :is="destinationItem.name"
              v-gsap.whenVisible.from.once.reversible="{ opacity: 0, y: 50, scale: 0 }"
              class="h-[157px] w-[157px] cursor-pointer sm:h-[240px] sm:w-[240px]"
            ></component>
            <p
              v-gsap.whenVisible.from.once.reversible="{ opacity: 0, y: 50 }"
              class="mt-2 text-center text-[16px] group-hover:text-yellow sm:text-[24px]"
            >
              {{ destinationItem.area }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="container py-8 md:py-15">
      <h2
        v-gsap.whenVisible.from.once.reversible="{ opacity: 0, x: -100 }"
        class="mb-6 font-paintinfChoco text-[32px] leading-[1] text-yellow sm:mb-15 sm:text-[100px]"
      >
        TOPICS
      </h2>
      <ul v-gsap.whenVisible.from.once.reversible="{ opacity: 0, y: 50 }" class="hidden lg:flex">
        <li
          v-for="topicItem in topicList"
          :key="topicItem.label_en"
          class="black_overlay overflow-hidden rounded-[5px] duration-300 hover:z-10 hover:scale-[1.15]"
        >
          <NuxtLink class="relative" :to="topicItem.route">
            <div class="relative">
              <img
                class="h-full max-h-[460px] object-cover"
                :src="imageSrc(topicItem.imgurl)"
                :alt="topicItem.label_en"
              />
              <div class="img-shadow absolute bottom-0 size-full" />
            </div>

            <span
              v-gsap.whenVisible.from.once.reversible="{ opacity: 0, y: -20 }"
              class="text-shorten absolute bottom-8 left-[50%] max-w-60 -translate-x-[50%] px-6"
              >{{ topicItem.label }}</span
            >
          </NuxtLink>
        </li>
      </ul>

      <div v-gsap.whenVisible.from.once.reversible="{ opacity: 0, y: 50 }" class="lg:hidden">
        <Swiper class="-mr-5 sm:-mr-6" v-bind="topicSwiperConfig">
          <SwiperSlide
            v-for="topicItem in topicList"
            :key="topicItem.label_en"
            class="overflow-hidden rounded-[8px]"
          >
            <NuxtLink :to="topicItem.route">
              <div class="relative">
                <div class="relative">
                  <img
                    class="h-full w-full object-cover"
                    :src="imageSrc(topicItem.imgurl)"
                    :alt="topicItem.label_en"
                  />
                  <div class="img-shadow absolute bottom-0 size-full" />
                </div>

                <p
                  v-gsap.whenVisible.from.once.reversible="{ opacity: 0, y: -20 }"
                  class="text-shorten absolute bottom-3 w-full px-2 text-center"
                >
                  {{ topicItem.label }}
                </p>
              </div>
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <div
      class="bg-cover bg-center bg-no-repeat py-8 md:bg-[url(~/assets/images/home/video-bg.png)] md:bg-center md:py-15"
    >
      <h2
        v-gsap.whenVisible.from.once.reversible="{ opacity: 0, y: 50 }"
        class="mb-6 text-center font-paintinfChoco text-[32px] leading-[1] text-yellow sm:mb-15 sm:text-[100px]"
      >
        VIDEO
      </h2>
      <div class="relative container">
        <ul class="mb-6 grid grid-cols-6 gap-5 lg:mb-8">
          <li
            v-for="videoItem in latest5Video"
            :key="videoItem.id"
            v-gsap.whenVisible.from.once.reversible="{ opacity: 0, scale: 0 }"
            class="group relative col-span-6 shadow-[2px_4px_20px_0_rgba(0,0,0,0.5)] md:col-span-3 lg:col-span-2 lg:nth-1:col-span-3 lg:nth-2:col-span-3"
          >
            <NuxtLink :to="`/video/detail/${videoItem.id}`">
              <div
                class="relative overflow-hidden rounded-[8px] duration-300 group-hover:scale-105"
              >
                <img
                  class="h-full w-full object-cover object-center"
                  :src="videoItem.cover_image"
                  alt="cover-img"
                />
                <div class="img-shadow absolute bottom-0 size-full" />
              </div>

              <span class="text-shorten absolute bottom-0 w-full p-3">{{ videoItem.title }}</span>
            </NuxtLink>
          </li>
        </ul>
        <NuxtLink
          class="relative left-[100%] inline-block -translate-x-[100%] rounded-[5px] border border-solid px-5 py-1 hover:border-yellow hover:text-yellow md:px-7 md:py-2"
          to="/video/allTopic?page=1"
          >更多影片</NuxtLink
        >
      </div>
    </div>
    <div
      class="bg-[url(~/assets/images/home/good-stuff-bg-mobile.png)] bg-cover bg-center bg-no-repeat py-8 md:bg-[url(~/assets/images/home/good-stuff-bg.png)] md:py-15"
    >
      <div id="goodstuff" class="container">
        <h2
          v-gsap.whenVisible.from.once.reversible="{ opacity: 0, x: -100 }"
          class="mb-6 text-right font-paintinfChoco text-[32px] leading-[1] text-yellow sm:mb-15 sm:text-[100px]"
        >
          GOOD STUFF
        </h2>
        <ul
          v-gsap.whenVisible.from.once.reversible="{ opacity: 0, y: 50 }"
          class="mb-6 hidden grid-cols-3 gap-15 lg:mb-8 lg:grid"
        >
          <li
            v-for="productItem in latest3Product"
            :key="productItem.id"
            class="overflow-hidden rounded-xl shadow-[2px_4px_20px_0_rgba(0,0,0,0.5)] duration-300 hover:scale-109"
          >
            <NuxtLink :to="`/goodStuff/detail/${productItem.id}`" class="block">
              <div class="relative">
                <img
                  class="h-full w-full object-cover object-center md:max-h-[330px] md:max-w-[360px]"
                  :src="productItem.cover_image"
                  alt="cover-img"
                />
                <div class="img-shadow absolute bottom-0 size-full" />
              </div>

              <div class="bg-primary">
                <p class="mb-2 h-[84px] px-5 pt-5 text-[14px] leading-8 md:text-[16px]">
                  {{ productItem.name }}
                </p>

                <span
                  class="block px-5 pb-5 text-right text-[16px] font-medium text-yellow md:text-[18px]"
                  >查看更多>></span
                >
              </div>
            </NuxtLink>
          </li>
        </ul>

        <div
          v-gsap.whenVisible.from.once.reversible="{ opacity: 0, y: 50 }"
          class="-mr-5 lg:hidden"
        >
          <Swiper
            class="-mr-5 mb-4 min-h-[332px] sm:-mr-6"
            :pagination="true"
            v-bind="goodstuffSwiperConfig"
          >
            <SwiperSlide
              v-for="productItem in latest3Product"
              :key="productItem.id"
              class="w-[255px] overflow-hidden rounded-[5px] shadow-[2px_4px_20px_0_rgba(0,0,0,0.5)]"
            >
              <NuxtLink :to="`/goodStuff/detail/${productItem.id}`">
                <img
                  class="min-h-[234px] w-full object-cover object-center"
                  :src="productItem.cover_image"
                  alt="cover-img"
                />
                <div class="bg-primary">
                  <p class="text-shorten mb-3 px-3 pt-3 text-[14px] leading-8">
                    {{ productItem.name }}
                  </p>

                  <span class="block px-3 pb-3 text-right text-[16px] font-medium text-yellow"
                    >查看更多>></span
                  >
                </div>
              </NuxtLink>
            </SwiperSlide>
          </Swiper>
        </div>
        <NuxtLink
          class="relative left-[100%] inline-block -translate-x-[100%] rounded-[5px] border border-solid px-5 py-1 hover:border-yellow hover:text-yellow md:px-7 md:py-2"
          to="/goodStuff/outdoor/all?page=1"
          >更多好物</NuxtLink
        >
      </div>
    </div>
    <div class="container py-8 md:py-15">
      <h2
        v-gsap.whenVisible.from.once.reversible="{ opacity: 0, y: 50 }"
        class="mb-6 text-center font-paintinfChoco text-[32px] leading-[1] text-yellow sm:mb-15 sm:text-[100px]"
      >
        FRIENDS
      </h2>
      <ul
        v-gsap.whenVisible.from.once.reversible="{ opacity: 0, x: -50 }"
        class="mb-6 hidden flex-wrap gap-10 md:gap-15 md:px-16 lg:flex xl:gap-20"
      >
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

      <div v-gsap.whenVisible.from.once.reversible="{ opacity: 0, x: -50 }" class="-mr-5 lg:hidden">
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

    <Subscribe />
  </div>
</template>

<script setup>
import { useModal } from 'vue-final-modal'
import SubscribeModal from '@/components/SubscribeModal.vue'

useHead({
  title: '首頁'
})

const { imageSrc } = getImageSrc()

const videoStore = useVideoStore()
const { latest5Video } = storeToRefs(videoStore)

const productStore = useProductStore()
const { latest3Product } = storeToRefs(productStore)

const commonStore = useCommonStore()
const { cooperationList, isInitScreenClosed } = storeToRefs(commonStore)

await callOnce(async () => {
  await videoStore.getLatest5Video()
  await productStore.getLatest3Product()
  await commonStore.getCooperationList()
})

const socialMediaList = ref([
  {
    linkType: 'instagram',
    iconName: 'my-icon:ig',
    src: 'https://www.instagram.com/danny_gmfm/'
  },
  {
    linkType: 'youtube',
    iconName: 'my-icon:yt',
    src: 'https://www.youtube.com/channel/UCO5Jf1xYlqpLA341Zkr2Zwg/videos'
  },
  {
    linkType: 'facebook',
    iconName: 'my-icon:fb',
    src: 'https://www.facebook.com/DannyGMFM/'
  },
  {
    linkType: 'spotify',
    iconName: 'my-icon:spotify',
    src: 'https://open.spotify.com/playlist/2SoggYFTOblpi4WlMNSnXm?si=Ei6_PWQBTN-H03K3QhMwzA&nd=1'
  },

  {
    linkType: 'google_drive',
    iconName: 'my-icon:google',
    src: '#'
  }
])

const AreaNorth = resolveComponent('AreaNorth')
const AreaMiddle = resolveComponent('AreaMiddle')
const AreaSouth = resolveComponent('AreaSouth')
const AreaEast = resolveComponent('AreaEast')

const destinationList = [
  {
    area: '北部',
    area_en: 'north',
    route: '/video/allTopic/north?page=1',
    name: AreaNorth
  },
  {
    area: '中部',
    area_en: 'middle',
    route: '/video/allTopic/middle?page=1',
    name: AreaMiddle
  },
  {
    area: '南部',
    area_en: 'south',
    route: '/video/allTopic/south?page=1',
    name: AreaSouth
  },
  {
    area: '東部',
    area_en: 'east',
    route: '/video/allTopic/east?page=1',
    name: AreaEast
  }
]

const topicList = [
  {
    label: '台灣百岳',
    label_en: 'top_mountains_tw',
    route: '/video/top_mountains_tw/north?page=1',
    imgurl: '/home/topic/1.png'
  },
  {
    label: '中級山/郊山步道/野營/野溪溫泉',
    label_en: 'outdoor_spot',
    route: '/video/outdoor_spot/north?page=1',
    imgurl: '/home/topic/2.png'
  },
  {
    label: '相關主題',
    label_en: 'related_topic',
    route: '/video/related_topic/device_evaluation?page=1',
    imgurl: '/home/topic/3.jpg'
  },
  {
    label: '戶外裝備',
    label_en: 'goodStuff_outdoor',
    route: '/goodStuff/outdoor/all',
    imgurl: '/home/topic/4.jpg'
  },
  {
    label: '拍攝裝備',
    label_en: 'goodStuff_photography',
    route: '/goodStuff/photography/all',
    imgurl: '/home/topic/5.jpg'
  }
]

const topicSwiperConfig = {
  modules: [SwiperNavigation],
  slidesPerView: 2.3,
  spaceBetween: 0,
  breakpoints: {
    545: {
      slidesPerView: 3.4
    },
    768: {
      slidesPerView: 4.3
    }
  }
}

const goodstuffSwiperConfig = {
  modules: [SwiperPagination],
  slidesPerView: 1.2,
  spaceBetween: 24,
  breakpoints: {
    545: {
      slidesPerView: 2.4
    },
    768: {
      slidesPerView: 3
    }
  }
}

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

const { open, close } = useModal({
  component: SubscribeModal,
  attrs: {
    title: 'SUBSCRIBE',
    clickToClose: false,
    contentTransition: 'vfm-slide-up',
    onCloseModal() {
      close()
    }
  }
})

const triggerSubscribeModal = () => {
  const destination = document.getElementById('destination')
  const options = {
    threshold: [0.8]
  }
  const onIntersection = (entries) => {
    if (entries[0].isIntersecting) {
      if (!sessionStorage.getItem('subscribeModalShowed')) {
        open()
        sessionStorage.setItem('subscribeModalShowed', true)
      }
    }
  }
  const observer = new IntersectionObserver(onIntersection, options)
  observer.observe(destination)
}

const { lockScroll } = scrollTool()

const onUpdateReadyStatus = (status) => {
  commonStore.$patch({
    isInitScreenClosed: status
  })
}

onBeforeMount(() => {
  lockScroll()
})
onMounted(() => {
  triggerSubscribeModal()
})
</script>

<style scoped>
.black_overlay {
  box-shadow: 4px 8px 12px 0 rgba(0, 0, 0, 0.3);
  background-image: linear-gradient(
    to bottom,
    rgba(11, 18, 21, 0),
    rgba(11, 18, 21, 0) 64%,
    rgba(11, 18, 21, 0.5) 79%,
    #0b1215 97%
  );
}

#goodstuff::v-deep(.swiper-wrapper) {
  padding-bottom: 48px;
}
::v-deep(.swiper-pagination-bullet) {
  background-color: #85888a;
}
::v-deep(.swiper-pagination-bullet-active) {
  background-color: #fbff9e;
}
</style>
