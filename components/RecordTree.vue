<template>
  <div class="relative inline-block sm:left-[50%] sm:-translate-x-[100%]">
    <p
      v-gsap.whenVisible.from.once.reversible="{ opacity: 0, y: '-100%' }"
      class="relative md:-left-6 md:translate-x-[100%]"
    >
      百岳經歷
    </p>

    <ul class="mt-3 ml-6 inline-block pt-10 sm:ml-0 sm:pt-12">
      <li
        v-for="(record, idx) in records"
        :key="record.year"
        class="relative flex flex-col items-end"
        :class="(idx + 1) % 2 === 1 ? 'sm:left-5 sm:rotate-y-[180deg]' : 'sm:translate-x-[100%]'"
      >
        <div
          v-gsap.whenVisible.from.once.reversible="{ opacity: 0, start: 'top 70%', height: 0 }"
          class="absolute top-0 left-[7px] h-[calc(100%+42px)] w-[6px] self-start rounded-full bg-white"
        ></div>

        <div class="flex items-center self-start">
          <div
            v-gsap.whenVisible.from.once.reversible="{ opacity: 0, start: 'top 70%', scale: 0 }"
            class="z-10 m-[5px] size-[10px] rounded-full bg-yellow shadow-[0px_0px_0px_5px_rgba(251,255,158,0.4)]"
          ></div>
          <div
            v-gsap.whenVisible.from.once.reversible.delay-300="{
              opacity: 0,
              start: 'top 70%',
              width: 0
            }"
            class="h-[1px] w-[100px] bg-yellow sm:w-[150px]"
          ></div>
          <p
            v-gsap.whenVisible.from.once.reversible.delay-600="{
              opacity: 0,
              start: 'top 70%',
              y: '50%'
            }"
            class="mx-3 mt-[3px] font-paintinfChoco text-[24px] leading-[1] text-yellow sm:mx-6"
            :class="(idx + 1) % 2 === 1 ? 'sm:rotate-y-[180deg]' : ''"
          >
            {{ record.year }}
          </p>
        </div>

        <ul
          v-gsap.whenVisible.from.once.reversible="{
            opacity: 0,
            start: 'top 70%',
            x: '-50%'
          }"
          class="mx-3 inline-block pt-4 pb-10 text-[14px] sm:mx-6 sm:pt-[22px] sm:text-[16px]"
          :class="(idx + 1) % 2 === 1 ? 'sm:rotate-y-[180deg]' : ''"
        >
          <li v-for="content in record.contents" :key="content" class="max-w-40 sm:max-w-50">
            {{ content }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  mountainList: {
    type: Array,
    required: true
  }
})

const records = computed(() => {
  return Object.entries(
    props.mountainList.reduce((acc, { year, content }) => {
      if (!acc[year]) acc[year] = []
      acc[year].push(content)
      return acc
    }, {})
  )
    .map(([year, contents]) => ({
      year: Number(year),
      contents
    }))
    .sort((a, b) => b.year - a.year)
})
</script>

<style lang="scss" scoped></style>
