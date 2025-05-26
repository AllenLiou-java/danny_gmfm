<template>
  <div class="loader-wrap" :class="isLoading ? 'loader-visible' : 'loader-hidden'">
    <div class="textWrapper">
      <p class="text">Loading...</p>
      <div class="invertbox"></div>
    </div>
  </div>
</template>

<script setup>
import { globalMiddleware } from '#build/middleware'

const props = defineProps({
  throttle: {
    type: Number,
    default: 200
  },
  hold: {
    type: Number,
    default: 400
  }
})

// const isLoading = ref(false)
const commonStore = useCommonStore()
const { isLoading } = storeToRefs(commonStore)

let _throttleTimer = null

function clear() {
  clearTimeout(_throttleTimer)
  _throttleTimer = null
}

function show() {
  clear()
  if (import.meta.client) {
    if (props.throttle > 0) {
      _throttleTimer = setTimeout(() => {
        commonStore.setLoadingStatus(true)
        // isLoading.value = true
      }, props.throttle)
    } else {
      commonStore.setLoadingStatus(true)
      // isLoading.value = true
    }
  }
}

function hide() {
  clear()
  if (import.meta.client) {
    setTimeout(() => {
      commonStore.setLoadingStatus(false)
      // isLoading.value = false
    }, props.hold)
  }
}

globalMiddleware.unshift(show)
function unsubRouterBeforeMiddleware() {
  globalMiddleware.splice(globalMiddleware.indexOf(show, 1))
}

const nuxtApp = useNuxtApp()
const unsubPageFinish = nuxtApp.hook('page:finish', hide)
const unsubError = nuxtApp.hook('vue:error', hide)

onBeforeUnmount(() => {
  unsubRouterBeforeMiddleware()
  unsubPageFinish()
  unsubError()
})

const router = useRouter()

router.onError(() => {
  hide()
})

router.beforeResolve((to, from) => {
  if (
    to === from ||
    to.matched.every(
      (comp, index) =>
        comp.components && comp.components?.default === from.matched[index]?.components?.default
    )
  )
    hide()
})

router.afterEach((_to, _from, failure) => {
  if (failure) hide()
})
</script>

<style scoped>
.loader-wrap {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 999999;
  background-color: rgb(0 0 0 / 0.35);
  backdrop-filter: blur(4px);
  transition-property: background-color, visibility, opacity, scale;
  transition-duration: 0.2s;
}

.textWrapper {
  height: fit-content;
  min-width: 3rem;
  width: fit-content;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.25ch;
  position: relative;
  z-index: 0;
  color: white;
}

.invertbox {
  position: absolute;
  height: 100%;
  aspect-ratio: 1/1;
  left: 0;
  top: 0;
  border-radius: 20%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: invert(100%);
  animation: move 2s ease-in-out infinite;
}

@keyframes move {
  50% {
    left: calc(100% - 3rem);
  }
}

.loader-wrap.loader-visible {
  visibility: visible;
  opacity: 1;
  scale: 1.5;
}

.loader-wrap.loader-hidden {
  visibility: hidden;
  opacity: 0;
  scale: 1;
}
</style>
