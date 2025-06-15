<script lang="ts" setup>
import { ContentRenderer } from '#components';

const { params } = useRoute();
const { locale, t } = useI18n();

const id = params.id as string;

const { data: blog } = await useAsyncData('blog', () => {
  return queryCollection('blog')
    .where('stem', '=', `${locale.value}/blog/${id}`)
    .first();
}, {
  watch: [locale],
});

if(blog && blog.value) {
  useSeoMeta({
    articleAuthor: [blog.value.author],
    author: blog.value.author,
    title: `JW \\ ${blog.value.title}`,
    description: blog.value.description,
  })
}
</script>

<script lang="ts">
export default {
  name: 'BlogPost',
};
</script>

<template>
  <div class="prose prose-xl prose-h1:text-3xl font-mono">
    <ContentRenderer v-if="blog" tag="article" :value="blog" />
    <div v-else>
      {{ t('not found') }}
    </div>
  </div>
</template>

<i18n lang="json">
  {
    "de": {
      "not found": "Nicht gefunden"
    },
    "en": {
      "not found": "Not Found"
    },
    "ja": {
      "not found": "見つかりません"
    }
  }
</i18n>