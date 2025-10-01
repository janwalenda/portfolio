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
    articleTag: blog.value.tags,
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
    <h1>
      {{ blog?.title}}
    </h1>
    <article v-if="blog && blog?.body.toc?.links && blog?.body.toc?.links.length > 0" class="prose prose-h2:text-2xl">
      <h2>{{t('content')}}</h2>
      <ul>
        <li
          v-for="link in blog?.body?.toc?.links ?? []"
          :key="link.id"
        >
          <NuxtLink :to="`#${link.id}`" class="link link-primary">
            {{ link.text }}
          </NuxtLink>
          <ul v-if="Array.isArray(link.children) && link.children.length > 0">
            <li
              v-for="child in link.children"
              :key="child.id"
            >
              <NuxtLink :to="`#${child.id}`" class="link link-secondary">
                {{ child.text }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </article>
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
