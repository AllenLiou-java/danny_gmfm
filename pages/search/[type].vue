<template>
  <div class="pt-[66px] sm:pt-[154px] lg:pt-[100px]">
    <div class="container min-h-[80vh]">
      <ul class="mb-6 flex gap-x-6 md:mb-8">
        <li v-for="type in typeList" :key="type.label_en" class="pb-2 text-[18px]">
          <NuxtLink :to="type.route">
            {{ type.label }}
          </NuxtLink>
        </li>
      </ul>
      <div class="mb-4 flex gap-x-2 md:mb-6 md:gap-x-4">
        <input
          v-model="inputKeyword"
          class="w-full max-w-[724px] rounded-sm px-3 py-[10px] text-[14px] outline-1 -outline-offset-1 outline-[#85888a] placeholder:text-white focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-yellow md:px-6 md:py-4 md:text-[18px]"
          placeholder="請輸入關鍵字"
          type="text"
        />
        <div
          class="flex-center cursor-pointer rounded-[5px] bg-yellow p-[7px] duration-300 hover:bg-[#ffe145] md:p-[10px]"
        >
          <Icon name="mdi:magnify" class="text-[26px] text-[#000000] md:text-[40px]" />
        </div>
      </div>
      <div>
        <ul class="flex flex-wrap gap-4">
          <li
            v-for="{ keyword } in keywordListbyType"
            :key="keyword"
            class="inline-block cursor-pointer rounded-[20px] bg-[#3b4143] px-2 py-1 text-[14px] tracking-[4px] md:px-5 md:py-2 md:text-[16px]"
            @click="inputKeyword = keyword"
          >
            # {{ keyword }}
          </li>
        </ul>
      </div>
    </div>
    <Suscribe />
  </div>
</template>

<script setup>
const { type } = useRoute().params
const typeList = ref([
  {
    label: '影片',
    label_en: 'video',
    route: '/search/video?page=1'
  },
  {
    label: '好物推薦',
    label_en: 'goodStuff',
    route: '/search/goodStuff?page=1'
  }
])
const inputKeyword = ref(null)

const keywordList = ref([])
const keywordListbyType = computed(() => {
  return keywordList.value.filter((keywordItem) => {
    return keywordItem.type === type
  })
})

const getKeywordList = async () => {
  const keywordListInStorage = JSON.parse(sessionStorage.getItem('keywordList'))

  if (keywordListInStorage === null) {
    const data = await $fetch('/api/airtable/searchKeyword')
    keywordList.value = data
    sessionStorage.setItem('keywordList', JSON.stringify(data))
  } else {
    keywordList.value = keywordListInStorage
  }
}

onMounted(() => {
  getKeywordList()
})
</script>

<style scoped>
::v-deep(.router-link-active.router-link-exact-active) {
  position: relative;
}

::v-deep(.router-link-active.router-link-exact-active::after) {
  position: absolute;
  content: '';
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #fbff9e;
  border-radius: 8px;
}
</style>
