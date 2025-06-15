<script setup lang="ts">
import HeaderThemeSwitch from './HeaderThemeSwitch.vue'
const { locale } = useI18n();
const { data: link } = await useAsyncData('header', (ctx) => {
  return queryCollection('header')
    .select(locale.value)
    .first();
}, {
  watch: [locale],
});

</script>

<script lang="ts">
export default {
  name: 'AppHeader'
}
</script>
<template>
  <header class="navbar bg-base-100 font-mono border-b-neutral border-b-[1px]">
    <div class="flex flex-row flex-1">
      <div class="flex-1">
        <NuxtLink v-if="link" class="btn btn-ghost text-xl" :href="`/`">{{ link[locale].title }}</NuxtLink>
      </div>
      <HeaderLangSwitch />
      <HeaderThemeSwitch />
    </div>
    <HeaderNavVertical v-if="link" :nav="link[locale].nav" />
    <HeaderNavHorizontal v-if="link" :nav="link[locale].nav" />
  </header>
</template>
