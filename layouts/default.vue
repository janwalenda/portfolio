<script lang="ts" setup>
const route = useRoute();
const { locale } = useI18n();



const { data: link } = await useAsyncData('header', () => {
  
  return queryCollection('header')
    .where('stem', '=', `${locale.value}/header`)
    .first();
});

let name = '';
const nameRegex = new RegExp(/(.*)(?=___[a-z]{2})/);

if(typeof route.name === 'string' && nameRegex.test(route.name)) {
  const match = route.name.match(nameRegex);
  name = match![0];
}

const { data: page } = await useAsyncData('page', () => {
  return queryCollection('pages')
    .where('stem', '=', `${locale.value}/pages/${name}`)
    .first();
});
</script>
<template>
  <Header>
    <HeaderLink v-for="item in link?.nav" :url="item.url!">
      <UIcon v-if="item.icon" :name="item.icon" />
      <span v-if="item.label">{{ item.label }}</span>
    </HeaderLink>
  </Header>
  <main class="p-4 bg-base-100 font-mono">
    <article class="prose prose-h1:text-3xl">
      <h1>{{ page?.title }}</h1>
      <p>
        {{ page?.description }}
      </p>
    </article>
    <slot />
  </main>
  <Footer />
</template>