<template>
  <div>
    <div
      class="nav-space h-90 bg-[url(~/assets/images/banner/banner-goodstuff-mobile-bg.png)] bg-cover bg-center bg-no-repeat md:bg-[url(~/assets/images/banner/banner-goodstuff-bg.png)]"
    >
      <div class="relative container h-full">
        <VisitCountBoard class="absolute bottom-0 left-0 container mb-6 sm:mt-4" />
      </div>
    </div>
    <div class="bg-primary pt-8 pb-10 md:pb-15">
      <div class="container">
        <ul class="flex-center mb-6 gap-10 sm:mb-9">
          <li
            v-for="bigcategory in productBigcategoryNavigator"
            :key="bigcategory.label_en"
            class=""
          >
            <NuxtLink class="relative" :to="bigcategory.route">
              <span class="text-[18px] tracking-[7px] sm:text-[24px]">{{ bigcategory.label }}</span>
              <div
                :class="bigcategorySelected === bigcategory.label_en ? 'bg-yellow' : ''"
                class="absolute -bottom-2 h-1 w-full rounded-sm"
              ></div>
            </NuxtLink>
          </li>
        </ul>
        <div class="mb-15">
          <ul class="hidden items-center justify-center gap-3 sm:gap-4 md:flex lg:gap-8">
            <li
              v-for="smallcategory in productSmallcategoryNavigator"
              :key="smallcategory.label_en"
              class="h-[130px] w-[110px] rounded-[5px] border-2 border-[#1c2428] bg-[#1c2428] hover:border-white"
              :class="smallcategorySelected === smallcategory.label_en ? 'border-yellow' : ''"
            >
              <NuxtLink
                class="flex-center px-[17px] py-[10px] sm:flex-col"
                :to="smallcategory.route"
              >
                <img
                  class="mb-2 size-[25px] object-contain object-center sm:size-19"
                  :src="imageSrc(smallcategory.imgurl)"
                  alt=""
                />
                <span
                  :class="
                    smallcategory.label.length > 4 ? '-tracking-[0.05px]' : 'tracking-[4.67px]'
                  "
                  class="text-[16px] text-nowrap lg:text-[18px]"
                  >{{ smallcategory.label }}</span
                >
              </NuxtLink>
            </li>
          </ul>

          <div class="md:hidden">
            <Swiper v-bind="smallcategorySwiperConfig" @swiper="smallcategorySwiper">
              <SwiperSlide
                v-for="smallcategory in productSmallcategoryNavigator"
                :key="smallcategory.label_en"
                class="max-w-[160px] rounded-[5px] border-2 border-[#1c2428] bg-[#1c2428] sm:max-w-[120px]"
                :class="smallcategorySelected === smallcategory.label_en ? 'border-yellow' : ''"
              >
                <NuxtLink
                  class="flex-center px-[7px] py-[8px] sm:flex-col"
                  :to="smallcategory.route"
                >
                  <img
                    class="mr-2 size-[25px] object-contain object-center sm:mr-0 sm:mb-2 sm:size-19"
                    :src="imageSrc(smallcategory.imgurl)"
                    alt=""
                  />
                  <span class="text-[16px] tracking-[4.67px] text-nowrap lg:text-[18px]">{{
                    smallcategory.label
                  }}</span>
                </NuxtLink>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div>
          <ProductListView
            :bigcategory-selected="bigcategorySelected"
            :smallcategory-selected="smallcategorySelected"
          />
        </div>
      </div>
    </div>
    <Subscribe />
  </div>
</template>

<script setup>
const { imageSrc } = getImageSrc()

const productStore = useProductStore()
await callOnce(productStore.getProducts)
const { productBigcategoryNavigator, productSmallcategoryNavigator } =
  storeToRefs(useProductStore())

const { topic, subclass } = useRoute().params
const bigcategorySelected = ref(topic)
const smallcategorySelected = ref(subclass)

useSeoMeta({
  title: () => `${topic === 'outdoor' ? '戶外裝備' : '拍攝裝備'}`,
  ogTitle: () => `${topic === 'outdoor' ? '戶外裝備' : '拍攝裝備'}`,
  description: '由Danny推薦登山相關的戶外裝備、服飾及配件，也有推薦的拍攝裝備喔。',
  ogDescription: '由Danny推薦登山相關的戶外裝備、服飾及配件，也有推薦的拍攝裝備喔。'
})

const smallcategorySwiperConfig = ref({
  slidesPerView: 'auto',
  spaceBetween: 12
})

const smallcategorySwiper = (swiper) => {
  if (productSmallcategoryNavigator.value === null) return
  const selectedIndex = productSmallcategoryNavigator.value.findIndex(
    (category) => category.label_en === smallcategorySelected.value
  )

  swiper.slideTo(selectedIndex)
}

onMounted(() => {
  productStore.$patch({
    currentProductBigcategory: bigcategorySelected.value,
    currentProductSmallcategory: smallcategorySelected.value
  })
})
</script>

<style lang="scss" scoped></style>
