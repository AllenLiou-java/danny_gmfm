<template>
  <div>
    <div
      class="nav-space h-90 bg-[url(~/assets/images/banner/banner-goodstuff-mobile-bg.png)] bg-cover bg-center bg-no-repeat md:bg-[url(~/assets/images/banner/banner-goodstuff-bg.png)]"
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
    <div class="container">
      <ul>
        <li v-for="bigcategory in codeProductBigcategoryList" :key="bigcategory.id">
          <NuxtLink :to="`/goodStuff/${bigcategory.label_en}/all?page=1`">
            <span>{{ bigcategory.label }}</span>
          </NuxtLink>
        </li>
      </ul>
      <!-- <ul>
        <li v-for=""></li>
      </ul> -->
    </div>
    <h1>product list page</h1>
    <div>goodStuff>{{ $route.params.topclass }}>{{ $route.params.subclass }}</div>
    <p>{{ codeProductBigcategoryList }}</p>
    <p>{{ codeProductSmallcategoryList }}</p>
  </div>
</template>

<script setup>
const { codeProductBigcategoryList, codeProductSmallcategoryList } = storeToRefs(useProductStore())
</script>

<style lang="scss" scoped></style>
