<template>
  <div class="flex flex-col items-center justify-center bg-[#1d2327] pt-10 pb-5">
    <img class="mb-8 size-20 md:size-25" :src="imageSrc('/logo.svg')" alt="logo" />
    <div class="mb-10 grid grid-cols-1 gap-y-3 sm:mb-11 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-8">
      <div v-for="item in socialMediaList" :key="item.linkType">
        <a class="whitespace-nowrap" :href="item.src" target="_blank">
          <Icon :name="item.iconName" class="mr-3 align-middle text-[30px] md:text-[40px]" />
          <span class="text-[14px] sm:text-[18px]">{{ item.name }}</span>
        </a>
      </div>
    </div>
    <span class="text-[10px] sm:text-[14px]"
      >秋天剩旅行 CTS.TRAVEL 版權所有 © CTS.TRAVEL All Rights Reserved.</span
    >
  </div>
</template>

<script setup>
import { socialMediaList } from '@/assets/js/common'
const { imageSrc } = getImageSrc()
// const socialMediaList = ref([
//   {
//     linkType: 'facebook',
//     name: '秋天剩旅行【cts.travel】',
//     iconName: 'my-icon:fb',
//     src: 'https://www.facebook.com/DannyGMFM/'
//   },
//   {
//     linkType: 'instagram',
//     name: 'cts.travel',
//     iconName: 'my-icon:ig',
//     src: 'https://www.instagram.com/danny_gmfm/'
//   },
//   {
//     linkType: 'youtube',
//     name: '秋天剩旅行【cts.travel】',
//     iconName: 'my-icon:yt',
//     src: 'https://www.youtube.com/channel/UCO5Jf1xYlqpLA341Zkr2Zwg/videos'
//   },
//   {
//     linkType: 'email',
//     name: 'ctstravel01@gmail.com',
//     iconName: 'my-icon:mail',
//     src: 'mailto:ctstravel01@gmail.com'
//   },
//   {
//     linkType: 'jcnote',
//     name: '健行筆記-秋天剩旅行',
//     iconName: 'my-icon:jcnote',
//     src: 'https://hiking.biji.co/index.php?q=member&act=review&member=1430494'
//   },
//   {
//     linkType: 'spotify',
//     name: 'Mountain Vlogging with Danny',
//     iconName: 'my-icon:spotify',
//     src: 'https://open.spotify.com/playlist/2SoggYFTOblpi4WlMNSnXm?si=Ei6_PWQBTN-H03K3QhMwzA&nd=1'
//   }
// ])
</script>

<style lang="scss" scoped></style>
