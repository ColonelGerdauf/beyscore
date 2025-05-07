<script setup lang="ts">
import type { EarnPointArgs } from "./WinButton.vue";

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
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <h2 class="text-center">BeyScore</h2>
        <div class="row mt-4">
          <!-- Player 1 Section -->
          <PlayerSection
            :player-name="player1Name"
            :player-index="player1Index"
            :player-score="player1Score"
            :is-disabled="checkWinner() !== ''"
            :win-function="earnPoints"
          />
          <div class="col text-center">
            <h3>Last Score</h3>
            <h4>{{ scoreReason }}</h4>

            <button class="btn btn-primary" @click="startCountdown">
              Countdown
            </button>
          </div>

          <!-- Player 2 Section -->
          <PlayerSection
            :player-name="player2Name"
            :player-index="player2Index"
            :player-score="player2Score"
            :is-disabled="checkWinner() !== ''"
            :win-function="earnPoints"
          />
        </div>

        <!-- Display winner -->
        <div v-if="checkWinner()" class="mt-4 text-center">
          <h2 class="text-success">{{ checkWinner() }}</h2>
        </div>

        <div class="mt-4 text-center">
          <button
            class="btn btn-warning"
            :disabled="history.length === 0"
            @click="undoLastAction()"
          >
            Undo
          </button>
        </div>

        <div class="mt-4 text-center">
          <button class="btn btn-warning" @click="$emit('reset')">
            New Match
          </button>
        </div>

        <!-- History Table -->
        <div v-if="history.length > 0" class="mt-4">
          <h4 class="text-center">Score History</h4>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>{{ player1Name }} Score</th>
                <th>{{ player2Name }} Score</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(entry, index) in history" :key="index">
                <td>{{ entry.player1Score }}</td>
                <td>{{ entry.player2Score }}</td>
                <td>{{ entry.reason }}</td>
              </tr>
              <tr>
                <td>{{ player1Score }}</td>
                <td>{{ player2Score }}</td>
                <td>{{ scoreReason }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
