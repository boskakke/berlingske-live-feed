import { createApp } from 'vue'
import App from './App.vue'
import twitter from 'vue-twitter'

import './index.css'
import './assets/main.scss'


createApp(App).use(twitter).mount('#berlingske-live')
