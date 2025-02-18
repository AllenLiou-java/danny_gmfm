<template>
  <div>
    topic-class-index
    <p>{{ $route.params.topic }} / {{ $route.params.subclass }}</p>
    <NuxtLink to="/video/topic1/class1/test123">vid</NuxtLink>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
