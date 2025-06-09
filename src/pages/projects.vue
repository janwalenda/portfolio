<script lang="ts" setup>
const { locale } = useI18n();

const { data } = await useAsyncData('projects', () => {
  return queryCollection('projects')
    .where('stem', 'LIKE', `${locale.value}/projects/%`)
    .order('name', 'ASC')
    .all();
});


</script>
<script lang="ts">
export default {
  name: 'ProjectsPage',
};
</script>
<template>
  <div class="font-mono">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProjectCard v-for="project in data" :key="project.id" :project="project" />
    </div>
  </div>
</template>