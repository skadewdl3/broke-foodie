<script setup>
import { defineEmits, defineProps } from 'vue'
import { LeftOutlined } from '@ant-design/icons-vue'
const emit = defineEmits(['back'])
const props = defineProps(['title'])
</script>

<template>
  <div
    class="content overflow-y-auto relative bg-white w-3/5 min-h-[80%] max-h-[80%] pb-10 px-20 rounded-xl border-solid border-2 border-zinc-200"
  >
    <div class="header pt-8 sticky top-0 bg-white">
      <div
        class="inline-flex items-center cursor-pointer justify-between w-full"
        @click="emit('back')"
      >
        <div class="flex items-center">
          <LeftOutlined class="text-xl" />
          <h2 class="text-3xl ml-4 font-bold text-black">{{ props.title }}</h2>
        </div>
        <div class="forward">
          <slot name="forward"></slot>
        </div>
      </div>

      <slot name="header"></slot>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<style lang="stylus" scoped>
.content
  z-index 2;
.header
  z-index 3
</style>
