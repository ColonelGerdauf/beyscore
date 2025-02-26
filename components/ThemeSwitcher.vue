<script setup lang="ts">
const theme = ref("auto");

const loadThemeFromStorage = () => {
  // Check if a theme is stored in localStorage, default to 'auto' if not
  const savedTheme = localStorage.getItem("theme") || "auto";
  theme.value = savedTheme;

  // Apply the theme based on the saved preference
  applyTheme(savedTheme);
};

const applyTheme = (selectedTheme: string) => {
  if (selectedTheme === "auto") {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    document.documentElement.setAttribute(
      "data-bs-theme",
      prefersDarkScheme ? "dark" : "light",
    );
  } else {
    document.documentElement.setAttribute("data-bs-theme", selectedTheme);
  }
};

const changeTheme = (selectedTheme: string) => {
  theme.value = selectedTheme;
  // Save the selected theme to localStorage
  localStorage.setItem("theme", selectedTheme);
  applyTheme(selectedTheme);
};

onMounted(() => {
  loadThemeFromStorage();
});
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
          <a class="dropdown-item" href="#" @click="changeTheme('auto')"
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
