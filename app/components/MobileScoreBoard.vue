<script setup lang="ts">
import { ref } from "vue";
import type { EarnPointArgs } from "./WinButton.vue";
import { useSound } from "@vueuse/sound";

const props = defineProps<{
  pointsToWin: number;
  player1Name: string;
  player2Name: string;
}>();

defineEmits(["reset"]);

const player1Index = 0;
const player2Index = 1;

const player1Score = ref(0);
const player2Score = ref(0);
const scoreReason = ref("");
const history = ref<ScoreHistory[]>([]);

function earnPoints(args: EarnPointArgs) {
  useEarnPoints({
    Player: args.Player,
    Points: args.Points,
    Reason: args.Reason,
    CurrentReason: scoreReason,
    Player1Score: player1Score,
    Player2Score: player2Score,
    History: history,
  });
}

function undoLastAction() {
  useUndoAction({
    Player1Score: player1Score,
    Player2Score: player2Score,
    ScoreReason: scoreReason,
    History: history,
  });
}

function checkWinner() {
  if (player1Score.value >= props.pointsToWin) {
    return `${props.player1Name} Wins!`;
  } else if (player2Score.value >= props.pointsToWin) {
    return `${props.player2Name} Wins!`;
  }
  return "";
}

const { play } = useSound("/sounds/countdown.mp3");

function startCountdown() {
  play();
}
</script>

<template>
  <div class="container d-flex flex-column vh-100">
    <!-- App Header -->
    <div class="row py-2">
      <div class="col-12 text-center">
        <h2>BeyScore</h2>
      </div>
    </div>

    <!-- Player 1 Section (Top, Rotated) -->
    <div class="row flex-grow-1">
      <MobilePlayer
        :player-name="player1Name"
        :player-index="player1Index"
        :player-score="player1Score"
        :is-disabled="checkWinner() !== ''"
        :win-function="earnPoints"
        :rotated="true"
      />
    </div>

    <!-- Middle Section with Countdown, Undo Button and Last Score -->
    <div class="row my-2">
      <div class="col-12 text-center">
        <div class="mb-2">
          <button class="btn btn-secondary btn-lg me-2" @click="startCountdown">
            Countdown
          </button>
          <button
            class="btn btn-warning btn-lg"
            :disabled="history.length === 0"
            @click="undoLastAction"
          >
            Undo
          </button>
        </div>

        <div class="last-score mt-2">
          <small>Last Score:</small>
          <div>{{ scoreReason || "No scores yet" }}</div>
        </div>

        <!-- Winner Display -->
        <div v-if="checkWinner()" class="winner-alert mt-2">
          <h4 class="text-success">{{ checkWinner() }}</h4>
          <button class="btn btn-primary mt-2" @click="$emit('reset')">
            New Match
          </button>
        </div>
      </div>
    </div>

    <!-- Player 2 Section (Bottom) -->
    <div class="row flex-grow-1">
      <MobilePlayer
        :player-name="player2Name"
        :player-index="player2Index"
        :player-score="player2Score"
        :is-disabled="checkWinner() !== ''"
        :win-function="earnPoints"
        :rotated="false"
      />
    </div>

    <!-- Bottom Controls -->
    <div class="row py-2">
      <div class="col-12 text-center">
        <button class="btn btn-danger" @click="$emit('reset')">
          Reset Game
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vh-100 {
  min-height: 100vh;
}

.player-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.last-score {
  font-size: 0.9rem;
  color: #6c757d;
}

.winner-alert {
  background-color: rgba(40, 167, 69, 0.1);
  padding: 0.5rem;
  border-radius: 5px;
}
</style>
