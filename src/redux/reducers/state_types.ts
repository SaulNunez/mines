export enum SquareState {
    UNOPENED,
    FLAGGED,
    OPENED
}

export enum CurrentGameState {
    WIP,
    WON,
    LOST
}

export interface Square {
    state: SquareState,
    hasMine: boolean,
    nearMines: number,
    x: number,
    y: number
}

export type Board = Square[][];

export interface GameState {
    board: Board,
    gridSize: number,
    gameState: CurrentGameState
}