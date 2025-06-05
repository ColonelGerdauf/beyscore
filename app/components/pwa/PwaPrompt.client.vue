<template>
  <div v-if="useNuxtApp().$pwa?.needRefresh">
    <h2>Update Available</h2>
    <div>
      <button class="btn" @click="useNuxtApp().$pwa?.updateServiceWorker()">
        Update
      </button>
      <button class="btn" @click="useNuxtApp().$pwa?.cancelPrompt()">
        Dismiss
      </button>
    </div>
    <div />
  </div>
</template>
