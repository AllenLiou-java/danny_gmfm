<template>
  <div>
    <img
      class="max-h-[800px] w-full object-cover object-top"
      :src="videoDetail.cover_image[0].url"
      alt="cover_image"
    />

    <div
      class="container flex flex-col justify-between pt-4 tracking-[3.5px] sm:pt-8 sm:tracking-[4.67px] lg:flex-row lg:gap-x-12"
    >
      <div class="max-w-[850px]">
        <BreadCrumb
          class="mb-6 text-[12px] sm:mb-8 sm:text-[16px]"
          type="video"
          :topic="videoDetail.category"
          :subclass="videoDetail.area"
          :related-topic="videoDetail.related_topic"
          :title="videoDetail.title"
        />
        <h2 class="mb-6 text-[16px] tracking-[4.67px] sm:mb-12 sm:text-[32px] sm:tracking-[9.33px]">
          {{ videoDetail.title }}
        </h2>

        <YoutubeScreen class="mb-4 sm:mb-8" :video-url="videoDetail.link" />
        <p
          class="mb-8 font-notoSansTC text-[14px] tracking-[4.08px] break-all whitespace-pre-wrap sm:text-[16px] sm:tracking-[4.67px]"
        >
          {{ videoDetail.content }}
        </p>
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
          <Swiper id="relatedPost" v-bind="relatedVideoSwiperConfig">
            <SwiperSlide
              v-for="{ id, fields } in relatedVideoList.records"
              :key="id"
              class="overflow-hidden rounded-[5px] shadow-[2px_4px_20px_0_rgba(0,0,0,0.5)]"
            >
              <NuxtLink :to="`/video/detail/${id}`">
                <div class="relative">
                  <img
                    class="max-h-[185px] w-full object-cover object-center sm:max-h-[214px]"
                    :src="fields.cover_image[0].url"
                    alt="cover_img"
                  />
                  <p
                    class="absolute bottom-0 w-full overflow-hidden px-3 pb-3 text-ellipsis whitespace-nowrap backdrop-blur-md"
                  >
                    {{ fields.title }}
                  </p>
                </div>
              </NuxtLink>
            </SwiperSlide>
          </Swiper>

          <div
            class="swiper-prev absolute top-[50%] -left-4 z-10 hidden -translate-y-[50%] cursor-pointer md:block"
          >
            <img
              class="size-10 object-cover object-center"
              :src="imageSrc('/video/btn-left.png')"
              alt="btn-left"
            />
          </div>
          <div
            class="swiper-next absolute top-[50%] -right-4 z-10 hidden -translate-y-[50%] cursor-pointer md:block"
          >
            <img
              class="size-10 object-cover object-center"
              :src="imageSrc('/video/btn-right.png')"
              alt="btn-right"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-col gap-6 pt-8 sm:flex-row lg:block lg:pt-19">
          <div class="sm:max-w-[290px]">
            <p class="mb-4 border-b border-[#54595b] pb-2">關於我</p>
            <div class="max-w-[290px]">
              <img
                class="mb-4 h-[290px] w-[290px] object-cover object-center"
                :src="imageSrc('/aboutMe/aboutMe.png')"
                alt="aboutMe_img"
              />
              <ul class="flex-center mb-8 gap-x-5 sm:flex-row md:gap-x-[22px]">
                <li v-for="mediaItem in socialMediaList" :key="mediaItem.instagram">
                  <a class="" :href="mediaItem.src" target="_blank">
                    <Icon
                      :name="mediaItem.iconName"
                      class="text-[30px] duration-300 hover:scale-125 sm:text-[40px]"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="sm:max-w-[290px]">
            <p class="mb-4 border-b border-[#54595b] pb-2">好物推薦</p>
            <ClientOnly>
              <Swiper
                v-if="relatedProductList !== null"
                id="goodstuff"
                v-bind="goodstuffSwiperConfig"
                class="-mr-5 mb-4 min-h-[332px] sm:-mr-6"
              >
                <SwiperSlide
                  v-for="{ id, fields } in relatedProductList.records"
                  :key="id"
                  class="w-[255px] overflow-hidden rounded-[5px] shadow-[2px_4px_20px_0_rgba(0,0,0,0.5)]"
                >
                  <NuxtLink :to="`${productPath(fields.category)}/${fields.product_no}`">
                    <img
                      class="max-h-[266px] w-full object-cover object-center"
                      :src="fields.cover_image[0].url"
                      alt="cover-img"
                    />
                    <div class="bg-primary tracking-[0]">
                      <p
                        class="mb-1 overflow-hidden px-4 pt-4 text-[14px] leading-8 tracking-[0] text-ellipsis whitespace-nowrap"
                      >
                        {{ fields.name }}
                      </p>

                      <span class="block px-3 pb-1 text-right text-[16px] font-medium text-yellow"
                        >查看更多>></span
                      >
                    </div>
                  </NuxtLink>
                </SwiperSlide>
              </Swiper>
            </ClientOnly>
          </div>
        </div>

        <div class="mb-8 tracking-[4.67px]">
          <p class="mb-4 border-b border-[#54595b] pb-2">人氣</p>
          <p>本日人氣：1000</p>
          <p>累積人氣：5367801</p>
        </div>
      </div>
    </div>
    <Suscribe />
  </div>
</template>

<script setup>
const route = useRoute()
const { imageSrc } = getImageSrc()
const { productPath } = getGoodStuffRoute()

const { data: videoDetail } = await useFetch('/api/airtable/videoById', {
  method: 'post',
  body: {
    id: route.params.vid
  }
})

const socialMediaList = ref([
  {
    linkType: 'facebook',
    name: '秋天剩旅行【cts.travel】',
    iconName: 'my-icon:fb',
    src: 'https://www.facebook.com/DannyGMFM/'
  },
  {
    linkType: 'instagram',
    name: 'cts.travel',
    iconName: 'my-icon:ig',
    src: 'https://www.instagram.com/danny_gmfm/'
  },
  {
    linkType: 'youtube',
    name: '秋天剩旅行【cts.travel】',
    iconName: 'my-icon:yt',
    src: 'https://www.youtube.com/channel/UCO5Jf1xYlqpLA341Zkr2Zwg/videos'
  },
  {
    linkType: 'jcnote',
    name: '健行筆記-秋天剩旅行',
    iconName: 'my-icon:jcnote',
    src: 'https://hiking.biji.co/index.php?q=member&act=review&member=1430494'
  },
  {
    linkType: 'spotify',
    name: 'Mountain Vlogging with Danny',
    iconName: 'my-icon:spotify',
    src: 'https://open.spotify.com/playlist/2SoggYFTOblpi4WlMNSnXm?si=Ei6_PWQBTN-H03K3QhMwzA&nd=1'
  }
])

const { data: relatedProductList } = await useAsyncData('productList', () => {
  if (!videoDetail.value.related_product) return null

  const productList = videoDetail.value.related_product.split(',')

  const formula = `OR(${productList.map((num) => `{product_no}=${num}`).join(',')})`

  return $fetch('/api/airtable/product', {
    method: 'post',
    body: {
      sort: [{ field: 'product_no', direction: 'desc' }],
      fields: ['name', 'category', 'cover_image', 'product_no'],
      filterByFormula: formula
    }
  })
})

const goodstuffSwiperConfig = {
  modules: [SwiperPagination],
  slidesPerView: 1.2,
  spaceBetween: 24,
  height: 214,
  breakpoints: {
    480: {
      slidesPerView: 1.6
    },
    640: {
      slidesPerView: 1
    }
  },
  pagination: {
    dynamicBullets: true,
    clickable: true
  }
}

const { data: relatedVideoList } = await useAsyncData('videoList', () => {
  if (!videoDetail.value.related_video) return null

  const relatedVideoList = videoDetail.value.related_video.split(',')
  const formula = `OR(${relatedVideoList.map((num) => `{video_no}=${num}`).join(',')})`

  return $fetch('/api/airtable/video', {
    method: 'post',
    body: {
      sort: [{ field: 'video_no', direction: 'desc' }],
      filterByFormula: `${formula}`
    }
  })
})

// const relatedVideoApi = computed(() => {
//   if (!videoDetail.value.related_video) return null

//   const relatedVideoList = videoDetail.value.related_video.split(',')
//   const formula = `OR(${relatedVideoList.map((num) => `{video_no}=${num}`).join(',')})`

//   return {
//     url: '/api/airtable/video',
//     method: 'post',
//     body: {
//       sort: [{ field: 'video_no', direction: 'desc' }],
//       filterByFormula: `${formula}`
//     }
//   }
// })

const relatedVideoSwiperConfig = {
  modules: [SwiperPagination, SwiperNavigation],
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev'
  },
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
  pagination: {
    dynamicBullets: true,
    clickable: true
  }
}
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

#relatedPost::v-deep(.swiper-pagination) {
  @media (min-width: 768px) {
    display: none;
  }
}
</style>
