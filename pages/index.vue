<template>
  <div>
    <h1 class="font-bold underline">Hello world!</h1>
    <h1 class="font-poppins">This headline will use Poppins.</h1>
    <button class="bg-sky-700 hover:bg-sky-800 px-4 py-2 text-white sm:px-8 sm:py-3">123</button>
    <button class="btn-primary">Save changes</button>

    <div class="3xl:grid-cols-6 grid grid-cols-2 md:grid-cols-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore officiis quod ea laudantium
      perferendis rerum sunt hic, inventore esse pariatur iure eum odio ratione incidunt, ipsa ullam
      expedita doloribus nostrum. Enim blanditiis minima eos velit quasi, quae necessitatibus
      voluptates asperiores corrupti incidunt at fugit unde laudantium ullam nisi itaque sed cum
      suscipit veniam sit et. Assumenda possimus ipsum molestias quisquam.
    </div>

    <p>大家好，歡迎支持</p>
    <p class="font-notoSansTC">大家好，歡迎支持</p>

    <div class="hover:content-auto hover:bg-yellow">123456</div>

    <ul class="**:data-avatar:size-12 **:data-avatar:rounded-full">
      <li>
        <div data-avatar>123</div>
        <p data-avatar>456</p>
      </li>
    </ul>

    <p class="my-element text-yellow">test breakpoint</p>

    <div class="@container">
      <div class="flex flex-col @md:flex-row">
        <div class="h-12 w-12">1</div>
        <div class="size-12">2</div>
        <div class="h-12 w-12">3</div>
        <div class="h-12 w-12">4</div>
      </div>
      <ul>
        <li>test1</li>
        <li>test2</li>
        <li>test3</li>
      </ul>
    </div>

    <hr />

    <a href="#">test a tag</a>
    <img
      src="https://www.google.com.tw/logos/doodles/2025/lantern-festival-2025-6753651837110608.5-ldrk.png"
      alt=""
    />
    <Icon name="mdi:menu-down" size="48" class="text-yellow" />
    <Icon name="my-icon:fb" class="cursor-pointer duration-100 hover:text-5xl" />
  </div>
</template>

<script setup>
const productStore = useProductStore()
onMounted(() => {
  console.log(productStore.productList)
})

const { data } = await useFetch('/api/airtable/product')

console.log(data.value)
</script>

<style lang="scss" scoped></style>
