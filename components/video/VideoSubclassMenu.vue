<template>
  <div>
    <ul class="hidden flex-wrap gap-6 xl:flex">
      <li
        v-for="subclass in subclassList"
        :key="subclass.label_en"
        class="shrink-0 rounded-full border border-transparent bg-[#3b4143] hover:border-white"
        :class="subclassSelected === subclass.label_en ? 'border border-yellow' : ''"
      >
        <NuxtLink
          class="flex-center gap-2 px-3 py-[5px] sm:gap-3 sm:px-5 sm:py-[7px]"
          :to="subclass.route"
          @click="updateCurrentSubclass(subclass.label_en)"
        >
          <img
            v-if="imageSrc(subclass.imgurl)"
            :src="imageSrc(subclass.imgurl)"
            alt="subclass_icon"
          />

          <span class="tracking-[5px]">{{ subclass.label }}</span>
        </NuxtLink>
      </li>
    </ul>

    <div class="-mr-5 xl:hidden">
      <Swiper v-bind="subclassMenuSwiperConfig" @swiper="subclassMenuSwiper">
        <SwiperSlide v-for="subclass in subclassList" :key="subclass.label_en">
          <div
            class="min-w-[92px] shrink-0 rounded-full border border-transparent bg-[#3b4143] hover:border-white"
            :class="subclassSelected === subclass.label_en ? 'border border-yellow' : ''"
          >
            <NuxtLink
              class="block w-full"
              :to="subclass.route"
              @click="updateCurrentSubclass(subclass.label_en)"
            >
              <div class="flex-center gap-2 px-3 py-[5px] sm:gap-3 sm:px-5 sm:py-[7px]">
                <img
                  v-if="imageSrc(subclass.imgurl)"
                  class="size-[20px] object-cover object-center sm:size-[26px]"
                  :src="imageSrc(subclass.imgurl)"
                  alt="subclass_icon"
                />

                <span class="text-shorten text-[14px] tracking-[5px] sm:text-[16px]">{{
                  subclass.label
                }}</span>
              </div>
            </NuxtLink>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
const videoStore = useVideoStore()
const { imageSrc } = getImageSrc()
const props = defineProps({
  subclassSelected: {
    type: String,
    default: ''
  },
  subclassList: {
    type: Array,
    required: true
  }
})

const subclassMenuSwiperConfig = ref({
  modules: [SwiperPagination, SwiperNavigation],
  slidesPerView: 2.4,
  spaceBetween: 24,
  breakpoints: {
    480: {
      slidesPerView: 3.4
    },
    640: {
      slidesPerView: 3.6
    },
    1024: {
      slidesPerView: 6
    }
  }
})

const updateCurrentSubclass = (subclass) => {
  videoStore.$patch({
    currentSmallcategory: subclass
  })
}

const subclassMenuSwiper = (swiper) => {
  const subclassSelectedIndex = props.subclassList.findIndex(
    (topic) => topic.label_en === props.subclassSelected
  )
  swiper.slideTo(subclassSelectedIndex)
}
</script>

<style lang="scss" scoped></style>
