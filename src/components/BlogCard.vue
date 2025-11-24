<script lang="ts" setup>
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
    <p>{{ description }}</p>
    <sub>{{ t('by') }} {{ author }} {{ t('on') }} {{ new Date(date).toLocaleDateString(locale) }}</sub>
    <div class="card-actions justify-end mt-4">
      <NuxtLink
        :to="`/${locale}/blog/${id}`"
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
