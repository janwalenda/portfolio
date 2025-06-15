<script setup lang="ts">
const route = useRoute();
const { locales, locale, setLocale } = useI18n();

const localeMap = locales.value.map((l) => ({
  code: l.code,
  label: l.name,
  href: route.path.replace(`/${locale.value}`, `/${l.code}`),
}));

const localeRef = ref(localeMap);
</script>

<template>
  <details>
    <summary class="btn btn-ghost">
      <Icon name="heroicons:globe-alt" class="size-5" />
    </summary>
    <ul class="absolute menu dropdown-content bg-base-100 max-sm:right-4 z-40 p-2 border-[1px] border-neutral">
      <li v-for="item in localeRef" :key="item.code">
        <button class="btn btn-ghost" @click="setLocale(item.code)">{{ item.label }}</button>
      </li>
    </ul>
  </details>
</template>
