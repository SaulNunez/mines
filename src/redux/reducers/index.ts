import { generateRandomPairs } from '../../utils/mines';
import { GameAction } from './action_types'
import { GameState, SquareState } from './state_types';

const initialState: GameState = {
    board: [],
    gridSize: 0
  }

export default function rootReducer(state = initialState, action: GameAction) {
    const newState = { board: state.board, gridSize: state.gridSize };

    switch(action.type){
        case 'CLICK':
            newState.board[action.index_x][action.index_y].state = SquareState.OPENED;
            break;
        case 'FLAG':
            newState.board[action.index_x][action.index_y].state = SquareState.FLAGGED;
            break;
        case 'UNFLAG':
            newState.board[action.index_x][action.index_y].state = SquareState.UNOPENED;
            break;
        case 'NEW_GAME':
            const defaultValue = {
                state: SquareState.UNOPENED,
                hasMine: false
            };
            newState.gridSize = action.board_size;
            newState.board = Array.from({ length: action.board_size }, () => Array(action.board_size).fill(defaultValue));
            generateRandomPairs(action.board_size, action.board_size, 10).forEach(element => {
                const [x, y] = element;
                newState.board[x][y].hasMine = true;
            });
    }
    return {...state, ...newState};
}