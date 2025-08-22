<script lang="ts" setup>
const { locale } = useI18n();
const { data: blog } = await useAsyncData('blog', () => {
  return queryCollection('blog')
    .where('stem', 'LIKE', `${locale.value}/blog/%`)
    .order('date', 'DESC')
    .all();
});

const blogNameRegex = /(?<=\/)(\w+)(?=.md)/;

function getName(id: string): string {
  if(blogNameRegex.test(id)) {
    const match = blogNameRegex.exec(id);

    return  match && match.length > 0 ? match[0] : '';
  }

  return '';
}

</script>
<script lang="ts">
export default {
  name: 'BlogListPage',
};
</script>
<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="post in blog" :key="post.id" class="p-4 bg-base-100 border-base-300 border-[1px]">
        <h2 class="text-xl font-bold">{{ post.title }}</h2>
        <p class="text-sm text-gray-600">{{ new Date(post.date || '').toLocaleDateString(locale) }}</p>
        <p>{{ post.description }}</p>
        <NuxtLink :to="`/${locale}/blog/${getName(post.id)}`" class="text-blue-500 hover:underline">
          Read more
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
