<template>
  <div>
    {{ path }}
  </div>
</template>

<script setup>
const { code_video_category, code_video_area, code_video_relatedTopic } = getVideoRoute()
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  subclass: {
    type: String,
    required: true
  },
  relatedTopic: {
    type: String,
    default: '0'
  },
  title: {
    type: String,
    required: true
  }
})

const path = computed(() => {
  const codeTopic = props.topic
  const codeSubclass = props.subclass
  const title = props.title
  const codeRelatedTopic = props.relatedTopic

  const topic = code_video_category.filter((item) => item.id === codeTopic)[0].value

  const subclass = code_video_area.filter((item) => item.id === codeSubclass)[0]?.value

  if (props.type === 'video' && codeTopic === '3') {
    const relatedTopic = code_video_relatedTopic.filter((item) => item.id === codeRelatedTopic)[0]
      ?.value

    return `首頁 > ${topic} > ${relatedTopic} > ${title}`
  } else {
    return `首頁 >${topic}/${subclass} > ${title}`
  }
})
</script>

<style lang="scss" scoped></style>
