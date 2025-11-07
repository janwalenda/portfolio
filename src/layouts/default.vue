<script lang="ts" setup>
const route = useRoute();
const { locale, t } = useI18n();
const routeNameRegex = /^[a-z]{1,}(?=_)|^[a-z]{1,}$/;

const { data: page } = await useAsyncData(
  `page:${route}`,
  () => {
    if (!routeNameRegex.test(route.name as string)) {
      throw new Error("Invalid route name");
    }

    const routeName = routeNameRegex.exec(route.name as string)![0];

    return queryCollection("pages")
      .where("stem", "=", `${locale.value}/pages/${routeName}`)
      .first();
  },
  {
    watch: [locale, route],
  },
);

if (page.value) {
  useSeoMeta({
    title: `JW \\ ${page.value.title}`,
    ogTitle: `JW \\ ${page.value.title}`,
    description: page.value.description || "Jan Walenda \\ Frontend Developer",
    ogDescription:
      page.value.description || "Jan Walenda \\ Frontend Developer",
  });
}
</script>
<script lang="ts">
export default {
  name: "DefaultLayout",
};
</script>
<template>
  <div>
    <Header />
    <main id="maincontent" class="p-4 bg-base-100 font-mono flex flex-col items-center">
      <section class="container lg:max-w-1/3">
        <article v-if="page" class="prose prose-h1:text-3xl">
          <h1>
            <span>{{ page.title }}</span>
            <br>
            <small class="italic text-base-content/65">{{
              page.description
            }}</small>
          </h1>
        </article>
      </section>
      <section class="container lg:max-w-1/3">
        <slot />
      </section>
      <section class="container lg:max-w-1/3">
        <article v-if="page && page?.body.toc?.links && page?.body.toc?.links.length > 0" class="prose prose-h2:text-2xl">
          <h2>{{t('content')}}</h2>
          <ul>
            <li v-for="link in page?.body.toc?.links" :key="link.id">
              <NuxtLink :to="`#${link.id}`" class="link link-primary">
                {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </article>

        <ContentRenderer
          v-if="page"
          :value="page"
          tag="article"
          class="prose max-w-full"
        />
      </section>
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
<i18n lang="json">
{
  "en": {
    "content": "Content"
  },
  "de": {
    "content": "Inhalt"
  }
}
</i18n>
