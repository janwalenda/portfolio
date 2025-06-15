<script lang="ts" setup>
const route = useRoute();
const { locale } = useI18n();
const routeNameRegex = /^[a-z]{1,}(?=_)|^[a-z]{1,}$/;

const { data: page } = await useAsyncData('page', () => {
  if (!routeNameRegex.test(route.name as string)) {
    throw new Error('Invalid route name');
  }

  const routeName = routeNameRegex.exec(route.name as string)![0];

  return queryCollection('pages')
    .where('stem', '=', `${locale.value}/pages/${routeName}`)
    .first();
}, {
  watch: [locale, route],
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