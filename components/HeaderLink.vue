<script setup lang="ts">
import type { VueElement } from 'vue';

    const props = defineProps<{
        url: string;
        content: string | VueElement;
    }>()
</script>
<template>
    <li>
        <a v-bind:href="props.url">{{ props.content }}</a>
    </li>
</template>