<script setup>
import { ref, watchEffect, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import {
  SearchOutlined,
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons-vue'
import LoadingSpinner from './../components/LoadingSpinner.vue'

const store = useStore()
const router = useRouter()
const searchText = ref(store.state.searchText)
const canteens = ref([])
const searching = computed(() => store.state.searching)
let hovered = ref(false)
let focused = ref(false)
onMounted(async () => {
  if (!searchText.value) return
  store.commit('setSearching', true)
  const { data } = await axios.get(
    `%BASE_URL%/search-canteens/${searchText.value}`
  )
  store.commit('setSearching', false);
  store.commit('updateCanteens', data)
  canteens.value = data.searchResults
})

const setHovered = val => {
  if (focused.value) return
  hovered.value = val
}

const search = async () => {
  const { data } = await axios.get(
    `%BASE_URL%/search-canteens/${searchText.value}`
  )
  store.commit('setSearching', false)
  store.commit('updateCanteens', data)
  canteens.value = data.searchResults
}

const setFocused = val => {
  if (val) {
    focused.value = true
    hovered.value = true
  } else {
    focused.value = false
    hovered.value = false
  }
}

const goHome = () => {
  router.push({ name: 'Home' })
}
</script>

<template>
  <div
    class="search relative w-screen h-screen flex items-center justify-center"
  >
    <div
      class="search-content bg-white w-3/5 min-h-[80%] py-10 px-20 rounded-xl border-solid border-2 border-zinc-200"
    >
      <div class="flex items-center cursor-pointer" @click="goHome">
        <LeftOutlined class="text-xl" />
        <h2 class="text-3xl ml-4 font-bold text-black">Search</h2>
      </div>

      <div
        class="search-container relative flex mt-4"
        @focusin="setFocused(true)"
        @focusout="setFocused(false)"
        @mouseover="setHovered(true)"
        @mouseout="setHovered(false)"
      >
        <input
          type="text"
          v-model="searchText"
          class="search-input rounded-md px-4 py-2 text-lg w-full border-2 border-solid"
          :placeholder="searchText"
          :class="{ 'border-orange-500': hovered, 'border-zinc-400': !hovered }"
        />
        <button
          @click="search"
          class="search-button absolute top-1/2 right-0 w-12 px-2.5 py-2.5 text-xl grid cursor-pointer"
          :class="{
            ' bg-orange-500  border-orange-500 text-white py-3.5 rounded-none rounded-r-lg':
              hovered,
            ' text-orange-500 text-xl': !hovered,
            '': focused,
          }"
        >
          <SearchOutlined />
        </button>
      </div>

      <div
        class="search-results"
        v-if="canteens.length != 0 && !searching"
      >
        <div
          v-for="(c, index) in canteens"
          :key="index"
          class="search-result w-full"
        >
          <div
            class="search-result w-full rounded-lg flex justify-between px-2 cursor-pointer"
          >
            <span class="text-xl my-2 py-2">{{ c.name }}</span>
            <button><RightOutlined /></button>
          </div>
          <div
            v-if="index < canteens.length - 1"
            class="separator w-[97%] mx-auto h-0.5 bg-zinc-200 rounded-full"
          ></div>
        </div>
      </div>
      <div
        v-if="canteens.length == 0 && !searching"
        class="text-center mt-40"
      >
        <span class="text-xl text-zinc-600"
          >Search for a canteen or what you want to eat, and it'll show up
          here</span
        >
      </div>
      <div
        v-if="searching"
        class="loading-spinner flex items-center justify-center mt-40"
      >
        <LoadingSpinner />
      </div>
    </div>
    <div class="search-blur absolute top-0 left-0 w-screen h-screen"></div>
  </div>
</template>

<style lang="stylus">
.search
  background-image url("/bg.png")
  background-repeat no-repeat
  background-size cover
  z-index 0

  &-content

  &-blur
    backdrop-filter blur(0.5rem)
  z-index 1
  &-content
    z-index 2
</style>
