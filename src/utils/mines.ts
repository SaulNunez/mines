import { Square } from "../redux/reducers/state_types";

export function generateRandomPairs(x: number, y: number, n: number): [number, number][] {
    const pairs: [number, number][] = [];
    
    for (let i = 0; i < n; i++) {
        const randomX = Math.floor(Math.random() * x);
        const randomY = Math.floor(Math.random() * y);
        pairs.push([randomX, randomY]);
    }
    
    return pairs;
}

export function revealEmptyCells(board: Square[][], x: number, y: number, maxX: number, maxY: number, visited: Set<string> = new Set()): [number, number][] {
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


export function getSurroundingPairs(x: number, y: number, maxX: number, maxY: number): [number, number][] {
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