<template>
  <div id="app">
    <UseBubble v-if="showFlog == 0" />
    <UseBubbleList v-if="showFlog == 1" />
    <UseSender v-if="showFlog == 2" />
  </div>
</template>

<script setup lang="ts">
import UseBubble from "./components/demo-useBubble.vue";
import UseBubbleList from "./components/demo-useBubbleList.vue";
import UseSender from "./components/demo-useSender.vue";
import { ref } from "vue";

const showFlog = ref(0);
</script>

<style scoped></style>
