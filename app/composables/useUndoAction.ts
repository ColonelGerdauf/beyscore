export interface UseUndoActionArgs {
  Player1Score: Ref<number>;
  Player2Score: Ref<number>;
  ScoreReason: Ref<string>;
  History: Ref<ScoreHistory[]>;
}

export default function (args: UseUndoActionArgs) {
  if (args.History.value.length > 0) {
    const lastAction = args.History.value.pop();
    if (lastAction) {
      args.Player1Score.value = lastAction.player1Score;
      args.Player2Score.value = lastAction.player2Score;
      args.ScoreReason.value = lastAction.reason;
    }
  }
}
