<template>
  <div>
    <img
      class="max-h-[800px] w-full object-cover object-top"
      :src="videoDetail.cover_image"
      alt="cover_image"
    />
    <div
      class="container flex flex-col justify-between pt-4 tracking-[3.5px] sm:pt-8 sm:tracking-[4.67px] lg:gap-x-12 xl:flex-row"
    >
      <div class="mx-auto w-full lg:max-w-[850px]">
        <BreadCrumb
          :bigcategory="bigcategoryRoute"
          :smallcategory="smallcategoryRoute"
          :title="videoDetail.title"
          class="mb-6 text-[12px] md:mb-8 md:text-[16px]"
        />
        <div class="relative mb-[25px] md:mb-12">
          <h2 class="text-[16px] tracking-[4.67px] sm:text-[32px] sm:tracking-[9.33px]">
            {{ videoDetail.title }}
          </h2>

          <div class="absolute top-[calc(100%+8px)] h-[1px] w-full bg-[#54595b] md:top-12"></div>
        </div>

        <YoutubeScreen :video-id="videoDetail.v_id" />

        <p
          class="mb-8 font-notoSansTC text-[14px] tracking-[4.08px] break-all whitespace-pre-wrap sm:text-[16px] sm:tracking-[4.67px]"
        >
          {{ videoDetail.content }}
        </p>

        <div v-if="relatedVideoList !== null">
          <p class="mb-4 sm:border-b sm:border-[#54595b] sm:pb-2">
            <img
              class="hidden w-[257px] sm:block"
              :src="imageSrc('/video/font-related-post.png')"
              alt="font_img"
            />
            <img
              class="w-[206px] sm:hidden"
              :src="imageSrc('/video/font-related-post-mobile.png')"
              alt="font_img"
            />
          </p>

          <div class="relative">
            <ClientOnly>
              <BaseSwiper
                id="relatedPost"
                class=""
                :items="relatedVideoList"
                v-bind="relatedVideoSwiperConfig"
              >
                <template #slide="{ item }">
                  <div
                    class="overflow-hidden rounded-[5px] shadow-[2px_4px_20px_0_rgba(0,0,0,0.5)]"
                  >
                    <NuxtLink :to="`/video/detail/${item.id}`">
                      <div class="relative">
                        <img
                          class="max-h-[185px] w-full object-cover object-center sm:max-h-[214px]"
                          :src="item.cover_image"
                          alt="cover_img"
                        />
                        <p class="text-shorten absolute bottom-0 w-full px-3 pb-3 backdrop-blur-md">
                          {{ item.title }}
                        </p>
                      </div>
                    </NuxtLink>
                  </div>
                </template>

                <!-- 自訂左右箭頭 -->
                <template #navigation-prev>
                  <button
                    class="swiper-prev absolute top-[calc(50%-21px)] -left-4 z-10 hidden h-10 w-10 -translate-y-[50%] cursor-pointer bg-[url(~/assets/images/video/btn-left.png)] bg-cover bg-center md:block"
                  />
                </template>
                <template #navigation-next>
                  <button
                    class="swiper-next absolute top-[calc(50%-21px)] -right-4 z-10 hidden h-10 w-10 -translate-y-[50%] cursor-pointer bg-[url(~/assets/images/video/btn-right.png)] bg-cover bg-center md:block"
                  />
                </template>

                <!-- 自訂 pagination 樣式 -->
                <template #pagination>
                  <div class="swiper-pagination md:hidden" />
                </template>
              </BaseSwiper>
            </ClientOnly>
          </div>
        </div>
      </div>
      <div class="mx-auto w-full max-w-[850px] xl:w-[290px]">
        <div class="flex flex-col-reverse gap-6 pt-8 xl:block xl:pt-19">
          <div class="max-w-[335px]">
            <p class="mb-4 border-b border-[#54595b] pb-2">關於我</p>
            <img
              class="mx-auto mb-4 h-[290px] w-[290px] object-cover object-center"
              :src="imageSrc('/aboutMe/aboutMe.png')"
              alt="aboutMe_img"
            />
            <ul class="flex-center mb-8 gap-x-5 sm:flex-row md:gap-x-[22px]">
              <li v-for="mediaItem in filteredSocialMediaList" :key="mediaItem.instagram">
                <a class="" :href="mediaItem.src" target="_blank">
                  <Icon
                    :name="mediaItem.iconName"
                    class="text-[30px] duration-300 hover:scale-125 sm:text-[40px]"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div v-if="relatedProductList !== null" class="">
            <p class="mb-4 border-b border-[#54595b] pb-2">好物推薦</p>
            <div>
              <ClientOnly>
                <BaseSwiper
                  id="goodstuff"
                  class="-mr-5 mb-4 min-h-[332px] sm:-mr-6"
                  :items="relatedProductList"
                  v-bind="goodstuffSwiperConfig"
                >
                  <template #slide="{ item }">
                    <div
                      class="overflow-hidden rounded-[5px] shadow-[2px_4px_20px_0_rgba(0,0,0,0.5)]"
                    >
                      <NuxtLink :to="`/goodStuff/detail/${item.id}`">
                        <img
                          class="max-h-[266px] w-full object-cover object-center"
                          :src="item.cover_image"
                          alt="cover-img"
                        />
                        <div class="bg-primary tracking-[0]">
                          <p class="text-shorten mb-1 px-4 pt-4 text-[14px] leading-8 tracking-[0]">
                            {{ item.name }}
                          </p>

                          <span
                            class="block px-3 pb-1 text-right text-[16px] font-medium text-yellow"
                            >查看更多>></span
                          >
                        </div>
                      </NuxtLink>
                    </div>
                  </template>

                  <!-- 自訂 pagination 樣式 -->
                  <template #pagination>
                    <div class="swiper-pagination" />
                  </template>
                </BaseSwiper>
              </ClientOnly>
            </div>
          </div>
        </div>

        <div class="mb-8 tracking-[4.67px]">
          <p class="mb-4 border-b border-[#54595b] pb-2">人氣</p>
          <VisitCountBoard />
        </div>
      </div>
    </div>
    <Subscribe />
  </div>
</template>

<script setup>
import { socialMediaList } from '@/assets/js/common'

const route = useRoute()
const { imageSrc } = getImageSrc()
const { videos, codeVideoBigcategoryList, codeVideoSmallcategoryList } =
  storeToRefs(useVideoStore())

const { data: videoDetail } = await useAsyncData('videoDetail', () => {
  const vid = route.params.vid
  const video = videos.value.filter((video) => video.id === vid)
  if (video.length > 0) {
    return video[0]
  } else {
    return $fetch('/api/airtable/videoById', {
      method: 'post',
      body: {
        id: route.params.vid
      }
    })
  }
})

useSeoMeta({
  title: () => `${videoDetail.value.title}`,
  ogTitle: () => `${videoDetail.value.title}`,
  description: `${videoDetail.value.content}`,
  ogDescription: `${videoDetail.value.content}`
})

const filteredSocialMediaList = computed(() => {
  const target = ['facebook', 'instagram', 'youtube', 'jcnote', 'spotify']
  return socialMediaList.filter((item) => target.includes(item.linkType))
})

const { data: relatedProductList } = await useAsyncData('productList', () => {
  if (!videoDetail.value.related_product) return null

  const productList = videoDetail.value.related_product.split(',')

  const formula = `OR(${productList.map((num) => `AND({product_no}=${num}, {launched}='true')`).join(',')})`

  return $fetch('/api/airtable/product', {
    method: 'post',
    body: {
      sort: [{ field: 'product_no', direction: 'desc' }],
      filterByFormula: formula
    }
  })
})

const goodstuffSwiperConfig = {
  slidesPerView: 1.3,
  spaceBetween: 24,
  height: 214,
  breakpoints: {
    480: {
      slidesPerView: 1.8
    },
    640: {
      slidesPerView: 2.6
    },
    1280: {
      slidesPerView: 1
    }
  },
  pagination: true
}

const { data: relatedVideoList } = await useAsyncData('videoList', () => {
  if (!videoDetail.value.related_video) return null

  const relatedVideoList = videoDetail.value.related_video.split(',')
  // video資料篩選條件：指定的video_no & launched=true
  const formula = `OR(${relatedVideoList.map((num) => `AND({video_no}=${num},{launched}='true')`).join(',')})`

  return $fetch('/api/airtable/video', {
    method: 'post',
    body: {
      sort: [{ field: 'video_no', direction: 'desc' }],
      filterByFormula: `${formula}`
    }
  })
})

const relatedVideoSwiperConfig = {
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: true,
  pagination: true,
  breakpoints: {
    480: {
      slidesPerView: 1.7
    },
    640: {
      slidesPerView: 1.9
    },
    768: {
      slidesPerView: 2.2
    }
  },
  autoplay: true
}

const bigcategoryRoute = computed(() => {
  if (codeVideoBigcategoryList.value === null)
    return {
      labelName: '',
      route: ''
    }

  const currentBigcategory = codeVideoBigcategoryList.value.filter(
    (code) => code.id === videoDetail.value.category
  )[0]

  if (currentBigcategory) {
    const route = `/video/${currentBigcategory.label_en}/north?page=1`

    return {
      labelName: currentBigcategory.label,
      route
    }
  } else {
    return {
      labelName: 'All',
      route: '/video/allTopic?page=1'
    }
  }
})

const smallcategoryRoute = computed(() => {
  if (codeVideoBigcategoryList.value === null || codeVideoSmallcategoryList.value === null)
    return {
      labelName: '',
      route: ''
    }

  const currentBigcategory = codeVideoBigcategoryList.value.filter(
    (code) => code.id === videoDetail.value.category
  )[0]

  const currentSmallcategory = codeVideoSmallcategoryList.value.filter((code) => {
    return code.id === videoDetail.value.smallcategory
  })[0]

  if (currentBigcategory && currentSmallcategory) {
    const route = `/video/${currentBigcategory.label_en}/${currentSmallcategory.label_en}?page=1`
    return {
      labelName: currentSmallcategory.label,
      route
    }
  } else {
    return {
      labelName: null,
      route: ''
    }
  }
})
</script>

<style scoped>
::v-deep(.swiper-pagination-bullet) {
  background-color: #85888a;
}
::v-deep(.swiper-pagination-bullet-active) {
  background-color: #fbff9e;
}

#goodstuff::v-deep(.swiper-wrapper) {
  padding-bottom: 48px;
}

#relatedPost::v-deep(.swiper-wrapper) {
  padding-bottom: 42px;
}

::v-deep(.swiper-button-disabled) {
  opacity: 0.6;
}
</style>
