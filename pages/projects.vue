<script lang="ts" setup>
const route = useRoute();

const { data } = await useAsyncData('projects', () => {
  return queryCollection('projects')
    .order('name', 'ASC')
    .all();
});
</script>
<template>
  <div class="font-mono">
    <h1 class="text-2xl mb-4">Projects</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <a v-for="project in data" class="card card-bordered border-[1px] border-black rounded-none" :href="project.url">
        <figure>
          <iframe :src="project.url" width="100%" height="200px" frameborder="0" allowfullscreen></iframe>
          <figcaption class="absolute top-4 left-4 bg-white px-4 py-2 border-[1px] border-black">
            <h2 class="text-lg">{{ project.name }}</h2>
          </figcaption>
        </figure>
        <div class="card-body">
          <p>{{ project.description }}</p>
          <div class="card-actions justify-end">
            <a :href="project.github" class="btn btn-neutral rounded-none card">
              <Icon name="cib:github" class="size-5" />
            </a>
          </div>
        </div>

      </a>
    </div>
  </div>
</template>