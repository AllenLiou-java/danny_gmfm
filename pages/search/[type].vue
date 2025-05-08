<template>
  <div class="pt-[66px] sm:pt-[154px] lg:pt-[100px]">
    <div class="container mx-auto min-h-[80vh] max-w-[840px] pb-10 md:pb-15">
      <ul id="typeList" class="mb-6 flex gap-x-6 md:mb-8">
        <li v-for="type in typeList" :key="type.label_en" class="pb-2 text-[18px]">
          <NuxtLink :to="type.route">
            {{ type.label }}
          </NuxtLink>
        </li>
      </ul>
      <div class="mb-4 flex gap-x-2 md:mb-6 md:gap-x-4">
        <input
          ref="refInputKeywod"
          v-model="inputKeyword"
          class="w-full max-w-[724px] rounded-sm px-3 py-[10px] text-[14px] outline-1 -outline-offset-1 outline-[#85888a] placeholder:text-white focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-yellow md:px-6 md:py-4 md:text-[18px]"
          placeholder="請輸入關鍵字"
          type="text"
          @keyup.enter="searchResult"
        />
        <div
          class="flex-center cursor-pointer rounded-[5px] bg-yellow p-[7px] duration-300 hover:bg-[#ffe145] md:p-[10px]"
          @click="searchResult"
        >
          <Icon name="mdi:magnify" class="text-[26px] text-[#000000] md:text-[40px]" />
        </div>
      </div>
      <div class="relative">
        <ul v-if="totalResultPosts === 0" class="flex flex-wrap gap-3 md:gap-4">
          <li
            v-for="{ keyword } in keywordListbyType"
            :key="keyword"
            class="inline-block cursor-pointer rounded-[20px] bg-[#3b4143] px-2 py-1 text-[14px] tracking-[4px] md:px-5 md:py-2 md:text-[16px]"
            @click="fillinKeyword(keyword)"
          >
            # {{ keyword }}
          </li>
        </ul>
        <p v-else class="relative left-[100%] mb-3 inline-block -translate-x-full">
          共{{ resultPosts.length }}個結果
        </p>
      </div>
      <div class="mb-15">
        <ul>
          <li v-for="result in resultPostsPerPage" :key="result.id">
            <NuxtLink
              class="mb-3 flex flex-col gap-x-6 rounded-[5px] bg-secondary p-3 hover:bg-secondary md:mb-5 md:flex-row md:bg-transparent md:px-4 md:py-5"
              :to="result.route"
            >
              <div
                class="mb-2 flex shrink-0 gap-x-3 border-b-1 border-[#303538] pb-2 md:border-b-0"
              >
                <img
                  class="size-[60px] rounded-[5px] object-cover object-center md:size-[150px]"
                  :src="result.cover_image"
                  alt="coverImg"
                />
                <p
                  class="text-[14px] font-medium tracking-[4.08px] md:hidden"
                  v-html="result.title"
                ></p>
              </div>

              <div>
                <p
                  class="mb-3 hidden text-[18px] font-medium tracking-[5.25px] md:block"
                  v-html="result.title"
                ></p>
                <p
                  class="text-[12px] tracking-[3.5px] break-all md:text-[14px] md:tracking-[4.08px]"
                  v-html="result.content"
                ></p>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div v-if="totalResultPosts > 0" class="flex-center">
        <vue-awesome-paginate
          v-model="currentPage"
          :total-items="totalResultPosts"
          :items-per-page="pageSize"
          :max-pages-shown="3"
          paginate-buttons-class="size-10  hover:bg-secondary text-[18px]"
          active-page-class="paginate-active"
          back-button-class="back-btn"
          next-button-class="next-btn"
          @click="turnPage"
        />
      </div>
    </div>
    <Suscribe />
  </div>
</template>

<script setup>
const typeList = ref([
  {
    label: '影片',
    label_en: 'video',
    route: '/search/video'
  },
  {
    label: '好物推薦',
    label_en: 'goodStuff',
    route: '/search/goodStuff'
  }
])

const router = useRouter()
const currentPage = ref(parseInt(useRoute().query.page || 1))
const pageSize = ref(10)
const refInputKeywod = ref()

// keywordList
const keywordList = ref([])
const keywordListbyType = computed(() => {
  return keywordList.value.filter((keywordItem) => {
    return keywordItem.type === useRoute().params.type
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

// 篩選功能
const inputKeyword = ref(null)
const postsBytype = ref([])
const resultPosts = ref([])

const totalResultPosts = computed(() => resultPosts.value.length)
const resultPostsPerPage = computed(() => {
  const size = pageSize.value
  const data = resultPosts.value
  const current = currentPage.value

  const result = []

  for (let i = 0; i < data.length; i += size) {
    result.push(data.slice(i, i + size))
  }

  return result[current - 1]
})

const getPostsBytype = async () => {
  const { type } = useRoute().params
  let tempInfo = []
  if (type === 'video') {
    const { videos } = storeToRefs(useVideoStore())

    if (videos.value.length === 0) {
      tempInfo = await useVideoStore().getVideos()
    } else {
      tempInfo = videos.value
    }

    postsBytype.value = tempInfo.map(({ id, title, cover_image, content }) => {
      const contentShorten = content.length > 100 ? `${content.slice(0, 100)} ...` : content
      return {
        route: `/video/detail/${id}`,
        title,
        cover_image,
        content: contentShorten
      }
    })
  } else {
    const { products } = storeToRefs(useProductStore())
    if (products.value.length === 0) {
      tempInfo = await useProductStore().getProducts()
    } else {
      tempInfo = products.value
    }

    postsBytype.value = tempInfo.map(({ id, name, cover_image, content }) => {
      const contentShorten = content.length > 100 ? `${content.slice(0, 100)} ...` : content
      return {
        route: `/goodStuff/detail/${id}`,
        title: name,
        cover_image,
        content: contentShorten
      }
    })
  }
}

const filterPostByKeyword = () => {
  const keyword = inputKeyword.value
  const posts = postsBytype.value

  if (keyword === null || keyword === '') {
    resultPosts.value = posts
  } else {
    resultPosts.value = posts.filter((post) => {
      const tag = ['title', 'content']
      let flag = false
      tag.forEach((nowTag) => {
        if (post[nowTag].toLowerCase().includes(keyword.toLowerCase())) {
          flag = true
        }
      })
      return flag
    })
  }
}

const highlightresultPosts = () => {
  const keyword = inputKeyword.value
  const posts = resultPosts.value

  if (keyword === null || keyword === '') return

  return posts.map((post) => {
    const tag = ['title', 'content']
    tag.forEach((nowTag) => {
      const matchWord = post[nowTag].match(new RegExp(keyword, 'i'))
      post[nowTag] = post[nowTag].replace(
        new RegExp(keyword, 'i'),
        `<span class='highlight'>${matchWord}</span>`
      )
    })
    return post
  })
}

const searchResult = async () => {
  await getPostsBytype()
  filterPostByKeyword()
  highlightresultPosts()
  router.push({
    name: 'search-type',
    query: {
      keyword: inputKeyword.value,
      page: currentPage.value
    }
  })
}

const scrollTop = () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

const turnPage = (pageNo) => {
  router.push({
    name: 'search-type',
    params: {
      type: useRoute().params.type
    },
    query: {
      keyword: inputKeyword.value,
      page: pageNo
    }
  })

  scrollTop()
}

const fillinKeyword = (keyword) => {
  inputKeyword.value = keyword
  refInputKeywod.value.focus()
}

onMounted(() => {
  getKeywordList()
  const { keyword, page } = useRoute().query

  if (keyword !== undefined) {
    inputKeyword.value = keyword
    currentPage.value = parseInt(page)
    searchResult()
  } else {
    refInputKeywod.value.focus()
  }
})
</script>

<style scoped>
#typeList::v-deep(.router-link-active.router-link-exact-active) {
  position: relative;
}

#typeList::v-deep(.router-link-active.router-link-exact-active::after) {
  position: absolute;
  content: '';
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #fbff9e;
  border-radius: 8px;
}

::v-deep(.highlight) {
  font-weight: bold;
  color: #fbff9e;
  padding: 0px 5px;
}
</style>
