<script lang="ts" setup>
import type { BlogAttributes, StrapiApiResponse } from '~/types/StrapiApiResponse';

const config = useRuntimeConfig();
const { locale, t } = useI18n();
const { params } = useRoute();
const slug = params.id as string;

const { value: strapiConfig } = computed(() => {
  return {
    url: config.strapiUrl,
    token: config.strapiToken,
    locale,
  }
});

const requestURI = `${strapiConfig.url}/api/blogs/${slug}?populate=*`;

console.log(requestURI);

const { data: blog } = await useAsyncData(`page:${slug}`, () => 
  $fetch<StrapiApiResponse<BlogAttributes>>(requestURI, {
    headers: {
      Authorization: `Bearer ${strapiConfig.token}`,
    }
}));

if(!blog.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('not found'),
  });
}

const getThumbnail = () => {
  if(!blog.value) {
    return;
  }
  return blog.value.data.thumbnail;
}

if(blog.value) {
  useServerSeoMeta({
    articleAuthor: [blog.value.data.author],
    ogImage: {
      url: strapiConfig.url + getThumbnail()?.formats.small.url,
      alt: getThumbnail()?.alternativeText,
      width: getThumbnail()?.formats.small.width,
      height: getThumbnail()?.formats.small.height
    },
    author: blog.value.data.author,
    title: `JW \\ ${blog.value.data.title}`,
    description: blog.value.data.description,
    articleTag: blog.value.data.tags.map(t => t.tag),
  })
}
</script>

<template>
  <div class="prose prose-xl prose-h1:text-3xl font-mono">
    <article v-if="blog" class="prose prose-h2:text-2xl max-w-fit">
      <h1>
        {{ blog.data.title }}
      </h1>
      <NuxtImg v-if="blog.data.thumbnail" :alt="blog.data.thumbnail.alternativeText" :src="`${strapiConfig.url}${blog.data.thumbnail.formats.large.url}`" :preload="true" class="w-full" />
      <h2>{{ t('content') }}</h2>
    </article>
    <MDC v-if="blog" tag="article" :value="blog.data.content" class="prose prose-h2:text-2xl max-w-full" />
    <div v-else>
      {{ t('not found') }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PageBlogPost',
};
</script>

<i18n lang="json">
  {
    "de": {
      "not found": "Blog-Eintrag nicht gefunden"
    },
    "en": {
      "not found": "Blog-Post not Found"
    }
  }
</i18n>
