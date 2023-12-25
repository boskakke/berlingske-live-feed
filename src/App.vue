<script setup>
import PostItem from '@/components/PostItem.vue'

// const url = 'https://livecentercdn.norkon.net/BulletinFeed/berlingske/41454/Initial/'

// const url2 = 'https://livecentercdn.norkon.net/BulletinFeed/berlingske/41454/Earlier/6951552/'

import { computed } from 'vue'
import { useFetch } from '@vueuse/core'

// 41454 Ukraine
// 41389 Gaza
const url = computed(() => {
  return `https://livecentercdn.norkon.net/BulletinFeed/berlingske/41389/Initial/`
})
const { isFetching, data, error } = useFetch(url, {
  refetch: false
})
  .get()
  .json()
</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="isFetching">Loading</div>
  <div v-else>
    <div class="container">
      <div v-for="post in data?.result?.addedOrChanged" :key="post.id">
        <!-- <PostItem :content="post" :avatars="data?.result?.channelContent?.avatars" /> -->
        <PostItem :content="post" :avatars="data?.result?.channelContent?.avatars" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 650px;
  margin: 0 auto;
  padding: 1rem 0.8rem;
}

article > div {
  margin: 1rem;
}

.loader {
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  appearance: none;
  background-color: var(--link);
  transition: all 0.2s ease;
  color: #fff;
  padding: 0 2rem;
  font-family: 'Guardian', sans-serif;
  font-weight: 700;
  border-radius: 3px;
  border: 0;
  font-size: 0.75rem;
  line-height: 1;
  cursor: pointer;
  text-transform: uppercase;
  margin: 0 auto;
  height: 45px;

  &:hover {
    background-color: var(--link-hover);
  }
}

.loadMore {
  display: flex;
  justify-content: center;
}
</style>
