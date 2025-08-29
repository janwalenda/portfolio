<script setup lang="ts">
defineProps<{nav: {
    url: string;
    label?: string | undefined;
    icon?: string | undefined;
}[]}>();
</script>

<template>
  <nav
    class="max-sm:hidden flex not-odd:flex-none max-sm:absolute right-4 z-1 max-sm:border-[1px] max-sm:border-neutral">
    <ul v-if="nav" class="menu menu-horizontal max-sm:menu-vertical">
      <HeaderLink v-for="item in nav" :key="item.url" :url="item.url!">
        <Icon v-if="item.icon" :name="item.icon" />
        <span v-if="item.label">{{ item.label }}</span>
      </HeaderLink>
    </ul>
  </nav>
</template>
