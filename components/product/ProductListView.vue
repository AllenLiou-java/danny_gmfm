<template>
  <div>
    <div class="mb-15 grid place-content-center gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-15">
      <div
        v-for="product in productsPerPage[currentPage - 1]"
        :key="product.id"
        class="card-shadow max-w-[360px] overflow-hidden rounded-[8px] duration-300 hover:scale-[1.08]"
      >
        <NuxtLink :to="`/goodStuff/detail/${product.id}`">
          <img
            class="img-shadow mb-5 aspect-[calc(360/330)] w-full object-cover object-center"
            :src="product.cover_image"
            alt="productCover"
          />
          <div class="mx-5 mb-5 flex flex-col">
            <p class="mb-3">{{ product.name }}</p>
            <p class="self-end text-[#fff986]">查看更多 <span class="text-[14px]">》》</span></p>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div class="flex-center container mb-15">
      <vue-awesome-paginate
        v-model="currentPage"
        :total-items="totalProducts"
        :items-per-page="pageSize"
        :max-pages-shown="3"
        paginate-buttons-class="size-10  hover:bg-secondary"
        active-page-class="text-yellow"
        back-button-class="back-btn"
        next-button-class="next-btn"
        @click="turnPage"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  productList: {
    type: Array,
    default() {
      return []
    }
  },
  bigcategorySelected: {
    type: String,
    required: true
  },
  smallcategorySelected: {
    type: String,
    required: true
  }
})

const router = useRouter()

const { productsPerPage, pageSize, totalProducts } = storeToRefs(useProductStore())

const currentPage = ref(1)

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

<style scoped>
.card-shadow {
  box-shadow: 2px 4px 20px 0 rgba(0, 0, 0, 0.5);
}

.img-shadow {
  box-shadow: 2px 4px -20px 0 rgba(0, 0, 0, 0.5);
}
</style>
