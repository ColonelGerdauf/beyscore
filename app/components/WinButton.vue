<script setup lang="ts">
export interface EarnPointArgs {
  Points: number;
  Player: number;
  Reason: string;
}

defineProps<{
  winName: string;
  isDisabled: boolean;
  clickFunc: (args: EarnPointArgs) => void;
  args: EarnPointArgs;
}>();
</script>

<template>
  <button
    class="btn btn-success"
    :disabled="isDisabled"
    @click="clickFunc(args)"
  >
    {{ winName }}
  </button>
</template>
