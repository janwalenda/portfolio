<script setup lang="ts">
    import { defineProps } from 'vue';
const props = defineProps < {
    url: string,
} >();
</script>
<template>
    <li>
        <a :href="props.url" class="link no-underline">
            \ <slot></slot>
        </a>
    </li>
</template>