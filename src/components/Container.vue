<template>
  <div
    class="container relative w-screen h-screen flex items-center justify-center"
  >
    <transition name="fade" appear>
      <slot></slot>
    </transition>
  </div>
</template>

<script setup></script>

<style lang="stylus" scoped>
.container
  z-index 2
</style>
