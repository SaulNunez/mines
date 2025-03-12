export type GameAction =
  | { type: "CLICK"; index_x: number, index_y: number }
  | { type: "FLAG"; index_x: number, index_y: number }
  | { type: "UNFLAG"; index_x: number, index_y: number }
  | { type: "NEW_GAME"; board_size: number};