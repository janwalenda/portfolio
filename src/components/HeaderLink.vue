<script setup lang="ts">
const props = defineProps<{
  url: string,
}>();

const { locale } = useI18n();

</script>
<template>
  <li>
    <NuxtLink v-if="!props.url.startsWith('https')" :to="`/${locale}${props.url}`" class="link no-underline">
      \
      <slot />
    </NuxtLink>
    <NuxtLink v-if="props.url.startsWith('https')" :to="props.url" class="link no-underline">
      \
      <slot />
    </NuxtLink>
  </li>
</template>
