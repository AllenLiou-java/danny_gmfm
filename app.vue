<template>
  <div class="bg-primary font-notoSansTC text-white">
    <CustomLoading />

    <div>
      <LayoutHeader class="container" />
      <NuxtPage />
      <LayoutFooter />
    </div>

    <ClientOnly>
      <ModalsContainer />
    </ClientOnly>
    <Sidebar />
  </div>
</template>

<script setup>
import { ModalsContainer } from 'vue-final-modal'
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
