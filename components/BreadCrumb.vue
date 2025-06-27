<template>
  <ul class="flex flex-wrap">
    <li v-for="(routeItem, idx) in routeList" :key="idx">
      <NuxtLink :to="routeItem.route">{{ routeItem.labelName }}</NuxtLink>
      <span v-if="routeList.length - 1 > idx">></span>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  bigcategory: {
    type: [Object, null],
    default: () => ({
      labelName: '',
      route: ''
    })
  },
  smallcategory: {
    type: [Object, null],
    default: () => ({
      labelName: '',
      route: ''
    })
  },
  title: {
    type: [String, null],
    required: true
  }
})

const routeList = computed(() => {
  const route = [
    {
      labelName: '首頁',
      route: '/'
    }
  ]

  if (props.bigcategory.labelName) {
    route.push({
      labelName: props.bigcategory.labelName,
      route: props.bigcategory.route
    })
  }

  if (props.smallcategory.labelName) {
    route.push({
      labelName: props.smallcategory.labelName,
      route: props.smallcategory.route
    })
  }

  if (props.title) {
    route.push({
      labelName: props.title,
      route: ''
    })
  }

  return route
})
</script>

<style lang="scss" scoped></style>
