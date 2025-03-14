import { Board, Square, SquareState } from "../redux/reducers/state_types";

export type Coordinate = [number, number];

export function generateRandomPairs(x: number, y: number, n: number): [number, number][] {
    const pairs: [number, number][] = [];
    
    for (let i = 0; i < n; i++) {
        const randomX = Math.floor(Math.random() * x);
        const randomY = Math.floor(Math.random() * y);
        pairs.push([randomX, randomY]);
    }
    
    return pairs;
}

export function revealEmptyCells(board: Board, x: number, y: number, maxX: number, maxY: number, visited: Set<string> = new Set()): Coordinate[] {
    if (x < 0 || y < 0 || x >= maxX || y >= maxY) return [];
    if (visited.has(`${x},${y}`)) return [];
  
    visited.add(`${x},${y}`);
    let result: [number, number][] = [[x, y]];
  
    if (board[x][y].nearMines === 0) {
      const surroundingPairs = getSurroundingPairs(x, y, maxX, maxY);
      for (const [nx, ny] of surroundingPairs) {
        result = result.concat(revealEmptyCells(board, nx, ny, maxX, maxY, visited));
      }
    }
  
    return result;
  }


export function getSurroundingPairs(x: number, y: number, maxX: number, maxY: number): Coordinate[] {
    const directions = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0],          [1, 0],
        [-1, 1], [0, 1], [1, 1]
    ];
    
    const result: [number, number][] = [];
    
    for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        
        if (newX >= 0 && newX <= maxX && newY >= 0 && newY <= maxY) {
            result.push([newX, newY]);
        }
    }
    
    return result;
}

export function allMinesFlagged(board: Board): boolean {
    const anyIncorrectFlag = board.some(row => 
        row.some(cell => !cell.hasMine && cell.state === SquareState.FLAGGED)
      );
    
      if (anyIncorrectFlag) return false;

    const allNonMineCellsRevealed = board.every(row => 
      row.every(cell => !cell.hasMine ? cell.state === SquareState.OPENED : true)
    );
    
    return board.every(row => 
      row.every(cell => 
        !cell.hasMine || 
        cell.state === SquareState.FLAGGED || 
        (allNonMineCellsRevealed && cell.state === SquareState.UNOPENED)
      )
    );
  }