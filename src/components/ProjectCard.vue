<script lang="ts" setup>
defineProps<{
  project: {
    name: string;
    url: string;
    github: string;
    description: string;
  };
}>();

const cardRef = useTemplateRef('project-card');
const glowRef = useTemplateRef('glow');

onMounted(() => {
  const card = cardRef.value as HTMLAnchorElement;
  const glow = glowRef.value as HTMLDivElement;
  let bounds = card.getBoundingClientRect();
  let requestId: number | null = null;

  function rotateToInput(x: number, y: number) {
    const leftX = x - bounds.x;
    const topY = y - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2
    };
    const distance = Math.sqrt(center.x**2 + center.y**2);

    card.style.transform = `
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 2}deg
      )
    `;

    glow.style.backgroundImage = `
      radial-gradient(
        circle at
        ${center.x * 2 + bounds.width / 2}px,
        ${center.y * 2 + bounds.height / 2}px,
        #ffffff55,
        #0000000f
      )
    `;
  }

  function onMove(e: MouseEvent | TouchEvent) {
    if (typeof requestId === 'string') {
      requestId = requestAnimationFrame(() => {
        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;
        rotateToInput(x, y);
        requestId = null;
      });
    }
  }

    function resetCard() {
      card.style.transform = '';
      glow.style.backgroundImage = '';
    }

    function onStart() {
      bounds = card.getBoundingClientRect();
      document.addEventListener('mousemove', onMove);
      document.addEventListener('touchmove', onMove);
    }

    function onEnd() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove);
      resetCard();
    }

    function onLeave(e: MouseEvent | TouchEvent) {
      if (e.type === 'mouseleave' || (e.type === 'touchend' && !card.contains(e.target))) {
        onEnd();
      }
    }

    card.addEventListener('mouseenter', onStart);
    card.addEventListener('touchstart', onStart);
    card.addEventListener('mouseleave', onLeave);
    card.addEventListener('touchend', onLeave);
});


</script>
<template>
  <a ref="project-card" class="card card-bordered border-[1px] border-black rounded-none" :href="project.url">
    <figure>
      <iframe :src="project.url" width="100%" height="200px" frameborder="0" allowfullscreen />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ project.name }}</h2>
      <p>{{ project.description }}</p>
      <div class="card-actions justify-end">
        <a :href="project.github" class="btn btn-neutral rounded-none card shadow-none">
          <Icon name="cib:github" class="size-5" />
        </a>
      </div>
    </div>
  </a>
</template>
