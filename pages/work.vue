<template>
  <div>
    <div
      class="nav-space h-90 bg-[url(~/assets/images/banner/banner-work-mobile-bg.png)] bg-cover bg-center bg-no-repeat md:bg-[url(~/assets/images/banner/banner-work-bg.png)]"
    >
      <div class="relative container h-full">
        <div
          class="absolute bottom-0 left-0 container mb-6 text-[12px] tracking-[5px] sm:mt-4 sm:text-[16px]"
        >
          <p>本日人氣：1000</p>
          <p>累積人氣：5367801</p>
        </div>
      </div>
    </div>

    <div class="bg-primary py-8 md:py-15">
      <div class="container flex flex-col items-center">
        <ul class="mb-8 grid gap-5 sm:grid-cols-2 sm:gap-8 md:mb-15 xl:grid-cols-3 xl:gap-15">
          <li
            v-for="work in worksPerPage[currentPage - 1]"
            :key="work.id"
            v-gsap.whenVisible.stagger.from.once.reversible="{ opacity: 0, y: 50 }"
            class="overflow-hidden rounded-[8px] duration-300 hover:-translate-y-1.5 hover:card-shadow"
          >
            <div class="relative">
              <img
                class="mb-2 aspect-video object-cover object-center sm:mb-3"
                :src="work.cover_image"
                alt="cover_img"
              />
              <div class="img-shadow absolute bottom-0 size-full" />
            </div>
            <div class="px-4 pb-5">
              <p class="text-shorten mb-1 leading-8 font-bold">{{ work.title }}</p>
              <div>
                <p
                  class="mr-2 mb-2 inline-block rounded-[5px] bg-yellow px-2 text-[12px] leading-6 font-bold text-primary"
                >
                  {{ work.subTitle }}
                </p>
                <p
                  class="mb-2 inline-block rounded-[5px] bg-yellow px-2 text-[12px] leading-6 font-bold text-primary"
                >
                  {{ work.cooperate }}
                </p>
              </div>

              <p class="mb-1 h-[96px] text-[14px] leading-6 md:leading-8">
                {{ work.content.length > 70 ? `${work.content.slice(0, 70)} ...` : work.content }}
              </p>
              <div>
                <p class="mb-2 text-yellow sm:mb-3">作品連結:</p>
                <div class="flex gap-x-4 sm:gap-x-8">
                  <a v-if="work.link_youtube !== null" :href="work.link_youtube" target="_blank"
                    ><Icon name="my-icon:yt" class="align-middle text-[30px] md:text-[40px]"
                  /></a>
                  <a v-if="work.link_ig !== null" :href="work.link_ig" target="_blank"
                    ><Icon name="my-icon:ig" class="align-middle text-[30px] md:text-[40px]"
                  /></a>
                  <a v-if="work.link_fb !== null" :href="work.link_fb" target="_blank"
                    ><Icon name="my-icon:fb" class="align-middle text-[30px] md:text-[40px]"
                  /></a>
                  <a v-if="work.link_google !== null" :href="work.link_google" target="_blank"
                    ><Icon name="my-icon:google" class="align-middle text-[30px] md:text-[40px]"
                  /></a>
                  <a v-if="work.link_other !== null" :href="work.link_other" target="_blank"
                    ><Icon name="my-icon:jcnote" class="align-middle text-[30px] md:text-[40px]"
                  /></a>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <vue-awesome-paginate
          v-model="currentPage"
          :total-items="totalWorks"
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
    <Subscribe />
  </div>
</template>

<script setup>
const { page } = useRoute().query
const router = useRouter()
const workStore = useWorkStore()
const { worksPerPage, pageSize, totalWorks } = storeToRefs(useWorkStore())

await callOnce(workStore.getWorkList)

const currentPage = ref(parseInt(page))

const scrollTop = () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

const turnPage = (page) => {
  router.push({
    name: 'work',
    query: {
      page
    }
  })

  scrollTop()
}
</script>

<style scoped></style>
