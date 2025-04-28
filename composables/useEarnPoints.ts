export interface ScoreHistory {
  player1Score: number;
  player2Score: number;
  reason: string;
}

export interface UseEarnPointsArgs {
  Points: number;
  Player: number;
  Reason: string;
  CurrentReason: Ref<string>;
  Player1Score: Ref<number>;
  Player2Score: Ref<number>;
  History: Ref<ScoreHistory[]>;
}

export default function (args: UseEarnPointsArgs) {
  args.History.value.push({
    player1Score: args.Player1Score.value,
    player2Score: args.Player2Score.value,
    reason: args.CurrentReason.value,
  });

  if (args.Player === 1) {
    args.Player1Score.value += args.Points;
  } else {
    args.Player2Score.value += args.Points;
  }

  args.CurrentReason.value = args.Reason;
}
