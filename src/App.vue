<script setup>
import { ref } from 'vue';

const data = ref(null)
const error = ref(null)

fetch('https://api.scribblelive.com/v1/stream/3025174/posts?PageNumber=0&PageSize=99&NewestAtBottom=false&IncludeComments=false&token=9yyBmETN')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))

</script>

<template>
   <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="data">
      
      <div v-for="post in data.posts" :key="post.CreationDate">
        <div v-html="post.Content"></div>
        
      </div>
      {{ data.posts }}
    </div>
    <div v-else>Loading...</div>
</template>

<style scoped>

</style>
