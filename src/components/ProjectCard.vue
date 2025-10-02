<script lang="ts" setup>
import Card from './Card.vue';

defineProps<{
  project: {
    name: string;
    url: string;
    github: string;
    description: string;
  }
}>();

</script>
<template>
<Card header-type="iframe" :image-url="project.url" :title="project.name" :alt="undefined">
    <p>{{ project.description }}</p>
    <div class="card-actions justify-end">
      <a :href="project.github" class="btn btn-neutral rounded-none card shadow-none">
        <Icon name="cib:github" class="size-5" />
      </a>
      <a :href="project.url" class="btn btn-primary rounded-none card shadow-none">
        <Icon name="ion:arrow-forward-outline" class="size-5" />
      </a>
    </div>
  </Card>
</template>
