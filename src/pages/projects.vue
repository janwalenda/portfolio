<script lang="ts" setup>
const { locale } = useI18n();

const { data } = await useAsyncData('projects', () => {
  return queryCollection('projects')
    .where('stem', 'LIKE', `projects/%`)
    .select(locale.value)
    .all()
}, {
  watch: [locale],
});
</script>
<script lang="ts">
export default {
  name: 'ProjectsPage',
};
</script>
<template>
  <div class="font-mono">
    <div class="grid grid-cols-1 justify-center gap-4">
      <ProjectCard v-for="project in data" :key="project[locale].github" :project="project[locale]" />
    </div>
  </div>
</template>
