<template>
  <ClientOnly>
    <div id="facebook" class="w-full max-w-[400px]">
      <div class="mb-3 sm:mb-4">
        <Icon name="my-icon:fb" class="mr-3 align-middle text-[40px]" />
        <span class="text-[14px] sm:text-[18px]">Facebook</span>
      </div>
      <!-- timeline -->
      <div
        class="fb-page"
        :data-href="pageUrl"
        data-tabs=""
        data-width=""
        data-height="508"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote :cite="pageUrl" class="fb-xfbml-parse-ignore">
          <a :href="pageUrl">{{ pageName }}</a>
        </blockquote>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const pageUrl = 'https://www.facebook.com/DannyGMFM'
const pageName = 'Danny_GMFM 秋天剩旅行'

onMounted(() => {
  if (import.meta.client) {
    const waitForFB = () => {
      const interval = setInterval(() => {
        if (window.FB && window.FB.XFBML) {
          clearInterval(interval)
          window.FB.XFBML.parse()
        }
      }, 100)
    }
    waitForFB()
  }
})
</script>

<style scoped></style>
