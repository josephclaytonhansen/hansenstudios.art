<script setup>
  const props = defineProps({
    component: String,
  })
  import MainMenu from "./blocks/mainMenu/mainMenu.vue"
  import RecentPostsGallery from "./blocks/recentPostsGallery/recentPostsGallery.vue"
</script>

<template>
  <MainMenu />
  <RecentPostsGallery />
</template>
