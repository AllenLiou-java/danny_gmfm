<template>
  <GSAPTransition :hidden="{ scale: 0, rotate: -25 }">
    <div v-if="!isReady" class="initPage">
      <div class="flex size-full flex-col items-center justify-center">
        <img class="mb-6 size-[80px] md:size-[120px]" :src="imageSrc('/logo.svg')" alt="brandImg" />
        <ul class="wave-menu h-[35px] w-[200px]">
          <li v-for="i in 10" :key="i"></li>
        </ul>
      </div>
    </div>
  </GSAPTransition>
</template>

<script setup>
const { imageSrc } = getImageSrc()
const isReady = ref(false)
const route = useRoute()
onMounted(() => {
  if (route.name === 'index') {
    setTimeout(() => {
      isReady.value = true
    }, 4000)
  } else {
    isReady.value = true
  }
})
</script>

<style scoped>
.initPage {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: #0b1215;
  z-index: 999;
  justify-content: center;
  align-items: center;
}

.initPage img {
  transform-style: preserve-3d;
  transform: perspective(250px);
  animation: box2 3s 3s infinite ease;
}
@keyframes box2 {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.wave-menu {
  border: 2px solid #fff;
  border-radius: 50px;
  /* width: 200px;
  height: 35px; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: ease 0.2s;
  position: relative;
  background: #0b1215;
}

.wave-menu li {
  list-style: none;
  height: 20px;
  width: 4px;
  border-radius: 10px;
  background: #fff;
  margin: 0 6px;
  padding: 0;
  animation-name: wave1;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  transition: ease 0.2s;
}

.wave-menu:hover > li {
  background: #fff;
}

.wave-menu:hover {
  background: #545fe5;
}

.wave-menu li:nth-child(2) {
  animation-name: wave2;
  animation-delay: 0.2s;
}

.wave-menu li:nth-child(3) {
  animation-name: wave3;
  animation-delay: 0.23s;
  animation-duration: 0.4s;
}

.wave-menu li:nth-child(4) {
  animation-name: wave4;
  animation-delay: 0.1s;
  animation-duration: 0.3s;
}

.wave-menu li:nth-child(5) {
  animation-delay: 0.5s;
}

.wave-menu li:nth-child(6) {
  animation-name: wave2;
  animation-duration: 0.5s;
}

.wave-menu li:nth-child(8) {
  animation-name: wave4;
  animation-delay: 0.4s;
  animation-duration: 0.25s;
}

.wave-menu li:nth-child(9) {
  animation-name: wave3;
  animation-delay: 0.15s;
}

@keyframes wave1 {
  from {
    transform: scaleY(1);
  }

  to {
    transform: scaleY(0.5);
  }
}

@keyframes wave2 {
  from {
    transform: scaleY(0.3);
  }

  to {
    transform: scaleY(0.6);
  }
}

@keyframes wave3 {
  from {
    transform: scaleY(0.6);
  }

  to {
    transform: scaleY(0.8);
  }
}

@keyframes wave4 {
  from {
    transform: scaleY(0.2);
  }

  to {
    transform: scaleY(0.5);
  }
}
</style>
