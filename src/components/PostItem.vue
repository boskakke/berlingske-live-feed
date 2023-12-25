<script setup>
// import { ref } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/da'
dayjs.extend(relativeTime, localeData)

const props = defineProps(['content', 'avatars'])

const getImages = (content) => {
  const regexp = /<ncpost-content\sdata-type="(?<type>\w+)"/gm
  const result = regexp.exec(content)
  if (result) {
    const type = result[1]
    if (type === 'TWEET') {
      console.log('TWEET')
    } else if (type === 'BILDE') {
      console.log('BILDE')
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, 'text/html')
      const images = doc.querySelectorAll('ncpost-content')
      images.forEach((image) => {
        console.log(image.getAttribute('data-src'))
      })
    }
  }
  return content
}

const getDate = (date) => {
  dayjs.locale('da')
  return dayjs(date).fromNow()
}

const getAvatar = (authorName) => {
  const avatar = props.avatars.find((avatar) => avatar.name === authorName)
  if (avatar) {
    return `<img src="${avatar.url}" class="avatar__img" class="avatar__img"/>`
  }
  return ''
}
</script>
<template>
  <div class="post">
    <div class="byline">
      <div class="byline__content">
        <div class="author">
          <div v-html="getAvatar(content.authorName)" />
          {{ content.authorName }}
        </div>
        <div class="time">
          <span>{{ getDate(content.created) }}</span>
        </div>
      </div>
    </div>

    <h2>{{ content.title }}</h2>

    <div v-html="getImages(content.content.html)" />
    <div v-if="content.content.linkMeta">
      <a :href="content.content.linkMeta.url" class="flex gap-4 items-start mt-4 p-1 bg-zinc-50">
        <figure class="!block">
          <img :src="content.content.linkMeta.image.url" class="w-44" />
        </figure>
        <div class="flex flex-col justify-center py-2">
          <div class="text-xs font-sans font-bold text-zinc-950">
            {{ content.content.linkMeta.siteName }}
          </div>
          <div class="font-bold">{{ content.content.linkMeta.title }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.comment-blockquote {
  background: #eee;
  border-radius: 16px 16px 0 16px;
  padding: 1rem;
  position: relative;
  margin-bottom: 13px;

  &:after {
    transform: rotate(-90deg);
    content: '';
    position: absolute;
    right: -8px;
    bottom: -2px;
    width: 8px;
    height: 13px;
    background-size: 100%;
    background-image: var(--dot--dark);
  }
}

li::marker {
  color: var(--link);
  font-size: 1.5em;
}

div,
p,
li {
  font-size: 0.85rem;
}

li {
  margin-bottom: 1rem;
}

figure {
  &:not(.fig):not(.avatar__img) {
    display: none;
  }

  margin: 1rem 0;

  figcaption {
    font-size: 0.7rem;
    color: #999;
  }
}

.post {
  margin-top: 1rem;
  padding-top: 1rem;
  position: relative;
  --dot--dark: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2' xml:space='preserve'%3E%3Ccircle cx='.5' cy='.5' r='.5' fill='%23000'/%3E%3C/svg%3E")
    repeat;

  &:after {
    content: '';
    background: var(--dot--dark);
    background-size: 2px;
    width: 100%;
    height: 6px;
    display: block;
    opacity: 0.3;
    position: absolute;
    top: 0;
  }
}

.scrbbl-sitePreview {
  display: flex;
  gap: 0.8rem;
  align-items: center;

  .Media {
    flex: 120px 0 0;
    display: flex;
    align-items: center;

    img {
      border-radius: 3px;
    }
  }

  h3 {
    margin: 0;
  }

  .scrbbl-sitePreview-inner {
    flex: auto;
    font-size: 0.7rem;
  }
}

.time {
  font-size: 0.7rem;
  color: #999;
}

.byline {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  line-height: 1.2;
}

.avatar img {
  border-radius: 50%;
  width: 2rem;
}

.author {
  font-size: 0.8rem;
  font-weight: bold;
}
</style>
