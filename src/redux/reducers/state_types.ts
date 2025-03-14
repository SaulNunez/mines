export enum SquareState {
    UNOPENED,
    FLAGGED,
    OPENED
}

export interface Square {
    state: SquareState,
    hasMine: boolean,
    nearMines: number,
    x: number,
    y: number
}

export interface GameState {
    board: Square[][],
    gridSize: number
}