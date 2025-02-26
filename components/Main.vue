<script setup lang="ts">
const scoreToWin = ref(0);

const player1Name = ref("");
const player2Name = ref("");

const player1Score = ref(0);
const player2Score = ref(0);
const scoreReason = ref("");
const history = ref<
  { player1Score: number; player2Score: number; reason: string }[]
>([]);

function earnPoints(points: number, player: string, reason: string) {
  // Save the current scores to history before making changes
  history.value.push({
    player1Score: player1Score.value,
    player2Score: player2Score.value,
    reason: scoreReason.value,
  });

  if (player === "player1") {
    player1Score.value += points;
  } else {
    player2Score.value += points;
  }

  scoreReason.value = reason;
}

function undoLastAction() {
  if (history.value.length > 0) {
    const lastAction = history.value.pop();
    if (lastAction) {
      player1Score.value = lastAction.player1Score;
      player2Score.value = lastAction.player2Score;
      scoreReason.value = lastAction.reason;
    }
  }
}

function checkWinner() {
  if (player1Score.value >= scoreToWin.value) {
    return `${player1Name.value} Wins!`;
  } else if (player2Score.value >= scoreToWin.value) {
    return `${player2Name.value} Wins!`;
  }
  return "";
}

function resetSettings() {
  scoreToWin.value = 0;
  player1Score.value = 0;
  player2Score.value = 0;
  scoreReason.value = "";
  player1Name.value = "";
  player2Name.value = "";
  history.value = []; // Clear history for the new match
}

function newMatch(matchScore: number) {
  scoreToWin.value = matchScore;
  if (player1Name.value === "") {
    player1Name.value = "Player 1";
  }

  if (player2Name.value === "") {
    player2Name.value = "Player 2";
  }
}
</script>

<template>
  <div>
    <div v-if="scoreToWin === 0" class="container mt-4">
      <h2 class="text-center">Create a tournament</h2>
      <div>
        <label for="player-1-name" class="form-label">Player 1 Name</label>
        <input
          id="player-1-name"
          v-model="player1Name"
          type="text"
          class="form-control"
          placeholder="Player 1"
          aria-label="Player 1 Name"
          aria-describedby="player-1-name"
        />
      </div>

      <div>
        <label for="player-2-name" class="form-label">Player 2 Name</label>
        <input
          v-model="player2Name"
          type="text"
          class="form-control"
          placeholder="Player 2"
          aria-label="Player 2 Name"
          aria-describedby="player-2-name"
        />
      </div>
      <div>Points to Win</div>
      <div class="btn-group" role="group" aria-label="Point Button Selector">
        <button type="button" class="btn btn-primary" @click="newMatch(3)">
          3 Points
        </button>
        <button type="button" class="btn btn-primary" @click="newMatch(4)">
          4 Points
        </button>
        <button type="button" class="btn btn-primary" @click="newMatch(5)">
          5 Points
        </button>
        <button type="button" class="btn btn-primary" @click="newMatch(7)">
          7 Points
        </button>
      </div>
    </div>
    <div v-else class="container mt-4">
      <div class="row">
        <div class="col-12">
          <h2 class="text-center">BeyScore</h2>
          <div class="row mt-4">
            <!-- Player 1 Section -->
            <div class="col text-center">
              <h3>{{ player1Name }}</h3>
              <h4>{{ player1Score }}</h4>
              <div class="btn-group">
                <button
                  class="btn btn-success"
                  :disabled="checkWinner() !== ''"
                  @click="
                    earnPoints(1, 'player1', `${player1Name} Spin Finish`)
                  "
                >
                  Spin
                </button>
                <button
                  class="btn btn-success"
                  :disabled="checkWinner() !== ''"
                  @click="
                    earnPoints(2, 'player1', `${player1Name} Over Finish`)
                  "
                >
                  Over
                </button>
                <button
                  class="btn btn-success"
                  :disabled="checkWinner() !== ''"
                  @click="
                    earnPoints(2, 'player1', `${player1Name} Burst Finish`)
                  "
                >
                  Burst
                </button>
                <button
                  class="btn btn-success"
                  :disabled="checkWinner() !== ''"
                  @click="earnPoints(3, 'player1', `${player1Name} Xtreme`)"
                >
                  Xtreme
                </button>
              </div>
            </div>

            <div class="col text-center">
              <h3>Last Score</h3>
              <h4>{{ scoreReason }}</h4>
            </div>

            <!-- Player 2 Section -->
            <div class="col text-center">
              <h3>{{ player2Name }}</h3>
              <h4>{{ player2Score }}</h4>
              <div class="btn-group">
                <button
                  class="btn btn-success"
                  :disabled="checkWinner() !== ''"
                  @click="
                    earnPoints(1, 'player2', `${player1Name} Spin Finish`)
                  "
                >
                  Spin
                </button>
                <button
                  class="btn btn-success"
                  :disabled="checkWinner() !== ''"
                  @click="
                    earnPoints(2, 'player2', `${player2Name} Over Finish`)
                  "
                >
                  Over
                </button>
                <button
                  class="btn btn-success"
                  :disabled="checkWinner() !== ''"
                  @click="
                    earnPoints(2, 'player2', `${player2Name} Burst Finish`)
                  "
                >
                  Burst
                </button>
                <button
                  class="btn btn-success"
                  :disabled="checkWinner() !== ''"
                  @click="earnPoints(3, 'player2', `${player2Name} Xtreme`)"
                >
                  Xtreme
                </button>
              </div>
            </div>
          </div>

          <!-- Display winner -->
          <div v-if="checkWinner()" class="mt-4 text-center">
            <h2 class="text-success">{{ checkWinner() }}</h2>
          </div>

          <div class="mt-4 text-center">
            <button
              class="btn btn-warning"
              :disabled="history.length === 0"
              @click="undoLastAction"
            >
              Undo
            </button>
          </div>

          <div class="mt-4 text-center">
            <button class="btn btn-warning" @click="resetSettings">
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
  </div>
</template>
