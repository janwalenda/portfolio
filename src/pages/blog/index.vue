<script lang="ts" setup>
const { locale } = useI18n();
const { data: blog } = await useAsyncData('blog:list', () => {
  return queryCollection('blog')
    .where('stem', 'LIKE', `${locale.value}/blog/%`)
    .order('date', 'DESC')
    .all();
});

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
        v-for="post in blog"
        :id="post.id"
        :key="post.id"
        :description="post.description!"
        :thumbnail-url="post.thumbnailUrl"
        :thumbnail-alt="post.thumbnailAlt"
        :author="post.author"
        :title="post.title"
        :date="post.date"
      />
    </div>
  </div>
</template>
