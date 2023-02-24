import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'

import Home from './pages/Home.vue';
import App from './App.vue'
import Search from './pages/Search.vue'
import Canteen from './pages/Canteen.vue'
import './style.css'

const store = createStore({
  state () {
    return {
      searchText: ''
    }
  },
  mutations: {
    updateSearchText (state, text) {
      state.searchText = text
    }
  }
})

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
  },
  {
    path: '/search',
    component: Search,
    name: 'Search',
  },
  {
    path: '/canteen',
    component: Canteen,
    name: 'Canteen'
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes  
});
const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
