<script setup>
  import postsData from "../../manifests/allPosts.json"
  import { ref } from "vue"
  const posts = ref(postsData.posts)
  const recentPosts = posts.value.slice(0, 5)
  import { useRouter } from "vue-router"
  const router = useRouter()
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div v-for="post in posts" :key="post.id">
      <a @click="router.push(post.slug)">{{ post.title }}</a>
    </div>
  </div>
</template>
