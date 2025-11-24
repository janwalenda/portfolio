import type { LocaleObject } from "@nuxtjs/i18n";
import type { NuxtOptions } from "nuxt/schema";
import type { StrapiApiResponse } from "~/types/StrapiApiResponse";
import type { NitroConfig } from 'nitropack'

// https://nuxt.com/docs/api/configuration/nuxt-config
const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
const strapiToken = process.env.STRAPI_TOKEN || undefined;

const i18n: NuxtOptions['i18n'] = {
  baseUrl: "https://janwalenda.de",
  defaultLocale: "de",
  langDir: "translations/",
  strategy: 'prefix',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected",
    redirectOn: "root", // recommended
  },
  locales: [
    {
      code: "de",
      language: "de-DE",
      name: "Deutsch",
      file: "de.json",
    },
    {
      code: "en",
      language: "en-US",
      name: "English",
      file: "en.json",
    }
  ],
  bundle: {
    optimizeTranslationDirective: false,
  }
};

async function getRoutes(){
  const locales = (i18n.locales as LocaleObject<string>[]).map(l => l.code);
  type SlugFields = {
    id: number;
    documentId: string;
    slug: string;
  };
  
  console.log('STRAPI_URL', strapiUrl);
  
  type SlugResponse = StrapiApiResponse<SlugFields[]>;

  const [requestPageSlugs, requestBlogSlugs] = await Promise.all([
    (await fetch(`${strapiUrl}/api/pages?fields[0]=slug`, {
      headers: {
        Authorization: `Bearer ${strapiToken}`,
      }
    })).json() as Promise<SlugResponse>,
    (await fetch(`${strapiUrl}/api/blogs?fields[0]=slug`, {
      headers: {
        Authorization: `Bearer ${strapiToken}`,
      }
    })).json() as Promise<SlugResponse>
  ]);

  const routes: string[] = [];

  for(const locale of locales) {
    routes.push(`/${locale}`);
    for (const data of requestPageSlugs.data) {
      routes.push(`/${locale}/${data.slug}`);
    }

    for (const data of requestBlogSlugs.data) {
      routes.push(`/${locale}/blog/${data.documentId}`);
    }
  }

  console.log('ADDING ROUTES:', routes);

  return routes;
} 


export default defineNuxtConfig({
  runtimeConfig: {
    strapiUrl,
    strapiToken,
    public: {
      strapiUrlPublic: strapiUrl, // falls du Bild-URLs brauchst
    }
  },
  ssr: true,
  hooks: {
    async 'nitro:config'(nitroConfig: NitroConfig) {
      // fetch the routes from our function above
      const slugs = await getRoutes();
      // add the routes to the nitro config
      nitroConfig.prerender!.routes!.push(...slugs);
    },
  },
  nitro: {
    prerender: {
      routes: [],
      crawlLinks: true,
    },
  },
  sourcemap: true,
  srcDir: "src/",
  modules: [
    "@nuxt/content",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/mdc",
  ],
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      title: "Jan Walenda",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        { name: "description", content: "A Nuxt UI example project" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/images/favicon.png" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
        },
      ],
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  routeRules: {
    "/**/**": { prerender: true },
  },
  icon: {
    mode: "svg",
  },
  i18n,
});