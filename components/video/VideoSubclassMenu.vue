<template>
  <div>
    <ul class="flex gap-6">
      <li
        v-for="subclass in subclassList"
        :key="subclass.label_en"
        class="rounded-full border border-transparent bg-[#3b4143] hover:border-white"
        :class="subclassSelected === subclass.label_en ? 'border border-yellow' : ''"
      >
        <NuxtLink
          class="flex-center flex gap-2 px-3 py-[5px] sm:gap-3 sm:px-5 sm:py-[7px]"
          :to="subclass.route"
        >
          <img v-if="subclass.imgurl" :src="imageSrc(subclass.imgurl)" alt="subclass_icon" />

          <span class="tracking-[5px]">{{ subclass.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { imageSrc } = getImageSrc()
defineProps({
  subclassSelected: {
    type: String,
    default: ''
  },
  subclassList: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
