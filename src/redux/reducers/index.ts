import { act } from 'react';
import { generateRandomPairs, getSurroundingPairs, revealEmptyCells } from '../../utils/mines';
import { GameAction } from './action_types'
import { GameState, Square, SquareState } from './state_types';

const initialState: GameState = {
    board: [],
    gridSize: 0
  }

export default function rootReducer(state = initialState, action: GameAction) {
    const newState = structuredClone(state);

    switch(action.type){
        case 'CLICK':
            newState.board[action.index_x][action.index_y].state = SquareState.OPENED;

            if(!newState.board[action.index_x][action.index_y].hasMine){
                revealEmptyCells(newState.board, action.index_x, action.index_y, newState.gridSize, newState.gridSize)
                    .forEach(([x, y]) => newState.board[x][y].state = SquareState.OPENED);
            }
            break;
        case 'FLAG':
            newState.board[action.index_x][action.index_y].state = SquareState.FLAGGED;
            break;
        case 'UNFLAG':
            newState.board[action.index_x][action.index_y].state = SquareState.UNOPENED;
            break;
        case 'NEW_GAME':
            newState.gridSize = action.board_size;

            // Initializing board
            // Note that .fill() just sets an reference of the object
            newState.board = new Array(newState.gridSize);
            for(let n = 0; n < newState.gridSize; n++){
                newState.board[n] = new Array(newState.gridSize);
                for (let m = 0; m < newState.gridSize; m++){
                    newState.board[n][m] = {
                        state:  SquareState.UNOPENED,
                        hasMine: false,
                        nearMines: 0,
                        x: n,
                        y: m
                    };
                }
            }
            generateRandomPairs(action.board_size, action.board_size, 10).forEach(element => {
                const [x, y] = element;
                newState.board[x][y].hasMine = true;

                getSurroundingPairs(x, y, action.board_size - 1, action.board_size - 1).forEach(boardElem => {
                    const [boardx, boardy] = boardElem;
                    newState.board[boardx][boardy].nearMines += 1;
                });
            });
    }
    return newState;
}