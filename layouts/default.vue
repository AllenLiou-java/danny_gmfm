<template>
  <div class="bg-[#14171a] font-notoSansTC text-white">
    <!-- class="fixed left-[50%] container -translate-x-[50%]" -->
    <LayoutHeader class="container" />
    <div>
      <!-- <div class="min-h-[calc(100vh-354px)]"></div> -->
      <slot />
    </div>
    <LayoutFooter />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
