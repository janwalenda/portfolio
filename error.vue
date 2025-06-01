<script setup lang="ts">
import type { NuxtError } from '#app';
import translations from '~/translations/error';

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
const { locale } = useI18n();

</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen gap-4">
    <p class="prose text-center">
      <h2>{{ translations[locale].title + props.error?.statusCode }}</h2>
      {{ translations[locale].message }}
    </p>
    <UButton @click="handleError">{{ translations[locale].button }}</UButton>
  </div>
</template>
