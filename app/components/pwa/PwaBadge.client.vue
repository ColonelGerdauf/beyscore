<template>
  <button
    v-if="useNuxtApp().$pwa?.needRefresh"
    @click="useNuxtApp().$pwa?.updateServiceWorker()"
  >
    <div />
    <h2>Update Available</h2>
  </button>
</template>
