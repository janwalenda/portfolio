<script setup lang="ts">
const { locales, locale } = useI18n();

const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
  <details>
    <summary class="btn btn-ghost">
      <Icon name="heroicons:globe-alt" class="size-5" />
    </summary>
    <ul class="absolute menu dropdown-content bg-base-100 max-sm:right-4 z-40 p-2 border-[1px] border-neutral">
      <li v-for="availableLocale in availableLocales" :key="availableLocale.code">
        <NuxtLink :to="switchLocalePath(availableLocale.code)">
          {{ availableLocale.name }}
        </NuxtLink>
      </li>
    </ul>
  </details>
</template>
