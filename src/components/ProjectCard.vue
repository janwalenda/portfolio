<script lang="ts" setup>
defineProps<{
  project: {
    name: string;
    url: string;
    github: string;
    description: string;
  };
}>();
</script>
<template>
  <a class="card card-bordered border-[1px] border-black rounded-none" :href="project.url">
    <figure>
      <iframe :src="project.url" width="100%" height="200px" frameborder="0" allowfullscreen />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ project.name }}</h2>
      <p>{{ project.description }}</p>
      <div class="card-actions justify-end">
        <a :href="project.github" class="btn btn-neutral rounded-none card shadow-none">
          <Icon name="cib:github" class="size-5" />
        </a>
      </div>
    </div>

  </a>
</template>