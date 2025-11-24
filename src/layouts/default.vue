<script lang="ts">
export default {
  name: "DefaultLayout",
};
</script>
<template>
  <div>
    <Header />
    <main id="maincontent" class="p-4 bg-base-100 font-mono flex flex-col items-center">

      <slot />
    </main>
    <Footer />
  </div>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: transform 200ms;
}
.page-enter-from,
.page-leave-to {
  transform: translate(-50rem, 0);
}
</style>