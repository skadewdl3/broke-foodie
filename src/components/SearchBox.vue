<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import axios from 'axios'
import { useStore } from 'vuex'
import validator from 'validator'
const store = useStore()

let hovered = ref(false)
let focused = ref(false)
let searchText = ref(store.state.searchText)
const emit = defineEmits(['searched'])
const props = defineProps(['placeholder'])

const setFocused = val => {
  if (val) {
    focused.value = true
    hovered.value = true
  } else {
    focused.value = false
    hovered.value = false
  }
}

const setHovered = val => {
  if (focused.value) return
  hovered.value = val
}

const search = async () => {
  if (
    !validator.isEmpty(searchText.value) &&
    validator.isAlphanumeric(searchText.value)
  ) {
    emit('searched')
  }
  store.commit('updateSearchText', searchText)
  store.commit('setSearching', true)

  const { data } = await axios.get(
    `%BASE_URL%/search-canteens/${searchText.value}`
  )

  store.commit('updateCanteens', data.searchResults)
  store.commit('setSearching', false)
}
</script>

<template>
  <div
    class="search-container bg-white flex mt-4 relative"
    @focusin="setFocused(true)"
    @focusout="setFocused(false)"
    @mouseover="setHovered(true)"
    @mouseout="setHovered(false)"
  >
    <input
      type="text"
      v-model="searchText"
      class="search-input rounded-md px-4 py-2 text-lg w-full border-2 border-solid"
      :placeholder="props.placeholder"
      :class="{
        'border-orange-500': hovered,
        'border-zinc-400': !hovered,
      }"
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
</template>

<style></style>
