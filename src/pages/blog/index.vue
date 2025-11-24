<script lang="ts" setup>
import type { BlogAttributes, StrapiApiResponse } from '~/types/StrapiApiResponse';

const config = useRuntimeConfig();
const { locale } = useI18n();
const { params } = useRoute();
const slug = params.id as string;

const { value: strapiConfig } = computed(() => {
  return {
    url: config.strapiUrl,
    token: config.strapiToken,
  }
});

const requestURI = `${strapiConfig.url}/api/blogs?locale=${locale.value}&populate=*`;

console.log(requestURI);

const { data: blog } = await useAsyncData(`page:${slug}`, () =>
  $fetch<StrapiApiResponse<BlogAttributes[]>>(requestURI, {
    headers: {
      Authorization: `Bearer ${strapiConfig.token}`,
    }
  }));

console.log(blog.value)

</script>
<script lang="ts">
export default {
  name: 'BlogListPage',
};
</script>
<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
      <BlogCard
        v-for="post in blog?.data" 
        :id="post.documentId" 
        :key="post.id"
        :description="post.description!"
        :thumbnail-url="`${strapiConfig.url}${post.thumbnail.formats.medium.url}`" 
        :thumbnail-alt="post.thumbnailAlt" 
        :author="post.author" 
        :title="post.title"
        :date="post.date" />
    </div>
  </div>
</template>
