<script setup lang="ts">
import type { EarnPointArgs } from "../types/earnPointArgs";

defineProps<{
  playerName: string;
  playerIndex: number;
  playerScore: number;
  isDisabled: boolean;
  winFunction: (args: EarnPointArgs) => void;
}>();
</script>

<template>
  <div class="col text-center">
    <h3>{{ playerName }}</h3>
    <h4>{{ playerScore }}</h4>
    <div class="btn-group">
      <WinButton
        win-name="Spin"
        :is-disabled="isDisabled"
        @clicked="
          winFunction({
            Points: 1,
            Player: playerIndex,
            Reason: `${playerName} Spin Finish`,
          })
        "
      />
      <WinButton
        win-name="Over"
        :is-disabled="isDisabled"
        @clicked="
          winFunction({
            Points: 2,
            Player: playerIndex,
            Reason: `${playerName} Over Finish`,
          })
        "
      />
      <WinButton
        win-name="Burst"
        :is-disabled="isDisabled"
        @clicked="
          winFunction({
            Points: 2,
            Player: playerIndex,
            Reason: `${playerName} Burst Finish`,
          })
        "
      />
      <WinButton
        win-name="Xtreme"
        :is-disabled="isDisabled"
        @clicked="
          winFunction({
            Points: 3,
            Player: playerIndex,
            Reason: `${playerName} Xtreme Finish`,
          })
        "
      />
      <WinButton
        win-name="Launch Error"
        :is-disabled="isDisabled"
        @clicked="
          winFunction({
            Points: 1,
            Player: playerIndex,
            Reason: `${playerName} Opponent Launch Error`,
          })
        "
      />
    </div>
  </div>
</template>
