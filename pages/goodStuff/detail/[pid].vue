<template>
  <div class="pt-[66px] sm:pt-[154px] lg:pt-[100px]">
    <div class="container min-h-[80vh] pb-15">
      <BreadCrumb
        :bigcategory="bigcategoryRoute"
        :smallcategory="smallcategoryRoute"
        :title="productDetail.name"
        class="mb-4 md:mb-3"
      />
      <div class="flex flex-col gap-8 md:gap-15 lg:flex-row">
        <div class="flex shrink-1 grow-1 md:min-w-[602px] md:gap-2">
          <div class="hidden md:block">
            <Swiper
              :modules="[SwiperThumbs]"
              class="h-[420px] min-h-[84px] w-[64px]"
              v-bind="thumbsSwiperConfig"
              @swiper="setThumbsSwiper"
            >
              <SwiperSlide
                v-for="image in productDetail.images"
                :key="image.id"
                class="relative bg-white"
              >
                <img
                  class="h-[84px] object-contain object-center"
                  :src="image.url"
                  alt="product_image"
                />
                <div class="mask absolute inset-0"></div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div class="w-full">
            <Swiper
              :modules="[SwiperThumbs]"
              class="w-full md:max-h-[904px] md:min-h-[700px] lg:max-w-[530px]"
              v-bind="productSwiperConfig"
              :thumbs="{ swiper: thumbsSwiper }"
            >
              <SwiperSlide v-for="image in productDetail.images" :key="image.id" class="bg-white">
                <img
                  class="w-full object-contain object-center"
                  :src="image.url"
                  alt="product_image"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div class="w-full shrink-1 grow-1 lg:max-w-[538px]">
          <div>
            <p class="mb-1 text-[#ffffff99]">品牌</p>
            <p class="mb-6">{{ productDetail.name }}</p>
          </div>
          <div>
            <p class="mb-1 text-[#ffffff99]">描述</p>
            <p class="mb-3 whitespace-pre-wrap">{{ detailContent }}</p>
            <button
              v-if="!detailContentExpanded"
              class="mb-6 text-yellow"
              @click="detailContentExpanded = true"
            >
              查看更多 >>
            </button>
          </div>
          <div v-if="productDetail.discount">
            <p class="mb-1 text-[#ffffff99]">折扣碼</p>
            <p class="mb-6 text-[24px]">{{ productDetail.discount }}</p>
          </div>
          <div>
            <p class="mb-4 text-[#ffffff99] sm:mb-6">好物連結</p>
            <ul class="grid grid-cols-1 gap-x-10 gap-y-3 px-10 sm:grid-cols-2 sm:gap-y-6 sm:px-0">
              <li
                v-for="product in productDetail.relatedProduct"
                :key="product.id"
                class="overflow-hidden rounded-[8px] card-shadow duration-300 hover:scale-[calc(255/240)] lg:max-w-[240px]"
              >
                <NuxtLink v-if="product.id" :to="`/goodStuff/detail/${product.id}`">
                  <img class="mb-3 w-full" :src="product.cover_image" alt="cover_image" />
                  <p class="mx-3 mb-3 text-[14px]">{{ product.name }}</p>
                  <button
                    class="mx-auto mb-3 block w-[92px] rounded-full bg-[#faff99] py-[3px] font-pingFang text-primary"
                  >
                    好物連結
                  </button>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Subscribe />
  </div>
</template>

<script setup>
const { pid } = useRoute().params
const { products, codeProductBigcategoryList, codeProductSmallcategoryList } =
  storeToRefs(useProductStore())

const { data: productDetail } = await useAsyncData('productInfo', () => {
  if (products.value.length === 0) {
    return $fetch('/api/airtable/productById', {
      method: 'post',
      body: {
        id: pid
      }
    })
  } else {
    return products.value.filter((product) => product.id === pid)[0]
  }
})

const bigcategoryRoute = computed(() => {
  if (codeProductBigcategoryList.value === null)
    return {
      labelName: '',
      route: ''
    }

  const currentBigcategory = codeProductBigcategoryList.value.filter(
    (code) => code.id === productDetail.value.category
  )[0]

  const route = `/goodStuff/${currentBigcategory.label_en}/all?page=1`

  return {
    labelName: currentBigcategory.label,
    route
  }
})

const smallcategoryRoute = computed(() => {
  if (codeProductBigcategoryList.value === null || codeProductSmallcategoryList.value === null)
    return {
      labelName: '',
      route: ''
    }

  const currentBigcategory = codeProductBigcategoryList.value.filter(
    (code) => code.id === productDetail.value.category
  )[0]

  const currentSmallcategory = codeProductSmallcategoryList.value.filter((code) => {
    return code.id === productDetail.value.smallcategory
  })[0]

  const route = `/goodStuff/${currentBigcategory.label_en}/${currentSmallcategory.label_en}?page=1`
  return {
    labelName: currentSmallcategory.label,
    route
  }
})

const detailContentExpanded = ref(false)

const detailContent = computed(() => {
  const content = productDetail.value.content

  if (detailContentExpanded.value || content.length <= 100) {
    return content
  } else {
    return `${content.slice(0, 100)} ...`
  }
})

const thumbsSwiper = ref(null)

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const thumbsSwiperConfig = {
  modules: [SwiperThumbs],
  watchSlidesProgress: true,
  slidesPerView: 5,
  direction: 'vertical',
  loop: true,
  freeMode: true
}

const productSwiperConfig = {
  modules: [SwiperThumbs, SwiperPagination],
  spaceBetween: 0,
  slidesPerView: 1,
  loop: true,
  breakpoints: {
    768: {
      slidesPerView: 1.3,
      direction: 'vertical'
    }
  },
  pagination: {
    dynamicBullets: true,
    clickable: true
  }
}

onMounted(() => {
  if (productDetail.value.content.length <= 100) {
    detailContentExpanded.value = true
  } else {
    detailContentExpanded.value = false
  }
})
</script>

<style scoped>
::v-deep(.swiper-thumbs .mask) {
  background-color: rgba(0, 0, 0, 0.7);
}

::v-deep(.swiper-slide-thumb-active .mask) {
  background-color: transparent;
}

::v-deep(.swiper-pagination-bullet) {
  background-color: #6c7072;
}
::v-deep(.swiper-pagination-bullet-active) {
  background-color: #fbff9e;
}

::v-deep(.swiper-wrapper) {
  padding-bottom: 40px;
}

::v-deep(.swiper-pagination) {
  @media (min-width: 768px) {
    opacity: 0;
  }
}
</style>
