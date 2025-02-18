<template>
  <div>
    <img class="size-[30px] sm:size-[50px]" :src="imageSrc('/logo.svg')" alt="logo" />
    index page
  </div>
</template>

<script setup>
const { imageSrc } = getImageSrc()
</script>

<style lang="scss" scoped></style>
