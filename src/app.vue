<script setup lang="ts">
useSeoMeta({
  title: 'Jan Walenda',
  ogTitle: 'Jan Walenda',
  description: 'Jan Walenda / Frontend Developer',
  ogDescription: 'Jan Walenda / Frontend Developer',
  charset: "utf-8",
  ogLocaleAlternate: [
    'de-DE',
    'en-UK',
    'ja-JP',
  ],
});

const i18nHead = useLocaleHead({
  seo: {
    canonicalQueries: ['foo']
  }
})

if (i18nHead.value.htmlAttrs) {
  useHead(() => ({
    htmlAttrs: {
      ...i18nHead.value.htmlAttrs,
      'data-theme': 'light',
    },
    link: [...(i18nHead.value.link || [])],
    meta: [...(i18nHead.value.meta || [])]
  }))
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>