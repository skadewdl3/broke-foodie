<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import SearchBox from './../components/SearchBox.vue'

const router = useRouter()
const props = defineProps(['updateSearchText'])
const store = useStore()
const goToSearch = () => router.push({ name: 'Search' })

onMounted(() => {
  store.commit('updateSearchText', '')
})
</script>

<template>
  <div class="home w-screen h-screen grid place-content-center relative">
    <div class="logo text-3xl absolute top-0 left-0 p-4">
      <span class="font-bold">Broke</span>
      <span class="italic text-white">foodie</span>
    </div>
    <div class="cta-container">
      <h1 class="text-5xl">
        Find healthy Canteens, <span class="text-orange-500 italic">fast.</span>
      </h1>
      <SearchBox
        @searched="goToSearch"
        placeholder="What do you want to eat?"
      />
    </div>
  </div>
</template>

<style lang="stylus">
.search-input
  transition all .2s ease-in-out

.search-button
  transform translateY(-50%)
  transition all .2s ease-in-out
</style>
