<script lang="ts" setup>
import { getBlogName } from "~/helpers/getBlogName";

const { t, locale } = useI18n();

defineProps<{
  id: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  title: string;
  description: string;
  author: string;
  date: string;
}>();
</script>

<template>
  <Card
    header-type="image"
    :image-url="thumbnailUrl"
    :title="title"
    :alt="thumbnailAlt"
  >
    <p>
      {{ description }}
    </p>
    <p class="text-xs flex flex-col">
      <span>{{ t('by') }} {{ author }} {{ t('on') }} </span> 
      <span>{{ new Date(date).toLocaleDateString(locale) }}</span>
    </p>
    <div class="card-actions justify-end mt-4">
      <NuxtLink
        :to="`/${locale}/blog/${getBlogName(id)}`"
        class="btn btn-primary"
      >
        {{ t("button") }}
      </NuxtLink>
    </div>
  </Card>
</template>
<i18n>
  {
    "en": {
      "button": "Learn More",
      "by": "by",
      "on": "on"
    },
    "de": {
      "button": "Mehr Erfahren",
      "by": "von",
      "on": "am"
    }
  }
</i18n>
