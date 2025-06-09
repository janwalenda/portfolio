<script setup lang="ts">
const { locale } = useI18n();
const { data: link } = await useAsyncData('header', () => {
  return queryCollection('header')
    .where('stem', '=', `${locale.value}/header`)
    .first();
});

</script>

<script lang="ts">
export default {
  name: 'AppHeader'
}
</script>
<template>
  <header class="navbar bg-base-100 font-mono border-b-neutral border-b-[1px]">
    <div class="flex flex-row flex-1">
      <div class="flex-1">
        <NuxtLink v-if="link" class="btn btn-ghost text-xl" to="/">{{ link.title }}</NuxtLink>
      </div>
      <HeaderLangSwitch />
      <label class="swap swap-rotate">
        <!-- this hidden checkbox controls the state -->
        <input type="checkbox" class="theme-controller" value="dark" >

        <!-- sun icon -->
        <Icon name="heroicons:sun" class="swap-off size-5 fill-current" />

        <!-- moon icon -->
        <Icon name="heroicons:moon" class="swap-on size-5 fill-current" />
      </label>
    </div>
    <HeaderNavVertical :nav="link!.nav" />
    <HeaderNavHorizontal :nav="link!.nav" />
  </header>
</template>
