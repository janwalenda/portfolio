<script lang="ts" setup>
type IFrameHeader = {
  headerType: 'iframe';
  imageUrl: string;
  title: string;
  alt: undefined;
}

type ImageHeader = {
  headerType: 'image';
  imageUrl: string;
  title: string;
  alt: string
}

const {
  headerType,
  imageUrl,
  title,
  alt,
} = defineProps<IFrameHeader | ImageHeader>();
</script>

<template>
  <div class="card card-bordered border-[1px] group hover:shadow-md transition-shadow">
    <figure>
      <iframe
        v-if="headerType === 'iframe'"
        :src="imageUrl"
        width="100%"
        height="400px"
        frameborder="0"
        allowfullscreen
        class="scale-105 group-hover:scale-100 transition-all"
      />
      <NuxtImg
        v-else-if="headerType === 'image'"
        :src="imageUrl"
        :alt="alt"
        loading="lazy"
        placeholder
        class="w-full h-auto scale-105 group-hover:scale-100 transition-all"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ComponentCard',
};
</script>
