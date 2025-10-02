<script lang="ts" setup>
import { ContentRenderer } from '#components';

const { params } = useRoute();
const { locale, t } = useI18n();

const id = params.id;

const { data: blog } = await useAsyncData(`blog:page:${id}`, () => {
  return queryCollection('blog')
    .where('stem', '=', `${locale.value}/blog/${id}`)
    .first();
}, {
  watch: [locale],
});

if(!blog.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('not found'),
  });
}

if(blog.value) {
  useServerSeoMeta({
    articleAuthor: [blog.value.author],
    author: blog.value.author,
    title: `JW \\ ${blog.value.title}`,
    description: blog.value.description,
    articleTag: blog.value.tags,
  })
}
</script>

<template>
  <div class="prose prose-xl prose-h1:text-3xl font-mono">
    <article v-if="blog" class="prose prose-h2:text-2xl max-w-fit">
      <h1>
        {{ blog.title}}
      </h1>
      <NuxtImg v-if="blog.tags" :src="blog.thumbnailUrl" class="w-full" />
      <h2>{{t('content')}}</h2>
      <ul>
        <li
          v-for="link in blog.body.toc?.links ?? []"
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
    <ContentRenderer v-if="blog" tag="article" :value="blog" class="prose prose-h2:text-2xl max-w-full" />
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
