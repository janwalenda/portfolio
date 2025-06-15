<script setup lang="ts">
const props = defineProps<{
  url: string,
}>();
</script>
<template>
  <li>
    <NuxtLink :to="props.url" class="link no-underline">
      \
      <slot />
    </NuxtLink>
  </li>
</template>