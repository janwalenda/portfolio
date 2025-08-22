<script lang="ts" setup>
import {
  utils,
  onScroll,
  animate,
} from 'animejs';
const { t } = useI18n();

function getCSSVar(varName: string) {
  return window.getComputedStyle(document.documentElement).getPropertyValue(varName);
}

function getRandomWord() {
  const words = [
    'Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit',
    'Vivamus', 'Sagittis', 'Semper', 'Vestibulum', 'Curabitur', 'Pharetra', 'Quisque', 'Aliquam',
    'Mauris', 'Suspendisse', 'Pellentesque', 'Habitant', 'Morbi', 'Tristique', 'Senectus', 'Netus',
    'Fames', 'Ultrices', 'Nunc', 'Egestas', 'Fusce', 'Tempus', 'Porttitor', 'Integer',
    'Mollis', 'Orci', 'Luctus', 'Tincidunt', 'Auctor', 'Gravida', 'Eros', 'Dapibus',
    'Placerat', 'Sollicitudin', 'Accumsan', 'Blandit', 'Cursus', 'Dictum', 'Etiam', 'Facilisis',
    'Hendrerit', 'Inceptos', 'Justo', 'Lacinia', 'Metus', 'Nibh', 'Odio', 'Praesent',
    'Quam', 'Risus', 'Sapien', 'Tellus', 'Urna', 'Venenatis', 'Wisi', 'Xenon',
    'Yonder', 'Zephyr', 'Aenean', 'Bibendum', 'Commodo', 'Donec', 'Enim', 'Fringilla',
    'Genean', 'Hac', 'Imperdiet', 'Justitia', 'Keen', 'Libero', 'Maximus', 'Nam',
    'Ornare', 'Proin', 'Quis', 'Rutrum', 'Scelerisque', 'Turpis', 'Ultricies', 'Vestibulum',
    'Wisi', 'Xylophone', 'Yield', 'Zodiac', 'Aptent', 'Blandit', 'Convallis', 'Dignissim',
    'Eleifend', 'Fermentum', 'Gravida', 'Habitasse', 'In', 'Justo', 'Kursus', 'Lectus'
  ];
  return words[Math.floor(Math.random() * words.length)];
}

onMounted(() => {
  const container = document.getElementById('sticky-container');
  utils.$('.card').forEach($square => {
    console.log(getCSSVar('--color-base-300'))
    animate($square, {
      x: `${container?.getBoundingClientRect().width as number - $square.getBoundingClientRect().width}px`,
      backgroundColor: [getCSSVar('--color-base-300'), getCSSVar('--color-base-100')],
      boxShadow: '10px 10px 0px 2px rgba(0,0,0,0.75)',
      duration: 2000,
      alternate: true,
      ease: 'inOut',
      autoplay: onScroll({
        container: document.body,
        sync: 1,
        enter: 'max bottom',
        leave: 'min top',
      }),
    });
  });
})

</script>
<template>
  <div id="sticky-container" class="flex flex-1 flex-col gap-20 w-full">
    <span class="hidden shadow-xl" />
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
    <div class="card p-4 border-2 border-base-300 w-fit text-neutral-700">{{ t('home.title') }}</div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'IndexPage',
}
</script>
<i18n lang="json">{
  "de": {
    "home.title": "Startseite"
  },
  "en": {
    "home.title": "Homepage"
  },
  "ja": {
    "home.title": "ホーム"
  }
}</i18n>
