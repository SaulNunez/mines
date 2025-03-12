export enum SquareState {
    UNOPENED,
    FLAGGED,
    OPENED
}

export interface Square {
    state: SquareState,
    hasMine: boolean
}

export interface GameState {
    board: Square[][],
    gridSize: number
}