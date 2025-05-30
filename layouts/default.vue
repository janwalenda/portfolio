<template>
  <Header>
    
    <HeaderLink url="/projects">
      Projects
    </HeaderLink>
    <HeaderLink url="">
      <UIcon name="cib:linkedin" class="size-5" />
    </HeaderLink>
  </Header>
  <div class="p-4">
    <slot />
  </div>
  <Footer />
</template>