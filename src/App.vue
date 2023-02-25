<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const blurred = computed(() => route.name != 'Home')
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  <transition name="fade" mode="out-in">
    <div
      class="search-blur absolute top-0 left-0 w-screen h-screen"
      v-if="blurred"
    ></div>
  </transition>
</template>

<style lang="stylus">
body
  display grid
  place-items center
  background-image url("/bg.png")
  background-repeat no-repeat
  background-size cover
  z-index 0

.fade-enter-active,
.fade-leave-active
  transition opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
  opacity 0
</style>
