<template>
  <GSAPTransition :hidden="{ y: -50 }">
    <div v-if="isShow" class="fixed top-[70%] right-1 z-999 sm:right-2">
      <ul>
        <li class="cursor-pointer duration-300 hover:scale-110" @click="moveToTop">
          <img
            class="size-[56px] sm:size-[76px]"
            :src="imageSrc('/sidebar/arrow-up.svg')"
            alt="arrowImg"
          />
        </li>
        <li class="duration-300 hover:scale-110">
          <a href="mailto:ctstravel01@gmail.com" target="_blank">
            <img
              class="size-[56px] sm:size-[76px]"
              :src="imageSrc('/sidebar/mail.svg')"
              alt="arrowImg"
            />
          </a>
        </li>
      </ul>
    </div>
  </GSAPTransition>
</template>

<script setup>
const { imageSrc } = getImageSrc()

const isShow = ref(false)

const moveToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function getScrollTop() {
  let bodyTop = 0
  if (typeof window.pageYOffset !== 'undefined') {
    bodyTop = window.pageYOffset
  } else if (typeof document.compatMode !== 'undefined' && document.compatMode !== 'BackCompat') {
    bodyTop = document.documentElement.scrollTop
  } else if (typeof document.body !== 'undefined') {
    bodyTop = document.body.scrollTop
  }
  /* 顯示出捲動後的高度值 */
  return bodyTop
}

const showSocialGroup = () => {
  if (getScrollTop() > 500) {
    isShow.value = true
  } else {
    isShow.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', showSocialGroup)
})

onUnmounted(() => {
  window.removeEventListener('scroll', showSocialGroup)
})
</script>

<style lang="scss" scoped></style>
