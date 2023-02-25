<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import Container from './../components/Container.vue'
import Content from './../components/Content.vue'

const store = useStore()
const canteen = computed(() => store.state.canteen)
const router = useRouter()

onMounted(() => {
  if (!store.state.canteen) {
    router.push({ name: 'Home' })
  }
})

const goToSearch = () => {
  router.push({ name: 'Search' })
}

onMounted(() => {
  console.log(canteen.value)
})
</script>

<template>
  <Container>
    <Content @back="goToSearch" :title="canteen ? canteen.name : ''">
      <template #content>
        <div class="canteen-grid grid w-full grid-cols-[1fr_2fr]">
          <div class="canteen-info grid place-content-center">
            <button
              class="bg-orange-500 text-white rounded-md px-4 py-2 text-lg"
            >
              Take me here
            </button>
          </div>
          <div class="canteen-menu w-full mt-4 grid">
            <div
              v-for="([name, price], index) in [
                ...Object.entries(canteen.menu),
                ...Object.entries(canteen.menu),
              ]"
              :key="index"
              class="canteen-menu-item"
            >
              <div
                class="canteen-menu-item-content px-4 py-2 flex items-center justify-between"
              >
                <span class="name">{{ name }}</span
                ><span class="price">{{ price }}</span>
              </div>
              <div
                v-if="index < Object.entries(canteen.menu).length - 1"
                class="separator w-[97%] mx-auto h-0.5 bg-zinc-200 rounded-full"
              ></div>
            </div>
          </div>
        </div>
      </template>
    </Content>
  </Container>
</template>

<style lang="stylus">
.content
  z-index 1
  &-content
    z-index 2
</style>
