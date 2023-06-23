<script setup>
import { onMounted, ref } from 'vue';
import PostItem from '@/components/PostItem.vue'




const data = ref(null)
const error = ref(null)
const postsToShow = ref(5)



fetch('https://api.scribblelive.com/v1/stream/3025174/posts?PageNumber=0&PageSize=99&NewestAtBottom=false&IncludeComments=false&token=9yyBmETN')
  .then((res) => res.json())
  .then((json) => {
    data.value = json
  })
  .catch((err) => (error.value = err))
const cleanContent = (post) => {
  const cleanPost = post.replace('h1', 'h2')

  return cleanPost
}


</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <template v-else-if="data">
    <div class="container">
      <PostItem v-for="(post, index) in postsToShow" :key="post.CreationDate" :date="data.posts[index].CreationDate"
        :author="data.posts[index].Creator" :content="cleanContent(data.posts[index].Content)"
        :images="data.posts[index].PostMeta?.Images">
      </PostItem>
      <div>
        <button @click="postsToShow += 5">Hent flere</button>
      </div>
    </div>
  </template>
  <div v-else>Loading...</div>
</template>

<style scoped>
.container {
  max-width: 650px;
  margin: 0 auto;
  padding: 0 .8rem;
}

article>div {
  margin: 1rem;
}

button {
  appearance: none;
  background-color: var(--link);
  transition: all .2s ease;
  color: #fff;
  padding: .7rem 2rem;
  font-family: 'Guardian', sans-serif;
  font-weight: 700;
  border-radius: 3px;
  border: 0;
  font-size: .8rem;
  line-height: 1.5;
  cursor: pointer;
  text-transform: uppercase;
  margin: 0 auto;

  &:hover {

    background-color: var(--link-hover);
  }
}
</style>
