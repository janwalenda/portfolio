<script setup lang="ts">
const props = defineProps<{
  technology: string,
  skillLevel: number,
  company: string,
  role: string,
}>()
</script>
<template>
  <details class="border border-base-300 bg-base-100 rounded-box w-full">
    <summary class="p-2 grid grid-cols-[.5fr_1fr] col-start-auto gap-2.5 items-center cursor-pointer hover:bg-base-300">
      <Icon :name="`logos:${props.technology}`"/>
      <progress class="progress" :max="100" :value="props.skillLevel"/>
    </summary>
    <div class="p-2">
      <p>
        <span>{{ props.company }}</span>
        <span>{{ props.role }}</span>
      </p>
    </div>
  </details>
</template>
