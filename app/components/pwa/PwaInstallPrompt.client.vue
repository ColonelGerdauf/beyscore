<template>
  <div
    v-if="
      useNuxtApp().$pwa?.showInstallPrompt && !useNuxtApp().$pwa?.needRefresh
    "
    v-bind="$attrs"
  >
    <h2>Install</h2>
    <div>
      <button class="btn" @click="useNuxtApp().$pwa?.install()">Install</button>
      <button class="btn" @click="useNuxtApp().$pwa?.cancelInstall()">
        Dismiss
      </button>
    </div>
    <div />
  </div>
</template>
