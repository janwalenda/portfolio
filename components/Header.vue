<script setup lang="ts">

const links = [{
    label: 'Docs',
    icon: 'i-heroicons-book-open',
    to: '/getting-started'
}, {
    label: 'Pro',
    icon: 'i-heroicons-square-3-stack-3d',
    to: '/pro'
}, {
    label: 'Releases',
    icon: 'i-heroicons-rocket-launch',
    to: '/releases'
}]
</script>

<template>
    <header class="navbar bg-base-100 font-mono border-b-black border-b-[1px]">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl">_janWalenda</a>
        </div>
        <nav class="flex-none">
            <ul class="menu menu-horizontal">
                <slot></slot>
            </ul>
        </nav>
    </header>
</template>
