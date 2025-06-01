<script setup lang="ts">
import * as locales from '@nuxt/ui/locale';

const { locale } = useI18n();

useSeoMeta({
  title: 'Jan Walenda',
  ogTitle: 'Jan Walenda',
  description: 'Jan Walenda / Frontend Developer',
  ogDescription: 'Jan Walenda / Frontend Developer',
  charset: "utf-8",
  ogLocaleAlternate: [
    'de_DE',
    'en_UK',
    'ja_JP',
  ],
});

const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

useHead({
  htmlAttrs: {
    lang,
    dir
  }
})
</script>

<template>
  <UApp :locale="locales[locale]">
    <NuxtLayout>
      <NuxtLoadingIndicator/>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>