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
</script>

<template>
  <Container>
    <Content @back="goToSearch" :title="canteen ? canteen.name : ''"></Content>
  </Container>
</template>

<style lang="stylus">
.content
  z-index 1
  &-content
    z-index 2
</style>
