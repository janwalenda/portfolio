<script setup lang="ts">
import type { NavigationAttributes, StrapiApiResponse } from '~/types/StrapiApiResponse';
import HeaderThemeSwitch from './HeaderThemeSwitch.vue'

const config = useRuntimeConfig();
const { locale } = useI18n();

const { value: strapiConfig } = computed(() => {
  return {
    url: config.strapiUrl,
    token: config.strapiToken,
    locale,
  }
});

const requestURI = `${strapiConfig.url}/api/header?populate=*&locale=${locale.value}`;

console.log(requestURI);

const { data: header } = await useAsyncData(`header`, () => 
  $fetch<StrapiApiResponse<NavigationAttributes>>(requestURI, {
    headers: {
      Authorization: `Bearer ${strapiConfig.token}`,
    }
}), {
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
        <NuxtLink v-if="header && header.data.locale === locale" class="btn btn-ghost text-xl" :to="`/${locale}/`">
          {{ header.data.title }}
        </NuxtLink>
      </div>
      <HeaderLangSwitch />
      <HeaderThemeSwitch />
    </div>
    <HeaderNavVertical v-if="header && header.data.navigation" :nav="header.data.navigation" />
    <HeaderNavHorizontal v-if="header && header.data.navigation" :nav="header.data.navigation"  />
  </header>
  <header class="navbar invisible">
    <div class="flex flex-row flex-1">
      <div class="flex-1">
        <NuxtLink v-if="header && header.data.title" class="btn btn-ghost text-xl" :href="`/${locale}/`">
          {{ header.data.title }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
