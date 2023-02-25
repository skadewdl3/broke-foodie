<script setup>
import { ref, watchEffect, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { RightOutlined } from '@ant-design/icons-vue'
import LoadingSpinner from './../components/LoadingSpinner.vue'
import SearchBox from './../components/SearchBox.vue'
import Container from './../components/Container.vue'
import Content from './../components/Content.vue'

const store = useStore()
const router = useRouter()
const searchText = ref(store.state.searchText)
const canteens = computed(() => store.state.canteens)
const searching = computed(() => store.state.searching)

const goHome = () => {
  router.push({ name: 'Home' })
}

const goToCanteen = async id => {
  let { data } = await axios.get(`%BASE_URL%/get-canteen/${id}`)
  store.commit('setCanteen', data.doc)
  router.push({ name: 'Canteen' })
}
</script>

<template>
  <Container>
    <Content title="Search" @back="goHome">
      <template #header>
        <SearchBox placeholder="What do you want to eat?" />
      </template>
      <template #content>
        <div class="search-results" v-if="canteens.length != 0 && !searching">
          <div
            v-for="(canteen, index) in canteens"
            :key="canteen.id"
            class="search-result w-full"
          >
            <div
              class="search-result w-full rounded-lg flex justify-between px-2 cursor-pointer"
              @click="goToCanteen(canteen.id)"
            >
              <span class="text-xl my-2 py-2">{{ canteen.name }}</span>
              <button>
                <RightOutlined />
              </button>
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
      </template>
    </Content>
  </Container>
</template>

<style lang="stylus"></style>
