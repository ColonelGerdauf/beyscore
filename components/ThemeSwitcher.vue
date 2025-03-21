<script setup lang="ts">
const colorMode = useColorMode();

function changeTheme(selectedTheme: string) {
  colorMode.preference = selectedTheme;
}
</script>

<template>
  <div>
    <div class="dropdown">
      <button
        id="themeDropdown"
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Change Theme
      </button>
      <ul class="dropdown-menu" aria-labelledby="themeDropdown">
        <li>
          <a class="dropdown-item" href="#" @click="changeTheme('system')"
            >Auto</a
          >
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="changeTheme('light')"
            >Light</a
          >
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="changeTheme('dark')"
            >Dark</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
