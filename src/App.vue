<script setup>
import { onMounted, ref } from 'vue';

const data = ref(null)
const error = ref(null)
const postsToShow = ref(5)

fetch('https://api.scribblelive.com/v1/stream/3025174/posts?PageNumber=0&PageSize=99&NewestAtBottom=false&IncludeComments=false&token=9yyBmETN')
  .then((res) => res.json())
  .then((json) => {
    data.value = json
    console.log(data.value)  
    })
  .catch((err) => (error.value = err))


</script>

<template>
   <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="data">
      
      <div v-for="(post, index) in postsToShow" :key="post.CreationDate">
        <div v-html="data.posts[index].Content"></div>  
      </div>
      <button @click="postsToShow += 5">Load more</button>
    </div>
    <div v-else>Loading...</div>
</template>

<style scoped>

</style>
