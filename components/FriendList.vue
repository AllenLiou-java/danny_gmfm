<template>
  <div v-if="Object.keys(cooperationList).length > 0">
    <h2
      v-gsap.whenVisible.from.once.reversible="{ opacity: 0, y: 50 }"
      class="mb-6 text-center font-paintinfChoco text-[32px] leading-[1] text-yellow sm:mb-15 sm:text-[100px]"
    >
      FRIENDS
    </h2>
    <ul
      v-gsap.whenVisible.from.once.reversible="{ opacity: 0, x: -50 }"
      class="hidden flex-wrap gap-10 md:gap-15 md:px-16 lg:flex xl:gap-20"
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
      <ClientOnly>
        <BaseSwiper :items="cooperationList" v-bind="friendSwiperConfig">
          <template #slide="{ item }">
            <div class="group relative overflow-hidden rounded-xl">
              <img
                class="h-full w-full rounded-full object-cover"
                :src="item.logo[0].url"
                alt="cooperationLogo"
              />
            </div>
          </template>
        </BaseSwiper>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cooperationList: {
    type: Object,
    default: () => ({})
  }
})

const friendSwiperConfig = {
  slidesPerView: 2.8,
  spaceBetween: 42,
  breakpoints: {
    545: {
      slidesPerView: 3.7
    },
    768: {
      slidesPerView: 4.7
    }
  },
  grabCursor: true
}
</script>

<style lang="scss" scoped></style>
