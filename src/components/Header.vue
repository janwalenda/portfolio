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
  <header class="navbar bg-base-100/30 backdrop-blur-lg font-mono border-b-neutral border-b-[1px] fixed z-50">
    <div class="flex flex-row flex-1">
      <div class="flex-1">
        <NuxtLink v-if="link && link[locale] && link[locale].title" class="btn btn-ghost text-xl" :to="`/${locale}/`">{{ link[locale].title }}</NuxtLink>
      </div>
      <HeaderLangSwitch />
      <HeaderThemeSwitch />
    </div>
    <HeaderNavVertical v-if="link && link[locale] && link[locale].nav" :nav="link[locale].nav" />
    <HeaderNavHorizontal v-if="link && link[locale] && link[locale].nav" :nav="link[locale].nav" />
  </header>
  <header class="navbar invisible">
    <div class="flex flex-row flex-1">
      <div class="flex-1">
        <NuxtLink v-if="link && link[locale] && link[locale].title" class="btn btn-ghost text-xl" :href="`/${locale}/`">{{ link[locale].title }}</NuxtLink>
      </div>
    </div>
  </header>
</template>
