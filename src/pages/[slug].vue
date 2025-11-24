<script lang="ts" setup>
import type { PageAttributes, StrapiApiResponse } from '~/types/StrapiApiResponse';
const config = useRuntimeConfig();
const { locale } = useI18n();
const { params } = useRoute();
const slug = params.slug as string;

const { value: strapiConfig } = computed(() => {
  return {
    url: config.strapiUrl,
    token: config.strapiToken,
    locale,
  }
});

const { data: page } = await useAsyncData(`page:${slug}`, () => 
  $fetch<StrapiApiResponse<PageAttributes>>(`${strapiConfig.url}/api/page/${slug}?locale=${locale}`, {
    headers: {
      Authorization: `Bearer ${strapiConfig.token}`,
    }
}));

if (page.value) {
  useSeoMeta({
    title: `JW \\ ${page.value.data.title}`,
    ogTitle: `JW \\ ${page.value.data.title}`,
    description: page.value.data.description || "Jan Walenda \\ Frontend Developer",
    ogDescription:
      page.value.data.description || "Jan Walenda \\ Frontend Developer",
  });
}
</script>

<template>
  <div v-if="page" class="container lg:max-w-1/2">
    <h1 class="text-4xl">{{ page.data.title }}</h1>
    <p class="italic">{{ page.data.description }}</p>

    <MDC :value="page.data.content" class="prose max-w-full" tag="article" />
  </div>
</template>
