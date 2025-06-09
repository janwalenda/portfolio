<script lang="ts" setup>

const route = useRoute();
const { locale } = useI18n();

const { data: page } = await useAsyncData('page', () => {
  return queryCollection('pages')
    .where('stem', '=', `${locale.value}/pages/${route.name as string}`)
    .first();
});

if (page.value) {
  useSeoMeta({
    title: `JW \\ ${page.value.title}`,
    ogTitle: `JW \\ ${page.value.title}`,
    description: page.value.description || 'Jan Walenda \\ Frontend Developer',
    ogDescription: page.value.description || 'Jan Walenda \\ Frontend Developer',
  });
}

</script>
<script lang="ts">
export default {
  name: 'DefaultLayout'
}
</script>
<template>
  <div>
    <Header />
    <main class="p-4 bg-base-100 font-mono">
      <article v-if="page" class="prose prose-h1:text-3xl">
        <h1>{{ page.title }}</h1>
        <p>
          {{ page.description }}
        </p>
      </article>
      <slot />
      <ContentRenderer v-if="page" :value="page" tag="article" class="prose max-w-full" />
    </main>
    <Footer />
  </div>
</template>