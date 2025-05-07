<docs>
---
title: 基础用法。
---

最简化的集成方式。
</docs>

<script setup lang="ts">
const content = ref('hello world !')
</script>

<template>
  <ClientOnly>
    <Bubble :content="content" />
  </ClientOnly>
</template>
