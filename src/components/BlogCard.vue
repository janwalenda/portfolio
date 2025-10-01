<script lang="ts" setup>
import type { BlogCollectionItem } from '@nuxt/content';

  const { t, locale } = useI18n();
  const props = defineProps<{
    title?: string,
    description?: string,
    imageUrl?: string,
    imageAlt?: string,
    post?: BlogCollectionItem
  }>()

  const blogNameRegex = /(?<=\/)(\w+)(?=.md)/;

  function getName(id?: string): string {
    if(id && blogNameRegex.test(id)) {
      const match = blogNameRegex.exec(id);

      return  match && match.length > 0 ? match[0] : '';
    }

    return '';
  }
</script>
<template>
<div class="card bg-base-100 w-96 shadow-sm">
  <figure>
    <NuxtImg :src="props.imageUrl" :alt="props.imageAlt" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">{{ props.title }}</h2>
    <p>{{ props.description }}</p>
    <div class="card-actions justify-end">
      <NuxtLink :to="`/${locale}/blog/${getName(props.post?.id)}`" class="btn btn-primary">
        {{ t('button') }}
      </NuxtLink>
    </div>
  </div>
</div>
</template>
<i18n>
  {
    "en": {
      "button": "Learn More"
    },
    "de": {
      "button": "Mehr Erfahren"
    }
  }
</i18n>
