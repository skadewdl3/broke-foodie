<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { SearchOutlined } from '@ant-design/icons-vue';

const router = useRouter();
const store = useStore();
let hovered = ref(false);
let focused = ref(false);
let searchText = ref('')
const props = defineProps(['updateSearchText'])

const search = () => {
  store.commit('updateSearchText', searchText)
  router.push({ name: "Search" })
}

const setHovered = (val) => {
  if (focused.value) return
  hovered.value = val
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
  <div class="home w-screen h-screen grid place-content-center">
    <div class="cta-container">
      <h1 class="text-5xl">Find healthy Canteens, <span class="text-orange-500 italic">fast.</span></h1>
      <div class="search-container relative flex mt-10" @focusin="setFocused(true)" @focusout="setFocused(false)" @mouseover="setHovered(true)" @mouseout="setHovered(false)">
        <input type="text" v-model="searchText" class="search-input rounded-md px-4 py-2 text-lg w-full border-2 border-solid" placeholder="What do you want to eat?" :class="{'border-orange-500': hovered, 'border-zinc-400': !hovered}"/>
        <button @click="search" class="search-button absolute top-1/2 right-0 w-12 px-2.5 py-2.5 text-xl grid cursor-pointer" :class="{' bg-orange-500  border-orange-500 text-white py-3.5 rounded-none rounded-r-lg': hovered, ' text-orange-500 text-xl': !hovered, '': focused}">
          <SearchOutlined />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.home
  background-image url("/bg.png")
  background-repeat no-repeat
  background-size cover

.search-input
  transition all .2s ease-in-out

.search-button
  transform translateY(-50%)
  transition all .2s ease-in-out
</style>
