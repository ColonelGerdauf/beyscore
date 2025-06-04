<script setup lang="ts">
defineProps<{
  winName: string;
  isDisabled: boolean;
}>();

const emit = defineEmits<{
  clicked: [];
}>();
</script>

<template>
  <button
    class="btn btn-success"
    :disabled="isDisabled"
    @click="emit('clicked')"
  >
    {{ winName }}
  </button>
</template>
