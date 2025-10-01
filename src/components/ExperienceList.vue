<script setup lang="ts">
const { locale, t } = useI18n();
const { data: ex } = await useAsyncData("experiences", (ctx) => {
  return queryCollection("experiences")
    .first();
}, {
  watch: [locale],
});

</script>

<script lang="ts">
export default {
  name: 'AppExperienceList'
}
</script>
<template>
  <div class="flex flex-col gap-4 my-4">
    <h2 class="text-2xl">{{ t('experience.title') }}</h2>
    <ExperienceCard v-for="(e, i) in ex?.experiences" :key="i" :technology="e.technology" :skill-level="e.skillLevel" :company="e.company" :role="e.role"/>
  </div>
</template>
<i18n lang="json">
  {
    "en": {
      "experience.title": "Experience"
    },
    "de": {
      "experience.title": "Erfahrung"
    }
  }
</i18n>
