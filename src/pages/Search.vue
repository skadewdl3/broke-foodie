<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons-vue';

const store = useStore()
const searchText = ref(store.state.searchText)
let hovered = ref(false);
let focused = ref(false);
onMounted(async () => {
  console.log('Hello World')
  console.log(searchText.value)
  if (!searchText.value) return;
  const {data} = await axios.get(`http://localhost:5000/search-canteens/${searchText.value}`)
  console.log(data)
})

const setHovered = (val) => {
  if (focused.value) return
  hovered.value = val
} 

const search = async () => {
  const {data} = await axios.get(`http://localhost:5000/search-canteens/${searchText.value}`)
  console.log(data)
}

const setFocused = (val) => {
  if (val) {
    focused.value = true;
    hovered.value = true;
  }
  else {
    focused.value = false;
    hovered.value = false;
  }
}
</script>

<template>
  <div class="search relative w-screen h-screen flex items-center justify-center">
    <div class="search-content bg-white w-3/5 py-10 px-20 rounded-xl border-solid border-2 border-zinc-200">
      <div class="search-container relative flex" @focusin="setFocused(true)" @focusout="setFocused(false)" @mouseover="setHovered(true)" @mouseout="setHovered(false)">
        <input type="text" v-model="searchText" class="search-input rounded-md px-4 py-2 text-lg w-full border-2 border-solid" :placeholder="searchText" :class="{'border-orange-500': hovered, 'border-zinc-400': !hovered}"/>
        <button @click="search" class="search-button absolute top-1/2 right-0 w-12 px-2.5 py-2.5 text-xl grid cursor-pointer" :class="{' bg-orange-500  border-orange-500 text-white py-3.5 rounded-none rounded-r-lg': hovered, ' text-orange-500 text-xl': !hovered, '': focused}">
          <SearchOutlined />
        </button>
      </div>
    </div>
    <div class="search-blur absolute top-0 left-0 w-screen h-screen">
    </div>
    

    

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