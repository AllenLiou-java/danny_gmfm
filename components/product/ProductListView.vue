<template>
  <div>
    <div class="mb-15 grid place-content-center gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-15">
      <div
        v-for="product in productsPerPage[currentPage - 1]"
        :key="product.id"
        class="max-w-[360px] overflow-hidden rounded-[8px] card-shadow duration-300 hover:scale-[1.08]"
      >
        <NuxtLink
          v-gsap.whenVisible.from.once="{ opacity: 0, y: 50 }"
          :to="`/goodStuff/detail/${product.id}`"
        >
          <div class="relative">
            <img
              loading="lazy"
              class="mb-5 aspect-[calc(360/330)] w-full object-cover object-center"
              :src="product.cover_image"
              alt="productCover"
            />
            <div class="img-shadow absolute bottom-0 size-full" />
          </div>

          <div class="mx-5 mb-5 flex flex-col">
            <p class="mb-3">{{ product.name }}</p>
            <p class="self-end text-[#fff986]">查看更多 <span class="text-[14px]">》》</span></p>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div class="flex-center">
      <vue-awesome-paginate
        v-model="currentPage"
        :total-items="totalProducts"
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
</template>

<script setup>
const props = defineProps({
  bigcategorySelected: {
    type: String,
    required: true
  },
  smallcategorySelected: {
    type: String,
    required: true
  }
})
const { page } = useRoute().query
const router = useRouter()

const { productsPerPage, pageSize, totalProducts } = storeToRefs(useProductStore())

const currentPage = ref(parseInt(page))

const scrollTop = () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

const turnPage = (page) => {
  router.push({
    name: 'goodStuff-topic-subclass',
    params: {
      topic: props.bigcategorySelected,
      subclass: props.smallcategorySelected
    },
    query: {
      page
    }
  })

  scrollTop()
}
</script>

<style scoped></style>
