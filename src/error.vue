<script setup lang="ts">
import type { NuxtError } from '#app';
const { back } = useRouter();
const { t } = useI18n();

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => {
  back();
}

</script>
<script lang="ts">
export default {
  name: 'NuxtError',
}
</script>

<template>
  <NuxtLayout>
    <div
      v-if="props.error"
      class="flex flex-col flex-1 items-center justify-center h-screen gap-4 prose prose-xl max-w-full text-center">
      <article>
        <h2>
          <span>{{ t('this is an error') }}</span>
          <span>: {{ props.error.statusCode }}</span>
        </h2>
        <p>
          {{ props.error.message }}
        </p>
      </article>
      <button class="btn btn-error" @click="handleError">{{ t('back to homepage') }}</button>
    </div>
    <div v-else class="flex flex-col items-center justify-center h-screen gap-4 prose text-center">
      <button class="btn btn-error" @click="handleError">{{ t('back to homepage') }}</button>
    </div>
  </NuxtLayout>
</template>
