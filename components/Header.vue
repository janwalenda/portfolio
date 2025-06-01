<script setup lang="ts">
import * as locales from '@nuxt/ui/locale';
const route = useRoute();
const { locale, locales: localesArray } = useI18n();

const { data: link } = await useAsyncData('header', () => {
  return queryCollection('header')
    .where('stem', '=', `${locale.value}/header.json`)
    .first();
});

const localeMap = localesArray.value.map((l) => ({
  code: l.code,
  label: locales[l.code].name,
  href: route.path.replace(`/${locale.value}`, `/${l.code}`),
}));

const localeRef = ref(localeMap);

</script>

<template>
  <header class="navbar bg-base-100 font-mono border-b-neutral border-b-[1px]">
    <div class="flex flex-row flex-1">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/">{{ link?.title }}</a>
      </div>
      <details>
        <summary class="btn btn-ghost">
          <Icon name="i-heroicons:globe-alt-solid" class="size-5" />
        </summary>
        <ul class="absolute menu dropdown-content bg-base-100 max-sm:right-4 z-40 p-2 border-[1px] border-neutral">
          <li v-for="item in localeRef">
            <a :href="item.href">{{ item.label }}</a>
          </li>
        </ul>
      </details>
    </div>
    <details>
      <summary class="max-sm:btn hidden btn-ghost">
        <Icon name="i-heroicons:bars-3-solid" class="size-5" />
      </summary>
      <nav class="flex not-odd:flex-none max-sm:absolute right-4 bg-base-100 z-1 max-sm:border-[1px] max-sm:border-neutral">
        <ul class="menu menu-horizontal max-sm:menu-vertical">
          <slot></slot>
        </ul>
      </nav>
    </details>
    <nav class="max-sm:hidden flex not-odd:flex-none max-sm:absolute right-4 bg-base-100 z-1 max-sm:border-[1px] max-sm:border-neutral">
      <ul class="menu menu-horizontal max-sm:menu-vertical">
        <slot></slot>
      </ul>
    </nav>
  </header>
</template>
