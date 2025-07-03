<template>
  <div class="nav-space min-h-[80vh] bg-primary">
    <div v-for="photo in photoList" :key="photo.name" class="rounded border p-4 shadow">
      <NuxtImg
        :src="photo.image"
        alt="商品圖片"
        loading="lazy"
        format="webp"
        sizes=""
        class="rounded object-contain"
      />
      <h3 class="mt-2 text-lg font-bold">{{ photo.name }}</h3>
      <p class="text-gray-600">NT$ {{ photo.price }}</p>
    </div>
  </div>
</template>

<script setup>
const photoList = [
  { name: '圖1', price: 1290, image: '/images/destination-bg.png' },
  { name: '圖2', price: 3500, image: '/images/post-bg.png' },
  { name: '圖3', price: 2200, image: '/images/banner-bg.jpg' }
]
</script>

<style lang="scss" scoped></style>
