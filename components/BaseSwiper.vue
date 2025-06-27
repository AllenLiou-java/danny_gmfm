<!-- components/BaseSwiper.vue -->
<template>
  <div class="relative w-full">
    <!-- 自訂 navigation -->
    <slot name="navigation-prev" />
    <slot name="navigation-next" />

    <swiper ref="swiperRef" v-bind="swiperOptions" class="base-swiper" @swiper="onSwiper">
      <!-- slot 可插入任何 slide -->
      <swiper-slide v-for="(item, index) in items" :key="index">
        <slot name="slide" :item="item" :index="index">
          <!-- 預設內容（可被 slot 覆蓋） -->
          <div class="rounded bg-gray-100 p-4 text-center">
            <p>{{ item }}</p>
          </div>
        </slot>
      </swiper-slide>

      <!-- 自訂 pagination 容器 -->
      <template v-if="pagination">
        <slot name="pagination">
          <div class="swiper-pagination"></div>
        </slot>
      </template>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'

const emit = defineEmits(['ready'])

const props = defineProps({
  items: { type: Array, required: true },
  slidesPerView: { type: [Number, String], default: 1 },
  spaceBetween: { type: Number, default: 10 },
  loop: { type: Boolean, default: false },
  direction: { type: String, default: 'horizontal' }, // horizontal or vertical
  autoplay: {
    type: [Boolean, Object],
    default: () => ({
      delay: 3000,
      disableOnInteraction: false
    })
  },
  pagination: { type: Boolean, default: false },
  navigation: { type: Boolean, default: false },
  effect: { type: String, default: 'slide' }, // slide, fade, cube, etc.
  breakpoints: {
    type: Object,
    default: () => ({})
  }
})

const swiperRef = ref(null)

const onSwiper = (swiper) => {
  swiperRef.value = swiper
  emit('ready', swiper)
}

const swiperOptions = {
  slidesPerView: props.slidesPerView,
  spaceBetween: props.spaceBetween,
  loop: props.loop,
  breakpoints: props.breakpoints,
  direction: props.direction,
  modules: [Autoplay, Pagination, Navigation, EffectFade],
  autoplay: props.autoplay,
  effect: props.effect,
  pagination: props.pagination
    ? { el: '.swiper-pagination', clickable: true, dynamicBullets: true }
    : false,
  navigation: props.navigation
    ? {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev'
      }
    : false
}

defineExpose({ swiperRef })
</script>

<style scoped>
.base-swiper {
  width: 100%;
}
</style>
