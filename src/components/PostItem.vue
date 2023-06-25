<script setup>
const props = defineProps(['content', 'date', 'author', 'images'])
import { onMounted, ref } from "vue";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/da'
dayjs.extend(relativeTime, localeData);

const twitterUrl = ref('')
const imageUrl = ref('')
const figCaption = ref('')

const getImageUrl = (arr) => {
	if (arr !== undefined) {
		arr[0].alternateSizes.forEach((img) => {
			if (img.width === 1000) {
				imageUrl.value = img.filename
			}
		})
	}
}

const getContent = (content) => {
	const hrefRegex = /href="(https:\/\/twitter\.com\/[^"]+)"/;
	const match = content.match(hrefRegex);

	if (match && match.length > 1) {
		twitterUrl.value = match[1];
	}
	return content
}
const getCaption = (content) => {
	const hrefRegex = /<figcaption>(.*?)<\/figcaption>/;
	const match = content.match(hrefRegex);

	if (match && match.length > 1) {

		figCaption.value = match[1];
	}
	return content
}

onMounted(() => {
	getImageUrl(props.images)
	getCaption(props.content)
}
)

const getDate = (date) => {
	dayjs.locale('da')
	return dayjs(date).fromNow();
}

</script>
<template>
	<div class="post">
		<div class="byline">
			<div class="avatar" v-if="author.Avatar"><img :src="author.Avatar" class="avatar__img" /></div>
			<div class="byline__content">
				<div class="author"><span>{{ author.Name }}</span></div>
				<div class="time"><span>{{ getDate(date) }}</span></div>
			</div>
		</div>

		<div v-html="getContent(content)" />
		<div v-if="twitterUrl">
			<twitter>
				<a class="twitter-timeline" :href="twitterUrl"></a>
			</twitter>
		</div>


		<figure v-if="imageUrl" class="fig">
			<img :src="imageUrl" alt="Test" width="1000" />
			<figcaption v-if="figCaption">
				{{ figCaption }}
			</figcaption>
		</figure>
	</div>
</template>


<style scoled lang="scss">
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
	font-size: .85rem;
}

li {
	margin-bottom: 1rem;
}

figure {
	&:not(.fig):not(.avatar__img) {
		display: none
	}

	margin: 1rem 0;

	figcaption {
		font-size: .7rem;
		color: #999;
	}
}

.post {
	margin-top: 1rem;
	padding-top: 1rem;
	position: relative;
	--dot--dark: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2' xml:space='preserve'%3E%3Ccircle cx='.5' cy='.5' r='.5' fill='%23000'/%3E%3C/svg%3E") repeat;

	&:after {
		content: "";
		background: var(--dot--dark);
		background-size: 2px;
		width: 100%;
		height: 6px;
		display: block;
		opacity: .3;
		position: absolute;
		top: 0;

	}
}

.scrbbl-sitePreview {
	display: flex;
	gap: .8rem;
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
		font-size: .7rem;
	}

}




.time {
	font-size: .7rem;
	color: #999;
}

.byline {
	display: flex;
	gap: .5rem;
	align-items: center;
	line-height: 1.2;
}

.avatar img {
	border-radius: 50%;
	width: 2rem;
}

.author {
	font-size: .8rem;
	font-weight: bold;

}
</style>