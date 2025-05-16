<template>
  <div class="relative sm:flex sm:flex-col sm:items-center">
    <!-- sm:flex sm:flex-col sm:items-center -->
    <p class="mb-3">百岳經歷</p>

    <ul class="ml-6 inline-block sm:mx-auto sm:translate-x-[calc(50%)]">
      <li
        v-for="(record, idx) in records"
        :key="record.year"
        class="relative -mt-4 flex flex-col pt-4 first:mt-0 first:pt-[38px]"
        :class="(idx + 1) % 2 === 1 ? 'sm:-translate-x-[calc(100%-10px)]' : ''"
      >
        <div
          id="line"
          v-gsap.whenVisible.from.once.reversible="{ opacity: 0, height: 0 }"
          class="absolute top-0 left-[2px] h-full w-[6px] rounded-full bg-white"
          :class="(idx + 1) % 2 === 1 ? 'sm:left-[calc(100%-8px)]' : ''"
        ></div>
        <div
          class="relative flex items-center gap-x-6"
          :class="(idx + 1) % 2 === 1 ? 'sm:flex-row-reverse' : ''"
        >
          <div class="flex items-center" :class="(idx + 1) % 2 === 1 ? 'sm:flex-row-reverse' : ''">
            <div
              id="circle"
              v-gsap.whenVisible.from.once.reversible="{ opacity: 0, scale: 0 }"
              class="z-10 size-[10px] rounded-full bg-yellow shadow-[0px_0px_0px_5px_rgba(251,255,158,0.4)]"
            ></div>
            <div
              id="branch"
              v-gsap.whenVisible.from.once.reversible.delay-300="{
                opacity: 0,

                width: 0
              }"
              class="h-[1px] w-[150px] bg-yellow"
            ></div>
          </div>

          <p
            v-gsap.whenVisible.from.once.reversible.delay-600="{
              opacity: 0,

              y: '50%'
            }"
            class="mt-1 font-paintinfChoco text-[24px] leading-[1] text-yellow"
          >
            {{ record.year }}
          </p>
        </div>
        <ul
          v-gsap.whenVisible.from.once.reversible="{
            opacity: 0,

            x: '-50%'
          }"
          class="max-w-[228px] self-end pt-[22px] pb-[38px]"
          :class="(idx + 1) % 2 === 1 ? 'sm:self-start' : ''"
        >
          <li v-for="content in record.contents" :key="content" class="text-wrap">
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
